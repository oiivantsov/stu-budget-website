import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
const { setUser } = useContext(AuthContext);
  const email = useField("email");
  const password = useField("password");

  const { login, isLoading, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      const userData = await login({ email: email.value, password: password.value });

      if (userData) {
          console.log("Login successful:", userData);
setUser(userData); // Set user data in context
          navigate("/"); // Redirect to home or desired page
      } else {
          console.error("Login failed:", error);
      }
  };


  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Login;
