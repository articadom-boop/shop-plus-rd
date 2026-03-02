import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Ventas from "./pages/Ventas";
import Inventario from "./pages/Inventario";
import Compras from "./pages/Compras";
import Clientes from "./pages/Clientes";
import Proveedores from "./pages/Proveedores";
import Reportes from "./pages/Reportes";
import Gastos from "./pages/Gastos";
import CierreCaja from "./pages/CierreCaja";
import Impuestos from "./pages/Impuestos";
import Sucursales from "./pages/Sucursales";
import Usuarios from "./pages/Usuarios";
import Configuracion from "./pages/Configuracion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/cierre-caja" element={<CierreCaja />} />
            <Route path="/impuestos" element={<Impuestos />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
