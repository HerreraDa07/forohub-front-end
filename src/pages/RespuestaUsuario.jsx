import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RespuestaUsuario = () => {
  const [respuesta, setRespuestas] = useState([]);
  const navegacion = useNavigate();
  useEffect(() => {
    const Get = async () => {
      const jwt = localStorage.getItem("jwt");
      const usuario = localStorage.getItem("usuario");
      const request = await axios.get(
        `http://localhost:8080/respuestas/usuario/${usuario}`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setRespuestas(request.data);
    };
    Get();
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-black text-white font-pacifico text-5xl text-center py-5">
        ForoHub
      </header>
      <main className="p-4 flex flex-col flex-grow bg-slate-200 font-kalam">
        <div>
          <button
            onClick={() => navegacion("/foro")}
            className="text-2xl border border-black p-2 bg-white"
          >
            Volver
          </button>
        </div>
        <div className="py-4">
          <ul className="space-y-5">
            {respuesta.map((respuesta) => (
              <li key={respuesta.id}>
                <div className="bg-white p-5 rounded-3xl shadow-xl text-2xl gap-2 flex flex-col">
                  <h1 className="text-3xl font-bold">
                    {"Mensaje: " + respuesta.mensaje}
                  </h1>
                  <h2>{"Solución: " + respuesta.solucion}</h2>
                  <p>
                    {"Fecha: " +
                      new Date(respuesta.fecha).toLocaleDateString("es-Es")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="bg-black py-5"></footer>
    </div>
  );
};

export default RespuestaUsuario;
