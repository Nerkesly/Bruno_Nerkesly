import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmergencyButton from '../components/EmergencyButton'

function Connexion() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [afficherMotDePasse, setAfficherMotDePasse] =
    useState(false)

  const navigate = useNavigate()

  function gererConnexion(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    console.log({
      email,
      motDePasse,
    })

    navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-brand">
          <p className="auth-logo">
            MindHarbor
          </p>

          <h1>
            Heureux de vous revoir.
          </h1>

          <p>
            Reprenez là où vous vous étiez arrêté,
            à votre rythme.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-heading">
            <p className="auth-eyebrow">
              Connexion
            </p>

            <h2>
              Retrouvez votre espace
            </h2>

            <p>
              Entrez vos informations pour accéder
              à MindHarbor.
            </p>
          </div>

          <form onSubmit={gererConnexion}>
            <div className="form-group">
              <label htmlFor="email">
                Adresse courriel
              </label>

              <input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="motDePasse">
                  Mot de passe
                </label>

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setAfficherMotDePasse(
                      (afficher) => !afficher
                    )
                  }
                >
                  {afficherMotDePasse
                    ? 'Masquer'
                    : 'Afficher'}
                </button>
              </div>

              <input
                id="motDePasse"
                type={
                  afficherMotDePasse
                    ? 'text'
                    : 'password'
                }
                placeholder="Votre mot de passe"
                value={motDePasse}
                onChange={(event) =>
                  setMotDePasse(event.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Se connecter
            </button>
          </form>

          <p className="auth-switch">
            Vous n’avez pas encore de compte ?{' '}

            <Link to="/inscription">
              Créer un compte
            </Link>
          </p>
        </div>
      </section>

      <EmergencyButton />
    </main>
  )
}

export default Connexion