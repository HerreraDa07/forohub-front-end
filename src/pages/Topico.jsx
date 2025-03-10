import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Topico = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState("");
  const [topico, setTopico] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [solucion, setSolucion] = useState("");
  const navegacion = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setUsuario(localStorage.getItem("usuario"));
    const Get = async () => {
      try {
        console.log(id);
        const request = await axios.get(`http://localhost:8080/topicos/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setTopico(request.data[0]);
        setRespuestas(request.data[1]);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    Get();
  }, [id]);
  const Post = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("jwt");
      const datos = {
        mensaje,
        topico: id,
        solucion,
      };
      const request = await axios.post(
        "http://localhost:8080/respuestas",
        datos,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      if (request.status === 201) {
        navegacion("/foro");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-black text-white font-pacifico text-5xl py-5 text-center">
        ForoHub
      </header>
      <main className="flex flex-col p-4 font-kalam bg-slate-200 flex-grow">
        <div>
          <button
            onClick={() => navegacion("/foro")}
            className="p-2 text-2xl bg-white border border-black"
          >
            Regresar
          </button>
        </div>
        <div className="flex flex-grow p-4 justify-between">
          <div className="flex flex-col">
            <div className="border border-white rounded-3xl bg-white p-5 shadow-xl text-xl gap-3 flex flex-col">
              <h1 className="text-3xl font-bold">{topico.titulo}</h1>
              <h2 className="text-2xl">{topico.mensaje}</h2>
              <p>{"Autor: " + topico.autor?.nombre}</p>
              <p>{"Curso: " + topico.curso?.nombre}</p>
              <p>{"Categoria: " + topico.curso?.categoria}</p>
              <p>
                {"Fecha: " + new Date(topico.fecha).toLocaleDateString("es-ES")}
              </p>
              <p>{"Estado: " + topico.estatus}</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold py-4">Respuestas</h3>
              <ul className="space-y-5">
                {respuestas.map((respuesta) => (
                  <li
                    key={respuesta.id}
                    className="border border-white rounded-3xl bg-white p-5 shadow-xl text-xl flex flex-col gap-2"
                  >
                    <p>
                      {new Date(respuesta.fecha).toLocaleDateString("es-Es")}
                    </p>
                    <h4 className="text-2xl font-bold">{respuesta.mensaje}</h4>
                    <h5>{respuesta.solucion}</h5>
                    <p>
                      {respuesta.autor?.nombre === usuario
                        ? "Mi respuesta"
                        : "Usuario: " + respuesta.autor?.nombre}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-white h-auto border border-white rounded-3xl p-5 shadow-xl text-2xl">
              <form
                onSubmit={Post}
                className="flex flex-col gap-4 items-center"
              >
                <label htmlFor="mensaje" className="font-bold">
                  Mensaje
                </label>
                <textarea
                  type="text"
                  id="mensaje"
                  placeholder="Digite el mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="resize-none h-48 w-full"
                />
                <label htmlFor="solucion" className="font-bold">
                  Solucion
                </label>
                <textarea
                  type="text"
                  id="solucion"
                  placeholder="Digite la solucion"
                  value={solucion}
                  onChange={(e) => setSolucion(e.target.value)}
                  className="resize-none h-48 w-full"
                />
                <button type="submit" className="border border-black w-1/5">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-black py-5"></footer>
    </div>
  );
};

export default Topico;
