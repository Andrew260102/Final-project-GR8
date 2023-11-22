import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/homePage/Footer';
import Baner from './components/Header/Header Com/Baner';
import Login from './components/Header/Header Com/Login';
import Register from './components/Header/Header Com/Register';
import NewArticle from './components/Header/Header Com/NewArticle';
import Home from './components/homePage/Home';

function App() {
  return (
    <BrowserRouter>
      {/* Header Template */}
      <Header />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/editor/" element={<NewArticle/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Navigate replace to="/home"/>} />
      </Routes>
      {/* Footer Template */}
      <Footer />
  
    </BrowserRouter>
  );
}

export default App;
