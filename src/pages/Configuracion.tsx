import { PageHeader } from "@/components/ui-custom";
import { Store, Globe, FileText, Bell, Palette, Database } from "lucide-react";

const sections = [
  { icon: Store, title: "Datos del Negocio", desc: "RNC, nombre comercial, dirección" },
  { icon: Globe, title: "Facturación Electrónica", desc: "Configuración e-CF y certificados DGII" },
  { icon: FileText, title: "Secuencias NCF", desc: "Gestión de comprobantes fiscales" },
  { icon: Bell, title: "Notificaciones", desc: "Alertas de stock, vencimiento NCF" },
  { icon: Palette, title: "Personalización", desc: "Logo, colores, formato de impresión" },
  { icon: Database, title: "Respaldo", desc: "Backup y restauración de datos" },
];

const Configuracion = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeader title="Configuración" description="Ajustes generales del sistema" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sections.map((s) => (
        <button key={s.title} className="bg-card rounded-lg shadow-card p-6 hover:shadow-card-hover transition-all text-left group hover:ring-2 hover:ring-primary/20">
          <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
          <p className="text-xs text-muted-foreground">{s.desc}</p>
        </button>
      ))}
    </div>
  </div>
);

export default Configuracion;
