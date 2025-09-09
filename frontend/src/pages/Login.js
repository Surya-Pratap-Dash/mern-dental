import { useState } from "react";
import { loginUser } from "../services/api"; // <-- must match named export
import Navbar from "../components/navbar"; // capital N

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form); // call API
      alert(res.message);

      if (res.role === "admin") window.location.href = "/admin";
      else window.location.href = "/patient";
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
