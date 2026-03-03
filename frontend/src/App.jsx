import { useState } from 'react'
import './App.css'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import JobListPage from './JobListPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JobListPage/>
      {/* <LoginPage/>
      <RegisterPage/> */}
    </>
  )
}

export default App
