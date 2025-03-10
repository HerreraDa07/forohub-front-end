import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Foro = () => {
  const [usuario, setUsuario] = useState("");
  const [topicos, setTopicos] = useState([]);
  const navegacion = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const Get = async () => {
      const request = await axios.get("http://localhost:8080/usuario/obtener", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setUsuario(request.data.nombre);
      localStorage.setItem("usuario", request.data.nombre);
      try {
        const request = await axios.get("http://localhost:8080/topicos", {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setTopicos(request.data.content);
        console.log(request.data.content);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    Get();
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-black text-white font-pacifico text-5xl py-5 text-center">
        <h1>ForoHub</h1>
      </header>
      <main className="flex flex-col p-4 font-kalam bg-slate-200 flex-grow">
        <div className="flex flex-row py-2 justify-between items-center">
          <h2 className="text-3xl font-bold">{`Bienvenido ${usuario}`}</h2>
          <button
            onClick={() => navegacion("/respuestas")}
            className="border border-black bg-white text-2xl p-2"
          >
            Mis respuestas
          </button>
        </div>
        <div>
          <div className="flex flex-grow justify-between py-2 items-center">
            <h3 className="text-2xl font-bold">Últimos tópicos</h3>
            <button
              onClick={() => navegacion("/topicoRegistro")}
              className="border border-black bg-white p-2 text-2xl"
            >
              Registrar topico
            </button>
          </div>
          <ul className="space-y-5">
            {topicos.map((topico) => (
              <li
                key={topico.id}
                className="p-4 rounded-3xl shadow-xl bg-white flex flex-row justify-between"
              >
                <div className="text-xl">
                  <h4 className="text-2xl font-bold">{topico.titulo}</h4>
                  <p>{topico.mensaje}</p>
                  <p>
                    {"Fecha de creación: " +
                      new Date(topico.fecha).toLocaleDateString("es-ES")}
                  </p>
                  <p>{topico.estatus}</p>
                  <p>
                    {"Autor: " +
                      (topico.autor.nombre === usuario
                        ? "Yo"
                        : topico.autor.nombre)}
                  </p>
                </div>
                <div className="text-2xl flex items-center">
                  {topico.autor.nombre === usuario ? (
                    <button
                      onClick={() =>
                        navegacion(`/topicoActualizar/${topico.id}`)
                      }
                      className="border border-black p-2"
                    >
                      Editar
                    </button>
                  ) : (
                    <button
                      onClick={() => navegacion(`/topico/${topico.id}`)}
                      className="border border-black p-2"
                    >
                      Responder
                    </button>
                  )}
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

export default Foro;
