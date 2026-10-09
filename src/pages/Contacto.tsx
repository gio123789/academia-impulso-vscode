import { useState } from "react";
import { Link } from "react-router-dom";
import { postContactRequest } from "../services/api";

type Campo = {
  nombre: string;
  nivel: string;
  materia: string;
  horario: string;
  mensaje: string;
};

const camposIniciales: Campo = {
  nombre: "",
  nivel: "",
  materia: "",
  horario: "",
  mensaje: "",
};

const erroresIniciales = {
  nombre: "",
  nivel: "",
  materia: "",
  horario: "",
};

export default function Contacto() {
  const [form, setForm] = useState<Campo>(camposIniciales);
  const [errores, setErrores] = useState(erroresIniciales);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const validar = (): boolean => {
    const nuevos = { nombre: "", nivel: "", materia: "", horario: "" };
    let valido = true;

    if (!form.nombre.trim()) {
      nuevos.nombre = "Escribe tu nombre o el del estudiante.";
      valido = false;
    }
    if (!form.nivel) {
      nuevos.nivel = "Selecciona el nivel escolar.";
      valido = false;
    }
    if (!form.materia) {
      nuevos.materia = "Selecciona una materia.";
      valido = false;
    }
    if (!form.horario) {
      nuevos.horario = "Selecciona un horario de interés.";
      valido = false;
    }

    setErrores(nuevos);
    return valido;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
    setErrorEnvio("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando || !validar()) return;

    setEnviando(true);
    setErrorEnvio("");
    try {
      const detalle = [
        form.mensaje.trim(),
        `Nivel escolar: ${form.nivel}`,
        `Horario de interés: ${form.horario}`,
      ].filter(Boolean).join("\n");
      await postContactRequest({
        name: form.nombre.trim(),
        subjectSlug: form.materia,
        message: detalle,
      });
      setEnviado(true);
    } catch {
      setErrorEnvio("No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.");
    } finally {
      setEnviando(false);
    }
  };

  const handleReset = () => {
    setForm(camposIniciales);
    setErrores(erroresIniciales);
    setEnviado(false);
    setErrorEnvio("");
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#D8EF65]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-18">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#182329]/10 text-[#182329] text-sm font-semibold">
            Contacto
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#182329] mb-4 leading-tight max-w-2xl">
            Hablemos de lo que quieres aprender.
          </h1>
          <p className="text-lg text-[#182329]/70 max-w-xl leading-relaxed">
            Completa el formulario y nos pondremos en contacto contigo para orientarte sobre la asesoría que mejor se adapte a tus necesidades.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-5 gap-10">

        {/* Formulario */}
        <div className="md:col-span-3">
          {!enviado ? (
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-[#E2E5EA] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#182329] mb-6">Solicitar información</h2>
              {errorEnvio && (
                <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorEnvio}
                </p>
              )}

              {/* Nombre */}
              <div className="mb-5">
                <label htmlFor="nombre" className="block text-sm font-semibold text-[#182329] mb-1.5">
                  Nombre del estudiante <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej. María García"
                  aria-required="true"
                  aria-describedby={errores.nombre ? "error-nombre" : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-[#182329] text-sm placeholder:text-[#6B7280] outline-none transition-colors focus:ring-2 focus:ring-[#163DCE]/30 focus:border-[#163DCE] ${
                    errores.nombre ? "border-red-400 bg-red-50" : "border-[#E2E5EA] bg-white"
                  }`}
                />
                {errores.nombre && (
                  <p id="error-nombre" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errores.nombre}
                  </p>
                )}
              </div>

              {/* Nivel */}
              <div className="mb-5">
                <label htmlFor="nivel" className="block text-sm font-semibold text-[#182329] mb-1.5">
                  Nivel escolar <span className="text-red-500" aria-hidden>*</span>
                </label>
                <select
                  id="nivel"
                  name="nivel"
                  value={form.nivel}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errores.nivel ? "error-nivel" : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-[#163DCE]/30 focus:border-[#163DCE] ${
                    errores.nivel ? "border-red-400 bg-red-50 text-[#182329]" : "border-[#E2E5EA] bg-white text-[#182329]"
                  } ${!form.nivel ? "text-[#6B7280]" : ""}`}
                >
                  <option value="" disabled>Selecciona un nivel</option>
                  <option value="secundaria">Secundaria</option>
                  <option value="bachillerato">Bachillerato</option>
                </select>
                {errores.nivel && (
                  <p id="error-nivel" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errores.nivel}
                  </p>
                )}
              </div>

              {/* Materia */}
              <div className="mb-5">
                <label htmlFor="materia" className="block text-sm font-semibold text-[#182329] mb-1.5">
                  Materia de interés <span className="text-red-500" aria-hidden>*</span>
                </label>
                <select
                  id="materia"
                  name="materia"
                  value={form.materia}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errores.materia ? "error-materia" : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-[#163DCE]/30 focus:border-[#163DCE] ${
                    errores.materia ? "border-red-400 bg-red-50 text-[#182329]" : "border-[#E2E5EA] bg-white text-[#182329]"
                  } ${!form.materia ? "text-[#6B7280]" : ""}`}
                >
                  <option value="" disabled>Selecciona una materia</option>
                  <option value="matematicas">Matemáticas — $180 MXN / sesión</option>
                  <option value="ingles">Inglés — $160 MXN / sesión</option>
                  <option value="fisica">Física — $190 MXN / sesión</option>
                </select>
                {errores.materia && (
                  <p id="error-materia" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errores.materia}
                  </p>
                )}
              </div>

              {/* Horario preferido */}
              <div className="mb-5">
                <label htmlFor="horario" className="block text-sm font-semibold text-[#182329] mb-1.5">
                  Horario de preferencia <span className="text-red-500" aria-hidden>*</span>
                </label>
                <select
                  id="horario"
                  name="horario"
                  value={form.horario}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errores.horario ? "error-horario" : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-[#163DCE]/30 focus:border-[#163DCE] ${
                    errores.horario ? "border-red-400 bg-red-50 text-[#182329]" : "border-[#E2E5EA] bg-white text-[#182329]"
                  } ${!form.horario ? "text-[#6B7280]" : ""}`}
                >
                  <option value="" disabled>Selecciona un horario</option>
                  <option value="lun-mie-1600">Lunes y miércoles, 16:00–17:00 (Matemáticas)</option>
                  <option value="mar-jue-1700">Martes y jueves, 17:00–18:00 (Inglés)</option>
                  <option value="sab-1000">Sábados, 10:00–11:00 (Física)</option>
                </select>
                {errores.horario && (
                  <p id="error-horario" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errores.horario}
                  </p>
                )}
              </div>

              {/* Mensaje opcional */}
              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-sm font-semibold text-[#182329] mb-1.5">
                  Dudas adicionales <span className="text-[#6B7280] font-normal">(opcional)</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Ej. ¿Hay clases de recuperación? ¿Se puede cambiar de horario?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E5EA] bg-white text-[#182329] text-sm placeholder:text-[#6B7280] outline-none transition-colors focus:ring-2 focus:ring-[#163DCE]/30 focus:border-[#163DCE] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full px-4 py-3.5 rounded-xl bg-[#163DCE] text-white font-semibold text-base hover:bg-[#1233aa] active:scale-[.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#163DCE]"
              >
                {enviando ? "Enviando solicitud..." : "Enviar solicitud de información"}
              </button>

              <p className="text-xs text-center text-[#6B7280] mt-3">
                Este prototipo no envía solicitudes reales. Los campos son solo demostrativos.
              </p>
            </form>
          ) : (
            /* Estado de éxito */
            <div className="bg-white rounded-2xl border border-[#E2E5EA] p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#D8EF65] flex items-center justify-center mx-auto mb-5 text-3xl">
                ✓
              </div>
              <h2 className="text-2xl font-extrabold text-[#182329] mb-2">
                ¡Solicitud enviada!
              </h2>
              <p className="text-[#6B7280] mb-2 leading-relaxed">
                Gracias, <strong className="text-[#182329]">{form.nombre}</strong>. Hemos registrado tu interés en{" "}
                <strong className="text-[#182329]">
                  {form.materia === "matematicas" ? "Matemáticas" : form.materia === "ingles" ? "Inglés" : "Física"}
                </strong>{" "}
                para nivel <strong className="text-[#182329]">{form.nivel}</strong>.
              </p>
              <p className="text-[#6B7280] text-sm mb-8">
                Tu solicitud quedó registrada para que el equipo de la academia pueda darle seguimiento.
              </p>

              <div className="bg-[#D8EF65]/30 border border-[#D8EF65] rounded-xl p-4 mb-6 text-left">
                <p className="text-xs font-bold text-[#182329]/50 uppercase tracking-wider mb-2">Resumen de tu solicitud</p>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Estudiante</dt>
                    <dd className="font-semibold text-[#182329]">{form.nombre}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Nivel</dt>
                    <dd className="font-semibold text-[#182329] capitalize">{form.nivel}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Materia</dt>
                    <dd className="font-semibold text-[#182329]">
                      {form.materia === "matematicas" ? "Matemáticas" : form.materia === "ingles" ? "Inglés" : "Física"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Horario</dt>
                    <dd className="font-semibold text-[#182329]">
                      {form.horario === "lun-mie-1600"
                        ? "Lun y Mié, 16:00–17:00"
                        : form.horario === "mar-jue-1700"
                        ? "Mar y Jue, 17:00–18:00"
                        : "Sábados, 10:00–11:00"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border-2 border-[#163DCE] text-[#163DCE] font-semibold text-sm hover:bg-[#163DCE]/5 transition-colors"
                >
                  Enviar otra solicitud
                </button>
                <Link
                  to="/asesorias"
                  className="px-5 py-2.5 rounded-xl bg-[#163DCE] text-white font-semibold text-sm hover:bg-[#1233aa] transition-colors text-center"
                >
                  Ver más asesorías
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Panel lateral */}
        <aside className="md:col-span-2 space-y-4">
          {/* Qué preparar */}
          <div className="bg-white rounded-2xl border border-[#E2E5EA] p-5">
            <h2 className="font-bold text-[#182329] mb-4">Antes de solicitar</h2>
            <ol className="space-y-4">
              {[
                { n: "1", label: "La materia", desc: "Matemáticas, Inglés o Física." },
                { n: "2", label: "Tu nivel escolar", desc: "Secundaria o bachillerato." },
                { n: "3", label: "El horario", desc: "Consulta la disponibilidad en Horarios y precios." },
              ].map((item) => (
                <li key={item.n} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[#163DCE] text-white flex items-center justify-center font-bold text-xs">
                    {item.n}
                  </span>
                  <div>
                    <p className="font-semibold text-[#182329] text-sm">{item.label}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Links rápidos */}
          <div className="bg-white rounded-2xl border border-[#E2E5EA] p-5">
            <p className="font-bold text-[#182329] mb-3 text-sm">¿Necesitas más información?</p>
            <div className="space-y-2">
              {[
                { to: "/asesorias", label: "Ver catálogo de asesorías", icon: "📚" },
                { to: "/horarios-precios", label: "Horarios y precios", icon: "🗓️" },
                { to: "/metodologia", label: "Cómo funciona cada sesión", icon: "🎯" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F8FA] border border-transparent hover:border-[#E2E5EA] transition-all group"
                >
                  <span className="text-lg" aria-hidden>{l.icon}</span>
                  <span className="text-sm font-medium text-[#182329] group-hover:text-[#163DCE] transition-colors">
                    {l.label}
                  </span>
                  <span className="ml-auto text-[#163DCE] text-sm">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Nota prototipo */}
          <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E2E5EA]">
            <p className="text-xs text-[#6B7280] leading-relaxed">
              <strong className="text-[#182329]">Nota:</strong>               Este formulario registra tu solicitud en la academia. No realiza pagos ni envía mensajes automáticamente.
            </p>
          </div>
        </aside>

      </section>
    </main>
  );
}
