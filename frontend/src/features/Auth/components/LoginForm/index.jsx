import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { InputField } from "../../../../components/InputField";
import { Button } from "../../../../components/Button";
import styles from "./index.module.css";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button variant="secondary" label="Login" />
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
