import { useState } from 'react'
import './App.css'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import JobListPage from './JobListPage'
import ApplyJobPage from '../ApplyJobPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ApplyJobPage/>
      {/* <JobListPage/> */}
      {/* <LoginPage/> */}
      {/* <RegisterPage/> */}
    </>
  )
}

export default App
