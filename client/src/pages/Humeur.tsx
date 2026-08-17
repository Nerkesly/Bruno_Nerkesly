import { Link } from 'react-router-dom'
import { useState } from 'react'

type Emotion = {
  nom: string
  emoji: string
  message: string
}

function Humeur() {
  const [emotionSelectionnee, setEmotionSelectionnee] =
    useState<Emotion | null>(null)

  const emotions: Emotion[] = [
    {
      nom: 'Triste',
      emoji: '😔',
      message:
        'Vous avez le droit d’avoir une journée difficile. Prenez votre temps.',
    },
    {
      nom: 'Anxieux',
      emoji: '😰',
      message:
        'Respirez doucement. Vous êtes ici, maintenant. Une chose à la fois.',
    },
    {
      nom: 'Seul',
      emoji: '😞',
      message:
        'Même si vous vous sentez seul, vous n’avez pas à tout porter seul.',
    },
    {
      nom: 'Frustré',
      emoji: '😡',
      message:
        'Prenez un moment pour souffler. Vous n’avez pas besoin de tout régler maintenant.',
    },
    {
      nom: 'Épuisé',
      emoji: '😴',
      message:
        'Vous avez le droit de ralentir. Se reposer fait aussi partie du chemin.',
    },
    {
      nom: 'Vide',
      emoji: '😶',
      message:
        'Vous n’avez pas besoin de comprendre exactement ce que vous ressentez maintenant.',
    },
    {
      nom: 'Ça va',
      emoji: '🙂',
      message:
        'Merci d’avoir pris un moment pour vérifier comment vous vous sentez.',
    },
    {
      nom: 'Bien',
      emoji: '😊',
      message:
        'Profitez de ce moment. Les bonnes journées méritent aussi d’être reconnues.',
    },
  ]

  return (
    <main className="accueil">
      <div className="conteneur">
        <Link to="/dashboard">← Retour à mon espace</Link>

        <section className="hero-section">
          <p className="bienvenue">Prenez un moment pour vous.</p>

          <h1>Comment vous sentez-vous aujourd’hui ?</h1>

          <p className="sous-titre">
            Prenez votre temps. Il n’y a pas de mauvaise réponse.
          </p>
        </section>

        <section className="emotions-section">
          <div className="emotions-grid">
            {emotions.map((emotion) => (
              <button
                key={emotion.nom}
                className={`emotion-card ${
                  emotionSelectionnee?.nom === emotion.nom ? 'active' : ''
                }`}
                onClick={() => setEmotionSelectionnee(emotion)}
              >
                <span className="emotion-emoji">{emotion.emoji}</span>
                <span className="emotion-nom">{emotion.nom}</span>
              </button>
            ))}
          </div>
        </section>

        {emotionSelectionnee && (
          <section className="message-emotion">
            <div className="message-emoji">
              {emotionSelectionnee.emoji}
            </div>

            <div className="message-contenu">
              <h2>
                Vous vous sentez{' '}
                {emotionSelectionnee.nom.toLowerCase()}.
              </h2>

              <p>{emotionSelectionnee.message}</p>

              <Link to="/respirer" className="bouton-action">
                🌿 Prendre 60 secondes pour respirer
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Humeur