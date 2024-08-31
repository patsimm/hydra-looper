
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [link, setLink] = useState<string | null>(null)

  useEffect(() => {
    fetch("/links-slashwhy.txt").then(async (res)=> {
      const text = await res.text()
      const links = text.split("\n").map(link => link.trim());
      const randomIndex = () => Math.floor((Math.random() * links.length));
      const randomTimeout = () => 10000 + Math.floor(Math.random() * 20000)
      const next = (index: number) => {
        const link = links[index % links.length]
        setLink(link)
        setTimeout(() => next(randomIndex()), randomTimeout())
      }
     next(0);
    })
  }, [])

  return (
      link && <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        allow={`camera ${link}; microphone ${link}`}
        src={link}>
      </iframe>
  )
}

export default App
