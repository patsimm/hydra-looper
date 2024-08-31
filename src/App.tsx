
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [link, setLink] = useState<string | null>(null)

  useEffect(() => {
    fetch("/links.txt").then(async (res)=> {
      const text = await res.text()
      const links = text.split("\n").map(link => link.trim());
      const next = (index: number) => {
        const link = links[index % links.length]
        console.log(`showing link ${link}`)
        setLink(link)
        setTimeout(() => next(index+1), 10000)
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
