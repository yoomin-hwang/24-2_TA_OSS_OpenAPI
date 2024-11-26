import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
    </div>
  );
}

export default App;
