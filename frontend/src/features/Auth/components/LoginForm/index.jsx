import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../../components/InputField";
import { Button } from "../../../../components/Button";
import authService from "../../../../services/authService";
import styles from "./index.module.css";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignUpClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/register"); // Navigate to the /register route
  };

  const handleSubmit = async (e) => {
    console.log('LoginForm: HandleSubmit called:', e);
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setError("");

    try {
      console.log('LoginForm: Attempting login with:', formData);
      const result = await authService.login(formData);
      console.log('LoginForm: Login successful:', result);
      // Redirect to dashboard or home page after successful login
      navigate("/");
    } catch (err) {
      console.error('LoginForm: Login error:', err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.his}>His</span>
          <span className={styles.ampersand}>&amp;</span>
          <span className={styles.hers}>Hers</span>
        </div>
        <div className={styles.authBox}>
          <h2>Welcome Back</h2>
          <div>Login to continue</div>
          <form className={styles.form}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            <InputField
              label="Email"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button 
              type="button" 
              className={styles.submit}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className={styles.link}>
            Dont have an account ?
            <button
              type="button"
              onClick={handleSignUpClick}
              className={styles.linkButton}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
