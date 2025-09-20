import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Forgot.css';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (user) {
      alert(`Your password is: ${user.password}`);
      navigate("/"); // redirect to login after showing password
    } else {
      if (window.confirm("Email not found. Do you want to sign up instead?")) {
        navigate("/signup");
      }
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Recover Password</button>
      </form>
    </div>
  );
};

export default Forgot;
