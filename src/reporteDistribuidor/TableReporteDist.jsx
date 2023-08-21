import axios from "axios";
import Swal from "sweetalert2";

import { BadgeBlue, BadgeRed } from "../ul/Badge";

import "../styles/table.css";

export const TableReporteDist = ({
  openModal,
  reportes,
  modificarId,
  deleteItemTabla,
}) => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));
  
  const handleRegister = (idr) => {
    modificarId(idr);
    openModal();
  };

  const handleDelete = (idr) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro que desea eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "put",
          url: `${API_URL}/reportesbydist/delete/${idr}`,
          headers: { "x-token": token },
          data: {},
        })
          .then((res) => {
            Swal.fire(
              "Reporte Eliminado",
              "Reporte eliminado correctamente",
              "success"
            );

            const { data } = res.data;
            deleteItemTabla(idr, data);
          })
          .catch((error) => {
            Swal.fire("Error Distribuidor", error.response.data.msg, "error");
          });
      }
    });
  };

  return (
    <div className="contenedor-tablas">
      <h2> Listado de Reportes</h2>
      <hr />
      <div className="fila">
        <div className="col">
          <button className="buttonfila" onClick={() => handleRegister(0)}>
            <i className="fas fa-plus" />
            Registrar
          </button>

          <button className="buttonfila">
            <i className="fas fa-file-upload"></i>
            Importar
          </button>
          <button className="buttonfila">
            <i className="fas fa-file-download"></i>
            Exportar
          </button>
        </div>
      </div>
      <div className="table tabla-crud">
        <table className="table filaTabla">
          <thead className="table-dark">
            <tr>
              <th scope="col">REPORTE</th>
              <th scope="col">URL</th>
              <th scope="col"> Estado </th>
              <th scope="col">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r) => (
              <tr key={r.id_reporte}>
                <th scope="col"> {r.nom_reporte} </th>
                <th scope="col">{r.url_reporte}</th>
                <th scope="col">
                  {r.activo === 1 ? <BadgeBlue /> : <BadgeRed />}
                </th>
                <th>
                  <div>
                    <button
                      className="button prim"
                      onClick={() => handleRegister(r.id_reporte)}
                    >
                      <i className="fas fa-edit" />
                    </button>
                    <button
                      className="button danger"
                      onClick={() => handleDelete(r.id_reporte)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
