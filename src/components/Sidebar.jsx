import { useState } from "react";
import { Home, Leaf, Package, Wifi, Sprout, DollarSign, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", icon: <Home size={22} />, path: "/" },
    { name: "IoT", icon: <Wifi size={22} />, path: "/iot/IOT" },
    { name: "Cultivos", icon: <Sprout size={22} />, path: "/cultivos/Trazabilidad" },
    { name: "Fitosanitario", icon: <Leaf size={22} />, path: "/fitosanitario/epa" },
    { name: "Finanzas", icon: <DollarSign size={22} />, path: "/finanzas/graficas" },
    { name: "Inventario", icon: <Package size={22} />, path: "/inventario" },
  ];

  return (
    <>
      {/* Botón Hamburguesa (solo en móvil) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 p-2 rounded-lg text-white shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay oscuro con animación */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 animate-fadeIn lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar flotante con animación */}
      <div
        className={`fixed top-4 left-4 h-[95%] w-64 bg-white shadow-2xl flex flex-col border border-gray-200 rounded-3xl transform transition-all duration-300 z-40
        ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} 
        lg:translate-x-0 lg:opacity-100`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-gray-100">
          <img src={logo} alt="Logo" className="w-28" />
        </div>

        {/* Menú */}
        <nav className="flex-1 px-4 space-y-4 mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl font-medium shadow-md transition-all ${
                location.pathname === item.path
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-green-100"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Empuje del contenido en pantallas grandes */}
      <div className="lg:ml-72" />
    </>
  );
};

export default Sidebar;
