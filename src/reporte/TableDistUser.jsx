import { useNavigate } from "react-router-dom";

export const TableDistUser = ({ distribuidores }) => {
  const API_URL = "http://localhost:5000/api";
  const { token } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="contenedor-tablas">
      <h2> Listado de Distribuidoras</h2>
      <hr />

      <div className="table tabla-crud">
        <table className="table filaTabla">
          <thead className="table-dark">
            <tr>
              <th scope="col">DISTRIBUIDORAS</th>
              <th scope="col">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {distribuidores.map((r) => (
              <tr key={r.id_distribuidor}>
                <th scope="col"> {r.nom_distribuidor} </th>
                <th>
                  <div>
                    <button
                      className="button success"
                      onClick={() => {
                        navigate(
                          "/menu/" +
                            r.id_distribuidor +
                            "/reporte",
                          {
                            replace: true,
                          }
                        );
                      }}
                    >
                      <i className="fas fa-file" />
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
