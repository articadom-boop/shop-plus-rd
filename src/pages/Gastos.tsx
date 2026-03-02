import { PageHeader, KPICard } from "@/components/ui-custom";
import { Plus, Search, Wallet, TrendingDown } from "lucide-react";
import { DataTableShell } from "@/components/ui-custom";

const gastos = [
  { id: 1, descripcion: "Alquiler Local", categoria: "Operaciones", fecha: "01/03/2026", monto: "RD$ 45,000.00" },
  { id: 2, descripcion: "Electricidad", categoria: "Servicios", fecha: "28/02/2026", monto: "RD$ 8,500.00" },
  { id: 3, descripcion: "Nómina Empleados", categoria: "Personal", fecha: "28/02/2026", monto: "RD$ 120,000.00" },
  { id: 4, descripcion: "Internet y Teléfono", categoria: "Servicios", fecha: "25/02/2026", monto: "RD$ 4,200.00" },
];

const Gastos = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Gastos" description="Control de gastos operativos">
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
        <Plus className="h-4 w-4" /> Nuevo Gasto
      </button>
    </PageHeader>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <KPICard title="Gastos del Mes" value="RD$ 177,700" icon={Wallet} variant="destructive" />
      <KPICard title="vs Mes Anterior" value="-12.3%" subtitle="RD$ 24,500 menos" icon={TrendingDown} variant="success" />
    </div>

    <DataTableShell>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Descripción</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Categoría</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Fecha</th>
              <th className="text-right py-3 px-5 font-medium text-muted-foreground">Monto</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((g) => (
              <tr key={g.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-5 font-medium text-foreground">{g.descripcion}</td>
                <td className="py-3 px-5 text-muted-foreground">{g.categoria}</td>
                <td className="py-3 px-5 text-muted-foreground">{g.fecha}</td>
                <td className="py-3 px-5 text-right font-semibold text-foreground">{g.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataTableShell>
  </div>
);

export default Gastos;
