import { useState } from 'react'
import './App.css'
import { Button } from './components/Button/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
  
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)} disabled>
          count is {count}
        </Button>
      </div>
    </>
  )
}

export default App
