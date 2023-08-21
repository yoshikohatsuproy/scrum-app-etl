import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { BadgeBlue, BadgeRed } from "../ul/Badge";

import "../styles/table.css";

export const TableDistribuidor = ({
  openModal,
  distribuidores,
  modificarId,
  deleteItemTabla,
}) => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleRegister = (id) => {
    modificarId(id);
    openModal();
  };

  const handleDelete = (id) => {
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
          url: `${API_URL}/distribuidor/delete/${id}`,
          headers: { "x-token": token },
          data: {},
        })
          .then((res) => {
            Swal.fire(
              "Distribuidor Eliminado",
              "Distribuidor eliminado correctamente",
              "success"
            );

            const { data } = res.data;
            deleteItemTabla(id, data);
          })
          .catch((error) => {
            Swal.fire("Error Distribuidor", error.response.data.msg, "error");
          });
      }
    });
  };

  return (
    <div className="contenedor-tablas">
      <h2> Listado de Distribuidoras</h2>
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
              <th scope="col">Distribuidor</th>
              <th scope="col">URL</th>
              <th scope="col">Usuario</th>
              <th scope="col">Password</th>
              <th scope="col"> Estado </th>
              <th scope="col">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {distribuidores.map((d) => (
              <tr key={d.id_distribuidor}>
                <th scope="col"> {d.nom_distribuidor} </th>
                <th scope="col">{d.url_distribuidor}</th>
                <th scope="col">{d.usu_distribuidor}</th>
                <th scope="col">{d.pass_distribuidor}</th>
                <th scope="col">
                  {d.activo === 1 ? <BadgeBlue /> : <BadgeRed />}
                </th>
                <th>
                  <div>
                    <button
                      className="button success"
                      onClick={() => {
                        navigate(
                          "/menu/distribuidor/" +
                            d.id_distribuidor +
                            "/reporte",
                          {
                            replace: true,
                          }
                        );
                      }}
                    >
                      <i className="fas fa-file" />
                    </button>
                    <button
                      className="button prim"
                      onClick={() => handleRegister(d.id_distribuidor)}
                    >
                      <i className="fas fa-edit" />
                    </button>
                    <button
                      className="button danger"
                      onClick={() => handleDelete(d.id_distribuidor)}
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
