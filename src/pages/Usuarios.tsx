import { PageHeader, StatusBadge, DataTableShell } from "@/components/ui-custom";
import { Plus, Shield } from "lucide-react";

const usuarios = [
  { id: 1, nombre: "Admin Principal", email: "admin@shopplus.do", rol: "Administrador", sucursal: "Todas", estado: "activo" as const },
  { id: 2, nombre: "María García", email: "maria@shopplus.do", rol: "Cajero", sucursal: "Sucursal Principal", estado: "activo" as const },
  { id: 3, nombre: "Pedro Santos", email: "pedro@shopplus.do", rol: "Supervisor", sucursal: "Sucursal Norte", estado: "activo" as const },
  { id: 4, nombre: "Ana López", email: "ana@shopplus.do", rol: "Contador", sucursal: "Todas", estado: "inactivo" as const },
];

const rolColors: Record<string, string> = {
  "Administrador": "bg-primary/10 text-primary",
  "Cajero": "bg-success/10 text-success",
  "Supervisor": "bg-warning/10 text-warning",
  "Contador": "bg-accent/10 text-accent",
};

const Usuarios = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Usuarios" description="Gestión de usuarios y roles del sistema">
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
        <Plus className="h-4 w-4" /> Nuevo Usuario
      </button>
    </PageHeader>

    <DataTableShell>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Nombre</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Email</th>
              <th className="text-center py-3 px-5 font-medium text-muted-foreground">Rol</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Sucursal</th>
              <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-5 font-medium text-foreground">{u.nombre}</td>
                <td className="py-3 px-5 text-muted-foreground">{u.email}</td>
                <td className="py-3 px-5 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${rolColors[u.rol]}`}>
                    <Shield className="h-3 w-3" /> {u.rol}
                  </span>
                </td>
                <td className="py-3 px-5 text-muted-foreground">{u.sucursal}</td>
                <td className="py-3 px-5 text-center"><StatusBadge status={u.estado} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataTableShell>
  </div>
);

export default Usuarios;
