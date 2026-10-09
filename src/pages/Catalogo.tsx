import { Link } from "react-router-dom";

const asesorias = [
  {
    to: "/asesorias/matematicas",
    icon: "∑",
    iconBg: "bg-[#163DCE]/10 text-[#163DCE]",
    nombre: "Matemáticas",
    temas: ["Álgebra", "Ecuaciones", "Geometría"],
    nivel: "Secundaria y bachillerato",
    duracion: "60 minutos",
    precio: "$180 MXN / sesión",
    horario: "Lun y Mié, 16:00–17:00",
    modalidad: "En línea",
    badge: "bg-[#163DCE]/10 text-[#163DCE]",
  },
  {
    to: "/asesorias/ingles",
    icon: "A",
    iconBg: "bg-[#D8EF65]/60 text-[#182329]",
    nombre: "Inglés",
    temas: ["Gramática", "Lectura", "Conversación"],
    nivel: "Secundaria y bachillerato",
    duracion: "60 minutos",
    precio: "$160 MXN / sesión",
    horario: "Mar y Jue, 17:00–18:00",
    modalidad: "En línea",
    badge: "bg-[#D8EF65]/60 text-[#182329]",
  },
  {
    to: "/asesorias/fisica",
    icon: "⚡",
    iconBg: "bg-[#163DCE]/10 text-[#163DCE]",
    nombre: "Física",
    temas: ["Movimiento", "Fuerzas", "Energía"],
    nivel: "Secundaria y bachillerato",
    duracion: "60 minutos",
    precio: "$190 MXN / sesión",
    horario: "Sábados, 10:00–11:00",
    modalidad: "En línea",
    badge: "bg-[#163DCE]/10 text-[#163DCE]",
  },
];

export default function Catalogo() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#163DCE]/10 text-[#163DCE] text-sm font-semibold">
          Catálogo de asesorías
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#182329] mb-3">
          Elige tu asesoría
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Tres materias disponibles. Consulta temas, horarios y precios antes de solicitar información.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {asesorias.map((a) => (
          <article
            key={a.nombre}
            className="bg-white rounded-2xl border border-[#E2E5EA] overflow-hidden flex flex-col hover:shadow-md hover:border-[#163DCE]/30 transition-all"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold ${a.iconBg}`}>
                  {a.icon}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.badge}`}>
                  {a.modalidad}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#182329] mb-1">{a.nombre}</h2>
              <p className="text-sm text-[#6B7280] mb-4">{a.nivel}</p>

              {/* Temas */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#182329]/50 uppercase tracking-wider mb-2">Temas</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.temas.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[#F7F8FA] border border-[#E2E5EA] text-[#182329]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#6B7280] w-20 shrink-0">Horario</span>
                  <span className="font-medium text-[#182329]">{a.horario}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B7280] w-20 shrink-0">Duración</span>
                  <span className="font-medium text-[#182329]">{a.duracion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B7280] w-20 shrink-0">Precio</span>
                  <span className="font-bold text-[#163DCE]">{a.precio}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <Link
                to={a.to}
                className="block w-full text-center px-4 py-3 rounded-xl bg-[#163DCE] text-white font-semibold text-sm hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE]"
              >
                Ver asesoría →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Nota */}
      <div className="mt-10 p-5 rounded-xl bg-[#D8EF65]/30 border border-[#D8EF65]">
        <p className="text-sm font-semibold text-[#182329] mb-1">¿No encuentras lo que buscas?</p>
        <p className="text-sm text-[#182329]/70">
          Escríbenos en la sección de{" "}
          <Link to="/contacto" className="text-[#163DCE] underline underline-offset-2 hover:text-[#1233aa]">
            Contacto
          </Link>{" "}
          y te orientamos sobre la materia y el nivel que necesitas.
        </p>
      </div>
    </main>
  );
}
