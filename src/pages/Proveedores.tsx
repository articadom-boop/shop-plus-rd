import { Plus, Search } from "lucide-react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/ui-custom";

const proveedores = [
  { id: 1, nombre: "Distribuidora Nacional", rnc: "130-12345-6", contacto: "Carlos Méndez", telefono: "809-555-1001", balance: "RD$ 45,600.00", estado: "activo" as const },
  { id: 2, nombre: "Importadora del Caribe", rnc: "130-67890-1", contacto: "Ana López", telefono: "809-555-1002", balance: "RD$ 0.00", estado: "activo" as const },
  { id: 3, nombre: "Alimentos del Sur", rnc: "130-11223-4", contacto: "Roberto Díaz", telefono: "809-555-1003", balance: "RD$ 67,800.00", estado: "activo" as const },
];

const Proveedores = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Proveedores" description="Gestión de proveedores y cuentas por pagar">
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
        <Plus className="h-4 w-4" /> Nuevo Proveedor
      </button>
    </PageHeader>

    <div className="flex gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Buscar proveedor..." className="w-full h-9 pl-9 pr-4 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
    </div>

    <DataTableShell>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Nombre</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">RNC</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Contacto</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Teléfono</th>
              <th className="text-right py-3 px-5 font-medium text-muted-foreground">Balance</th>
              <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                <td className="py-3 px-5 font-medium text-foreground">{p.nombre}</td>
                <td className="py-3 px-5 font-mono text-xs text-muted-foreground">{p.rnc}</td>
                <td className="py-3 px-5 text-muted-foreground">{p.contacto}</td>
                <td className="py-3 px-5 text-muted-foreground">{p.telefono}</td>
                <td className="py-3 px-5 text-right font-semibold text-foreground">{p.balance}</td>
                <td className="py-3 px-5 text-center"><StatusBadge status={p.estado} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataTableShell>
  </div>
);

export default Proveedores;
