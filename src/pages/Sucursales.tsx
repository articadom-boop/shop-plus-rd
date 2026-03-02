import { PageHeader, StatusBadge } from "@/components/ui-custom";
import { Plus, Building2, MapPin } from "lucide-react";

const sucursales = [
  { id: 1, nombre: "Sucursal Principal", direccion: "Av. Winston Churchill #45, Santo Domingo", telefono: "809-555-0001", estado: "activo" as const },
  { id: 2, nombre: "Sucursal Norte", direccion: "Av. Estrella Sadhalá #120, Santiago", telefono: "809-555-0002", estado: "activo" as const },
  { id: 3, nombre: "Sucursal Este", direccion: "Av. España #89, La Romana", telefono: "809-555-0003", estado: "inactivo" as const },
];

const Sucursales = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Sucursales" description="Gestión de ubicaciones del negocio">
      <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
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
  </div>
);

export default Sucursales;
