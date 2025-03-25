import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPopup.css";
import { StoreContext } from "../../context/StoreContext";

function LoginPopup({ setShowLogin }) {
  const { setToken, setEmail } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "Nashvel", // Default name
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const predefinedAccounts = {
    "client@gmail.com": "client",
    "admin@gmail.com": "admin",
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((data) => ({ ...data, [name]: value }));
    setError(""); 
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    setTimeout(() => {
      if (currState === "Sign Up") {
        const finalName = userData.name.trim() || "Nashvel"; // Use "Nashvel" if empty
        setToken("mock_token_123");
        localStorage.setItem("Token", "mock_token_123");
        localStorage.setItem("Email", userData.email);
        localStorage.setItem("Password", userData.password);
        localStorage.setItem("Name", finalName);
        setCurrState("Login");
      } else if (currState === "Login") {
        const storedEmail = localStorage.getItem("Email");
        const storedPassword = localStorage.getItem("Password");
        const storedName = localStorage.getItem("Name");

        if (userData.email in predefinedAccounts && userData.password === predefinedAccounts[userData.email]) {
          setEmail(userData.email);
          localStorage.setItem("Token", "mock_token_123");
          localStorage.setItem("Name", storedName);
          setShowLogin(false);

          // Redirect based on role
          if (userData.email === "client@gmail.com") {
            navigate("/access/client");
          } else if (userData.email === "admin@gmail.com") {
            navigate("/");
          }
        } else if (userData.email === storedEmail && userData.password === storedPassword) {
          setEmail(userData.email);
          localStorage.setItem("Token", "mock_token_123");
          localStorage.setItem("Name", storedName);
          setShowLogin(false);
        } else {
          setError("Invalid email or password");
        }
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-overlay">
      <div className="login">
        <form className="login-container" onSubmit={onSubmitHandler}>
          <div className="login-header">
            <h2>{currState}</h2>
            <i
              className="bi bi-x-lg close-icon"
              onClick={() => setShowLogin(false)}
            ></i>
          </div>

          <div className="login-inputs">
            {currState === "Sign Up" && (
              <div className="input-group">
                <i className="bi bi-person input-icon"></i>
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={userData.name}
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>
            )}
            <div className="input-group">
              <i className="bi bi-envelope input-icon"></i>
              <input
                name="email"
                onChange={onChangeHandler}
                value={userData.email}
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="input-group">
              <i className="bi bi-lock input-icon"></i>
              <input
                name="password"
                onChange={onChangeHandler}
                value={userData.password}
                type={showPassword ? "text" : "password"}
                placeholder={currState === "Sign Up" ? "Set your password" : "Your password"}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : currState}
          </button>

          {currState === "Sign Up" && (
            <div className="login-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to terms of use & privacy policy.</p>
            </div>
          )}

          <p className="toggle-state">
            {currState === "Sign Up" ? "Already have an account?" : "Create a new account?"}
            <span onClick={() => setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")}>
              {currState === "Sign Up" ? "Login" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
