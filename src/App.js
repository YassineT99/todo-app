import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './contexts/TodoContext';
import TodoPage from './pages/ToDoPage/TodoPage.js';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Navbar from './components/navigationbar/navbar';


function App() {
  return (
    <TodoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
