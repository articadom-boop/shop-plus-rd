import {
  DollarSign, ShoppingBag, Package, Users, FileText, Hash,
  TrendingUp, Eye, Printer, XCircle
} from "lucide-react";
import { KPICard, StatusBadge, PageHeader, DataTableShell } from "@/components/ui-custom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { mes: "Ene", ventas: 245000 },
  { mes: "Feb", ventas: 312000 },
  { mes: "Mar", ventas: 287000 },
  { mes: "Abr", ventas: 395000 },
  { mes: "May", ventas: 420000 },
  { mes: "Jun", ventas: 378000 },
  { mes: "Jul", ventas: 456000 },
  { mes: "Ago", ventas: 512000 },
  { mes: "Sep", ventas: 489000 },
  { mes: "Oct", ventas: 534000 },
  { mes: "Nov", ventas: 478000 },
  { mes: "Dic", ventas: 623000 },
];

const recentSales = [
  { id: 1, fecha: "02/03/2026", cliente: "Juan Pérez", tipo: "Crédito Fiscal", ncf: "B0100000045", total: "RD$ 15,250.00", estado: "aprobado" as const },
  { id: 2, fecha: "02/03/2026", cliente: "María García", tipo: "Consumidor Final", ncf: "B0200000123", total: "RD$ 3,480.00", estado: "enviado" as const },
  { id: 3, fecha: "01/03/2026", cliente: "Empresa XYZ", tipo: "Crédito Fiscal", ncf: "B0100000044", total: "RD$ 45,900.00", estado: "aprobado" as const },
  { id: 4, fecha: "01/03/2026", cliente: "Ana Rodríguez", tipo: "Consumidor Final", ncf: "B0200000122", total: "RD$ 1,200.00", estado: "pendiente" as const },
  { id: 5, fecha: "28/02/2026", cliente: "Pedro Santana", tipo: "Gubernamental", ncf: "B1500000012", total: "RD$ 89,400.00", estado: "rechazado" as const },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Panel de Control" description="Resumen general de tu negocio" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Ventas Hoy"
          value="RD$ 45,230"
          subtitle="12 transacciones"
          icon={DollarSign}
          trend={{ value: "12.5%", positive: true }}
          variant="primary"
        />
        <KPICard
          title="Ventas Mes"
          value="RD$ 1.2M"
          subtitle="Marzo 2026"
          icon={TrendingUp}
          trend={{ value: "8.3%", positive: true }}
          variant="success"
        />
        <KPICard
          title="Inventario"
          value="3,456"
          subtitle="Productos activos"
          icon={Package}
          variant="default"
        />
        <KPICard
          title="Clientes"
          value="1,234"
          subtitle="Registrados"
          icon={Users}
          variant="default"
        />
        <KPICard
          title="e-CF Emitidos"
          value="847"
          subtitle="Este mes"
          icon={FileText}
          variant="primary"
        />
        <KPICard
          title="NCF Consumidos"
          value="234/500"
          subtitle="Disponibles"
          icon={Hash}
          trend={{ value: "46.8%", positive: false }}
          variant="warning"
        />
      </div>

      {/* Chart */}
      <div className="bg-card rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Ventas por Mes</h2>
            <p className="text-sm text-muted-foreground">Resumen anual de ventas</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground">Mensual</button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground">Semanal</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 90%)" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => [`RD$ ${value.toLocaleString()}`, "Ventas"]}
              contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 20% 90%)", boxShadow: "0 4px 12px hsl(220 20% 15% / 0.08)" }}
            />
            <Bar dataKey="ventas" fill="hsl(216 98% 52%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Sales Table */}
      <DataTableShell>
        <div className="p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Últimas Ventas</h2>
          <p className="text-sm text-muted-foreground">Transacciones recientes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Fecha</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Tipo Comprobante</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">NCF</th>
                <th className="text-right py-3 px-5 font-medium text-muted-foreground">Total</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado DGII</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-5 text-foreground">{sale.fecha}</td>
                  <td className="py-3 px-5 font-medium text-foreground">{sale.cliente}</td>
                  <td className="py-3 px-5 text-muted-foreground">{sale.tipo}</td>
                  <td className="py-3 px-5 font-mono text-xs text-foreground">{sale.ncf}</td>
                  <td className="py-3 px-5 text-right font-semibold text-foreground">{sale.total}</td>
                  <td className="py-3 px-5 text-center"><StatusBadge status={sale.estado} /></td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Ver">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Imprimir">
                        <Printer className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Anular">
                        <XCircle className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataTableShell>
    </div>
  );
};

export default Dashboard;
