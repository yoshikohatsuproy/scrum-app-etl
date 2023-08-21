import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TableReporteDist } from "../TableReporteDist";

import { Mensaje } from "../../ul/Mensajes";
import { ModalReporteDist } from "../ModalReporteDist";

export const ReporteDistPage = () => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));

  let { id } = useParams();

  const initData = {
    nom_reporte: "",
    url_reporte: "",
  };

  // Modal reporte
  const [reporte, setReporte] = useState(initData);
  const [isOpen, setIsOpen] = useState(false);
  const [idr, setIdr] = useState(0);
  const [reportes, setReportes] = useState([]);

  const listarRep = () => {
    axios({
      method: "get",
      url: API_URL + "/reportesbydist/" + id,
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
        console.log(data)
        console.log(typeof data)
        setReportes(data);
        console.log(reportes)
      })
      .catch((error) => {
        Mensaje("Error Login", error.response.data.msg, "error");
      });
  };



  const getReporte = () => {
    if (idr !== 0) {
      axios({
        method: "get",
        url: API_URL + "/reportesbydistbyId/" + idr,
        headers: { "x-token": token },
      })
        .then((res) => {
          const { data } = res.data;
    
          const payload = {
            nom_reporte: data[0].nom_reporte,
            url_reporte: data[0].url_reporte,
          };
          setReporte(payload);
        })
        .catch((error) => {
          Mensaje("Error Reporte", error.response.data.msg, "error");
        });
    } else {
      setReporte(initData);
    }
  };


  useEffect(() => {
    listarRep();
  }, []);


  useEffect(() => {
    getReporte();
  }, [idr]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modificarId = (idr) => {
    setIdr(idr);
  };

  const updateItemTabla = (idr, dato) => {
    let nreportes = reportes.map((elem) =>
      elem.id_reporte === idr ? dato[0] : elem
    );
    setReportes(nreportes);
    setIdr(0)
  };

  const addItemTabla = (dato) => {
    let nreportes = [...reportes, dato];
    setReportes(nreportes);
    setIdr(0)
  };

  const deleteItemTabla = (idr, dato) => {
    let nreportes = reportes.map((elem) =>
      elem.id_reporte === idr ? dato[0] : elem
    );
    setReportes(nreportes);
    setIdr(0)
  };

  return (
    <div>
      <TableReporteDist
        openModal={openModal}
        reportes={reportes}
        modificarId={modificarId}
        deleteItemTabla={deleteItemTabla}
      />

      <ModalReporteDist
        isOpen={isOpen}
        closeModal={closeModal}
        titulo={idr === 0 ? "Nuevo Reporte" : "Editar Reporte"}
        idr={idr}
        id = {id}
        reporte={reporte}
        updateItemTabla={updateItemTabla}
        addItemTabla={addItemTabla}
      />
    </div>
  );
};
