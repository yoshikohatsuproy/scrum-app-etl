import axios from "axios";

import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Mensaje } from "../../ul/Mensajes";
import { TableRepUser } from "../TableRepUser";

export const ReporteByDistPage = () => {
  const API_URL = "http://localhost:5000/api";
  const { id, token } = JSON.parse(localStorage.getItem("user"));


  const {idd} = useParams()

  const [reportes, setReportes] = useState([]);

  const listarReportes = () => {
    axios({
      method: "get",
      url: API_URL + "/usuario/distribuidora/reporte/" + id + "/" + idd,
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
        console.log(data)
        setReportes(data);
      })
      .catch((error) => {
        console.log(error);
        Mensaje("Error Login", error.response.data.msg, "error");
      });
  };

  useEffect(() => {
    listarReportes();
  }, []);

  return (
    <>
      <TableRepUser reportes={reportes} />
    </>
  );
};
