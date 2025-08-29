import React, { useState, useEffect } from "react";

const API_EPA = "http://localhost:3000/api/fitosanitario/epa";
const API_TRAT = "http://localhost:3000/api/fitosanitario/tratamiento";

export default function Fitosanitario() {
  const [vista, setVista] = useState("epa");

  // ==== Estados EPA ====
  const [nombreEpa, setNombreEpa] = useState("");
  const [descripcionEpa, setDescripcionEpa] = useState("");
  const [fotoEpa, setFotoEpa] = useState("");
  const [epaList, setEpaList] = useState([]);

  // ==== Estados Tratamiento ====
  const [descripcionTrat, setDescripcionTrat] = useState("");
  const [dosisTrat, setDosisTrat] = useState("");
  const [frecuenciaTrat, setFrecuenciaTrat] = useState("");
  const [idEpaTrat, setIdEpaTrat] = useState("");
  const [tratList, setTratList] = useState([]);

  // ====== FUNCIONES EPA ======
  const listarEPA = async () => {
    try {
      const res = await fetch(`${API_EPA}/listar`);
      const data = await res.json();
      setEpaList(data);
    } catch (err) {
      console.error("Error al listar EPA:", err);
      setEpaList([]);
    }
  };

  const registrarEPA = async () => {
    if (!nombreEpa || !descripcionEpa) return alert("Completa todos los campos de EPA.");
    try {
      await fetch(`${API_EPA}/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_epa: nombreEpa, descripcion: descripcionEpa, foto: fotoEpa }),
      });
      setNombreEpa("");
      setDescripcionEpa("");
      setFotoEpa("");
      listarEPA();
    } catch (err) {
      console.error("Error al registrar EPA:", err);
    }
  };

  // ====== FUNCIONES TRATAMIENTOS ======
  const listarTrat = async () => {
    try {
      const res = await fetch(`${API_TRAT}/listar`);
      const data = await res.json();
      setTratList(data);
    } catch (err) {
      console.error("Error al listar tratamientos:", err);
      setTratList([]);
    }
  };

  const registrarTrat = async () => {
    if (!descripcionTrat || !dosisTrat || !frecuenciaTrat || !idEpaTrat)
      return alert("Completa todos los campos del tratamiento.");

    try {
      await fetch(`${API_TRAT}/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion: descripcionTrat,
          dosis: dosisTrat,
          frecuencia: frecuenciaTrat,
          id_epa: Number(idEpaTrat),
        }),
      });

      setDescripcionTrat("");
      setDosisTrat("");
      setFrecuenciaTrat("");
      setIdEpaTrat("");
      listarTrat();
    } catch (err) {
      console.error("Error al registrar tratamiento:", err);
    }
  };

  // ==== useEffect inicial ====
  useEffect(() => {
    listarEPA();
    listarTrat();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión Fitosanitario</h1>

      {/* Botones de navegación */}
      <div className="mb-6">
        <button
          className={`px-4 py-2 mr-2 rounded ${vista === "epa" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setVista("epa")}
        >
          Enfermedades (EPA)
        </button>
        <button
          className={`px-4 py-2 rounded ${vista === "trat" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setVista("trat")}
        >
          Tratamientos
        </button>
      </div>

      {/* Vista de EPA */}
      {vista === "epa" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista en tabla */}
          <div className="bg-white p-5 rounded-xl shadow border overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-green-600">
                <tr>
                  <th className="border px-4 py-2, text-white" >ID</th>
                  <th className="border px-4 py-2, text-white">Nombre</th>
                  <th className="border px-4 py-2, text-white">Descripción</th>
                  <th className="border px-4 py-2, text-white">Foto</th>
                </tr>
              </thead>
              <tbody>
                {epaList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">No hay registros de EPA</td>
                  </tr>
                ) : (
                  epaList.map((epa) => (
                    <tr key={epa.id_epa} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{epa.id_epa}</td>
                      <td className="border px-4 py-2">{epa.nombre_epa}</td>
                      <td className="border px-4 py-2">{epa.descripcion}</td>
                      <td className="border px-4 py-2">
                        {epa.foto && <img src={epa.foto} alt={epa.nombre_epa} className="h-16 w-16 object-cover rounded" />}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Formulario EPA */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar EPA</h2>
            <input
              type="text"
              value={nombreEpa}
              onChange={(e) => setNombreEpa(e.target.value)}
              placeholder="Nombre"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              value={descripcionEpa}
              onChange={(e) => setDescripcionEpa(e.target.value)}
              placeholder="Descripción"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              value={fotoEpa}
              onChange={(e) => setFotoEpa(e.target.value)}
              placeholder="URL de la foto"
              className="w-full p-2 border rounded mb-3"
            />
            <button
              onClick={registrarEPA}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              Registrar
            </button>
          </div>
        </div>
      )}

      {/* Vista de Tratamientos */}
      {vista === "trat" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista en tabla */}
          <div className="bg-white p-5 rounded-xl shadow border overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-green-600">
                <tr>
                  <th className="border px-4 py-2, text-white">ID</th>
                  <th className="border px-4 py-2, text-white">Descripción</th>
                  <th className="border px-4 py-2, text-white">Dosis</th>
                  <th className="border px-4 py-2, text-white">Frecuencia</th>
                  <th className="border px-4 py-2, text-white">EPA</th>
                </tr>
              </thead>
              <tbody>
                {tratList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4">No hay registros de tratamientos</td>
                  </tr>
                ) : (
                  tratList.map((trat) => (
                    <tr key={trat.id_tratamiento} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{trat.id_tratamiento}</td>
                      <td className="border px-4 py-2">{trat.descripcion}</td>
                      <td className="border px-4 py-2">{trat.dosis}</td>
                      <td className="border px-4 py-2">{trat.frecuencia}</td>
                      <td className="border px-4 py-2">{trat.id_epa}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Formulario Tratamiento */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar Tratamiento</h2>
            <input
              type="text"
              value={descripcionTrat}
              onChange={(e) => setDescripcionTrat(e.target.value)}
              placeholder="Descripción"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              value={dosisTrat}
              onChange={(e) => setDosisTrat(e.target.value)}
              placeholder="Dosis"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              value={frecuenciaTrat}
              onChange={(e) => setFrecuenciaTrat(e.target.value)}
              placeholder="Frecuencia"
              className="w-full p-2 border rounded mb-3"
            />
            <select
              value={idEpaTrat}
              onChange={(e) => setIdEpaTrat(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="">Selecciona EPA</option>
              {epaList.map((epa) => (
                <option key={epa.id_epa} value={epa.id_epa}>
                  {epa.nombre_epa}
                </option>
              ))}
            </select>
            <button
              onClick={registrarTrat}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              Registrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
