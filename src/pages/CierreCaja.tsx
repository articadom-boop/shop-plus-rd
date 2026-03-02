import { PageHeader, KPICard } from "@/components/ui-custom";
import { DollarSign, CreditCard, Banknote, AlertTriangle, Lock } from "lucide-react";

const cajas = [
  { id: 1, cajero: "María García", apertura: "08:00 AM", montoInicial: "RD$ 5,000.00", efectivo: "RD$ 23,450.00", tarjeta: "RD$ 15,200.00", diferencia: "RD$ 0.00", estado: "Abierta" },
  { id: 2, cajero: "Pedro Santos", apertura: "08:00 AM", montoInicial: "RD$ 5,000.00", efectivo: "RD$ 18,900.00", tarjeta: "RD$ 12,300.00", diferencia: "-RD$ 150.00", estado: "Cerrada" },
];

const CierreCaja = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Cierre de Caja" description="Control de apertura y cierre de caja diario">
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
        <Lock className="h-4 w-4" /> Cerrar Caja
      </button>
    </PageHeader>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Monto Inicial" value="RD$ 5,000" icon={DollarSign} variant="default" />
      <KPICard title="Ventas Efectivo" value="RD$ 23,450" icon={Banknote} variant="success" />
      <KPICard title="Ventas Tarjeta" value="RD$ 15,200" icon={CreditCard} variant="primary" />
      <KPICard title="Diferencia" value="RD$ 0.00" icon={AlertTriangle} variant="warning" />
    </div>

    <div className="space-y-4">
      {cajas.map((caja) => (
        <div key={caja.id} className="bg-card rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">{caja.cajero}</h3>
              <p className="text-sm text-muted-foreground">Apertura: {caja.apertura}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              caja.estado === "Abierta" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            }`}>{caja.estado}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Monto Inicial", value: caja.montoInicial },
              { label: "Efectivo", value: caja.efectivo },
              { label: "Tarjeta", value: caja.tarjeta },
              { label: "Diferencia", value: caja.diferencia },
              { label: "Estado", value: caja.estado },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CierreCaja;
