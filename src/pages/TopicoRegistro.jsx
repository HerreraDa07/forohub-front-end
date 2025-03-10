import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopicoRegistro = () => {
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [curso, setCurso] = useState(null);
  const cursos = [
    { id: 1, nombre: "Programación Orientada a Objetos", categoria: "C" },
    { id: 2, nombre: "Estructuras de Control", categoria: "C_SHARP" },
    { id: 3, nombre: "Desarrollo Móvil", categoria: "JAVA" },
    { id: 4, nombre: "Desarrollo Web", categoria: "JAVA_SCRIPT" },
    { id: 5, nombre: "Inteligencia Artificial", categoria: "PYTHON" },
    { id: 6, nombre: "Consultas Avanzadas", categoria: "SQL" },
  ];
  const navegacion = useNavigate();
  const Post = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("jwt");
      if (!curso) {
        alert("Debe seleccionar un curso");
      } else {
        const datos = {
          titulo,
          mensaje,
          estatus: "Activo",
          curso,
        };
        const request = await axios.post(
          "http://localhost:8080/topicos",
          datos,
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        if (request.status === 201) {
          navegacion("/foro");
        }
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-black text-white py-5 text-5xl font-pacifico text-center">
        <h1>ForoHub</h1>
      </header>
      <main className="p-4 flex flex-col flex-grow font-kalam bg-slate-200 gap-4">
        <div>
          <button
            onClick={() => navegacion("/foro")}
            className="bg-white border border-black text-2xl p-2"
          >
            Volver
          </button>
        </div>
        <div className="p-6 bg-white rounded-3xl shadow-xl h-full">
          <form onSubmit={Post} className="flex flex-col gap-4 items-center">
            <label htmlFor="titulo" className="text-3xl font-bold">
              Titulo
            </label>
            <textarea
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite el titulo"
              className="resize-none h-48 w-full text-2xl"
            />
            <label htmlFor="mensaje" className="text-3xl font-bold">
              Mensaje
            </label>
            <textarea
              type="text"
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Digite el mensaje"
              className="resize-none h-48 w-full text-2xl"
            />
            <div className="flex gap-4">
              {cursos.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCurso(c.id)}
                  className={`border border-black text-xl p-2 ${
                    curso === c.id ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                >
                  {c.nombre + c.categoria}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="border border-black p-2 text-2xl w-1/12"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
      <footer className="text-xl text-white bg-black py-5 font-kalam">
        <h3>Desarrollado Por:</h3>
      </footer>
    </div>
  );
};

export default TopicoRegistro;
