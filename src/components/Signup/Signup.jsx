import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const validEmail = 'admin@example.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
      navigate('/dashboard');
    } else {
      alert('Invalid signup credentials');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left">
          <img src='/assets/White_Full_Logo.png' alt="Logo" className="logo" />
        </div>

        <div className="signup-right">
          <div className="signup-header">
            <img src="/assets/Half.png" alt="Half Logo" className="half-logo" />
            <h2>Create Account</h2>
            <p>Get started with us</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary">Sign up</button>

            <button type="button" className="btn-google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Continue with Google
            </button>
          </form>

          <p className="login-link">
            Already have an account?{' '}
            <span onClick={() => navigate('/')} className="link-text">Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;