import DetalleAsesoria from "../components/DetalleAsesoria";

export default function DetalleFisica() {
  return (
    <DetalleAsesoria
      icon="⚡"
      iconBg="bg-[#163DCE]/10 text-[#163DCE]"
      nombre="Física"
      temas={["Movimiento", "Fuerzas", "Energía"]}
      nivel="Secundaria y bachillerato"
      modalidad="En línea"
      duracion="60 minutos"
      horario="Sábados, 10:00–11:00"
      precio="$190 MXN"
      precioNum="$190"
      descripcion="Entiende cómo funciona el mundo desde la física. Analizamos movimiento, fuerzas y energía con situaciones reales y ejemplos concretos para que los conceptos tengan sentido más allá del examen."
    />
  );
}
