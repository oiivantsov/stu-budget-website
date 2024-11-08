import './Modal.css';

function LoginModal({ closeLoginModal, openSignUpModal }) {
  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeLoginModal}>×</button>
        <h2>Login</h2>
        <form action="/login" method="POST">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeLoginModal();
              openSignUpModal();
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
