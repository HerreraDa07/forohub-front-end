import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsuarioRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const navegacion = useNavigate();
  const Post = async (e) => {
    e.preventDefault();
    try {
      const datos = {
        nombre,
        correo,
        clave,
      };
      const request = await axios.post("http://localhost:8080/registro", datos);
      if (request.status === 201) {
        navegacion("/");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-black text-white text-center text-5xl py-5 font-pacifico">
        <h1>ForoHub</h1>
      </header>
      <main className="flex flex-col items-center justify-center h-screen text-2xl font-kalam bg-slate-100">
        <form
          onSubmit={Post}
          className="flex flex-col items-center justify-center w-1/4 gap-4 py-10 bg-white border border-black"
        >
          <h2 className="text-3xl">Registrar nuevo usuario</h2>
          <label htmlFor="usuario">Nombre de usuario</label>
          <input
            type="text"
            id="usuario"
            placeholder="Digite aquí su nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="text-center w-11/12"
            required
          />
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            placeholder="Digite aquí su correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="text-center w-11/12"
            required
          />
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            placeholder="Digite aquí su contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="text-center w-11/12"
            required
          />
          <button type="submit" className="border border-black p-2">
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navegacion("/")}
            className="border border-black p-2"
          >
            Cancelar
          </button>
        </form>
      </main>
      <footer className="bg-black text-white text-xl py-5 font-kalam">
        <h3>Desarrollado Por:</h3>
      </footer>
    </div>
  );
};

export default UsuarioRegistro;
