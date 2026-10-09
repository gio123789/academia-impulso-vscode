import { Link } from "react-router-dom";

const asesorias = [
  {
    nombre: "Matemáticas",
    icon: "∑",
    iconBg: "bg-[#163DCE]/10 text-[#163DCE]",
    dias: "Lunes y miércoles",
    hora: "16:00–17:00",
    duracion: "60 min",
    modalidad: "En línea",
    precio: "$180 MXN",
    to: "/asesorias/matematicas",
  },
  {
    nombre: "Inglés",
    icon: "A",
    iconBg: "bg-[#D8EF65]/60 text-[#182329]",
    dias: "Martes y jueves",
    hora: "17:00–18:00",
    duracion: "60 min",
    modalidad: "En línea",
    precio: "$160 MXN",
    to: "/asesorias/ingles",
  },
  {
    nombre: "Física",
    icon: "⚡",
    iconBg: "bg-[#163DCE]/10 text-[#163DCE]",
    dias: "Sábados",
    hora: "10:00–11:00",
    duracion: "60 min",
    modalidad: "En línea",
    precio: "$190 MXN",
    to: "/asesorias/fisica",
  },
];

export default function HorarioPrecios() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#163DCE]/10 text-[#163DCE] text-sm font-semibold">
          Horarios y precios
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#182329] mb-3">
          Encuentra el horario que te funciona
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Todas las asesorías se imparten en línea. Los precios son por sesión individual.
        </p>
      </div>

      {/* Tabla — solo desktop */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#E2E5EA] overflow-hidden mb-8">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-[#F7F8FA] border-b border-[#E2E5EA]">
              <th scope="col" className="text-left px-6 py-4 font-semibold text-[#182329]">Materia</th>
              <th scope="col" className="text-left px-6 py-4 font-semibold text-[#182329]">Días</th>
              <th scope="col" className="text-left px-6 py-4 font-semibold text-[#182329]">Horario</th>
              <th scope="col" className="text-left px-6 py-4 font-semibold text-[#182329]">Duración</th>
              <th scope="col" className="text-left px-6 py-4 font-semibold text-[#182329]">Modalidad</th>
              <th scope="col" className="text-left px-6 py-4 font-semibold text-[#182329]">Precio / sesión</th>
              <th scope="col" className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E5EA]">
            {asesorias.map((a) => (
              <tr key={a.nombre} className="hover:bg-[#F7F8FA] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm ${a.iconBg}`}>
                      {a.icon}
                    </span>
                    <span className="font-semibold text-[#182329]">{a.nombre}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#182329]">{a.dias}</td>
                <td className="px-6 py-4 font-medium text-[#182329]">{a.hora}</td>
                <td className="px-6 py-4 text-[#6B7280]">{a.duracion}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#163DCE]/10 text-[#163DCE]">
                    {a.modalidad}
                  </span>
                </td>
                <td className="px-6 py-4 font-extrabold text-[#163DCE] text-base">{a.precio}</td>
                <td className="px-6 py-4">
                  <Link
                    to={a.to}
                    className="text-sm font-semibold text-[#163DCE] hover:underline whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#163DCE]"
                  >
                    Ver detalle →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas — solo móvil */}
      <div className="md:hidden space-y-4 mb-8">
        {asesorias.map((a) => (
          <article key={a.nombre} className="bg-white rounded-2xl border border-[#E2E5EA] p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold ${a.iconBg}`}>
                {a.icon}
              </span>
              <div>
                <p className="font-bold text-[#182329]">{a.nombre}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#163DCE]/10 text-[#163DCE] font-semibold">{a.modalidad}</span>
              </div>
              <span className="ml-auto font-extrabold text-[#163DCE] text-lg">{a.precio}</span>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[#6B7280] text-xs mb-0.5">Días</dt>
                <dd className="font-medium text-[#182329]">{a.dias}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] text-xs mb-0.5">Horario</dt>
                <dd className="font-medium text-[#182329]">{a.hora}</dd>
              </div>
              <div>
                <dt className="text-[#6B7280] text-xs mb-0.5">Duración</dt>
                <dd className="font-medium text-[#182329]">{a.duracion}</dd>
              </div>
            </dl>
            <Link
              to={a.to}
              className="block mt-4 w-full text-center py-3 rounded-xl bg-[#163DCE] text-white font-semibold text-sm hover:bg-[#1233aa] transition-colors"
            >
              Ver asesoría →
            </Link>
          </article>
        ))}
      </div>

      {/* Nota */}
      <div className="p-5 rounded-xl bg-[#D8EF65]/30 border border-[#D8EF65]">
        <p className="text-sm font-semibold text-[#182329] mb-1">¿Necesitas otro horario?</p>
        <p className="text-sm text-[#182329]/70">
          Contáctanos desde la sección de{" "}
          <Link to="/contacto" className="text-[#163DCE] underline underline-offset-2">Contacto</Link>{" "}
          para consultar disponibilidad.
        </p>
      </div>
    </main>
  );
}
