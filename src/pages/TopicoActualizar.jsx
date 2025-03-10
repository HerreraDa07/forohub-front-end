import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TopicoActualizar = () => {
  const { id } = useParams();
  const [topico, setTopico] = useState([]);
  const [titulo0, setTitulo0] = useState("");
  const [titulo1, setTitulo1] = useState("");
  const [mensaje0, setMensaje0] = useState("");
  const [mensaje1, setMensaje1] = useState("");
  const navegacion = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const Get = async () => {
      try {
        const request = await axios.get(`http://localhost:8080/topicos/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setTopico(request.data[0]);
        setTitulo0(request.data[0].titulo);
        setTitulo1(request.data[0].titulo);
        setMensaje0(request.data[0].mensaje);
        setMensaje1(request.data[0].mensaje);
      } catch (error) {
        console.error("Error ", error);
      }
    };
    Get();
  }, [id]);
  const Delete = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const request = await axios.delete(
        `http://localhost:8080/topicos/${id}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      if (request.status === 204) {
        navegacion("/foro");
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };
  const Put = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("jwt");
      const datos = { id };
      if (titulo1 != titulo0) datos.titulo = titulo1;
      if (mensaje1 != mensaje0) datos.mensaje = mensaje1;
      if (titulo1 != titulo0 || mensaje1 != mensaje0) {
        const request = await axios.put(
          "http://localhost:8080/topicos",
          datos,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        if (request.status === 200) {
          navegacion("/foro");
        }
      } else {
        alert("Los datos siguen igual");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="text-5xl py-5 text-center bg-black text-white font-pacifico">
        <h1>ForoHub</h1>
      </header>
      <main className="flex flex-col p-4 font-kalam bg-slate-200 flex-grow gap-4">
        <div className="text-2xl flex justify-between">
          <button
            onClick={() => navegacion("/foro")}
            className="border border-black p-2 bg-white"
          >
            Volver
          </button>
          <button onClick={Delete} className="text-white p-2 bg-red-500">
            Eliminar topico
          </button>
        </div>
        <div>
          <div className="flex flex-col text-2xl bg-white rounded-3xl p-5 shadow-xl h-auto gap-4">
            <p>
              {"Fecha: " + new Date(topico.fecha).toLocaleDateString("es-Es")}
            </p>
            <p>{"Curso: " + topico.curso?.nombre}</p>
            <p>{"Categoria: " + topico.curso?.categoria}</p>
            <p>{"Estado: " + topico.estatus}</p>
            <form onSubmit={Put} className="flex flex-col gap-2 items-center">
              <label htmlFor="titulo" className="font-bold text-3xl">
                Titulo:
              </label>
              <textarea
                type="text"
                id="titulo"
                value={titulo1}
                onChange={(e) => setTitulo1(e.target.value)}
                className="resize-none h-40 w-full p-1"
              />
              <label htmlFor="mensaje" className="font-bold text-3xl">
                Mensaje:
              </label>
              <textarea
                type="text"
                id="mensaje"
                value={mensaje1}
                onChange={(e) => setMensaje1(e.target.value)}
                className="resize-none h-40 w-full p-1"
              />
              <button
                type="submit"
                className="bg-lime-500 text-white text-3xl p-2 w-1/12"
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer className="bg-black text-white font-kalam py-5 text-xl">
        <h3>Desarrollado Por:</h3>
      </footer>
    </div>
  );
};

export default TopicoActualizar;
