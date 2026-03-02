import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SelectOption {
  label: string;
  value: string;
}

export interface QuickCreateField {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "tel" | "date" | "select";
  required?: boolean;
  options?: SelectOption[];
}

interface QuickCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  submitLabel?: string;
  fields: QuickCreateField[];
  onSubmit: (values: Record<string, string>) => void;
}

const getInitialValues = (fields: QuickCreateField[]) =>
  fields.reduce<Record<string, string>>((acc, field) => {
    const firstOption = field.type === "select" ? field.options?.[0]?.value ?? "" : "";
    acc[field.key] = firstOption;
    return acc;
  }, {});

export function QuickCreateDialog({
  open,
  onOpenChange,
  title,
  description,
  submitLabel = "Guardar",
  fields,
  onSubmit,
}: QuickCreateDialogProps) {
  const initialValues = useMemo(() => getInitialValues(fields), [fields]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  useEffect(() => {
    if (open) {
      setValues(initialValues);
    }
  }, [open, initialValues]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={values[field.key] ?? ""}
                  onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required={field.required}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type ?? "text"}
                  value={values[field.key] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-10 px-4 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
            >
              {submitLabel}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
