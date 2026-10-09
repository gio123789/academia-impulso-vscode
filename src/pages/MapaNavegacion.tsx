import { Link } from "react-router-dom";

const recorrido = [
  { paso: "1", label: "Inicio", to: "/" },
  { paso: "2", label: "Asesorías", to: "/asesorias" },
  { paso: "3", label: "Detalle de materia", to: "/asesorias/matematicas" },
  { paso: "3", label: "Contacto", to: "/contacto" },
];

const secciones = [
  {
    id: "inicio",
    label: "Inicio",
    to: "/",
    color: "bg-[#163DCE] text-white",
    hijos: [
      { label: "Asesorías", to: "/asesorias", via: "Botón hero + menú" },
      { label: "Contacto", to: "/contacto", via: "Botón secundario" },
    ],
  },
  {
    id: "asesorias",
    label: "Asesorías",
    to: "/asesorias",
    color: "bg-[#1a4ae8] text-white",
    hijos: [
      { label: "Detalle Matemáticas", to: "/asesorias/matematicas", via: "Tarjeta" },
      { label: "Detalle Inglés", to: "/asesorias/ingles", via: "Tarjeta" },
      { label: "Detalle Física", to: "/asesorias/fisica", via: "Tarjeta" },
    ],
  },
  {
    id: "matematicas",
    label: "Detalle Matemáticas",
    to: "/asesorias/matematicas",
    color: "bg-[#163DCE]/80 text-white",
    hijos: [
      { label: "Contacto", to: "/contacto", via: "Solicitar información" },
      { label: "Asesorías", to: "/asesorias", via: "← Catálogo" },
    ],
  },
  {
    id: "ingles",
    label: "Detalle Inglés",
    to: "/asesorias/ingles",
    color: "bg-[#163DCE]/80 text-white",
    hijos: [
      { label: "Contacto", to: "/contacto", via: "Solicitar información" },
      { label: "Asesorías", to: "/asesorias", via: "← Catálogo" },
    ],
  },
  {
    id: "fisica",
    label: "Detalle Física",
    to: "/asesorias/fisica",
    color: "bg-[#163DCE]/80 text-white",
    hijos: [
      { label: "Contacto", to: "/contacto", via: "Solicitar información" },
      { label: "Asesorías", to: "/asesorias", via: "← Catálogo" },
    ],
  },
  {
    id: "horarios",
    label: "Horarios y precios",
    to: "/horarios-precios",
    color: "bg-[#182329] text-white",
    hijos: [
      { label: "Detalle Matemáticas", to: "/asesorias/matematicas", via: "Ver detalle" },
      { label: "Detalle Inglés", to: "/asesorias/ingles", via: "Ver detalle" },
      { label: "Detalle Física", to: "/asesorias/fisica", via: "Ver detalle" },
    ],
  },
  {
    id: "metodologia",
    label: "Metodología",
    to: "/metodologia",
    color: "bg-[#182329] text-white",
    hijos: [
      { label: "Asesorías", to: "/asesorias", via: "Consultar asesorías" },
    ],
  },
  {
    id: "contacto",
    label: "Contacto",
    to: "/contacto",
    color: "bg-[#D8EF65] text-[#182329]",
    hijos: [
      { label: "Asesorías", to: "/asesorias", via: "Ver catálogo" },
      { label: "Horarios y precios", to: "/horarios-precios", via: "Consultar horarios" },
      { label: "Metodología", to: "/metodologia", via: "Conocer metodología" },
    ],
  },
];

const global = [
  { label: "Inicio", to: "/" },
  { label: "Asesorías", to: "/asesorias" },
  { label: "Horarios y precios", to: "/horarios-precios" },
  { label: "Metodología", to: "/metodologia" },
  { label: "Contacto", to: "/contacto" },
];

export default function MapaNavegacion() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#163DCE]/10 text-[#163DCE] text-sm font-semibold">
          Mapa de navegación
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#182329] mb-3">
          Academia Impulso
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Estructura completa de las 8 pantallas y sus conexiones de navegación.
        </p>
      </div>

      {/* Recorrido principal */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-[#182329] mb-4">Recorrido principal del usuario</h2>
        <p className="text-sm text-[#6B7280] mb-5">
          El usuario llega al contacto en un máximo de 3 pasos.
        </p>
        <div className="flex flex-wrap items-center gap-0">
          {recorrido.map((r, i) => (
            <div key={i} className="flex items-center">
              <Link
                to={r.to}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E2E5EA] hover:border-[#163DCE]/40 hover:shadow-sm transition-all group"
              >
                <span className="w-6 h-6 rounded-full bg-[#163DCE] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {r.paso}
                </span>
                <span className="font-semibold text-[#182329] text-sm group-hover:text-[#163DCE] transition-colors whitespace-nowrap">
                  {r.label}
                </span>
              </Link>
              {i < recorrido.length - 1 && (
                <span className="mx-1 text-[#163DCE] font-bold text-lg">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Navbar global */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-[#182329] mb-2">Acceso global — Menú de navegación</h2>
        <p className="text-sm text-[#6B7280] mb-4">Disponible desde todas las pantallas a través del navbar y el footer.</p>
        <div className="flex flex-wrap gap-2">
          {global.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              className="px-4 py-2 rounded-lg bg-[#182329] text-white text-sm font-medium hover:bg-[#163DCE] transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Mapa completo */}
      <section>
        <h2 className="text-lg font-bold text-[#182329] mb-6">Mapa completo por pantalla</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {secciones.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-[#E2E5EA] overflow-hidden">
              {/* Header de la pantalla */}
              <Link
                to={s.to}
                className={`flex items-center justify-between px-5 py-4 ${s.color} hover:opacity-90 transition-opacity`}
              >
                <span className="font-bold text-base">{s.label}</span>
                <span className="text-sm opacity-70 font-mono">{s.to}</span>
              </Link>

              {/* Conexiones salientes */}
              <div className="p-4">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
                  Conecta con
                </p>
                <ul className="space-y-2">
                  {s.hijos.map((h, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <Link
                        to={h.to}
                        className="text-sm font-semibold text-[#163DCE] hover:underline underline-offset-2"
                      >
                        → {h.label}
                      </Link>
                      <span className="text-xs text-[#6B7280] bg-[#F7F8FA] px-2 py-0.5 rounded-full border border-[#E2E5EA] whitespace-nowrap">
                        {h.via}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leyenda */}
      <section className="mt-10 p-6 rounded-2xl bg-[#F7F8FA] border border-[#E2E5EA]">
        <h2 className="text-sm font-bold text-[#182329] mb-3">Leyenda de colores</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { color: "bg-[#163DCE]", label: "Pantalla principal / Catálogo" },
            { color: "bg-[#163DCE]/80", label: "Detalles de materia" },
            { color: "bg-[#182329]", label: "Secciones informativas" },
            { color: "bg-[#D8EF65]", label: "Contacto" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded ${l.color} border border-black/10`} />
              <span className="text-[#6B7280]">{l.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
