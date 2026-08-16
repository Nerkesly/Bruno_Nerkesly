import { useState } from 'react'
import { Link } from 'react-router-dom'

function EmergencyButton() {
  const [ouvert, setOuvert] = useState(false)

  return (
    <>
      <button
        type="button"
        className="emergency-button"
        onClick={() => setOuvert(true)}
      >
        🆘 Besoin d’aide maintenant
      </button>

      {ouvert && (
        <div
          className="emergency-overlay"
          onClick={() => setOuvert(false)}
        >
          <section
            className="emergency-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="emergency-close"
              onClick={() => setOuvert(false)}
              aria-label="Fermer"
            >
              ✕
            </button>

            <p className="emergency-label">
              SOUTIEN IMMÉDIAT
            </p>

            <h2>
              De quoi avez-vous besoin maintenant ?
            </h2>

            <p className="emergency-description">
              Choisissez simplement ce qui pourrait vous aider
              en ce moment.
            </p>

            <div className="emergency-options">
              <Link
                to="/respirer"
                className="emergency-option"
              >
                <span className="emergency-option-icon">
                  🌿
                </span>

                <div>
                  <strong>M’aider à me calmer</strong>

                  <p>
                    Prendre 60 secondes pour respirer.
                  </p>
                </div>
              </Link>

              <Link
                to="/soutien"
                className="emergency-option"
              >
                <span className="emergency-option-icon">
                  💬
                </span>

                <div>
                  <strong>J’ai besoin de parler</strong>

                  <p>
                    Trouver un espace pour vous exprimer.
                  </p>
                </div>
              </Link>

              <Link
                to="/communaute"
                className="emergency-option"
              >
                <span className="emergency-option-icon">
                  🤝
                </span>

                <div>
                  <strong>Rejoindre la communauté</strong>

                  <p>
                    Échanger avec d’autres personnes.
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default EmergencyButton