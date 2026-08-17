import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Respirer() {
  const [tempsRestant, setTempsRestant] = useState(60)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!active || tempsRestant <= 0) {
      return
    }

    const timer = setTimeout(() => {
      setTempsRestant((temps) => temps - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [active, tempsRestant])

  function commencer() {
    setTempsRestant(60)
    setActive(true)
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="dashboard-logo">
            MindHarbor
          </Link>

          <div className="dashboard-nav-links">
            <Link to="/dashboard">Mon espace</Link>
          </div>
        </nav>

        <section className="dashboard-intro">
          <p className="dashboard-welcome">Respiration</p>

          <h1>Respirez. 🌿</h1>

          <p>
            Accordez-vous 60 secondes. Rien d’autre à faire pour le moment.
          </p>
        </section>

        <section className="message-emotion">
          <div className="message-emoji">🌿</div>

          <div className="message-contenu">
            <h2>
              {tempsRestant === 0
                ? 'Exercice terminé ✨'
                : active
                  ? `${tempsRestant} secondes`
                  : 'Prêt à commencer ?'}
            </h2>

            <p>
              {tempsRestant === 0
                ? 'Prenez un instant avant de continuer votre journée.'
                : 'Inspirez doucement, puis expirez lentement.'}
            </p>

            <button className="bouton-action" onClick={commencer}>
              {active && tempsRestant > 0
                ? `🌿 Respirez... ${tempsRestant}s`
                : tempsRestant === 0
                  ? '↻ Recommencer'
                  : '🌿 Commencer les 60 secondes'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Respirer