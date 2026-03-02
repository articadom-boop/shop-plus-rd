import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader, DataTableShell, StatusBadge } from "@/components/ui-custom";
import { toast } from "sonner";
import { QuickCreateDialog } from "@/components/QuickCreateDialog";

const initialProveedores = [
  { id: 1, nombre: "Distribuidora Nacional", rnc: "130-12345-6", contacto: "Carlos Méndez", telefono: "809-555-1001", balance: "RD$ 45,600.00", estado: "activo" as const },
  { id: 2, nombre: "Importadora del Caribe", rnc: "130-67890-1", contacto: "Ana López", telefono: "809-555-1002", balance: "RD$ 0.00", estado: "activo" as const },
  { id: 3, nombre: "Alimentos del Sur", rnc: "130-11223-4", contacto: "Roberto Díaz", telefono: "809-555-1003", balance: "RD$ 67,800.00", estado: "activo" as const },
];

const Proveedores = () => {
  const [proveedores, setProveedores] = useState(initialProveedores);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);

  const filteredProveedores = useMemo(
    () =>
      proveedores.filter((proveedor) =>
        [proveedor.nombre, proveedor.rnc, proveedor.contacto, proveedor.telefono]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    [proveedores, searchTerm],
  );

  const handleCreateSupplier = (values: Record<string, string>) => {
    const nombre = values.nombre?.trim() ?? "";
    const rnc = values.rnc?.trim() ?? "";
    const contacto = values.contacto?.trim() ?? "";
    const telefono = values.telefono?.trim() ?? "";

    if (!nombre || !rnc || !contacto || !telefono) {
      toast.error("Completa todos los campos");
      return;
    }

    const exists = proveedores.some((proveedor) => proveedor.rnc === rnc);
    if (exists) {
      toast.error("Ya existe un proveedor con ese RNC");
      return;
    }

    const nextId = Math.max(0, ...proveedores.map((proveedor) => proveedor.id)) + 1;
    setProveedores((prev) => [
      { id: nextId, nombre, rnc, contacto, telefono, balance: "RD$ 0.00", estado: "activo" },
      ...prev,
    ]);
    setShowNewSupplierModal(false);
    toast.success("Proveedor creado correctamente");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Proveedores" description="Gestión de proveedores y cuentas por pagar">
        <button
          onClick={() => setShowNewSupplierModal(true)}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
        >
          <Plus className="h-4 w-4" /> Nuevo Proveedor
        </button>
      </PageHeader>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar proveedor..."
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
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">RNC</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Contacto</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Teléfono</th>
                <th className="text-right py-3 px-5 font-medium text-muted-foreground">Balance</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredProveedores.map((p) => (
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

      <QuickCreateDialog
        open={showNewSupplierModal}
        onOpenChange={setShowNewSupplierModal}
        title="Nuevo proveedor"
        description="Agrega un proveedor para compras y cuentas por pagar."
        submitLabel="Guardar proveedor"
        fields={[
          { key: "nombre", label: "Nombre", required: true, placeholder: "Ej: Distribuidora Nacional" },
          { key: "rnc", label: "RNC", required: true, placeholder: "130-12345-6" },
          { key: "contacto", label: "Contacto", required: true, placeholder: "Ej: Carlos Méndez" },
          { key: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "809-555-1000" },
        ]}
        onSubmit={handleCreateSupplier}
      />
    </div>
  );
};

export default Proveedores;
