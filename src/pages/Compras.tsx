import { Plus, Search, Upload } from "lucide-react";
import { PageHeader, DataTableShell } from "@/components/ui-custom";

const compras = [
  { id: 1, proveedor: "Distribuidora Nacional", fecha: "28/02/2026", productos: 12, total: "RD$ 45,600.00", pago: "Crédito 30 días", estado: "Recibida" },
  { id: 2, proveedor: "Importadora del Caribe", fecha: "25/02/2026", productos: 8, total: "RD$ 32,100.00", pago: "Efectivo", estado: "Pendiente" },
  { id: 3, proveedor: "Alimentos del Sur", fecha: "20/02/2026", productos: 15, total: "RD$ 67,800.00", pago: "Transferencia", estado: "Recibida" },
];

const Compras = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Compras" description="Gestión de órdenes de compra">
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
        <Plus className="h-4 w-4" /> Nueva Compra
      </button>
    </PageHeader>

    {/* Quick Form Card */}
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Registrar Compra Rápida</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Proveedor</label>
          <select className="w-full h-9 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option>Seleccionar proveedor...</option>
            <option>Distribuidora Nacional</option>
            <option>Importadora del Caribe</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Fecha</label>
          <input type="date" className="w-full h-9 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Factura del Proveedor</label>
          <button className="w-full h-9 px-3 rounded-lg bg-secondary text-sm text-muted-foreground flex items-center gap-2 hover:bg-muted transition-colors">
            <Upload className="h-4 w-4" /> Adjuntar archivo
          </button>
        </div>
      </div>
    </div>

    <DataTableShell>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Proveedor</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Fecha</th>
              <th className="text-center py-3 px-5 font-medium text-muted-foreground">Productos</th>
              <th className="text-right py-3 px-5 font-medium text-muted-foreground">Total</th>
              <th className="text-left py-3 px-5 font-medium text-muted-foreground">Forma de Pago</th>
              <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-5 font-medium text-foreground">{c.proveedor}</td>
                <td className="py-3 px-5 text-muted-foreground">{c.fecha}</td>
                <td className="py-3 px-5 text-center text-foreground">{c.productos}</td>
                <td className="py-3 px-5 text-right font-semibold text-foreground">{c.total}</td>
                <td className="py-3 px-5 text-muted-foreground">{c.pago}</td>
                <td className="py-3 px-5 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    c.estado === "Recibida" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>{c.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataTableShell>
  </div>
);

export default Compras;
