import { DollarSign, TrendingUp, TrendingDown, BarChart3, Users, ShoppingBag, Filter, Download } from "lucide-react";
import { KPICard, PageHeader } from "@/components/ui-custom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ventasMes = [
  { mes: "Ene", ventas: 245 }, { mes: "Feb", ventas: 312 }, { mes: "Mar", ventas: 287 },
  { mes: "Abr", ventas: 395 }, { mes: "May", ventas: 420 }, { mes: "Jun", ventas: 378 },
];

const topProducts = [
  { name: "Arroz Selecto", value: 340 },
  { name: "Café Santo Domingo", value: 280 },
  { name: "Aceite Crisol", value: 220 },
  { name: "Leche Milex", value: 180 },
  { name: "Otros", value: 150 },
];

const COLORS = ["hsl(216 98% 52%)", "hsl(216 90% 44%)", "hsl(153 72% 31%)", "hsl(45 93% 47%)", "hsl(220 20% 80%)"];

const Reportes = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Reportes" description="Análisis y estadísticas del negocio">
      <button className="h-9 px-3 rounded-lg bg-card border border-border text-sm font-medium text-foreground flex items-center gap-2 hover:bg-secondary transition-colors">
        <Filter className="h-4 w-4" /> Filtros
      </button>
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
        <Download className="h-4 w-4" /> Exportar
      </button>
    </PageHeader>

    {/* Filters Bar */}
    <div className="bg-card rounded-lg shadow-card p-4 flex flex-wrap gap-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Fecha Inicio</label>
        <input type="date" className="h-8 px-3 rounded-md bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Fecha Fin</label>
        <input type="date" className="h-8 px-3 rounded-md bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Sucursal</label>
        <select className="h-8 px-3 rounded-md bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option>Todas</option>
          <option>Sucursal Principal</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Comprobante</label>
        <select className="h-8 px-3 rounded-md bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option>Todos</option>
          <option>Consumidor Final</option>
          <option>Crédito Fiscal</option>
        </select>
      </div>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Ventas del Mes" value="RD$ 1.2M" icon={DollarSign} variant="primary" trend={{ value: "8.3%", positive: true }} />
      <KPICard title="ITBIS Cobrado" value="RD$ 216,000" icon={TrendingUp} variant="success" />
      <KPICard title="ITBIS Pagado" value="RD$ 89,400" icon={TrendingDown} variant="warning" />
      <KPICard title="Ganancia Neta" value="RD$ 456,000" icon={BarChart3} variant="primary" trend={{ value: "5.2%", positive: true }} />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-card rounded-lg shadow-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Ventas por Mes (Miles RD$)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ventasMes}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 90%)" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} />
            <Tooltip />
            <Bar dataKey="ventas" fill="hsl(216 98% 52%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-lg shadow-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Productos Más Vendidos</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={topProducts} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {topProducts.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default Reportes;
