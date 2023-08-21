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

export const ModalDistribuidor = ({
  isOpen,
  closeModal,
  titulo,
  id,
  distribuidor,
  updateItemTabla,
  addItemTabla
}) => {
  // Estado Inicial de formulario
  const [formValues, setFormValues] = useState(distribuidor);
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

  const handleUpdateTable = (id, payload) =>{
    updateItemTabla(id, payload)
  }
  const handleAddTable = ( payload) =>{
    addItemTabla( payload)
  }

  // Hook que permite el cambio de los formularios
  useEffect(() => {
    setFormValues(distribuidor);
  }, [distribuidor]);

  // Función que agrega o actualiza en la bbdd
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nom_distribuidor,
      url_distribuidor,
      usu_distribuidor,
      pass_distribuidor,
    } = formValues;

    if (
      nom_distribuidor == "" ||
      url_distribuidor == "" ||
      usu_distribuidor == "" ||
      pass_distribuidor == ""
    ) {
      Mensaje("Error Distribuidor", "Los datos son obligatorios", "error");
      return;
    }

    if (id === 0) {
      axios({
        method: "post",
        url: API_URL + "/distribuidor/",
        headers: { "x-token": token },
        data: formValues,
      })
        .then((res) => {


          const {data} = res.data
          handleAddTable( data)
        })
        .catch((error) => {
          Mensaje("Error Login", error.response.data.msg, "error");
        });

      Mensaje("Éxito Distribuidor", "Se ha registrado exitosamente", "success");
    } else {
      const payload = { ...formValues, id };

      axios({
        method: "put",
        url: API_URL + "/distribuidor/" + id,
        headers: { "x-token": token },
        data: payload,
      })
        .then((res) => {
          const {data} = res.data
          handleUpdateTable(id, data)


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
            <label>Nombre de Distribuidor</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de Distribuidor"
              name="nom_distribuidor"
              autoComplete="off"
              value={formValues.nom_distribuidor}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>URL de Distribuidor</label>
            <input
              type="text"
              className="form-control"
              placeholder="URL de Distribuidor"
              name="url_distribuidor"
              autoComplete="off"
              value={formValues.url_distribuidor}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>Usuario de Distribuidor</label>
            <input
              type="text"
              className="form-control"
              placeholder="Usuario de Distribuidor"
              name="usu_distribuidor"
              autoComplete="off"
              value={formValues.usu_distribuidor}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>Password de Distribuidor</label>
            <input
              type="text"
              className="form-control"
              placeholder="Password de Distribuidor"
              name="pass_distribuidor"
              autoComplete="off"
              value={formValues.pass_distribuidor}
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
