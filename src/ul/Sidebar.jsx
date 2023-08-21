import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import "./ul.css";

export const Sidebar = ({ active }) => {
  const { rol } = JSON.parse(localStorage.getItem("user"));
 
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate("/auth", {
      replace: true,
    });
  };

  return (
    <>
      <div className="contenedor">
        <div className={active ? "navigation active" : "navigation"}>
          <ul>
            <li>
              <Link className="link" to="/menu">
                <span className="icon">
                  <ion-icon name="logo-apple"></ion-icon>
                </span>
                <span className="title">Alicorp</span>
              </Link>
            </li>
            <li className="">
              <Link className="link" to="/menu">
                <span className="icon">
                  <ion-icon name="analytics"></ion-icon>
                </span>
                <span className="title">Reporte</span>
              </Link>
            </li>
            { (rol === 1) ? (
              <>
                <li className="">
                  <Link className="link" to="/menu/distribuidor">
                    <span className="icon">
                      <ion-icon name="storefront-outline"></ion-icon>
                    </span>
                    <span className="title">Distribuidora</span>
                  </Link>
                </li>
                <li className="">
                  <Link className="link" to="/menu/usuario">
                    <span className="icon">
                      <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                    <span className="title">Usuario</span>
                  </Link>
                </li>
              </>
            ) : (
              <> </>
            )
          
          }

            <li className="">
              <div className="link" onClick={onLogout}>
                <span className="icon">
                  <ion-icon name="log-out"></ion-icon>
                </span>
                <span className="title">Cerrar Sesión</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
