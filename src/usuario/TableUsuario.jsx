import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { BadgeBlue, BadgeRed } from "../ul/Badge";

import "../styles/table.css";

export const TableUsuario = ({
  openModal,
  usuarios,
  modificarId,
  deleteItemTabla,
  openModal2,
}) => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChange = (id) => {
    modificarId(id);
    openModal2();
  };

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
      <h2> Listado de Usuarios</h2>
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
              <th scope="col">NOMBRE</th>
              <th scope="col">APELLIDO</th>
              <th scope="col">CORREO</th>
              <th scope="col">ROL</th>
              <th scope="col"> Estado </th>
              <th scope="col">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id_usuario}>
                <th scope="col"> {u.nom_usuario} </th>
                <th scope="col">{u.ape_usuario}</th>
                <th scope="col">{u.correo_usuario}</th>
                <th scope="col">{u.nom_tipo}</th>
                <th scope="col">
                  {u.activo === 1 ? <BadgeBlue /> : <BadgeRed />}
                </th>
                <th>
                  <div>
                    <button
                      className="button black"
                      onClick={() => {
                        navigate("/menu/usuario/" + u.id_usuario + "/reporte", {
                          replace: true,
                        });
                      }}
                    >
                      <i className="fas fa-file" />
                    </button>

                    <button
                      className="button prim"
                      onClick={() => handleRegister(u.id_usuario)}
                    >
                      <i className="fas fa-edit" />
                    </button>

                    <button
                      className="button success"
                      onClick={() => handleChange(u.id_usuario)}
                    >
                      <i className="fas fa-lock" />
                    </button>

                    <button
                      className="button danger"
                      onClick={() => handleDelete(u.id_usuario)}
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
