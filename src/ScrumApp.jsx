import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthProvider";
import { AppRouter } from "./router";

export const ScrumApp = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};
