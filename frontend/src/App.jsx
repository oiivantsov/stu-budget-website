import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Business from './pages/Business';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import ErrorPage from './pages/ErrorPage';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  return (
    <Router>
      <Header openLoginModal={openLoginModal} openSignUpModal={openSignUpModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/:id" element={<Business />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      {isLoginOpen && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          openSignUpModal={openSignUpModal}
        />
      )}
      {isSignUpOpen && (
        <SignUpModal
          closeSignUpModal={closeSignUpModal}
          openLoginModal={openLoginModal}
        />
      )}
    </Router>
  );
}

export default App;