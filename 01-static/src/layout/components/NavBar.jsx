import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export const NavBar = () => {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const { userInfo, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLongout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <nav>
        <div className="navbar-title">
          <Link to={'/'} className="title-nav">WUZZLE</Link>
        </div>
        <div className="navbar-links">
          <li>
            <NavLink to={"/"} className={({isActive}) => (isActive ? "a-active": "")}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to={"/game"} className={({isActive}) => (isActive ? "a-active": "")}>Jugar</NavLink>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  onClick={() => setIsOpenAccount(!isOpenAccount)}
                  className="dropdown-button"
                >
                  Mi cuenta
                </button>
                {isOpenAccount && (
                  <div className="dropdown-menu">
                    <span>Hola! {userInfo.user.username}</span>
                    <hr />
                    <NavLink to={"/preferences"} className={({isActive}) => (isActive ? "a-active": "a-dropdown-menu")}>Configuraciones</NavLink>
                    <button onClick={handleLongout} className="btn-longout"> Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to={"/login"} className={({isActive}) => (isActive ? "a-active": "")}>Ingresar</NavLink>
            )}
          </li>
        </div>
      </nav>
    </>
  );
};
