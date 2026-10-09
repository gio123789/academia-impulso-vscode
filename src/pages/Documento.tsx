import { useState } from "react";
import { Link } from "react-router-dom";

const secciones = [
  { id: "casoestudio", label: "Caso de estudio" },
  { id: "metodologia", label: "Plan ágil (Scrum)" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "diagrama", label: "Diagrama" },
  { id: "patrones", label: "Patrones de diseño" },
  { id: "frameworks", label: "Frameworks" },
  { id: "pruebas", label: "Esquema de pruebas" },
  { id: "fases", label: "Fases 4 · 5 · 7" },
  { id: "entorno", label: "Config. del entorno" },
];

function Seccion({ id, titulo, badge, children }: { id: string; titulo: string; badge?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <div className="flex items-start gap-3 mb-5">
        {badge && (
          <span className="mt-1 shrink-0 px-2.5 py-0.5 rounded-full bg-[#163DCE]/10 text-[#163DCE] text-xs font-bold uppercase tracking-wider">
            {badge}
          </span>
        )}
        <h2 className="text-2xl font-extrabold text-[#182329]">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}

function Tabla({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E2E5EA]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F7F8FA] border-b border-[#E2E5EA]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-[#182329] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E5EA] bg-white">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#F7F8FA] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[#182329] align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className={`rounded-xl border p-5 ${accent || "bg-white border-[#E2E5EA]"}`}>
      <p className="font-bold text-[#182329] mb-2">{title}</p>
      {children}
    </div>
  );
}

function Check({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[#182329]">
      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#163DCE] text-white flex items-center justify-center text-xs font-bold">✓</span>
      {text}
    </li>
  );
}

export default function Documento() {
  const [activeTab, setActiveTab] = useState("casoestudio");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Hero del documento */}
      <div className="bg-[#182329] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/70">Documento técnico</span>
          </div>
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#D8EF65]/20 text-[#D8EF65] text-xs font-bold uppercase tracking-wider">
            Caso de estudio · Actividad académica
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Academia Impulso — Documento Técnico
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Plan de desarrollo web ágil, arquitectura, patrones de diseño, frameworks, esquema de pruebas y configuración del entorno.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Índice lateral */}
        <aside className="lg:w-56 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-[#E2E5EA] p-4">
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Contenido</p>
            <nav className="space-y-0.5">
              {secciones.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === s.id
                      ? "bg-[#163DCE]/10 text-[#163DCE] font-semibold"
                      : "text-[#6B7280] hover:text-[#182329] hover:bg-[#F7F8FA]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Contenido */}
        <main className="flex-1 min-w-0">

          {/* ── 1. CASO DE ESTUDIO ── */}
          <Seccion id="casoestudio" titulo="Caso de estudio" badge="1">
            <div className="bg-white rounded-xl border border-[#E2E5EA] p-6 mb-4">
              <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Descripción del cliente</p>
              <p className="text-[#182329] leading-relaxed">
                <strong>Academia Impulso</strong> es un negocio de asesorías escolares que ofrece clases en línea de Matemáticas, Inglés y Física para estudiantes de secundaria y bachillerato. Su información está dispersa entre publicaciones y mensajes; el personal responde continuamente las mismas dudas sobre materias, horarios y precios.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card title="Problema principal">
                <p className="text-sm text-[#6B7280] leading-relaxed">Las familias no tienen un punto único donde consultar materias, horarios y precios. El contacto es por mensajes no estructurados, lo que genera carga operativa innecesaria.</p>
              </Card>
              <Card title="Objetivo del sitio web">
                <p className="text-sm text-[#6B7280] leading-relaxed">Reducir las consultas repetidas, permitir que el usuario encuentre la asesoría adecuada y llegue al contacto en máximo 3 pasos desde cualquier dispositivo.</p>
              </Card>
              <Card title="Público objetivo">
                <ul className="space-y-1 text-sm text-[#6B7280]">
                  <li>• Estudiantes de 12 a 18 años</li>
                  <li>• Madres, padres y tutores</li>
                  <li>• Dispositivos: móvil y escritorio</li>
                </ul>
              </Card>
              <Card title="Alcance">
                <ul className="space-y-1 text-sm text-[#6B7280]">
                  <li>• 8 pantallas (inicio, catálogo, 3 detalles, horarios, metodología, contacto)</li>
                  <li>• Versión desktop y móvil responsive</li>
                  <li>• Sin pagos ni inicio de sesión</li>
                </ul>
              </Card>
            </div>
          </Seccion>

          {/* ── 2. PLAN ÁGIL ── */}
          <Seccion id="metodologia" titulo="Plan del proceso de desarrollo — Metodología Scrum" badge="2">
            <div className="bg-[#163DCE]/5 border border-[#163DCE]/20 rounded-xl p-5 mb-5">
              <p className="font-bold text-[#163DCE] mb-1">¿Por qué Scrum?</p>
              <p className="text-sm text-[#182329] leading-relaxed">
                Scrum es la metodología más adecuada para este proyecto porque permite entregar pantallas funcionales por sprint, obtener retroalimentación del cliente (el profesor) y ajustar el diseño antes de la entrega final. El alcance definido (8 pantallas) se mapea de forma natural a 3 sprints de trabajo.
              </p>
            </div>

            <div className="mb-5">
              <p className="font-semibold text-[#182329] mb-3">Roles del equipo</p>
              <Tabla
                headers={["Rol", "Responsabilidad"]}
                rows={[
                  ["Product Owner", "Define las pantallas necesarias según el brief del cliente (Academia Impulso)"],
                  ["Scrum Master", "Facilita las reuniones y elimina bloqueos del equipo"],
                  ["Desarrollador(a)", "Diseña e implementa las interfaces en código"],
                ]}
              />
            </div>

            <p className="font-semibold text-[#182329] mb-3">Planificación de sprints</p>
            <div className="space-y-4">
              {[
                {
                  n: "Sprint 1",
                  dur: "Semana 1",
                  color: "border-l-[#163DCE]",
                  meta: "Base del proyecto y navegación global",
                  tareas: ["Configurar entorno (Vite + React + Tailwind)", "Crear Navbar y Footer", "Pantalla Inicio", "Pantalla Catálogo de asesorías"],
                  entregable: "Sitio navegable con 2 pantallas funcionales",
                },
                {
                  n: "Sprint 2",
                  dur: "Semana 2",
                  color: "border-l-[#182329]",
                  meta: "Contenido de asesorías y horarios",
                  tareas: ["Detalle Matemáticas", "Detalle Inglés", "Detalle Física", "Horarios y precios"],
                  entregable: "5 pantallas conectadas con datos reales",
                },
                {
                  n: "Sprint 3",
                  dur: "Semana 3",
                  color: "border-l-[#D8EF65]",
                  meta: "Secciones informativas, contacto y entrega",
                  tareas: ["Página Metodología", "Página Contacto", "Mapa de navegación", "Revisión responsive y accesibilidad"],
                  entregable: "8 pantallas completas, responsive y documentadas",
                },
              ].map((s) => (
                <div key={s.n} className={`bg-white rounded-xl border border-[#E2E5EA] border-l-4 ${s.color} p-5`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#182329]">{s.n}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#F7F8FA] border border-[#E2E5EA] text-[#6B7280]">{s.dur}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#163DCE] mb-3">{s.meta}</p>
                  <ul className="grid sm:grid-cols-2 gap-1.5 mb-3">
                    {s.tareas.map((t) => <Check key={t} text={t} />)}
                  </ul>
                  <p className="text-xs text-[#6B7280]"><strong>Entregable:</strong> {s.entregable}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-xl bg-[#D8EF65]/30 border border-[#D8EF65]">
              <p className="text-sm font-semibold text-[#182329] mb-1">Ceremonias Scrum aplicadas</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-[#182329]/70">
                <p>• <strong>Sprint Planning:</strong> definir tareas al inicio de cada semana</p>
                <p>• <strong>Daily Standup:</strong> revisión breve de avance diario</p>
                <p>• <strong>Sprint Review:</strong> presentar pantallas terminadas</p>
                <p>• <strong>Retrospectiva:</strong> qué mejorar en el siguiente sprint</p>
              </div>
            </div>
          </Seccion>

          {/* ── 3. ARQUITECTURA ── */}
          <Seccion id="arquitectura" titulo="Justificación de la arquitectura" badge="3">
            <div className="bg-white rounded-xl border border-[#E2E5EA] p-6 mb-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#163DCE] text-white flex items-center justify-center font-bold text-lg shrink-0">C</span>
                <div>
                  <p className="font-bold text-[#182329] text-lg">Arquitectura Cliente-Servidor</p>
                  <p className="text-sm text-[#6B7280]">Arquitectura seleccionada para Academia Impulso</p>
                </div>
              </div>
              <p className="text-[#182329] text-sm leading-relaxed">
                La arquitectura <strong>Cliente-Servidor</strong> es la más adecuada para Academia Impulso porque el sitio es de naturaleza informativa: muestra datos estáticos (materias, horarios, precios) y dirige al usuario al contacto. No requiere base de datos dinámica, autenticación ni transacciones en tiempo real.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <Card title="✅ Por qué aplica" accent="bg-[#163DCE]/5 border-[#163DCE]/20">
                <ul className="space-y-1.5 text-sm text-[#182329]/70">
                  <li>• Sitio informativo sin lógica de negocio compleja</li>
                  <li>• El navegador (cliente) solicita páginas al servidor</li>
                  <li>• Bajo costo de infraestructura</li>
                  <li>• Fácil de mantener y escalar</li>
                  <li>• Compatible con hosting estático (Vercel, Netlify)</li>
                </ul>
              </Card>
              <Card title="❌ Por qué no SOA" accent="bg-[#F7F8FA] border-[#E2E5EA]">
                <ul className="space-y-1.5 text-sm text-[#182329]/70">
                  <li>• SOA requiere múltiples servicios web independientes</li>
                  <li>• El sitio no consume APIs externas complejas</li>
                  <li>• Agregaría complejidad innecesaria</li>
                  <li>• No hay integración entre sistemas diferentes</li>
                  <li>• El equipo y tiempo no justifican ese nivel</li>
                </ul>
              </Card>
            </div>

            <p className="font-semibold text-[#182329] mb-3">Comparativa de arquitecturas (Equipo 1)</p>
            <Tabla
              headers={["Arquitectura", "Aplica al proyecto", "Razón"]}
              rows={[
                ["Cliente-Servidor ✅", "Sí — seleccionada", "Sitio informativo estático, navegador solicita y servidor responde"],
                ["Orientada a servicios (SOA)", "No — sobredimensionada", "Requiere múltiples servicios independientes; el sitio no los necesita"],
              ]}
            />
          </Seccion>

          {/* ── 4. DIAGRAMA ── */}
          <Seccion id="diagrama" titulo="Diagrama de la arquitectura Cliente-Servidor" badge="4">
            <div className="bg-white rounded-2xl border border-[#E2E5EA] p-6">
              {/* Diagrama visual con SVG-like layout en divs */}
              <div className="flex flex-col items-center gap-4">

                {/* Usuario */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#D8EF65]/50 border-2 border-[#D8EF65] flex flex-col items-center justify-center gap-1">
                    <span className="text-2xl">👤</span>
                    <span className="text-xs font-bold text-[#182329]">Usuario</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">Familia / Estudiante</p>
                </div>

                {/* Flecha */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-[#163DCE]" />
                  <span className="text-xs text-[#163DCE] font-semibold px-2">Solicitud HTTP (HTTPS)</span>
                  <div className="w-0.5 h-6 bg-[#163DCE]" />
                </div>

                {/* Navegador */}
                <div className="flex flex-col items-center">
                  <div className="w-48 rounded-xl bg-[#163DCE]/10 border-2 border-[#163DCE] px-4 py-3 text-center">
                    <p className="font-bold text-[#163DCE] text-sm">CLIENTE</p>
                    <p className="text-xs text-[#182329] mt-0.5">Navegador web</p>
                    <p className="text-xs text-[#6B7280]">React SPA</p>
                  </div>
                </div>

                {/* Flecha doble */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-5 bg-[#182329]" />
                    <span className="text-xs text-[#182329] font-semibold">Petición</span>
                    <div className="w-0.5 h-5 bg-[#182329]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-5 bg-[#182329]" />
                    <span className="text-xs text-[#182329] font-semibold">Respuesta</span>
                    <div className="w-0.5 h-5 bg-[#182329]" />
                  </div>
                </div>

                {/* Servidor */}
                <div className="w-full max-w-sm rounded-xl bg-[#182329] text-white px-5 py-4 text-center">
                  <p className="font-bold">SERVIDOR</p>
                  <p className="text-xs text-white/60 mt-0.5">Hosting estático (Vercel / Netlify)</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    {["Archivos HTML/CSS/JS", "Assets (imágenes, fonts)", "Rutas del router", "Caché y CDN"].map((s) => (
                      <span key={s} className="bg-white/10 rounded-lg px-2 py-1.5">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Internet */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-5 bg-[#6B7280]" />
                </div>

                {/* Internet */}
                <div className="w-full max-w-sm rounded-xl bg-[#F7F8FA] border border-[#E2E5EA] px-5 py-3">
                  <p className="font-semibold text-[#182329] text-sm text-center mb-2">Capas del cliente (React)</p>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    {[
                      { label: "Enrutamiento", sub: "React Router" },
                      { label: "Componentes", sub: "React 19" },
                      { label: "Estilos", sub: "Tailwind CSS" },
                    ].map((c) => (
                      <div key={c.label} className="bg-white rounded-lg border border-[#E2E5EA] px-2 py-2">
                        <p className="font-semibold text-[#182329]">{c.label}</p>
                        <p className="text-[#6B7280] mt-0.5">{c.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <p className="text-xs text-[#6B7280] text-center mt-4">
                El usuario accede al sitio desde su navegador → el servidor entrega los archivos del bundle → React renderiza la interfaz en el cliente.
              </p>
            </div>
          </Seccion>

          {/* ── 5. PATRONES ── */}
          <Seccion id="patrones" titulo="Propuesta de patrones de diseño" badge="5">
            <div className="space-y-4">
              {[
                {
                  patron: "Componente reutilizable",
                  tipo: "Estructural",
                  desc: "Elementos como Navbar, Footer, tarjetas de asesoria y botones se crean una sola vez y se reutilizan en todas las páginas. Reduce código repetido y mantiene consistencia visual.",
                  ejemplo: "Navbar.tsx, Footer.tsx, DetalleAsesoria.tsx",
                },
                {
                  patron: "Single Page Application (SPA)",
                  tipo: "Arquitectónico",
                  desc: "El sitio carga una sola vez y React Router cambia las vistas sin recargar la página. El usuario percibe navegación instantánea.",
                  ejemplo: "App.tsx con BrowserRouter y Routes",
                },
                {
                  patron: "Props / Paso de datos hacia abajo",
                  tipo: "Comportamiento",
                  desc: "El componente DetalleAsesoria recibe todos sus datos por props (nombre, temas, precio, horario). Se instancia tres veces con datos distintos sin duplicar lógica.",
                  ejemplo: "DetalleMatematicas.tsx → DetalleAsesoria.tsx",
                },
                {
                  patron: "Estado local (useState)",
                  tipo: "Comportamiento",
                  desc: "El Navbar usa useState para controlar si el menú móvil está abierto o cerrado, sin necesidad de un gestor de estado global.",
                  ejemplo: "Navbar.tsx — open / setOpen",
                },
                {
                  patron: "Layout compartido",
                  tipo: "Estructural",
                  desc: "Navbar y Footer se declaran una vez en App.tsx y envuelven todas las rutas. Cualquier cambio en la navegación aplica automáticamente a toda la aplicación.",
                  ejemplo: "App.tsx: <Navbar /> + <Routes /> + <Footer />",
                },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E2E5EA] p-5 flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#163DCE] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-[#182329]">{p.patron}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#163DCE]/10 text-[#163DCE] font-semibold">{p.tipo}</span>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-2">{p.desc}</p>
                    <p className="text-xs font-mono bg-[#F7F8FA] border border-[#E2E5EA] rounded px-2 py-1 text-[#163DCE]">{p.ejemplo}</p>
                  </div>
                </div>
              ))}
            </div>
          </Seccion>

          {/* ── 6. FRAMEWORKS ── */}
          <Seccion id="frameworks" titulo="Justificación de los frameworks de desarrollo web" badge="6">
            <div className="space-y-4">
              {[
                {
                  tool: "React 19",
                  tipo: "Framework de UI",
                  color: "bg-[#163DCE]/10 text-[#163DCE]",
                  razon: "Permite construir la interfaz como componentes reutilizables. Ideal para un sitio con múltiples pantallas que comparten Navbar, Footer y tarjetas. El Virtual DOM garantiza actualizaciones eficientes.",
                  alternativa: "Vue.js o Angular — React se elige por su ecosistema amplio y la integración natural con React Router.",
                },
                {
                  tool: "Vite 8",
                  tipo: "Bundler / Dev server",
                  color: "bg-[#D8EF65]/60 text-[#182329]",
                  razon: "Servidor de desarrollo con Hot Module Replacement instantáneo. Genera bundles optimizados para producción. Es significativamente más rápido que Create React App.",
                  alternativa: "Webpack — Vite es preferido por velocidad y configuración mínima.",
                },
                {
                  tool: "Tailwind CSS v4",
                  tipo: "Framework de estilos",
                  color: "bg-[#163DCE]/10 text-[#163DCE]",
                  razon: "Sistema de clases utilitarias que permite construir diseños responsivos directamente en JSX. Garantiza consistencia visual sin escribir CSS personalizado. Soporte nativo para mobile-first.",
                  alternativa: "Bootstrap o CSS puro — Tailwind ofrece mayor control y menos tamaño final.",
                },
                {
                  tool: "React Router DOM v7",
                  tipo: "Enrutamiento",
                  color: "bg-[#182329]/10 text-[#182329]",
                  razon: "Maneja la navegación entre las 8 pantallas sin recargar el navegador. Permite URLs limpias (/asesorias/matematicas) y navegación por historial.",
                  alternativa: "Next.js routing — React Router es suficiente para un sitio estático sin SSR.",
                },
                {
                  tool: "TypeScript 5.7",
                  tipo: "Lenguaje tipado",
                  color: "bg-[#D8EF65]/60 text-[#182329]",
                  razon: "Añade tipos estáticos a JavaScript. Detecta errores antes de ejecutar el código y documenta los props de cada componente. Mejora la mantenibilidad del proyecto.",
                  alternativa: "JavaScript puro — TypeScript previene errores comunes como props con tipo incorrecto.",
                },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E2E5EA] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${f.color}`}>{f.tool}</span>
                    <span className="text-xs text-[#6B7280]">{f.tipo}</span>
                  </div>
                  <p className="text-sm text-[#182329] leading-relaxed mb-2"><strong>Justificación:</strong> {f.razon}</p>
                  <p className="text-xs text-[#6B7280]"><strong>Alternativa considerada:</strong> {f.alternativa}</p>
                </div>
              ))}
            </div>
          </Seccion>

          {/* ── 7. PRUEBAS ── */}
          <Seccion id="pruebas" titulo="Esquema de pruebas" badge="7">
            <div className="mb-5">
              <Tabla
                headers={["Tipo de prueba", "Qué verifica", "Herramienta", "Sprint"]}
                rows={[
                  ["Prueba de navegación", "Que todos los enlaces del menú llevan a la pantalla correcta", "Manual / navegador", "1–3"],
                  ["Prueba de responsividad", "Que el sitio se ve correctamente en móvil (375px) y escritorio (1280px)", "DevTools del navegador", "1–3"],
                  ["Prueba de contenido", "Que los textos, horarios y precios muestran los datos correctos", "Revisión manual", "2"],
                  ["Prueba de accesibilidad", "Contraste de colores, tamaño de texto mínimo 16px, foco visible en botones", "axe DevTools / manual", "3"],
                  ["Prueba de carga", "Que el sitio carga en menos de 3 segundos en conexión estándar", "Lighthouse (Chrome)", "3"],
                  ["Prueba de botones", "Que todos los botones CTA llevan al destino esperado", "Manual / navegador", "2–3"],
                ]}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card title="Criterios de aceptación" accent="bg-[#163DCE]/5 border-[#163DCE]/20">
                <ul className="space-y-1.5 mt-2">
                  {[
                    "Recorrido Inicio → Catálogo → Detalle → Contacto funciona en 3 clics",
                    "Todos los precios y horarios son visibles sin desplazarse en móvil",
                    "Ningún botón lleva a una página en blanco o error 404",
                    "El menú móvil abre y cierra correctamente",
                    "El contraste de texto supera ratio 4.5:1 (WCAG AA)",
                  ].map((c) => <Check key={c} text={c} />)}
                </ul>
              </Card>
              <Card title="Casos de prueba principales" accent="bg-[#F7F8FA] border-[#E2E5EA]">
                <ul className="space-y-2 mt-2 text-sm text-[#182329]/70">
                  <li><strong>CP-01:</strong> Usuario navega desde Inicio a Detalle Matemáticas y llega a Contacto</li>
                  <li><strong>CP-02:</strong> Usuario en móvil abre el menú y navega a Horarios</li>
                  <li><strong>CP-03:</strong> Usuario verifica que el precio de Física es $190 MXN</li>
                  <li><strong>CP-04:</strong> Botón "Solicitar información" lleva a /contacto</li>
                </ul>
              </Card>
            </div>
          </Seccion>

          {/* ── 8. FASES 4, 5, 7 ── */}
          <Seccion id="fases" titulo="Fases del proceso de desarrollo web" badge="8">
            <div className="space-y-6">
              {[
                {
                  n: "Fase 4",
                  titulo: "CONTENIDO",
                  color: "bg-red-600",
                  items: [
                    { label: "Redacción", desc: "Se redactaron todos los textos del sitio en español: descripciones de materias, metodología, instrucciones de contacto y avisos del prototipo. Textos concisos, máximo 2 oraciones por párrafo." },
                    { label: "Fotos o videos", desc: "El proyecto utiliza íconos vectoriales y elementos visuales generados con CSS/SVG para representar cada materia. No se usaron imágenes de terceros para evitar dependencias externas en el prototipo." },
                    { label: "SEO", desc: "Se definieron etiquetas semánticas (main, section, nav, article, h1–h2, dl/dt/dd) para que los motores de búsqueda identifiquen correctamente el contenido. URLs descriptivas como /asesorias/matematicas mejoran el posicionamiento orgánico." },
                  ],
                },
                {
                  n: "Fase 5",
                  titulo: "DESARROLLO",
                  color: "bg-red-600",
                  items: [
                    { label: "Tecnologías (HTML y CSS equivalente)", desc: "Se utilizó React + JSX como equivalente moderno de HTML estructurado, y Tailwind CSS v4 en lugar de CSS manual. Esto permite mantener estilos directamente en los componentes sin hojas de estilo separadas." },
                    { label: "Bases de datos", desc: "El proyecto no requiere base de datos en esta fase: los datos (materias, horarios, precios) son estáticos y se declaran directamente en los componentes. En una fase futura se podría conectar a una API REST o servicio como Supabase." },
                    { label: "Diseño responsivo", desc: "Cada pantalla tiene un layout adaptable: grids de 3 columnas en desktop colapsan a 1 columna en móvil, la tabla de horarios se convierte en tarjetas, y el menú de escritorio se reemplaza por un menú hamburguesa en pantallas menores a 768px." },
                  ],
                },
                {
                  n: "Fase 7",
                  titulo: "LANZAMIENTO",
                  color: "bg-red-600",
                  items: [
                    { label: "Monitoreo", desc: "Se utilizaría Vercel Analytics o Google Search Console para monitorear visitas, páginas más visitadas y errores de carga. En el prototipo académico, el monitoreo se realiza manualmente revisando la consola del navegador." },
                    { label: "Arreglo de fallos", desc: "Proceso documentado: (1) identificar el fallo en la consola o reporte de usuario, (2) localizar el componente afectado, (3) aplicar corrección, (4) verificar en dispositivo móvil y escritorio antes de publicar." },
                    { label: "Mantenimiento", desc: "El sitio estático requiere bajo mantenimiento: actualizar precios u horarios implica editar el archivo del componente correspondiente y redesplegar. La arquitectura Cliente-Servidor facilita este proceso sin interrumpir el servicio." },
                  ],
                },
              ].map((fase) => (
                <div key={fase.n} className="bg-white rounded-2xl border border-[#E2E5EA] overflow-hidden">
                  <div className={`${fase.color} text-white px-6 py-4`}>
                    <span className="text-sm font-semibold opacity-80">{fase.n}</span>
                    <h3 className="text-xl font-extrabold">{fase.titulo}</h3>
                  </div>
                  <div className="divide-y divide-[#E2E5EA]">
                    {fase.items.map((item) => (
                      <div key={item.label} className="px-6 py-4 flex gap-4">
                        <span className="w-5 h-5 rounded-full bg-[#163DCE] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                        <div>
                          <p className="font-semibold text-[#182329] mb-1">{item.label}</p>
                          <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Seccion>

          {/* ── 9. ENTORNO ── */}
          <Seccion id="entorno" titulo="Reporte de configuración del entorno" badge="9">
            <div className="mb-6">
              <h3 className="font-bold text-[#182329] mb-3">Lista de herramientas utilizadas</h3>
              <Tabla
                headers={["Herramienta", "Versión", "Rol", "Instalación"]}
                rows={[
                  ["Node.js", "22.x", "Entorno de ejecución JavaScript", "mise / nvm"],
                  ["pnpm", "10.x", "Gestor de paquetes", "npm install -g pnpm"],
                  ["Vite", "8.x", "Servidor de desarrollo y bundler", "pnpm create vite"],
                  ["React", "19.x", "Framework de interfaz de usuario", "pnpm add react react-dom"],
                  ["TypeScript", "5.7", "Tipado estático", "Incluido en plantilla Vite"],
                  ["Tailwind CSS", "4.x", "Framework de estilos utilitarios", "pnpm add @tailwindcss/vite"],
                  ["React Router DOM", "7.x", "Enrutamiento del lado del cliente", "pnpm add react-router-dom"],
                  ["Figma Make", "—", "Entorno de desarrollo y previsualización", "Plataforma web"],
                  ["Git", "2.x", "Control de versiones", "Incluido en el sistema"],
                  ["VS Code / Figma", "—", "Editor de código / diseño", "Descarga oficial"],
                ]}
              />
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-[#182329] mb-3">Parámetros de configuración</h3>
              <div className="space-y-4">
                <Card title="vite.config.ts — Configuración de Vite">
                  <pre className="text-xs bg-[#F7F8FA] rounded-lg p-3 mt-2 overflow-x-auto text-[#182329] border border-[#E2E5EA]">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': '/src' }
  }
})`}</pre>
                </Card>

                <Card title="src/index.css — Fuentes y base de estilos">
                  <pre className="text-xs bg-[#F7F8FA] rounded-lg p-3 mt-2 overflow-x-auto text-[#182329] border border-[#E2E5EA]">{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import 'tailwindcss';

body {
  font-family: 'Inter', Arial, sans-serif;
  background-color: #F7F8FA;
  color: #182329;
}`}</pre>
                </Card>

                <Card title="Paleta de colores — Academia Impulso">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    {[
                      { hex: "#163DCE", label: "Azul principal", bg: "bg-[#163DCE]", text: "text-white" },
                      { hex: "#182329", label: "Tinta oscura", bg: "bg-[#182329]", text: "text-white" },
                      { hex: "#D8EF65", label: "Lima", bg: "bg-[#D8EF65]", text: "text-[#182329]" },
                      { hex: "#F7F8FA", label: "Fondo", bg: "bg-[#F7F8FA]", text: "text-[#182329]", border: "border border-[#E2E5EA]" },
                    ].map((c) => (
                      <div key={c.hex} className="text-center">
                        <div className={`h-12 rounded-lg mb-2 ${c.bg} ${c.border || ""}`} />
                        <p className="text-xs font-mono font-bold text-[#182329]">{c.hex}</p>
                        <p className="text-xs text-[#6B7280]">{c.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card title="Estructura de archivos del proyecto">
                  <pre className="text-xs bg-[#F7F8FA] rounded-lg p-3 mt-2 overflow-x-auto text-[#182329] border border-[#E2E5EA]">{`src/
├── App.tsx              # Router principal + layout
├── main.tsx             # Punto de entrada React
├── index.css            # Estilos globales + Tailwind
├── components/
│   ├── Navbar.tsx       # Navegación global (desktop + móvil)
│   ├── Footer.tsx       # Pie de página
│   └── DetalleAsesoria.tsx  # Componente reutilizable
└── pages/
    ├── Inicio.tsx
    ├── Catalogo.tsx
    ├── DetalleMatematicas.tsx
    ├── DetalleIngles.tsx
    ├── DetalleFisica.tsx
    ├── HorarioPrecios.tsx
    ├── Metodologia.tsx
    ├── Contacto.tsx
    └── Documento.tsx`}</pre>
                </Card>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#D8EF65]/30 border border-[#D8EF65]">
              <p className="font-bold text-[#182329] mb-1">Nota académica</p>
              <p className="text-sm text-[#182329]/70 leading-relaxed">
                Todos los datos de Academia Impulso son ficticios. Este documento y el sitio web son entregables académicos. El entorno de desarrollo se ejecuta dentro de Figma Make; en un proyecto real se usaría un hosting como Vercel o Netlify con dominio propio.
              </p>
            </div>
          </Seccion>

        </main>
      </div>
    </div>
  );
}
