import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DetailForm from './components/DetailForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DetailForm />
    </>
  )
}

export default App
