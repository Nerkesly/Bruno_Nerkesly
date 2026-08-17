import { useState } from 'react'
import { Link } from 'react-router-dom'

type Publication = {
  id: number
  auteur: string
  contenu: string
  reactions: number
}

function Communaute() {
  const [nouveauMessage, setNouveauMessage] = useState('')

  const [publications, setPublications] = useState<Publication[]>([
    {
      id: 1,
      auteur: 'Alex',
      contenu:
        'Journée un peu difficile aujourd’hui. J’essaie simplement de prendre les choses une étape à la fois.',
      reactions: 4,
    },
    {
      id: 2,
      auteur: 'Sam',
      contenu:
        'Petit rappel : même une petite victoire compte. Prenez soin de vous aujourd’hui. 🌿',
      reactions: 7,
    },
  ])

  function publierMessage() {
    if (!nouveauMessage.trim()) {
      return
    }

    const nouvellePublication: Publication = {
      id: Date.now(),
      auteur: 'Vous',
      contenu: nouveauMessage,
      reactions: 0,
    }

    setPublications((anciennesPublications) => [
      nouvellePublication,
      ...anciennesPublications,
    ])

    setNouveauMessage('')
  }

  function ajouterReaction(id: number) {
    setPublications((anciennesPublications) =>
      anciennesPublications.map((publication) =>
        publication.id === id
          ? {
              ...publication,
              reactions: publication.reactions + 1,
            }
          : publication
      )
    )
  }

  return (
    <main className="communaute-page">
      <div className="communaute-container">
        <nav className="communaute-nav">
          <Link to="/dashboard" className="communaute-logo">
            MindHarbor
          </Link>

          <div className="communaute-nav-links">
            <Link to="/dashboard">Mon espace</Link>
            <Link to="/humeur">Mon humeur</Link>
          </div>
        </nav>

        <section className="communaute-intro">
          <p className="communaute-label">COMMUNAUTÉ</p>

          <h1>Vous n’êtes pas seul.</h1>

          <p>
            Un espace pour partager, écouter et avancer ensemble.
          </p>
        </section>

        <section className="communaute-layout">
          <div className="communaute-principal">
            <section className="creer-publication">
              <div className="publication-avatar">V</div>

              <div className="publication-formulaire">
                <textarea
                  value={nouveauMessage}
                  onChange={(event) =>
                    setNouveauMessage(event.target.value)
                  }
                  placeholder="Qu’avez-vous envie de partager ?"
                  maxLength={400}
                />

                <div className="publication-actions">
                  <span>{nouveauMessage.length}/400</span>

                  <button
                    type="button"
                    onClick={publierMessage}
                    disabled={!nouveauMessage.trim()}
                  >
                    Publier
                  </button>
                </div>
              </div>
            </section>

            <section className="fil-publications">
              {publications.map((publication) => (
                <article
                  key={publication.id}
                  className="publication-card"
                >
                  <div className="publication-header">
                    <div className="publication-avatar">
                      {publication.auteur.charAt(0)}
                    </div>

                    <div>
                      <h2>{publication.auteur}</h2>
                      <span>À l’instant</span>
                    </div>
                  </div>

                  <p className="publication-contenu">
                    {publication.contenu}
                  </p>

                  <div className="publication-footer">
                    <button
                      type="button"
                      onClick={() =>
                        ajouterReaction(publication.id)
                      }
                    >
                      🤍 Soutenir
                    </button>

                    <span>
                      {publication.reactions}{' '}
                      {publication.reactions === 1
                        ? 'soutien'
                        : 'soutiens'}
                    </span>
                  </div>
                </article>
              ))}
            </section>
          </div>

          <aside className="communaute-sidebar">
            <div className="communaute-info-card">
              <span>🌿</span>

              <h2>Un espace bienveillant</h2>

              <p>
                Partagez seulement ce avec quoi vous êtes à
                l’aise. Chaque personne ici mérite respect et
                écoute.
              </p>
            </div>

            <div className="communaute-info-card">
              <span>🤝</span>

              <h2>Besoin de parler ?</h2>

              <p>
                Vous pouvez aussi chercher du soutien lorsque
                vous en ressentez le besoin.
              </p>
            </div>
          </aside>
        </section>
      </div>

      <button type="button" className="emergency-button">
        🆘 Besoin d’aide maintenant
      </button>
    </main>
  )
}

export default Communaute