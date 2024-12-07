import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Business from './pages/Business';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import ErrorPage from './pages/ErrorPage';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import ProfilePage from './components/User/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const [findText, setFindText] = useState('');
  const [nearText, setNearText] = useState('');

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  const clearSearchFields = () => {
    setFindText('');
    setNearText('');
  };

  return (
    <AuthProvider>
      <Router>
        <Header
          findText={findText}
          nearText={nearText}
          setFindText={setFindText}
          setNearText={setNearText}
          openLoginModal={openLoginModal}
          openSignUpModal={openSignUpModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route
            path="/search"
            element={
              <SearchResults
                findText={findText}
                nearText={nearText}
                clearSearchFields={clearSearchFields}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/user_details" element={<ProfilePage />} /> {/* Add this route */}
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
    </AuthProvider>
  );
}

export default App;