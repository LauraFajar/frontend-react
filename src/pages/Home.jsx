import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const images = [
    "https://www.sena.edu.co/es-co/Noticias/NoticiasImg/competitividad_19032022.jpg?RenditionID=5/400x400/",
    "https://www.sena.edu.co/es-co/Noticias/NoticiasImg/20150018_v2.jpg?RenditionID=6/400x400/",
    "https://www.sena.edu.co/es-co/Noticias/NoticiasImg/Foto%20huerta%20Yambor-15092023.jpg?RenditionID=5/400x400/",
  ];

  const [current, setCurrent] = useState(0);

  // Cambio automático de imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-300 flex items-center justify-center p-6">
      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-5xl w-full grid md:grid-cols-2 gap-10 items-start"
      >
        {/* Columna izquierda (Texto) */}
        <div className="text-left">
          <h1 className="text-5xl font-extrabold text-green-700 mb-4 text-center md:text-left">
            AgroTic
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Bienvenido a{" "}
            <span className="font-semibold text-green-600">AgroTic</span>, la
            plataforma líder en tecnología para el sector agrícola. Conectamos a
            productores, proveedores y expertos para mejorar la eficiencia y
            productividad en el campo.
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-6 mb-3">
            Nuestro objetivo
          </h2>
          <ul className="text-gray-700 list-disc list-inside space-y-2 mb-6">
            <li>Mejorar la productividad y competitividad</li>
            <li>Acceder a innovaciones y tecnologías emergentes</li>
            <li>Conectar con la comunidad agrícola</li>
            <li>Optimizar procesos y reducir costos</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8 text-center md:text-left">
            © 2024 AgroTic. Todos los derechos reservados.
          </p>
        </div>

        {/* Columna derecha (Carrusel redondo) */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full shadow-xl border-4 border-green-200">
            <motion.img
              key={current}
              src={images[current]}
              alt="AgroTic"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            {/* Indicadores */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === current ? "bg-green-600" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
