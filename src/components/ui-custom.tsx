import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-card",
  success: "bg-card",
  warning: "bg-card",
  destructive: "bg-card",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function KPICard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: KPICardProps) {
  return (
    <div className={`${variantStyles[variant]} rounded-lg p-5 shadow-card hover:shadow-card-hover transition-shadow animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={`text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: "enviado" | "aprobado" | "rechazado" | "pendiente" | "activo" | "inactivo";
}

const statusColors: Record<string, string> = {
  enviado: "bg-primary/10 text-primary",
  aprobado: "bg-success/10 text-success",
  rechazado: "bg-destructive/10 text-destructive",
  pendiente: "bg-warning/10 text-warning",
  activo: "bg-success/10 text-success",
  inactivo: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[status]}`}>
      {status}
    </span>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

interface DataTableShellProps {
  children: ReactNode;
}

export function DataTableShell({ children }: DataTableShellProps) {
  return (
    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      {children}
    </div>
  );
}
