import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Mensaje } from "../../ul/Mensajes";
import { TableReporteUsuario } from "../TableReporteUsuario";

export const ReporteUsuarioPage = () => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));
  let { id } = useParams();

  const [reportes, setReportes] = useState([]);
 

  const listarReportes = () => {
    axios({
      method: "get",
      url: API_URL + "/usuarios/reportes/" + id,
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
 
        setReportes(data);
      })
      .catch((error) => {
        Mensaje("Error Login", error.response.data.msg, "error");
      });
  };

  useEffect(() => {
    listarReportes();
  }, []);

  const changeTable = () => {
    listarReportes();
  };

  return (
    <>
      <TableReporteUsuario
        reportes={reportes}
        id={id}
        changeTable={changeTable}
      />
    </>
  );
};
