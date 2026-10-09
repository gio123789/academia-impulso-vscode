import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import DetalleMatematicas from "./pages/DetalleMatematicas";
import DetalleIngles from "./pages/DetalleIngles";
import DetalleFisica from "./pages/DetalleFisica";
import HorarioPrecios from "./pages/HorarioPrecios";
import Metodologia from "./pages/Metodologia";
import Contacto from "./pages/Contacto";
import MapaNavegacion from "./pages/MapaNavegacion";
import Documento from "./pages/Documento";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full flex flex-col bg-[#F7F8FA]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/asesorias" element={<Catalogo />} />
            <Route path="/asesorias/matematicas" element={<DetalleMatematicas />} />
            <Route path="/asesorias/ingles" element={<DetalleIngles />} />
            <Route path="/asesorias/fisica" element={<DetalleFisica />} />
            <Route path="/horarios-precios" element={<HorarioPrecios />} />
            <Route path="/metodologia" element={<Metodologia />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/mapa-navegacion" element={<MapaNavegacion />} />
            <Route path="/documento" element={<Documento />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
