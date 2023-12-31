import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/homePage/Footer';
import Baner from './components/Header/Header Com/Baner';
import Login from './components/Header/Header Com/Login';
import Register from './components/Header/Header Com/Register';
import Home from './components/homePage/Home';
import NewArticle from './components/Header/Header Com/NewArticle';
import Settings from './components/Header/Header Com/Settings';

function App() {
  return (
    <BrowserRouter>
      {/* Header Template */}
      <Header />
      <div style={{ marginBottom: '80px' }}> {/* Adjust the margin-bottom based on your footer height */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editor/" element={<NewArticle />} />
          <Route path="/settings/" element={<Settings />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
      {/* Footer Template */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;