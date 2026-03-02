import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/ui-custom";
import { Plus, Building2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { QuickCreateDialog } from "@/components/QuickCreateDialog";

const initialSucursales = [
  { id: 1, nombre: "Sucursal Principal", direccion: "Av. Winston Churchill #45, Santo Domingo", telefono: "809-555-0001", estado: "activo" as const },
  { id: 2, nombre: "Sucursal Norte", direccion: "Av. Estrella Sadhalá #120, Santiago", telefono: "809-555-0002", estado: "activo" as const },
  { id: 3, nombre: "Sucursal Este", direccion: "Av. España #89, La Romana", telefono: "809-555-0003", estado: "inactivo" as const },
];

const Sucursales = () => {
  const [sucursales, setSucursales] = useState(initialSucursales);
  const [showNewBranchModal, setShowNewBranchModal] = useState(false);

  const handleCreateBranch = (values: Record<string, string>) => {
    const nombre = values.nombre?.trim() ?? "";
    const direccion = values.direccion?.trim() ?? "";
    const telefono = values.telefono?.trim() ?? "";

    if (!nombre || !direccion || !telefono) {
      toast.error("Completa todos los campos");
      return;
    }

    const nextId = Math.max(0, ...sucursales.map((sucursal) => sucursal.id)) + 1;
    setSucursales((prev) => [
      { id: nextId, nombre, direccion, telefono, estado: "activo" },
      ...prev,
    ]);
    setShowNewBranchModal(false);
    toast.success("Sucursal creada correctamente");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Sucursales" description="Gestión de ubicaciones del negocio">
        <button
          onClick={() => setShowNewBranchModal(true)}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
        >
          <Plus className="h-4 w-4" /> Nueva Sucursal
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sucursales.map((s) => (
          <div key={s.id} className="bg-card rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <StatusBadge status={s.estado} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{s.nombre}</h3>
            <div className="flex items-start gap-1.5 mb-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">{s.direccion}</p>
            </div>
            <p className="text-xs text-muted-foreground">{s.telefono}</p>
          </div>
        ))}
      </div>

      <QuickCreateDialog
        open={showNewBranchModal}
        onOpenChange={setShowNewBranchModal}
        title="Nueva sucursal"
        description="Registra una nueva sucursal del negocio."
        submitLabel="Guardar sucursal"
        fields={[
          { key: "nombre", label: "Nombre", required: true, placeholder: "Ej: Sucursal Oeste" },
          { key: "direccion", label: "Dirección", required: true, placeholder: "Ej: Av. Principal #123" },
          { key: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "809-555-0000" },
        ]}
        onSubmit={handleCreateBranch}
      />
    </div>
  );
};

export default Sucursales;
