import { BrowserRouter, Routes, Route } from 'react-router';
import Levels from '../Levels/Levels';
import Game from '../Game/Game';
import './App.css'

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Levels />} />
          <Route path='/game/:level' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
