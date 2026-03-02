import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Receipt, Package, ShoppingCart, Users, Truck,
  BarChart3, Wallet, Landmark, Calculator, Building2, UserCog,
  Settings, LogOut, ChevronLeft, ChevronRight, Store
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Panel", path: "/" },
  { icon: Receipt, label: "Ventas", path: "/ventas" },
  { icon: Package, label: "Inventario", path: "/inventario" },
  { icon: ShoppingCart, label: "Compras", path: "/compras" },
  { icon: Users, label: "Clientes", path: "/clientes" },
  { icon: Truck, label: "Proveedores", path: "/proveedores" },
  { icon: BarChart3, label: "Reportes", path: "/reportes" },
  { icon: Wallet, label: "Gastos", path: "/gastos" },
  { icon: Landmark, label: "Cierre de Caja", path: "/cierre-caja" },
  { icon: Calculator, label: "Impuestos", path: "/impuestos" },
  { icon: Building2, label: "Sucursales", path: "/sucursales" },
  { icon: UserCog, label: "Usuarios", path: "/usuarios" },
  { icon: Settings, label: "Configuración", path: "/configuracion" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar flex flex-col z-50 transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-sidebar-border">
        <Store className="h-7 w-7 text-sidebar-foreground flex-shrink-0" />
        {!collapsed && (
          <span className="text-lg font-bold text-sidebar-foreground tracking-tight">
            Shop+
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-3 border-t border-sidebar-border pt-3">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors w-full">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Salir</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-card border border-border rounded-full p-1 shadow-card hover:shadow-card-hover transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-foreground" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-foreground" />
        )}
      </button>
    </aside>
  );
}
