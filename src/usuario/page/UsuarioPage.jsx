import axios from "axios";
import { useState, useEffect } from "react";

import { TableUsuario } from "../TableUsuario";
import { Mensaje } from "../../ul/Mensajes";
import { ModalUsuario } from "../ModalUsuario";
import { ModalContrasenia } from "../ModalContrasenia";

export const UsuarioPage = () => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));

  const initData = {
    nom_usuario: "",
    ape_usuario: "",
    telf_usuario:"",
    correo_usuario: "",
    password_usuario: "",
    id_tipo_usuario: 0
  };

  // Modal usuarios
  const [usuario, setUsuario] = useState(initData); 
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [id, setId] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [tipos, setTipos] = useState([]);

  const listarUsuarios = () => {
    axios({
      method: "get",
      url: API_URL + "/usuarios",
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
        setUsuarios(data);
      })
      .catch((error) => {
        Mensaje("Error Usuarios", error.response.data.msg, "error");
      });
  };

  const listarCombo = () => {
    axios({
      method: "get",
      url: API_URL + "/tipo",
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
        setTipos(data);
      })
      .catch((error) => {
        Mensaje("Error Usuarios", error.response.data.msg, "error");
      });
  };



  const getUsuario = () => {
    if (id !== 0) {
      axios({
        method: "get",
        url: API_URL + "/usuarios/" + id,
        headers: { "x-token": token },
      })
        .then((res) => {
          const { data } = res.data;
    
          const payload = {

            nom_usuario: data[0].nom_usuario,
            ape_usuario: data[0].ape_usuario,
            telf_usuario: data[0].telf_usuario,
            correo_usuario: data[0].correo_usuario,
            id_tipo_usuario: data[0].id_tipo_usuario,

          };
          setUsuario(payload);
        })
        .catch((error) => {
          Mensaje("Error Reporte", error.response.data.msg, "error");
        });
    } else {
      setUsuario(initData);
    }
  };

  useEffect(() => {
    getUsuario();
  }, [id]);



  useEffect(() => {
    listarCombo();
  }, []);


  useEffect(() => {
    listarUsuarios();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  }


  const modificarId = (id) => {
    setId(id);
  };

  const updateItemTabla = (id, dato) => {
    let nusuarios = usuarios.map((elem) =>
      elem.id_usuario === id ? dato[0] : elem
    );
    setUsuarios(nusuarios);
    setId(0)
  };

  const addItemTabla = (dato) => {
    let nusuarios = [...usuarios, dato[0]];
    setUsuarios(nusuarios);
    setId(0)
  };

  const deleteItemTabla = (id, dato) => {
    let nusuarios = usuarios.map((elem) =>
      elem.id_usuario === id ? dato[0] : elem
    );
    setUsuarios(nusuarios);
    setId(0)
  };


  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };



  return (
    <>
      <TableUsuario
        openModal={openModal}
        usuarios={usuarios}
        modificarId={modificarId}
        deleteItemTabla={deleteItemTabla}
        openModal2 = {openModal2}
      />

      <ModalUsuario
        isOpen={isOpen}
        closeModal={closeModal}
        titulo={id === 0 ? "Nuevo Usuario" : "Editar Usuario"}
        id={id}
        usuario={usuario}
        updateItemTabla={updateItemTabla}
        addItemTabla={addItemTabla}
        tipos ={tipos}
      />

      <ModalContrasenia 
          isOpen2={isOpen2}
          closeModal2 = {closeModal2}
          usuario = {usuario}
          titulo="Editar Password"
          id = {id}
      />
    </>
  );
};
