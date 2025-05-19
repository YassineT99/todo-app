import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GlobalStateProvider } from './GlobalState';
import TodoPage from './pages/TodoPage.js';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/navigationbar/navbar';


function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
