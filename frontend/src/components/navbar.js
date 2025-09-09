import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/patient">Patient</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
