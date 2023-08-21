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

export const ModalReporteDist = ({
  isOpen,
  closeModal,
  titulo,
  idr,
  id,
  reporte,
  updateItemTabla,
  addItemTabla
}) => {
  // Obtener el token para confirmar el login
  const { token } = JSON.parse(localStorage.getItem("user"));
  const API_URL = "http://localhost:5000/api";

  // Estado Inicial de formulario
  const [formValues, setFormValues] = useState(reporte);

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

  const handleUpdateTable = (idr, payload) =>{
    updateItemTabla(idr, payload)
  }
  const handleAddTable = ( payload) =>{
    addItemTabla( payload)
  }

  // Hook que permite el cambio de los formularios
  useEffect(() => {
    setFormValues(reporte);
  }, [reporte]);

  // Función que agrega o actualiza en la bbdd
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nom_reporte,
      url_reporte,
    } = formValues;

    if (
      nom_reporte == "" ||
      url_reporte == ""  
    ) {
      Mensaje("Error Reporte", "Los datos son obligatorios", "error");
      return;
    }

    const payload = { ...formValues , id_distribuidor: id }
  
    if (idr === 0) {
   
      axios({
        method: "post",
        url: API_URL + "/reportesbydist",
        headers: { "x-token": token },
        data: payload,
      })
        .then((res) => {
          const {data} = res.data
        
          handleAddTable(data[0])
          Mensaje("Éxito Reporte", "Se ha registrado exitosamente", "success");
        })
        .catch((error) => {
          console.log(error)
          Mensaje("Error Reporte", error.response.data.msg, "error");
        });

    } else {
       
      axios({
        method: "put",
        url: API_URL + "/reportesbydist/" + idr,
        headers: { "x-token": token },
        data: formValues,
      })
        .then((res) => {
          const {data} = res.data
          handleUpdateTable(idr, data)

          Mensaje(
            "Éxito Reporte",
            "Se ha actualizado exitosamente",
            "success"
          );

        })
        .catch((error) => {
          console.log(error)
          Mensaje("Error Reporte", error, "error");
        });

    }

    setFormValues({
      nom_reporte: "",
      url_reporte: "",
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
            <label>Nombre de Reporte</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de Distribuidor"
              name="nom_reporte"
              autoComplete="off"
              value={formValues.nom_reporte}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>URL de Reporte</label>
            <input
              type="text"
              className="form-control"
              placeholder="URL de Distribuidor"
              name="url_reporte"
              autoComplete="off"
              value={formValues.url_reporte}
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
