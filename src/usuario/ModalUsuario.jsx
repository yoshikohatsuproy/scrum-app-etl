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

export const ModalUsuario = ({
  isOpen,
  closeModal,
  titulo,
  id,
  usuario,
  updateItemTabla,
  addItemTabla,
  tipos,
}) => {
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
    closeModal();
  };

  const handleUpdateTable = (id, payload) => {
    updateItemTabla(id, payload);
  };
  const handleAddTable = (payload) => {
    addItemTabla(payload);
  };

  // Hook que permite el cambio de los formularios
  useEffect(() => {
    setFormValues(usuario);
  }, [usuario]);

  // Función que agrega o actualiza en la bbdd
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nom_usuario,
      ape_usuario,
      telf_usuario,
      correo_usuario,
      password_usuario,
      id_tipo_usuario,
    } = formValues;

    if (id === 0) {
      if (
        nom_usuario == "" ||
        ape_usuario == "" ||
        telf_usuario == "" ||
        correo_usuario == "" ||
        password_usuario == "" ||
        id_tipo_usuario == 0
      ) {
        Mensaje("Error Usuario", "Los datos son obligatorios", "error");
        return;
      }
    } else {
      if (
        nom_usuario == "" ||
        ape_usuario == "" ||
        telf_usuario == "" ||
        correo_usuario == "" ||
        id_tipo_usuario == 0
      ) {
        Mensaje("Error Usuario", "Los datos son obligatorios", "error");
        return;
      }
    }

    if (id === 0) {
      axios({
        method: "post",
        url: API_URL + "/usuario",
        headers: { "x-token": token },
        data: formValues,
      })
        .then((res) => {
          const { data } = res.data;
          console.log(data);
          handleAddTable(data);
          Mensaje("Éxito Usuario", "Se ha registrado exitosamente", "success");
        })
        .catch((error) => {
          Mensaje("Error Usuario", error.response.data.msg, "error");
        });
    } else {
      const payload = { ...formValues, id };

      axios({
        method: "put",
        url: API_URL + "/usuario/" + id,
        headers: { "x-token": token },
        data: payload,
      })
        .then((res) => {
          const { data } = res.data;
          handleUpdateTable(id, data);
        })
        .catch((error) => {
          Mensaje("Error Distribuidor", error.response.data.msg, "error");
        });

      Mensaje(
        "Éxito Distribuidor",
        "Se ha actualizado exitosamente",
        "success"
      );
    }

    setFormValues({
      nom_distribuidor: "",
      url_distribuidor: "",
      usu_distribuidor: "",
      pass_distribuidor: "",
    });

    handleCloseModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
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
            <label>Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de Usuario"
              name="nom_usuario"
              autoComplete="off"
              value={formValues.nom_usuario}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>Apellido de Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellido de Usuario"
              name="ape_usuario"
              autoComplete="off"
              value={formValues.ape_usuario}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>Teléfono de Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Teléfono de Usuario"
              name="telf_usuario"
              autoComplete="off"
              value={formValues.telf_usuario}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>Correo de Usuario</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo de Usuario"
              name="correo_usuario"
              autoComplete="off"
              value={formValues.correo_usuario}
              onChange={onInputChange}
            />
          </div>
          {id == 0 ? (
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
          ) : (
            <></>
          )}

          <div className="form-group mb-3">
            <label htmlFor="id_tipo" className="form-label">
              Rol de Usuario
            </label>
            <select
              value={tipos.id_tipo_usuario}
              name="id_tipo_usuario"
              onChange={onInputChange}
              className="form-select  mb-1"
              aria-label="Default select example"
            >
              {usuario.id_tipo_usuario === 0 ? (
                <option value="0" defaultValue>
                  Seleccionar
                </option>
              ) : (
                <option value="0">Seleccionar</option>
              )}

              {tipos.map((tipo) => (
                <option
                  selected={usuario.id_tipo_usuario === tipo.id_tipo_usuario}
                  key={tipo.id_tipo_usuario}
                  value={tipo.id_tipo_usuario}
                >
                  {tipo.nom_tipo}
                </option>
              ))}
            </select>
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
