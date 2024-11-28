import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { Header } from './components/Header';

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="/" element={<MainPage/>} />
          <Route path="/detail/:id" element={<DetailPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
