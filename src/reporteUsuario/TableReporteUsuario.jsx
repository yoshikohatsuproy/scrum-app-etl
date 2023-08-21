import axios from "axios";

import { Mensaje } from "../ul/Mensajes";
import { BadgeVisible, BadgeInvisible } from "../ul/Badge";

import "../styles/table.css";

export const TableReporteUsuario = ({reportes, id, changeTable}) => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));

  const handleActive = (idr, idd) => {
    const payload = {
      id_distribuidor : idd,
      id_reporte : idr,
      id_usuario: id,
    }
   
    axios({
      method: "post",
      url: API_URL + "/usuarios/reportes/",
      headers: { "x-token": token },
      data: payload,
    })
      .then((res) => {
        handleChangeTable()
        Mensaje("Exito Usuario", 'Reporte actualizado', "success");
      
      })
      .catch((error) => {
        console.log(error)
        Mensaje("Error Usuario", error.response.data.msg, "error");
      });
  }

  const handleChangeTable = (idr) => {
    changeTable(idr)
  }

  return (
    <>
      <div className="contenedor-tablas">
        <h2> Listado de Reportes Por Usuarios</h2>
        <hr />
 
        <div className="table tabla-crud">
          <table className="table filaTabla">
            <thead className="table-dark">
              <tr>
                <th scope="col">REPORTE</th>
                <th scope="col">DISTRIBUIDOR</th>
                <th scope="col"> VISIBLE </th>
                <th scope="col">Acciones </th>
              </tr>
            </thead>
            <tbody>
            {reportes.map((r) => (
              <tr key={r.idr}>
                <th scope="col"> {r.nom_reporte} </th>
                <th scope="col">{r.nom_distribuidor}</th>
                <th scope="col">
                  {r.Visible === 1 ? <BadgeVisible /> : <BadgeInvisible />}
                </th>
                <th>
                  <div>
                    <button
                      className="button prim"
                      onClick={() => handleActive(r.idr, r.idd)}
                    >
                      <i className="fas fa-eye" />
                    </button>
                  
                  </div>
                </th>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
