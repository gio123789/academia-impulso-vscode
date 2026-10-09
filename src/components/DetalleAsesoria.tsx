import { useNavigate, Link } from "react-router-dom";

interface Props {
  icon: string;
  iconBg: string;
  nombre: string;
  temas: string[];
  nivel: string;
  modalidad: string;
  duracion: string;
  horario: string;
  precio: string;
  precioNum: string;
  descripcion: string;
}

export default function DetalleAsesoria(props: Props) {
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-sm text-[#6B7280] mb-8">
        <Link to="/" className="hover:text-[#163DCE] transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/asesorias" className="hover:text-[#163DCE] transition-colors">Asesorías</Link>
        <span>/</span>
        <span className="text-[#182329] font-medium">{props.nombre}</span>
      </nav>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl font-bold ${props.iconBg}`}>
              {props.icon}
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#182329]">{props.nombre}</h1>
              <p className="text-[#6B7280] mt-0.5">{props.nivel}</p>
            </div>
          </div>

          <p className="text-[#6B7280] text-lg leading-relaxed mb-8">{props.descripcion}</p>

          {/* Temas */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#182329] mb-3">Temas que se trabajan</h2>
            <div className="flex flex-wrap gap-2">
              {props.temas.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-full bg-white border border-[#E2E5EA] text-[#182329] text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Detalles */}
          <div className="bg-white rounded-2xl border border-[#E2E5EA] overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-[#E2E5EA]">
              <h2 className="font-bold text-[#182329]">Información de la asesoría</h2>
            </div>
            <dl className="divide-y divide-[#E2E5EA]">
              {[
                { label: "Modalidad", value: props.modalidad },
                { label: "Nivel escolar", value: props.nivel },
                { label: "Duración por sesión", value: props.duracion },
                { label: "Horario", value: props.horario },
              ].map((row) => (
                <div key={row.label} className="px-6 py-4 flex justify-between items-center gap-4">
                  <dt className="text-sm text-[#6B7280]">{row.label}</dt>
                  <dd className="text-sm font-semibold text-[#182329] text-right">{row.value}</dd>
                </div>
              ))}
              <div className="px-6 py-4 flex justify-between items-center gap-4 bg-[#163DCE]/5">
                <dt className="text-sm font-semibold text-[#182329]">Precio por sesión</dt>
                <dd className="text-lg font-extrabold text-[#163DCE]">{props.precio}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Precio card */}
            <div className="bg-white rounded-2xl border border-[#E2E5EA] p-6 shadow-sm">
              <p className="text-sm text-[#6B7280] mb-1">Precio por sesión</p>
              <p className="text-3xl font-extrabold text-[#163DCE] mb-1">{props.precioNum}</p>
              <p className="text-sm text-[#6B7280] mb-5">MXN · {props.duracion}</p>
              <button
                onClick={() => navigate("/contacto")}
                className="w-full px-4 py-3.5 rounded-xl bg-[#163DCE] text-white font-semibold hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE] text-base"
              >
                Solicitar información
              </button>
              <p className="text-xs text-center text-[#6B7280] mt-3">
                La solicitud se registra desde el formulario de contacto.
              </p>
            </div>

            {/* Horario */}
            <div className="bg-[#D8EF65]/30 rounded-2xl border border-[#D8EF65] p-5">
              <p className="text-xs font-semibold text-[#182329]/50 uppercase tracking-wider mb-1">Horario</p>
              <p className="font-bold text-[#182329]">{props.horario}</p>
              <p className="text-sm text-[#182329]/60 mt-1">{props.modalidad}</p>
            </div>

            {/* Ver más */}
            <div className="bg-white rounded-2xl border border-[#E2E5EA] p-5">
              <p className="text-sm font-semibold text-[#182329] mb-3">Más asesorías</p>
              <Link to="/asesorias" className="text-sm text-[#163DCE] hover:underline font-medium">
                ← Ver catálogo completo
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
