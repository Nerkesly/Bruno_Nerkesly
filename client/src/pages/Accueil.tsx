import { useState } from 'react'

type Emotion = {
  emoji: string
  nom: string
  message: string
}

const emotions: Emotion[] = [
  {
    emoji: '😔',
    nom: 'Triste',
    message:
      'Vous avez le droit d’être triste. Prenez votre temps, vous n’avez pas à tout régler aujourd’hui.',
  },
  {
    emoji: '😰',
    nom: 'Anxieux',
    message:
      'Respirez doucement. Vous êtes ici, maintenant. Une chose à la fois.',
  },
  {
    emoji: '😞',
    nom: 'Seul',
    message:
      'Vous n’avez pas à traverser ce moment seul. Votre présence compte.',
  },
  {
    emoji: '😡',
    nom: 'Frustré',
    message:
      'Votre frustration est réelle. Prenez un moment pour souffler avant de continuer.',
  },
  {
    emoji: '😴',
    nom: 'Épuisé',
    message:
      'Vous avez le droit de ralentir. Se reposer fait aussi partie du chemin.',
  },
  {
    emoji: '😶',
    nom: 'Vide',
    message:
      'Même si vous ne savez pas exactement ce que vous ressentez, vous pouvez rester ici un moment.',
  },
  {
    emoji: '🙂',
    nom: 'Ça va',
    message:
      'Merci de prendre un moment pour vous écouter. Continuez à prendre soin de vous.',
  },
  {
    emoji: '😊',
    nom: 'Bien',
    message:
      'Profitez de ce moment. Les journées plus légères méritent aussi d’être appréciées.',
  },
]

function Accueil() {
  const [emotionChoisie, setEmotionChoisie] = useState<Emotion | null>(null)

  return (
    <main className="accueil">
      <div className="conteneur">
        <header className="header">
          <div>
            <h2 className="logo">MindHarbor</h2>
            <p className="welcome">
              Un espace pour respirer, parler et avancer.
            </p>
          </div>
        </header>

        <section className="intro">
          <p className="petit-titre">Bienvenue dans votre espace.</p>

          <h1>Comment vous sentez-vous aujourd’hui ?</h1>

          <p className="description">
            Prenez votre temps. Il n’y a pas de mauvaise réponse.
          </p>
        </section>

        <section className="emotions">
          <div className="grille-emotions">
            {emotions.map((emotion) => (
              <button
                key={emotion.nom}
                className={`carte-emotion ${
                  emotionChoisie?.nom === emotion.nom ? 'selectionnee' : ''
                }`}
                onClick={() => setEmotionChoisie(emotion)}
              >
                <span className="emoji">{emotion.emoji}</span>
                <span className="nom-emotion">{emotion.nom}</span>
              </button>
            ))}
          </div>
        </section>

        {emotionChoisie && (
          <section className="message-emotion">
            <span className="message-emoji">{emotionChoisie.emoji}</span>

            <div>
              <p className="message-label">
                Vous vous sentez {emotionChoisie.nom.toLowerCase()}.
              </p>

              <p className="message-texte">{emotionChoisie.message}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Accueil