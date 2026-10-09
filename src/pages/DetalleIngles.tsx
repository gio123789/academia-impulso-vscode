import DetalleAsesoria from "../components/DetalleAsesoria";

export default function DetalleIngles() {
  return (
    <DetalleAsesoria
      icon="A"
      iconBg="bg-[#D8EF65]/60 text-[#182329]"
      nombre="Inglés"
      temas={["Gramática", "Lectura", "Conversación"]}
      nivel="Secundaria y bachillerato"
      modalidad="En línea"
      duracion="60 minutos"
      horario="Martes y jueves, 17:00–18:00"
      precio="$160 MXN"
      precioNum="$160"
      descripcion="Desarrolla habilidades de comprensión y expresión en inglés. Trabajamos gramática, comprensión lectora y conversación para que el estudiante gane fluidez y confianza en el idioma."
    />
  );
}
