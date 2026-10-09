import { useNavigate } from "react-router-dom";

const pasos = [
  {
    num: "01",
    titulo: "Identifica",
    desc: "El estudiante explica qué tema necesita reforzar. El asesor escucha con atención para entender el punto de partida y definir el camino.",
    color: "bg-[#163DCE] text-white",
    linea: "border-[#163DCE]",
  },
  {
    num: "02",
    titulo: "Comprende",
    desc: "El asesor explica el tema con claridad y resuelve ejemplos guiados paso a paso, adaptando el ritmo al estudiante.",
    color: "bg-[#182329] text-white",
    linea: "border-[#182329]",
  },
  {
    num: "03",
    titulo: "Practica",
    desc: "El estudiante aplica lo aprendido con ejercicios propios. El asesor revisa, corrige y aclara las dudas que surjan.",
    color: "bg-[#D8EF65] text-[#182329]",
    linea: "border-[#D8EF65]",
  },
];

export default function Metodologia() {
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F7F8FA] border-b border-[#E2E5EA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#163DCE]/10 text-[#163DCE] text-sm font-semibold">
            Metodología
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#182329] mb-4 max-w-2xl">
            Aprender con una ruta clara
          </h1>
          <p className="text-lg text-[#6B7280] max-w-xl leading-relaxed">
            Cada sesión sigue tres pasos que le dan estructura al aprendizaje: identificar el problema, comprender la solución y practicar con acompañamiento.
          </p>
        </div>
      </section>

      {/* Pasos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 mb-16">
          {pasos.map((p, i) => (
            <div key={p.num} className="relative">
              {i < pasos.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-px border-t-2 border-dashed border-[#E2E5EA] z-0" />
              )}
              <div className="relative z-10 bg-white rounded-2xl border border-[#E2E5EA] p-8 h-full hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-xl mb-6 ${p.color}`}>
                  {p.num}
                </div>
                <h2 className="text-xl font-bold text-[#182329] mb-3">{p.titulo}</h2>
                <p className="text-[#6B7280] leading-relaxed text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-4 mb-12">
          {pasos.map((p) => (
            <div key={p.num} className="flex gap-4 bg-white rounded-2xl border border-[#E2E5EA] p-5">
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center font-extrabold text-base ${p.color}`}>
                {p.num}
              </div>
              <div>
                <h2 className="font-bold text-[#182329] text-lg mb-1">{p.titulo}</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Beneficios */}
        <div className="bg-[#182329] rounded-2xl text-white p-8 md:p-10 mb-10">
          <h2 className="text-xl font-bold mb-6">¿Por qué funciona este enfoque?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Personalizado", desc: "Cada sesión parte del punto exacto donde el estudiante tiene dificultad." },
              { title: "Con ejemplos reales", desc: "Los conceptos se explican con situaciones concretas, no definiciones abstractas." },
              { title: "Con práctica inmediata", desc: "El estudiante aplica lo aprendido en la misma sesión, con retroalimentación directa." },
            ].map((b) => (
              <div key={b.title}>
                <div className="w-2 h-2 rounded-full bg-[#D8EF65] mb-3" />
                <p className="font-semibold mb-1">{b.title}</p>
                <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/asesorias")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#163DCE] text-white font-semibold hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE]"
          >
            Consultar asesorías →
          </button>
        </div>
      </section>
    </main>
  );
}
