import './Modal.css';

function SignUpModal({ closeSignUpModal, openLoginModal }) {
  return (
    <div className="modal-overlay" onClick={closeSignUpModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeSignUpModal}>×</button>
        <h2>Sign Up</h2>
        <form action="/signup" method="POST">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeSignUpModal();
              openLoginModal();
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
