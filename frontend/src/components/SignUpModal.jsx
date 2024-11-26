import './Modal.css';
import AuthForm from './AuthForm';

function SignUpModal({ closeSignUpModal, openLoginModal }) {
  return (
    <div className="modal-overlay" onClick={closeSignUpModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeSignUpModal}>×</button>
        <AuthForm isSignup={true} closeModal={closeSignUpModal} switchModal={openLoginModal} />
      </div>
    </div>
  );
}

export default SignUpModal;