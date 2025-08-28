import { useState, useEffect } from "react";

export default function EPA() {
  const [epaList, setEpaList] = useState([]);
  const [nombreEpa, setNombreEpa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);

  const API_EPA_CREAR = "http://localhost:3000/api/fitosanitario/epa/crear";
  const API_EPA_LISTAR = "http://localhost:3000/api/fitosanitario/epa/listar";

  // Listar EPA
  const listarEPA = async () => {
    try {
      const response = await fetch(API_EPA_LISTAR);
      const data = await response.json();
      // Ajusta esto según lo que realmente devuelve tu API
      // Por ejemplo, si devuelve { data: [...] }, usa data.data
      setEpaList(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error al cargar EPA:", error);
      setEpaList([]);
    }
  };

  // Registrar EPA
  const registrarEPA = async () => {
    if (!nombreEpa || !descripcion) {
      alert("Completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre_epa", nombreEpa);
    formData.append("descripcion", descripcion);
    if (foto) formData.append("foto", foto);

    try {
      await fetch(API_EPA_CREAR, {
        method: "POST",
        body: formData,
      });

      setNombreEpa("");
      setDescripcion("");
      setFoto(null);
      listarEPA();
    } catch (error) {
      console.error("Error al registrar EPA:", error);
    }
  };

  useEffect(() => {
    listarEPA();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Enfermedades</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabla de EPA */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Listado de EPA</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white text-gray-800">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Descripción</th>
                  <th className="py-3 px-4 text-left">Foto</th>
                </tr>
              </thead>
              <tbody>
                {epaList.length > 0 ? (
                  epaList.map((epa, index) => (
                    <tr
                      key={epa.id_epa}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                    >
                      <td className="py-3 px-4">{epa.id_epa}</td>
                      <td className="py-3 px-4 font-medium">{epa.nombre_epa}</td>
                      <td className="py-3 px-4">{epa.descripcion}</td>
                      <td className="py-3 px-4">
                        {epa.foto ? (
                          <img
                            src={`http://localhost:3000/uploads/${epa.foto}`}
                            alt={epa.nombre_epa}
                            className="w-16 h-16 rounded-lg object-cover border"
                          />
                        ) : (
                          <span className="text-gray-400 italic">Sin foto</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No hay EPA registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar EPA</h2>

          <input
            type="text"
            value={nombreEpa}
            onChange={(e) => setNombreEpa(e.target.value)}
            placeholder="Nombre"
            className="w-full p-2 border rounded mb-3"
          />

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            className="w-full p-2 border rounded mb-3"
            rows="3"
          />

          <div className="mb-3">
            <label className="block text-gray-600 mb-1">Imagen (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              className="w-full p-2 mb-2 border rounded"
            />
          </div>

          <button
            onClick={registrarEPA}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}
