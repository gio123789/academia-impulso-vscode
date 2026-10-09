import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const materias = [
  {
    icon: "∑",
    nombre: "Matemáticas",
    desc: "Álgebra, ecuaciones y geometría con ejemplos guiados.",
    color: "bg-[#163DCE]/10 text-[#163DCE]",
    to: "/asesorias/matematicas",
  },
  {
    icon: "A",
    nombre: "Inglés",
    desc: "Gramática, lectura y conversación para comunicarse con confianza.",
    color: "bg-[#D8EF65]/60 text-[#182329]",
    to: "/asesorias/ingles",
  },
  {
    icon: "⚡",
    nombre: "Física",
    desc: "Movimiento, fuerzas y energía explicados con claridad.",
    color: "bg-[#163DCE]/10 text-[#163DCE]",
    to: "/asesorias/fisica",
  },
];

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F7F8FA] border-b border-[#E2E5EA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#163DCE]/10 text-[#163DCE] text-sm font-semibold">
              Secundaria · Bachillerato
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#182329] leading-tight mb-5">
              Tu siguiente<br />
              <span className="text-[#163DCE]">"ya entendí"</span><br />
              empieza aquí.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8 max-w-md">
              Academia Impulso ofrece asesorías personalizadas de Matemáticas, Inglés y Física. Horarios flexibles, precios claros y metodología probada.
            </p>
            <button
              onClick={() => navigate("/asesorias")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#163DCE] text-white font-semibold text-base hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#163DCE]"
            >
              Encuentra tu asesoría
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Visual card */}
          <div className="hidden md:block">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E2E5EA] shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#163DCE] flex items-center justify-center text-white font-bold">I</div>
                <div>
                  <p className="font-semibold text-[#182329] text-sm">Academia Impulso</p>
                  <p className="text-xs text-[#6B7280]">Asesorías escolares en línea</p>
                </div>
              </div>
              <div className="space-y-3">
                {materias.map((m) => (
                  <Link key={m.nombre} to={m.to} className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F8FA] border border-[#E2E5EA] hover:border-[#163DCE]/40 hover:bg-[#163DCE]/5 transition-all group">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${m.color}`}>
                      {m.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-[#182329] text-sm">{m.nombre}</p>
                      <p className="text-xs text-[#6B7280]">En línea · 60 min</p>
                    </div>
                    <span className="ml-auto text-[#163DCE] text-xs font-semibold group-hover:translate-x-0.5 transition-transform">Ver →</span>
                  </Link>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-lg bg-[#D8EF65]/40 border border-[#D8EF65]">
                <p className="text-sm font-semibold text-[#182329]">¿Tienes dudas sobre qué materia elegir?</p>
                <p className="text-xs text-[#182329]/60 mt-0.5">Escríbenos y te ayudamos a encontrar la asesoría adecuada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materias */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#182329] mb-2">Materias disponibles</h2>
          <p className="text-[#6B7280]">Elige la asesoría que mejor se adapta a tus necesidades.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {materias.map((m) => (
            <Link
              key={m.nombre}
              to={m.to}
              className="group block bg-white rounded-2xl border border-[#E2E5EA] p-6 hover:border-[#163DCE]/40 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#163DCE]"
            >
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold mb-4 ${m.color}`}>
                {m.icon}
              </span>
              <h3 className="font-bold text-[#182329] text-lg mb-1">{m.nombre}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{m.desc}</p>
              <span className="text-sm font-semibold text-[#163DCE] group-hover:underline">Ver asesoría →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Por qué Impulso */}
      <section className="bg-[#182329] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-8">
          {[
            { n: "3", label: "Materias", sub: "Matemáticas, Inglés y Física" },
            { n: "60 min", label: "Por sesión", sub: "En línea, desde cualquier lugar" },
            { n: "Sec. y Bach.", label: "Niveles", sub: "Secundaria y bachillerato" },
          ].map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="text-3xl font-extrabold text-[#D8EF65] mb-1">{s.n}</p>
              <p className="font-semibold text-white text-lg">{s.label}</p>
              <p className="text-sm text-white/50 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#182329] mb-4">¿Listo para dar el siguiente paso?</h2>
        <p className="text-[#6B7280] mb-8 max-w-md mx-auto">Consulta horarios, precios y encuentra la asesoría que necesitas en tres pasos.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/asesorias")}
            className="px-6 py-3.5 rounded-xl bg-[#163DCE] text-white font-semibold hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE]"
          >
            Ver asesorías
          </button>
          <button
            onClick={() => navigate("/contacto")}
            className="px-6 py-3.5 rounded-xl border-2 border-[#163DCE] text-[#163DCE] font-semibold hover:bg-[#163DCE]/5 transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE]"
          >
            Contactar
          </button>
        </div>
      </section>
    </main>
  );
}
