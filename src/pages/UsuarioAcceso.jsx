import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsuarioAcceso = () => {
  const pagina = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const Post = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        correo,
        clave,
      };
      const request = await axios.post("http://localhost:8080/acceso", datos);
      if (request.status === 200) {
        localStorage.setItem("jwt", request.data.jwt);
        pagina("/foro");
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.status) {
        alert("Error al ingresar");
      }
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-black text-white font-pacifico text-center text-5xl pl-5 py-5">
        <h1>ForoHub</h1>
      </header>
      <main className="flex flex-col items-center justify-center h-screen font-kalam text-2xl bg-slate-100">
        <form
          onSubmit={Post}
          className="flex flex-col items-center justify-center w-1/4 gap-3 py-10 border border-black bg-white"
        >
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            required
            id="correo"
            placeholder="Digite aquí un correo electrónico válido"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-11/12 text-center"
          />
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            required
            id="contraseña"
            placeholder="Digite aquí su contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-11/12 text-center"
          />
          <button type="submit" className="border border-black px-5">
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => pagina("/registro")}
            className="border border-black px-5"
          >
            Registrar nuevo usuario
          </button>
        </form>
      </main>
      <footer className="bg-black py-5"></footer>
    </div>
  );
};

export default UsuarioAcceso;
