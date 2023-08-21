import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ContainerBi = () => {
  const navigate = useNavigate();
  const { id_reporte } = useParams();
  //d1c91c67-23ef-4177-b463-2e80273e9aed
  //d1c91c67-23ef-4177-b463-2e80273e9aed
  const ruta = `https://app.powerbi.com/reportEmbed?reportId=${id_reporte}&autoAuth=true&ctid=0e0cb060-09ad-49f5-a005-68b9b49aa1f6`;

  return (
    <div>
      <button
        className="floating-button"
        onClick={() => navigate("/menu", { replace: true })}
      >
        <i className="fas fa-arrow-left" />
      </button>

      <iframe
        className="alicorp-iframe"
        title="ReporteVentas"
        width="1140"
        src={ruta}
        //src="https://app.powerbi.com/reportEmbed?reportId=d1c91c67-23ef-4177-b463-2e80273e9aed&autoAuth=true&ctid=0e0cb060-09ad-49f5-a005-68b9b49aa1f6"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};
/*
<iframe
  title="ReporteVentas"
  width="1140"
  height="541.25"
  src="https://app.powerbi.com/reportEmbed?reportId=d1c91c67-23ef-4177-b463-2e80273e9aed&autoAuth=true&ctid=0e0cb060-09ad-49f5-a005-68b9b49aa1f6"
  frameborder="0"
  allowFullScreen="true"
></iframe>;
https://app.powerbi.com/reportEmbed?reportId=2a724f93-66f9-41e1-bce3-47919d5675ff&autoAuth=true&ctid=0e0cb060-09ad-49f5-a005-68b9b49aa1f6
*/
