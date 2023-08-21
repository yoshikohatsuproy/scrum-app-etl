import axios from "axios";

import { useEffect , useState} from "react";
import { TableDistUser } from "../TableDistUser";

import { Mensaje } from "../../ul/Mensajes";

export const ReportePage = () => {
  const API_URL = "http://localhost:5000/api";
  const { id, token } = JSON.parse(localStorage.getItem("user"));


  const  [distribuidores, setDistribuidores] = useState([]);
  
  const listarDist = () => {
    axios({
      method: "get",
      url: API_URL + "/usuario/distribuidora/" + id,
      headers: { "x-token": token },
    })
      .then((res) => {
        const data = res.data.data;
 
        setDistribuidores(data);
      })
      .catch((error) => {
        console.log(error)
        Mensaje("Error Login", error.response.data.msg, "error");
      });
  };

  useEffect(() => {
    listarDist();
  }, []);


  return (
    <>
      <TableDistUser
        distribuidores={distribuidores}
      />
    </>
  );
};



/*

      <iframe
        className="alicorp-iframe"
        title="ReporteVentas"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=d1c91c67-23ef-4177-b463-2e80273e9aed&autoAuth=true&ctid=0e0cb060-09ad-49f5-a005-68b9b49aa1f6"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>

*/