import axios from "axios";

import { useState, useEffect } from "react";

import { TableDistribuidor } from "../TableDistribuidor";
import { ModalDistribuidor } from "../ModalDistribuidor";

import { Mensaje } from "../../ul/Mensajes";

export const DistribuidorPage = () => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));

  const initData = {
    nom_distribuidor: "",
    url_distribuidor: "",
    usu_distribuidor: "",
    pass_distribuidor: "",
  };


  // Modal distribuidor
  const [distribuidor, setDistribuidor] = useState(initData);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);
  const [distribuidores, setDistribuidores] = useState([]);

  const listarDist = () => {
    axios({
      method: "get",
      url: API_URL + "/distribuidores",
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
        setDistribuidores(data);
      })
      .catch((error) => {
        Mensaje("Error Distribuidor", error.response.data.msg, "error");
      });
  };

  const getDistribuidor = () => {
    if (id !== 0) {
      axios({
        method: "get",
        url: API_URL + "/distribuidor/" + id,
        headers: { "x-token": token },
      })
        .then((res) => {
          const { data } = res.data;

          const payload = {
            nom_distribuidor: data[0].nom_distribuidor,
            url_distribuidor: data[0].url_distribuidor,
            usu_distribuidor: data[0].usu_distribuidor,
            pass_distribuidor: data[0].pass_distribuidor,
          };
          setDistribuidor(payload);
        })
        .catch((error) => {
          Mensaje("Error Login", error.response.data.msg, "error");
        });
    } else {
      setDistribuidor(initData);
    }
  };

  useEffect(() => {
    listarDist();
  }, []);

  useEffect(() => {
    getDistribuidor();
  }, [id]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const modificarId = (id) => {
    setId(id);
  };

  const updateItemTabla = (id, dato) => {
    let ndistribuidores = distribuidores.map((elem) =>
      elem.id_distribuidor === id ? dato[0] : elem
    );
    setDistribuidores(ndistribuidores);
    setId(0)
  };

  const addItemTabla = (dato) => {
    let ndistribuidores = [...distribuidores, dato[0]];
    setDistribuidores(ndistribuidores);
    setId(0)
  };

  const deleteItemTabla = (id, dato) => {
    let ndistribuidores = distribuidores.map((elem) =>
      elem.id_distribuidor === id ? dato[0] : elem
    );
    setDistribuidores(ndistribuidores);
    setId(0)
  };

  return (
    <div>
      <TableDistribuidor
        openModal={openModal}
        distribuidores={distribuidores}
        modificarId={modificarId}
        deleteItemTabla={deleteItemTabla}
      />
      <ModalDistribuidor
        isOpen={isOpen}
        closeModal={closeModal}
        titulo={id === 0 ? "Nueva Distribuidora" : "Editar Distribuidora"}
        id={id}
        distribuidor={distribuidor}
        updateItemTabla={updateItemTabla}
        addItemTabla={addItemTabla}
      />
    </div>
  );
};
