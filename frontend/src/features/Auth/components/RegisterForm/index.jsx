import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../../components/InputField";
import { Button } from "../../../../components/Button";
import authService from "../../../../services/authService";
import styles from "./index.module.css";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUpClick = () => {
    navigate("/login");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    console.log("Attempting to register:", {
      fullName: formData.fullName,
      email: formData.email,
    });

    // Prepare data for backend
    const registerData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    };

    const response = await authService.register(registerData);
    
    if (response) {
      console.log("Registration successful:", response);
      navigate("/", { replace: true });
    }
  };

  const handleSubmit = (e) => {
    console.log('HandleSubmit called with event:', e);
    console.log('Event type:', e.type);
    console.log('Form method:', e.target.method);
    console.log('Form action:', e.target.action);
    
    // FORCE prevent default
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    
    if (loading) {
      console.log('Already loading, ignoring submission');
      return false;
    }
    
    console.log('Validating form...');
    if (!validateForm()) {
      console.log('Form validation failed');
      return false;
    }
    
    console.log('Form validation passed, processing submission');
    processSubmission();
    return false;
  };

  const processSubmission = async () => {
    setLoading(true);
    setError("");

    try {
      console.log('RegisterForm: Starting registration process');
      await handleRegister();
      console.log('RegisterForm: Registration completed successfully');
    } catch (error) {
      console.error('RegisterForm: Registration error:', error);
      setError(error.message || "Registration failed. Please try again.");
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
          <h2>Create Account</h2>
          <div>Sign up to get started</div>
          <form className={styles.form}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
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
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button 
              type="button" 
              className={styles.submit}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Registering..." : "Sign up"}
            </button>
          </form>
          <div className={styles.link}>
            Don't have an account ?
            <button
              type="button"
              onClick={handleSignUpClick}
              className={styles.linkButton}
            >
              Login in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
