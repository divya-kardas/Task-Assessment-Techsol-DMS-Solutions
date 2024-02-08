import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
    // window.location.reload(); 
  }

  let location = useLocation();

  // React.useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand">Shopping Cart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link>
        </li>
      </ul>

      {!localStorage.getItem('token')?<form className='d-flex'>
        <Link role="button" className="btn btn-primary mx-1 " to="/login">Login</Link>
        <Link role="button" className="btn btn-primary mx-1 " to="/signup">Signup</Link>
      </form>:<button onClick={handleLogout}className='btn btn-primary'>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
