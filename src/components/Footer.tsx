import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#182329] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#163DCE]">
              <span className="text-white font-bold text-sm">I</span>
            </span>
            <span className="font-bold text-lg">Impulso</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Asesorías escolares de Matemáticas, Inglés y Física para secundaria y bachillerato.
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-3">Navegación</p>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Inicio" },
              { to: "/asesorias", label: "Asesorías" },
              { to: "/horarios-precios", label: "Horarios y precios" },
              { to: "/metodologia", label: "Metodología" },
              { to: "/contacto", label: "Contacto" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-3">Materias</p>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/asesorias/matematicas", label: "Matemáticas" },
              { to: "/asesorias/ingles", label: "Inglés" },
              { to: "/asesorias/fisica", label: "Física" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-white/10 mt-2">
              <Link to="/mapa-navegacion" className="text-white/40 hover:text-white/70 transition-colors text-xs">
                Mapa del sitio
              </Link>
            </li>
            <li>
              <Link to="/documento" className="text-white/40 hover:text-white/70 transition-colors text-xs">
                Documento técnico
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 max-w-6xl mx-auto px-4 sm:px-6 py-4 text-xs text-white/30">
        © 2024 Academia Impulso. Proyecto académico — todos los datos son ficticios.
      </div>
    </footer>
  );
}
