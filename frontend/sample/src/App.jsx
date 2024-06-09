import { Routes,Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Main from './components/main/Main'
import './App.css'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
