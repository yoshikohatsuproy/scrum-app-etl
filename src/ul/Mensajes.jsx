import Swal from "sweetalert2";

export const Mensaje = (titulo, mensaje, icono) => {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
  });
};
