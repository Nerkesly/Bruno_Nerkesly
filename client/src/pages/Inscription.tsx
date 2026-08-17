import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmergencyButton from '../components/EmergencyButton'

function Inscription() {
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [afficherMotDePasse, setAfficherMotDePasse] =
    useState(false)

  const navigate = useNavigate()

  function gererInscription(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (motDePasse !== confirmation) {
      alert('Les mots de passe ne correspondent pas.')
      return
    }

    console.log({
      prenom,
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
            Votre espace commence ici.
          </h1>

          <p>
            Un endroit pour vous exprimer, respirer
            et avancer à votre rythme.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-heading">
            <p className="auth-eyebrow">
              Inscription
            </p>

            <h2>
              Créer votre espace
            </h2>

            <p>
              Quelques informations suffisent
              pour commencer.
            </p>
          </div>

          <form onSubmit={gererInscription}>
            <div className="form-group">
              <label htmlFor="prenom">
                Prénom
              </label>

              <input
                id="prenom"
                type="text"
                placeholder="Votre prénom"
                value={prenom}
                onChange={(event) =>
                  setPrenom(event.target.value)
                }
                required
              />
            </div>

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
                placeholder="Créez un mot de passe"
                value={motDePasse}
                onChange={(event) =>
                  setMotDePasse(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmation">
                Confirmer le mot de passe
              </label>

              <input
                id="confirmation"
                type={
                  afficherMotDePasse
                    ? 'text'
                    : 'password'
                }
                placeholder="Confirmez votre mot de passe"
                value={confirmation}
                onChange={(event) =>
                  setConfirmation(event.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Créer mon compte
            </button>
          </form>

          <p className="auth-switch">
            Vous avez déjà un compte ?{' '}

            <Link to="/connexion">
              Se connecter
            </Link>
          </p>
        </div>
      </section>

      <EmergencyButton />
    </main>
  )
}

export default Inscription