import { React, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils";
import AuthContext from "../contexts";

function Navigation() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Order Application
          </NavLink>

          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {!user && (
                  <NavLink className="nav-link" to="/login">
                    Login
                    {/* <span className="sr-only">(current)</span> */}
                  </NavLink>
                )}
                {user && (
                  <NavLink className="nav-link" to="/login" onClick={handleLogout}>
                    Logout
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;