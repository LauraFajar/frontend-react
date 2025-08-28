import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import EPA from "./pages/fitosanitario/EPA";
import Fitosanitario from "./pages/fitosanitario/Fitosanitario";
import Inventario from "./pages/inventario/Inventario";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fitosanitario/epa" element={<EPA />} />
            <Route path="/fitosanitario" element={<Fitosanitario />} />
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
