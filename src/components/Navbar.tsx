import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/asesorias", label: "Asesorías" },
  { to: "/horarios-precios", label: "Horarios y precios" },
  { to: "/metodologia", label: "Metodología" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E5EA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#163DCE] rounded">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#163DCE]">
            <span className="text-white font-bold text-sm leading-none">I</span>
          </span>
          <span className="font-bold text-[#182329] text-lg tracking-tight">Impulso</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE] ${
                  isActive
                    ? "text-[#163DCE] bg-[#163DCE]/8"
                    : "text-[#182329] hover:text-[#163DCE] hover:bg-[#163DCE]/6"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA desktop */}
        <button
          onClick={() => navigate("/asesorias")}
          className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-[#163DCE] text-white text-sm font-semibold hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#163DCE]"
        >
          Encuentra tu asesoría
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-2 focus-visible:outline-[#163DCE] rounded"
        >
          <span className={`block w-6 h-0.5 bg-[#182329] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#182329] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#182329] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E2E5EA] bg-white px-4 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-3 rounded text-base font-medium transition-colors ${
                  isActive ? "text-[#163DCE] bg-[#163DCE]/8" : "text-[#182329] hover:text-[#163DCE]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => { navigate("/asesorias"); setOpen(false); }}
            className="mt-2 w-full px-4 py-3 rounded-lg bg-[#163DCE] text-white font-semibold text-base hover:bg-[#1233aa] transition-colors focus-visible:outline-2 focus-visible:outline-[#163DCE]"
          >
            Encuentra tu asesoría
          </button>
        </div>
      )}
    </header>
  );
}
