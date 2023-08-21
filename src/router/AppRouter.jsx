import { Route, Routes } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { ErpRouter } from "./ErpRouter";

import "../styles/styles.css";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { BiRouter } from "./BiRouter";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/menu/*"
          element={
            <PrivateRoute>
              <ErpRouter />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/bi/:id_reporte"
          element={
            <PrivateRoute>
              <BiRouter />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthRouter />
            </PublicRoute>
          }
        />


      </Routes>
    </>
  );
};
