import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/ui-custom";
import { toast } from "sonner";
import { QuickCreateDialog } from "@/components/QuickCreateDialog";

const initialClientes = [
  { id: 1, nombre: "Juan Pérez", rnc: "001-0012345-6", email: "juan@email.com", telefono: "809-555-0101", balance: "RD$ 0.00", estado: "activo" as const },
  { id: 2, nombre: "María García", rnc: "001-0067890-1", email: "maria@email.com", telefono: "809-555-0202", balance: "RD$ 15,200.00", estado: "activo" as const },
  { id: 3, nombre: "Empresa XYZ SRL", rnc: "130-45678-9", email: "info@xyz.com", telefono: "809-555-0303", balance: "RD$ 45,000.00", estado: "activo" as const },
  { id: 4, nombre: "Pedro Santana", rnc: "001-0099876-5", email: "pedro@email.com", telefono: "809-555-0404", balance: "RD$ 0.00", estado: "inactivo" as const },
];

const Clientes = () => {
  const [clientes, setClientes] = useState(initialClientes);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const filteredClientes = useMemo(
    () =>
      clientes.filter((cliente) =>
        [cliente.nombre, cliente.rnc, cliente.email, cliente.telefono]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    [clientes, searchTerm],
  );

  const handleCreateClient = (values: Record<string, string>) => {
    const nombre = values.nombre?.trim() ?? "";
    const rnc = values.rnc?.trim() ?? "";
    const email = values.email?.trim() ?? "";
    const telefono = values.telefono?.trim() ?? "";

    if (!nombre || !rnc || !email || !telefono) {
      toast.error("Completa todos los campos");
      return;
    }

    const exists = clientes.some((cliente) => cliente.rnc === rnc);
    if (exists) {
      toast.error("Ya existe un cliente con ese RNC/Cédula");
      return;
    }

    const nextId = Math.max(0, ...clientes.map((cliente) => cliente.id)) + 1;
    setClientes((prev) => [
      { id: nextId, nombre, rnc, email, telefono, balance: "RD$ 0.00", estado: "activo" },
      ...prev,
    ]);
    setShowNewClientModal(false);
    toast.success("Cliente creado correctamente");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Clientes" description="Gestión de clientes y cuentas por cobrar">
        <button
          onClick={() => setShowNewClientModal(true)}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
        >
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </button>
      </PageHeader>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <DataTableShell>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Nombre</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">RNC/Cédula</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Teléfono</th>
                <th className="text-right py-3 px-5 font-medium text-muted-foreground">Balance</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="py-3 px-5 font-medium text-foreground">{c.nombre}</td>
                  <td className="py-3 px-5 font-mono text-xs text-muted-foreground">{c.rnc}</td>
                  <td className="py-3 px-5 text-muted-foreground">{c.email}</td>
                  <td className="py-3 px-5 text-muted-foreground">{c.telefono}</td>
                  <td className="py-3 px-5 text-right font-semibold text-foreground">{c.balance}</td>
                  <td className="py-3 px-5 text-center"><StatusBadge status={c.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataTableShell>

      <QuickCreateDialog
        open={showNewClientModal}
        onOpenChange={setShowNewClientModal}
        title="Nuevo cliente"
        description="Registra un cliente para facturación y cobros."
        submitLabel="Guardar cliente"
        fields={[
          { key: "nombre", label: "Nombre o razón social", required: true, placeholder: "Ej: Comercial XYZ SRL" },
          { key: "rnc", label: "RNC/Cédula", required: true, placeholder: "Ej: 130-12345-6" },
          { key: "email", label: "Correo", type: "email", required: true, placeholder: "correo@dominio.com" },
          { key: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "809-555-0000" },
        ]}
        onSubmit={handleCreateClient}
      />
    </div>
  );
};

export default Clientes;
