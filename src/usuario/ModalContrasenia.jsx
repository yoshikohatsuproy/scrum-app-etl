import axios from "axios";

import { useState, useEffect } from "react";
import { Mensaje } from "../ul/Mensajes";

import Modal from "react-modal";
import "../styles/modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const ModalContrasenia = ({ isOpen2, closeModal2, usuario, titulo, id}) => {
  // Estado Inicial de formulario
  const [formValues, setFormValues] = useState(usuario);
  const API_URL = "http://localhost:5000/api";

  // Obtener el token para confirmar el login
  const { token } = JSON.parse(localStorage.getItem("user"));

  // Función que permite cambiar los inputs del formulario
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    closeModal2();
  };

  // Hook que permite el cambio de los formularios
  useEffect(() => {
    setFormValues(usuario);
  }, [usuario]);

  // Función que agrega o actualiza en la bbdd
  const handleSubmit = (e) => {
    e.preventDefault();

    const { password_usuario } = formValues;

 
    if (!password_usuario ) {
      Mensaje("Error Usuario", "Los datos son obligatorios", "error");
      return;
    }

    axios({
      method: "put",
      url: API_URL + "/usuario/cambiarPassword/" + id,
      headers: { "x-token": token },
      data: {password_usuario},
    })
      .then((res) => {
   
        Mensaje(
          "Éxito Usuario",
          "Se ha cambiado la contraseña correctamente",
          "success"
        );
      })
      .catch((error) => {
        console.log(error)
        Mensaje("Error Usuario", error.response.data.msg, "error");
      });

    setFormValues({
      pass_distribuidor: "",
    });

    handleCloseModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen2}
        onRequestClose={handleCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> {titulo} </h1>
        <hr />
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label>Password de Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Password de Usuario"
              name="password_usuario"
              autoComplete="off"
              value={formValues.password_usuario}
              onChange={onInputChange}
            />
          </div>

          <div className="fila">
            <button type="submit" className="buttonModal primary">
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </button>

            <button
              type="button"
              className="buttonModal danger"
              onClick={handleCloseModal}
            >
              <i className="far fa-save"></i>
              <span> Salir</span>
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
