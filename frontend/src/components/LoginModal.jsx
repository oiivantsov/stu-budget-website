import './Modal.css';
import AuthForm from './AuthForm';

function LoginModal({ closeLoginModal, openSignUpModal }) {
  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeLoginModal}>×</button>
        <AuthForm isSignup={false} closeModal={closeLoginModal} switchModal={openSignUpModal} />
      </div>
    </div>
  );
}

export default LoginModal;