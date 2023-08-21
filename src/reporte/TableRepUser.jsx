import { useNavigate } from "react-router-dom";

export const TableRepUser = ({ reportes }) => {
  const navigate = useNavigate();
  return (
    <div className="contenedor-tablas">
      <h2> Listado de Reportes</h2>
      <hr />

      <div className="table tabla-crud">
        <table className="table filaTabla">
          <thead className="table-dark">
            <tr>
              <th scope="col">REPORTES</th>
              <th scope="col">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r) => (
              <tr key={r.id_reporte}>
                <th scope="col"> {r.nom_reporte} </th>
                <th>
                  <div>
                    <button
                      className="button success"
                      onClick={() => {
                        navigate("/bi/" + r.url_reporte, {
                          replace: true,
                        });
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
