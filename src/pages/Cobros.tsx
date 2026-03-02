import { useState } from "react";
import { Search, Plus, Filter, DollarSign, Calendar, User, CheckCircle, Clock, AlertCircle, Eye, Receipt, PhoneCall } from "lucide-react";
import { PageHeader, DataTableShell, StatusBadge, KPICard } from "@/components/ui-custom";
import { toast } from "sonner";

const cuentasPorCobrar = [
  { id: 1, cliente: "María García", rnc: "001-0067890-1", factura: "B0100000045", fechaVenta: "15/02/2026", vencimiento: "17/03/2026", total: 15200, abonado: 5000, balance: 10200, estado: "pendiente" as const, diasVencido: 0 },
  { id: 2, cliente: "Empresa XYZ SRL", rnc: "130-45678-9", factura: "B0100000038", fechaVenta: "01/02/2026", vencimiento: "03/03/2026", total: 45900, abonado: 20000, balance: 25900, estado: "pendiente" as const, diasVencido: 0 },
  { id: 3, cliente: "Pedro Santana", rnc: "001-0099876-5", factura: "B0100000032", fechaVenta: "10/01/2026", vencimiento: "09/02/2026", total: 8400, abonado: 0, balance: 8400, estado: "pendiente" as const, diasVencido: 21 },
  { id: 4, cliente: "Ana Rodríguez", rnc: "001-0045678-3", factura: "B0100000028", fechaVenta: "20/01/2026", vencimiento: "19/02/2026", total: 12500, abonado: 12500, balance: 0, estado: "aprobado" as const, diasVencido: 0 },
  { id: 5, cliente: "Comercial Dominicana", rnc: "130-98765-4", factura: "B0100000041", fechaVenta: "05/02/2026", vencimiento: "07/03/2026", total: 67300, abonado: 30000, balance: 37300, estado: "pendiente" as const, diasVencido: 0 },
  { id: 6, cliente: "Luis Martínez", rnc: "001-0011223-4", factura: "B0100000020", fechaVenta: "15/12/2025", vencimiento: "14/01/2026", total: 5600, abonado: 2000, balance: 3600, estado: "pendiente" as const, diasVencido: 47 },
];

const pagosRecientes = [
  { id: 1, cliente: "Ana Rodríguez", factura: "B0100000028", fecha: "01/03/2026", monto: "RD$ 5,000.00", metodo: "Efectivo" },
  { id: 2, cliente: "Empresa XYZ SRL", factura: "B0100000038", fecha: "28/02/2026", monto: "RD$ 20,000.00", metodo: "Transferencia" },
  { id: 3, cliente: "María García", factura: "B0100000045", fecha: "25/02/2026", monto: "RD$ 5,000.00", metodo: "Cheque" },
  { id: 4, cliente: "Comercial Dominicana", factura: "B0100000041", fecha: "20/02/2026", monto: "RD$ 30,000.00", metodo: "Transferencia" },
];

const Cobros = () => {
  const [tab, setTab] = useState<"cuentas" | "pagos">("cuentas");
  const [showAbonoModal, setShowAbonoModal] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState<typeof cuentasPorCobrar[0] | null>(null);
  const [abonoMonto, setAbonoMonto] = useState("");
  const [abonoMetodo, setAbonoMetodo] = useState("Efectivo");
  const [abonoNota, setAbonoNota] = useState("");

  const totalPorCobrar = cuentasPorCobrar.reduce((s, c) => s + c.balance, 0);
  const totalVencido = cuentasPorCobrar.filter(c => c.diasVencido > 0).reduce((s, c) => s + c.balance, 0);
  const cobradoMes = 60000;
  const clientesConDeuda = cuentasPorCobrar.filter(c => c.balance > 0).length;

  const handleAbono = (cuenta: typeof cuentasPorCobrar[0]) => {
    setSelectedCuenta(cuenta);
    setShowAbonoModal(true);
    setAbonoMonto("");
    setAbonoMetodo("Efectivo");
    setAbonoNota("");
  };

  const handleRegisterPayment = () => {
    if (!selectedCuenta) return;

    const monto = Number(abonoMonto);
    if (Number.isNaN(monto) || monto <= 0) {
      toast.error("Ingresa un monto válido");
      return;
    }

    if (monto > selectedCuenta.balance) {
      toast.error("El monto no puede exceder el balance pendiente");
      return;
    }

    setShowAbonoModal(false);
    toast.success(`Abono de RD$ ${monto.toLocaleString()} registrado para ${selectedCuenta.cliente}`);
  };

  const handleOpenFirstPending = () => {
    const pending = cuentasPorCobrar.find((cuenta) => cuenta.balance > 0);
    if (!pending) {
      toast.info("No hay cuentas pendientes para registrar pago");
      return;
    }
    handleAbono(pending);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Cobros" description="Gestión de cuentas por cobrar y pagos de clientes">
        <button
          onClick={handleOpenFirstPending}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
        >
          <Plus className="h-4 w-4" /> Registrar Pago
        </button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total por Cobrar" value={`RD$ ${totalPorCobrar.toLocaleString()}`} icon={DollarSign} variant="primary" subtitle="Cuentas activas" />
        <KPICard title="Vencido" value={`RD$ ${totalVencido.toLocaleString()}`} icon={AlertCircle} variant="destructive" subtitle="Requiere atención" />
        <KPICard title="Cobrado este Mes" value={`RD$ ${cobradoMes.toLocaleString()}`} icon={CheckCircle} variant="success" subtitle="Marzo 2026" />
        <KPICard title="Clientes con Deuda" value={clientesConDeuda.toString()} icon={User} variant="warning" subtitle="Cuentas pendientes" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("cuentas")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "cuentas" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Cuentas por Cobrar
        </button>
        <button
          onClick={() => setTab("pagos")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "pagos" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Pagos Recibidos
        </button>
      </div>

      {tab === "cuentas" && (
        <>
          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Buscar por cliente o factura..." className="w-full h-9 pl-9 pr-4 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <select className="h-9 px-3 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="vencido">Vencido</option>
              <option value="pagado">Pagado</option>
            </select>
          </div>

          <DataTableShell>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left py-3 px-5 font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left py-3 px-5 font-medium text-muted-foreground">Factura</th>
                    <th className="text-left py-3 px-5 font-medium text-muted-foreground">Fecha Venta</th>
                    <th className="text-left py-3 px-5 font-medium text-muted-foreground">Vencimiento</th>
                    <th className="text-right py-3 px-5 font-medium text-muted-foreground">Total</th>
                    <th className="text-right py-3 px-5 font-medium text-muted-foreground">Abonado</th>
                    <th className="text-right py-3 px-5 font-medium text-muted-foreground">Balance</th>
                    <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
                    <th className="text-center py-3 px-5 font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cuentasPorCobrar.map((cuenta) => (
                    <tr key={cuenta.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-5">
                        <p className="font-medium text-foreground">{cuenta.cliente}</p>
                        <p className="text-xs text-muted-foreground font-mono">{cuenta.rnc}</p>
                      </td>
                      <td className="py-3 px-5 font-mono text-xs text-foreground">{cuenta.factura}</td>
                      <td className="py-3 px-5 text-muted-foreground">{cuenta.fechaVenta}</td>
                      <td className="py-3 px-5">
                        <span className={`text-sm ${cuenta.diasVencido > 0 ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                          {cuenta.vencimiento}
                          {cuenta.diasVencido > 0 && (
                            <span className="block text-xs">({cuenta.diasVencido} días vencido)</span>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right text-foreground">RD$ {cuenta.total.toLocaleString()}</td>
                      <td className="py-3 px-5 text-right text-success font-medium">RD$ {cuenta.abonado.toLocaleString()}</td>
                      <td className="py-3 px-5 text-right font-semibold text-foreground">RD$ {cuenta.balance.toLocaleString()}</td>
                      <td className="py-3 px-5 text-center">
                        {cuenta.balance === 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">Pagado</span>
                        ) : cuenta.diasVencido > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Vencido</span>
                        ) : (
                          <StatusBadge status="pendiente" />
                        )}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center justify-center gap-1">
                          {cuenta.balance > 0 && (
                            <button
                              onClick={() => handleAbono(cuenta)}
                              className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                            >
                              Abonar
                            </button>
                          )}
                          <button
                            onClick={() => toast.info(`Detalle de factura ${cuenta.factura} (${cuenta.cliente})`)}
                            className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => toast.info(`Contacto enviado a ${cuenta.cliente}`)}
                            className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                            title="Contactar"
                          >
                            <PhoneCall className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DataTableShell>
        </>
      )}

      {tab === "pagos" && (
        <DataTableShell>
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Pagos Recibidos</h2>
            <p className="text-sm text-muted-foreground">Historial de abonos y pagos de clientes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Factura</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Fecha Pago</th>
                  <th className="text-right py-3 px-5 font-medium text-muted-foreground">Monto</th>
                  <th className="text-center py-3 px-5 font-medium text-muted-foreground">Método</th>
                  <th className="text-center py-3 px-5 font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pagosRecientes.map((pago) => (
                  <tr key={pago.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-5 font-medium text-foreground">{pago.cliente}</td>
                    <td className="py-3 px-5 font-mono text-xs text-muted-foreground">{pago.factura}</td>
                    <td className="py-3 px-5 text-muted-foreground">{pago.fecha}</td>
                    <td className="py-3 px-5 text-right font-semibold text-success">{pago.monto}</td>
                    <td className="py-3 px-5 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">{pago.metodo}</span>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button
                        onClick={() => toast.info(`Mostrando recibo de la factura ${pago.factura}`)}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                        title="Ver recibo"
                      >
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataTableShell>
      )}

      {/* Modal Abono */}
      {showAbonoModal && selectedCuenta && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setShowAbonoModal(false)}>
          <div className="bg-card rounded-xl shadow-card-hover w-full max-w-md p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-1">Registrar Abono</h3>
            <p className="text-sm text-muted-foreground mb-5">{selectedCuenta.cliente} — {selectedCuenta.factura}</p>

            <div className="bg-secondary/50 rounded-lg p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Factura</span>
                <span className="font-medium text-foreground">RD$ {selectedCuenta.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ya Abonado</span>
                <span className="font-medium text-success">RD$ {selectedCuenta.abonado.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border">
                <span className="text-foreground">Balance Pendiente</span>
                <span className="text-primary">RD$ {selectedCuenta.balance.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Monto del Abono</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={abonoMonto}
                  onChange={(e) => setAbonoMonto(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Método de Pago</label>
                <select
                  value={abonoMetodo}
                  onChange={(e) => setAbonoMetodo(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option>Efectivo</option>
                  <option>Transferencia</option>
                  <option>Cheque</option>
                  <option>Tarjeta</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nota (opcional)</label>
                <input
                  type="text"
                  placeholder="Referencia o nota del pago..."
                  value={abonoNota}
                  onChange={(e) => setAbonoNota(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAbonoModal(false)}
                className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegisterPayment}
                className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
              >
                Registrar Abono
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cobros;
