import axios from "axios";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { Mensaje } from "../../ul/Mensajes";

import "../login.css";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api";

  const [formValues, setFormValues] = useState({
    id_usuario: 0,
    correo_usuario: "yokun123422@gmail.com",
    password_usuario: "12345678",
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();

    try {
      const { correo_usuario, password_usuario } = formValues;

      if (correo_usuario == "" || password_usuario == "") {
        Mensaje("Error Login", "Los datos son obligatorios", "error");
        return;
      }

      const payload = { correo_usuario, password_usuario };

      axios
        .post(API_URL + "/auth/login", payload)
        .then((res) => {
          const { ok, data, msg, token } = res.data;

          if (ok) {
            login(data, token);

            Mensaje("Éxito Login", msg, "success");
            navigate("/menu", {
              replace: true,
            });
          };
        })
        .catch((error) => {
          if ( error.message === 'Network Error') {
            Mensaje("Error Login", "Ha sucedido un error comunicarse con el administrador", "error");
            return 
          }
          Mensaje("Error Login", error.response.data.msg, "error");
        });
    } catch (error) {
      console.log(error);
      Mensaje(
        "Error Login",
        "Ha sucedido un error comunicarse con el administrador",
        "error"
      );
    }
  };

  return (
    <div>
      <img className="wave" alt="wave" src="src/assets/login/wave.png" />
      <div className="container-login">
        <div className="img">
          <img src="src/assets/login/bg.svg" alt="bg" />
        </div>
        <div className="login-content">
          <form onSubmit={onLogin}>
            <img src="src/assets/login/avatar.svg" alt="avatar" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="email"
                  className="input"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
              </div>
            </div>

            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};
