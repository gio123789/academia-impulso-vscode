import DetalleAsesoria from "../components/DetalleAsesoria";

export default function DetalleMatematicas() {
  return (
    <DetalleAsesoria
      icon="∑"
      iconBg="bg-[#163DCE]/10 text-[#163DCE]"
      nombre="Matemáticas"
      temas={["Álgebra", "Ecuaciones", "Geometría"]}
      nivel="Secundaria y bachillerato"
      modalidad="En línea"
      duracion="60 minutos"
      horario="Lunes y miércoles, 16:00–17:00"
      precio="$180 MXN"
      precioNum="$180"
      descripcion="Refuerza los fundamentos que hacen más fácil todo lo demás. Trabajamos álgebra, ecuaciones y geometría con ejemplos guiados y práctica directa, para que el estudiante avance con seguridad."
    />
  );
}
