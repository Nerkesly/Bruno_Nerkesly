import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Besoin = {
  id: string
  emoji: string
  titre: string
  description: string
  message: string
}

function Soutien() {
  const [besoinSelectionne, setBesoinSelectionne] =
    useState<Besoin | null>(null)

  const [texte, setTexte] = useState('')
  const [tempsRestant, setTempsRestant] = useState(60)
  const [respirationActive, setRespirationActive] = useState(false)

  const besoins: Besoin[] = [
    {
      id: 'parler',
      emoji: '💬',
      titre: 'J’ai besoin de parler',
      description:
        'Vous avez quelque chose sur le cœur et vous souhaitez l’exprimer.',
      message:
        'Vous pouvez prendre votre temps. Commencez simplement par ce que vous ressentez maintenant.',
    },
    {
      id: 'ecoute',
      emoji: '👂',
      titre: 'Je veux être écouté',
      description:
        'Pas besoin de solution. Vous avez simplement besoin d’un espace pour vous exprimer.',
      message:
        'Vous n’avez pas besoin d’avoir les bons mots. Dites simplement ce qui vous vient.',
    },
    {
      id: 'calmer',
      emoji: '🌿',
      titre: 'J’ai besoin de me calmer',
      description:
        'Prenez quelques minutes pour ralentir et retrouver votre souffle.',
      message:
        'Une chose à la fois. Vous pouvez commencer par prendre quelques respirations lentes.',
    },
    {
      id: 'communaute',
      emoji: '🤝',
      titre: 'Je veux parler à la communauté',
      description:
        'Partagez avec des personnes qui peuvent comprendre ce que vous traversez.',
      message:
        'Vous pouvez rejoindre la communauté MindHarbor et partager seulement ce avec quoi vous êtes à l’aise.',
    },
  ]

  useEffect(() => {
    if (!respirationActive || tempsRestant <= 0) {
      return
    }

    const timer = setTimeout(() => {
      setTempsRestant((temps) => temps - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [respirationActive, tempsRestant])

  function selectionnerBesoin(besoin: Besoin) {
    setBesoinSelectionne(besoin)
    setTexte('')
    setRespirationActive(false)
    setTempsRestant(60)
  }

  function commencerRespiration() {
    setTempsRestant(60)
    setRespirationActive(true)
  }

  return (
    <main className="soutien-page">
      <div className="soutien-container">
        <nav className="soutien-nav">
          <Link to="/dashboard" className="soutien-logo">
            MindHarbor
          </Link>

          <div className="soutien-nav-links">
            <Link to="/dashboard">Mon espace</Link>
            <Link to="/communaute">Communauté</Link>
          </div>
        </nav>

        <section className="soutien-intro">
          <p className="soutien-label">SOUTIEN</p>

          <h1>De quoi avez-vous besoin maintenant ?</h1>

          <p>
            Vous n’avez pas besoin de tout expliquer. Choisissez simplement ce
            qui vous ressemble le plus.
          </p>
        </section>

        <section className="soutien-grid">
          {besoins.map((besoin) => (
            <button
              key={besoin.id}
              type="button"
              className={`soutien-card ${
                besoinSelectionne?.id === besoin.id ? 'active' : ''
              }`}
              onClick={() => selectionnerBesoin(besoin)}
            >
              <span className="soutien-icon">{besoin.emoji}</span>

              <div>
                <h2>{besoin.titre}</h2>
                <p>{besoin.description}</p>
              </div>
            </button>
          ))}
        </section>

        {besoinSelectionne && (
          <section className="soutien-resultat">
            <div className="soutien-resultat-icon">
              {besoinSelectionne.emoji}
            </div>

            <div className="soutien-resultat-contenu">
              <p className="soutien-resultat-label">
                Vous avez choisi
              </p>

              <h2>{besoinSelectionne.titre}</h2>

              <p>{besoinSelectionne.message}</p>

              {(besoinSelectionne.id === 'parler' ||
                besoinSelectionne.id === 'ecoute') && (
                <div className="soutien-expression">
                  <textarea
                    value={texte}
                    onChange={(event) => setTexte(event.target.value)}
                    placeholder={
                      besoinSelectionne.id === 'parler'
                        ? 'Qu’avez-vous sur le cœur ?'
                        : 'Écrivez simplement ce qui vous vient...'
                    }
                    maxLength={600}
                  />

                  <div className="soutien-expression-bas">
                    <span>{texte.length}/600</span>

                    <button
                      type="button"
                      className="soutien-expression-button"
                      disabled={!texte.trim()}
                      onClick={() => setTexte('')}
                    >
                      Terminer
                    </button>
                  </div>
                </div>
              )}

              {besoinSelectionne.id === 'calmer' && (
                <div className="soutien-respiration">
                  {!respirationActive ? (
                    <button
                      type="button"
                      className="soutien-action"
                      onClick={commencerRespiration}
                    >
                      🌿 Commencer 60 secondes
                    </button>
                  ) : (
                    <div className="soutien-timer">
                      <span className="soutien-timer-number">
                        {tempsRestant}
                      </span>

                      <p>
                        {tempsRestant > 0
                          ? 'Respirez lentement...'
                          : '✨ Terminé. Prenez votre temps.'}
                      </p>

                      {tempsRestant === 0 && (
                        <button
                          type="button"
                          className="soutien-action"
                          onClick={commencerRespiration}
                        >
                          Recommencer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {besoinSelectionne.id === 'communaute' && (
                <Link to="/communaute" className="soutien-action">
                  Aller à la communauté →
                </Link>
              )}
            </div>
          </section>
        )}
      </div>

      <button type="button" className="emergency-button">
        🆘 Besoin d’aide maintenant
      </button>
    </main>
  )
}

export default Soutien