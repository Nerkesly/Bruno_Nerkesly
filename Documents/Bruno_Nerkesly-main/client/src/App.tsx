import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'
import Dashboard from './pages/Dashboard'
import Humeur from './pages/Humeur'
import Respirer from './pages/Respirer'
import Communaute from './pages/Communaute'
import Soutien from './pages/Soutien'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />

        <Route
          path="/connexion"
          element={<Connexion />}
        />

        <Route
          path="/inscription"
          element={<Inscription />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/humeur"
          element={<Humeur />}
        />

        <Route
          path="/respirer"
          element={<Respirer />}
        />

        <Route
          path="/communaute"
          element={<Communaute />}
        />

        <Route
          path="/soutien"
          element={<Soutien />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App