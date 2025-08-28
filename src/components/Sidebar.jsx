import { Home, Leaf, Package, Wifi, Sprout, DollarSign, Activity } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Inicio", icon: <Home size={22} />, path: "/" },
    { name: "IoT", icon: <Wifi size={22} />, path: "/iot/IOT" }, 
    { name: "Cultivos", icon: <Sprout size={22} />, path: "/cultivos/Trazabilidad" }, 
    { name: "Fitosanitario", icon: <Leaf size={22} />, path: "/fitosanitario/epa" },
    { name: "Finanzas", icon: <DollarSign size={22} />, path: "/finanzas/graficas" },
    { name: "Inventario", icon: <Package size={22} />, path: "/inventario" },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <img src={logo} alt="Logo" className="w-36" />
      </div>

      {/* Menú */}
      <nav className="flex-1 px-4 space-y-4 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg font-medium shadow-md transition-all ${
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
  );
};

export default Sidebar;
