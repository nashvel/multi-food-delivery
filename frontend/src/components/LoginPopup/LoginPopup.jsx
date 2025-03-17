import React, { useContext, useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function LoginPopup({ setShowLogin }) {
  const { setToken, setEmail } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (currState === "Sign Up") {
        setToken("mock_token_123");
        localStorage.setItem("Token", "mock_token_123");
        setCurrState("Login");
      } else if (currState === "Login") {
        setEmail(userData.email);
        localStorage.setItem("Email", userData.email);
        localStorage.setItem("Token", "mock_token_123");
        setShowLogin(false);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="login">
        <form className="login-container" onSubmit={onSubmitHandler}>
          <div className="login-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <div className="login-inputs">
            {currState === "Sign Up" && (
              <input
                name="name"
                onChange={onChangeHandler}
                value={userData.name}
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <div className={currState === "Sign Up" ? "email" : ""}>
              <input
                name="email"
                onChange={onChangeHandler}
                value={userData.email}
                type="email"
                placeholder="Your email"
                required
              />
              {currState === "Sign Up" && <span>Use a valid email to receive order details*</span>}
            </div>
            <div className="password">
              <input
                name="password"
                onChange={onChangeHandler}
                value={userData.password}
                type={showPassword ? "password" : "text"}
                placeholder={currState === "Sign Up" ? "Set your password" : "Your password"}
                required
              />
              <p onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Show" : "Hide"}
              </p>
            </div>
          </div>
          <button type="submit">
            {loading ? (currState === "Sign Up" ? "Processing..." : "Logging in...") : currState}
          </button>
          {currState === "Sign Up" && (
            <div className="login-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to terms of use & privacy policy.</p>
            </div>
          )}

          <p>
            {currState === "Sign Up" ? "Already have an account?" : "Create a new account?"}
            <span onClick={() => setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")}>
              {currState === "Sign Up" ? "Login" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginPopup;
