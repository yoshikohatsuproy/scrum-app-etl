import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ContainerBi } from "../bi/ContainerBi";
import { DistribuidorPage } from "../distribuidor/pages/DistribuidorPage";
import { ReporteByDistPage } from "../reporte/pages/ReporteByDistPage";
import { ReportePage } from "../reporte/pages/ReportePage";
import { ReporteDistPage } from "../reporteDistribuidor/pages/ReporteDistPage";
import { ReporteUsuarioPage } from "../reporteUsuario/pages/ReporteUsuarioPage";
import { Navbar, Sidebar } from "../ul";
import { UsuarioPage } from "../usuario/page/UsuarioPage";

export const ErpRouter = () => {
  const [active, setActive] = useState(false);

  const handleMenu = () => {
    setActive(!active);
  };

  return (
    <>
    
      <Sidebar active={active} />
      <main className={active ? "main active" : "main"}>
        <Navbar handleMenu={handleMenu} />
        <Routes>
          <Route exact path="/" element={<ReportePage />} />
          <Route exact path="/:idd/reporte" element={<ReporteByDistPage />} />

          

          <Route exact path="/distribuidor" element={<DistribuidorPage />} />
          <Route
            exact
            path="/distribuidor/:id/reporte"
            element={<ReporteDistPage />}
          />
          <Route exact path="/usuario" element={<UsuarioPage />} />
          <Route
            exact
            path="/usuario/:id/reporte"
            element={<ReporteUsuarioPage />}
          />
          <Route path="*" element={<ReportePage />} />
        </Routes>
      </main>
    </>
  );
};
