import { toast } from "sonner";
import { PageHeader } from "@/components/ui-custom";
import { Calculator, FileText, Download } from "lucide-react";
import { downloadCsv } from "@/lib/export";

const Impuestos = () => {
  const handleExportTaxFiles = () => {
    downloadCsv("formatos-606-607.csv", [
      { formato: "606", total_compras: "456000.00", itbis_pagado: "82080.00", registros: 45 },
      { formato: "607", total_ventas: "1200000.00", itbis_cobrado: "216000.00", registros: 234 },
    ]);
    toast.success("Formato 606/607 exportado");
  };

  const handleGenerateFormat = (format: "606" | "607") => {
    toast.success(`Formato ${format} generado correctamente`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Impuestos" description="Control fiscal y reportes DGII">
        <button
          onClick={handleExportTaxFiles}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
        >
          <Download className="h-4 w-4" /> Exportar 606/607
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Formato 606</h3>
              <p className="text-xs text-muted-foreground">Compras de bienes y servicios</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Compras</span>
              <span className="font-semibold text-foreground">RD$ 456,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ITBIS Pagado</span>
              <span className="font-semibold text-foreground">RD$ 82,080.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Registros</span>
              <span className="font-semibold text-foreground">45</span>
            </div>
          </div>
          <button
            onClick={() => handleGenerateFormat("606")}
            className="mt-4 w-full h-9 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" /> Generar Formato
          </button>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-success/10">
              <Calculator className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Formato 607</h3>
              <p className="text-xs text-muted-foreground">Ventas de bienes y servicios</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Ventas</span>
              <span className="font-semibold text-foreground">RD$ 1,200,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ITBIS Cobrado</span>
              <span className="font-semibold text-foreground">RD$ 216,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Registros</span>
              <span className="font-semibold text-foreground">234</span>
            </div>
          </div>
          <button
            onClick={() => handleGenerateFormat("607")}
            className="mt-4 w-full h-9 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" /> Generar Formato
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impuestos;
