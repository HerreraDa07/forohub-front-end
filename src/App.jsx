import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UsuarioAcceso from "./pages/UsuarioAcceso";
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Foro from "./pages/Foro";
import Topico from "./pages/Topico";
import TopicoActualizar from "./pages/TopicoActualizar";
import TopicoRegistro from "./pages/TopicoRegistro";
import RespuestaUsuario from "./pages/RespuestaUsuario";
import "@fontsource/pacifico";
import "@fontsource/kalam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsuarioAcceso />} />
        <Route path="/registro" element={<UsuarioRegistro />} />
        <Route path="/foro" element={<Foro />} />
        <Route path="//respuestas" element={<RespuestaUsuario />} />
        <Route path="/topico/:id" element={<Topico />} />
        <Route path="/topicoActualizar/:id" element={<TopicoActualizar />} />
        <Route path="/topicoRegistro" element={<TopicoRegistro />} />
      </Routes>
    </Router>
  );
}

export default App;
