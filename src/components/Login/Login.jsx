import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem('rememberMe'));
    if (remembered) {
      setEmail(remembered.email);
      setPassword(remembered.password);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userByEmail = users.find((u) => u.email === email);

    if (!userByEmail) {
      setEmailError('Email not found. Sign up?');
      return;
    }

    if (userByEmail.password !== password) {
      setPasswordError('Invalid password. Forgot password?');
      return;
    }

    // Correct credentials
    localStorage.setItem('currentUser', JSON.stringify(userByEmail));
    if (rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem('rememberMe');
    }

    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/forgot');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-logo">
          <img src="/assets/White_Full_Logo.png" alt="Countrees Logo" className="logo-img" />
        </div>

        <div className="login-form">
          <div className="login-header">
            <img src="/assets/Half.png" alt="Half Logo" className="half-logo" />
            <h2>Welcome Back</h2>
            <p>Please log in to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {emailError && <p className="input-error">{emailError}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {passwordError && <p className="input-error">{passwordError}</p>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                Remember me
              </label>
              <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">Log in</button>

            <div className="divider">
              <div className="line"></div>
              <span>or</span>
              <div className="line"></div>
            </div>

            <button type="button" className="google-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              <span>Continue with Google</span>
            </button>
          </form>

          <p className="signup-prompt">
            Don't have an account?{" "}
            <span onClick={() => navigate('/signup')} className="signup-link">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
