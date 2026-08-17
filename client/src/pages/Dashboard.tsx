import { Link } from 'react-router-dom'
import EmergencyButton from '../components/EmergencyButton'

function Dashboard() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <Link
            to="/dashboard"
            className="dashboard-logo"
          >
            MindHarbor
          </Link>

          <div className="dashboard-nav-links">
            <Link to="/">
              Accueil
            </Link>

            <Link to="/communaute">
              Communauté
            </Link>
          </div>
        </nav>

        <section className="dashboard-intro">
          <p className="dashboard-welcome">
            Votre espace
          </p>

          <h1>
            Bonjour 👋
          </h1>

          <p>
            Prenez un moment pour vous. De quoi
            avez-vous besoin aujourd’hui ?
          </p>
        </section>

        <section className="dashboard-grid">
          <Link
            to="/humeur"
            className="dashboard-card"
          >
            <span className="dashboard-icon">
              💭
            </span>

            <div>
              <h2>
                Mon humeur
              </h2>

              <p>
                Prenez un moment pour identifier
                ce que vous ressentez.
              </p>
            </div>
          </Link>

          <Link
            to="/respirer"
            className="dashboard-card"
          >
            <span className="dashboard-icon">
              🌿
            </span>

            <div>
              <h2>
                Respirer
              </h2>

              <p>
                Faites une pause et prenez
                60 secondes pour respirer.
              </p>
            </div>
          </Link>

          <Link
            to="/communaute"
            className="dashboard-card"
          >
            <span className="dashboard-icon">
              💬
            </span>

            <div>
              <h2>
                Communauté
              </h2>

              <p>
                Échangez avec des personnes
                qui peuvent comprendre.
              </p>
            </div>
          </Link>

          <Link
            to="/soutien"
            className="dashboard-card"
          >
            <span className="dashboard-icon">
              🤝
            </span>

            <div>
              <h2>
                Parler à quelqu’un
              </h2>

              <p>
                Trouvez du soutien lorsque vous
                en ressentez le besoin.
              </p>
            </div>
          </Link>
        </section>
      </div>

      <EmergencyButton />
    </main>
  )
}

export default Dashboard