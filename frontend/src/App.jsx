import { Routes, Route } from 'react-router'

import LogPage from './pages/LogPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogPage />} />
    </Routes>
  )
}

export default App
