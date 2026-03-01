import { useState } from 'react'
import './App.css'
import RegisterPage from './RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegisterPage/>
    </>
  )
}

export default App
