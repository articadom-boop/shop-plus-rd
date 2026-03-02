import { useMemo, useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { PageHeader, StatusBadge, DataTableShell } from "@/components/ui-custom";
import { toast } from "sonner";
import { downloadCsv } from "@/lib/export";
import { QuickCreateDialog } from "@/components/QuickCreateDialog";

const initialInventario = [
  { id: 1, producto: "Arroz Selecto 5lb", codigo: "PRD-001", categoria: "Alimentos", stock: 45, precio: "RD$ 285.00", itbis: "18%", estado: "activo" as const },
  { id: 2, producto: "Aceite Crisol 1L", codigo: "PRD-002", categoria: "Alimentos", stock: 30, precio: "RD$ 320.00", itbis: "18%", estado: "activo" as const },
  { id: 3, producto: "Leche Milex 1L", codigo: "PRD-003", categoria: "Lácteos", stock: 5, precio: "RD$ 95.00", itbis: "0%", estado: "activo" as const },
  { id: 4, producto: "Café Santo Domingo 1lb", codigo: "PRD-004", categoria: "Bebidas", stock: 25, precio: "RD$ 450.00", itbis: "18%", estado: "activo" as const },
  { id: 5, producto: "Pasta Princesa 400g", codigo: "PRD-005", categoria: "Alimentos", stock: 0, precio: "RD$ 85.00", itbis: "18%", estado: "inactivo" as const },
  { id: 6, producto: "Jabón Hispano 3pk", codigo: "PRD-006", categoria: "Limpieza", stock: 40, precio: "RD$ 175.00", itbis: "18%", estado: "activo" as const },
  { id: 7, producto: "Agua Crystal 5gal", codigo: "PRD-007", categoria: "Bebidas", stock: 20, precio: "RD$ 150.00", itbis: "0%", estado: "activo" as const },
  { id: 8, producto: "Azúcar Caña 2lb", codigo: "PRD-008", categoria: "Alimentos", stock: 80, precio: "RD$ 120.00", itbis: "0%", estado: "activo" as const },
];

const Inventario = () => {
  const [inventario, setInventario] = useState(initialInventario);
  const [searchTerm, setSearchTerm] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const pageSize = 8;

  const filteredItems = useMemo(() => {
    return inventario.filter((item) => {
      const matchesSearch =
        item.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStock = !lowStockOnly || item.stock <= 5;
      return matchesSearch && matchesStock;
    });
  }, [inventario, searchTerm, lowStockOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredItems.length);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handleExport = () => {
    if (!filteredItems.length) {
      toast.error("No hay productos para exportar");
      return;
    }

    downloadCsv("inventario.csv", filteredItems);
    toast.success("Inventario exportado correctamente");
  };

  const handleCreateProduct = (values: Record<string, string>) => {
    const producto = values.producto?.trim() ?? "";
    const categoria = values.categoria?.trim() ?? "";
    const precio = Number(values.precio);
    const stock = Number(values.stock);
    const itbis = values.itbis || "18%";

    if (!producto || !categoria || Number.isNaN(precio) || Number.isNaN(stock)) {
      toast.error("Completa los campos requeridos");
      return;
    }

    const nextId = Math.max(0, ...inventario.map((item) => item.id)) + 1;
    const codigo = `PRD-${String(nextId).padStart(3, "0")}`;

    setInventario((prev) => [
      {
        id: nextId,
        producto,
        codigo,
        categoria,
        stock,
        precio: `RD$ ${precio.toFixed(2)}`,
        itbis,
        estado: stock > 0 ? "activo" : "inactivo",
      },
      ...prev,
    ]);

    setShowNewProductModal(false);
    setPage(1);
    toast.success("Producto agregado correctamente");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Inventario" description="Gestión de productos y stock">
        <button
          onClick={handleExport}
          className="h-9 px-4 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium flex items-center gap-2 hover:bg-muted transition-colors"
        >
          <Download className="h-4 w-4" /> Exportar
        </button>
        <button
          onClick={() => setShowNewProductModal(true)}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
        >
          <Plus className="h-4 w-4" /> Nuevo Producto
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          onClick={() => {
            setLowStockOnly((prev) => !prev);
            setPage(1);
          }}
          className={`h-9 px-3 rounded-lg border text-sm font-medium flex items-center gap-2 transition-colors ${
            lowStockOnly
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border text-foreground hover:bg-secondary"
          }`}
        >
          <Filter className="h-4 w-4" /> Filtrar
        </button>
      </div>

      <DataTableShell>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Producto</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Código</th>
                <th className="text-left py-3 px-5 font-medium text-muted-foreground">Categoría</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">Stock</th>
                <th className="text-right py-3 px-5 font-medium text-muted-foreground">Precio</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">ITBIS</th>
                <th className="text-center py-3 px-5 font-medium text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="py-3 px-5 font-medium text-foreground">{item.producto}</td>
                  <td className="py-3 px-5 font-mono text-xs text-muted-foreground">{item.codigo}</td>
                  <td className="py-3 px-5 text-muted-foreground">{item.categoria}</td>
                  <td className="py-3 px-5 text-center">
                    <span className={`font-semibold ${item.stock <= 5 ? "text-destructive" : "text-foreground"}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right font-semibold text-foreground">{item.precio}</td>
                  <td className="py-3 px-5 text-center text-muted-foreground">{item.itbis}</td>
                  <td className="py-3 px-5 text-center"><StatusBadge status={item.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredItems.length ? startIndex + 1 : 0}-{endIndex} de {filteredItems.length} productos
          </p>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  safePage === pageNumber
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </DataTableShell>

      <QuickCreateDialog
        open={showNewProductModal}
        onOpenChange={setShowNewProductModal}
        title="Nuevo producto"
        description="Agrega un producto al inventario."
        submitLabel="Guardar producto"
        fields={[
          { key: "producto", label: "Nombre del producto", placeholder: "Ej: Arroz Selecto 5lb", required: true },
          { key: "categoria", label: "Categoría", placeholder: "Ej: Alimentos", required: true },
          { key: "precio", label: "Precio", type: "number", placeholder: "0.00", required: true },
          { key: "stock", label: "Stock", type: "number", placeholder: "0", required: true },
          {
            key: "itbis",
            label: "ITBIS",
            type: "select",
            required: true,
            options: [
              { label: "18%", value: "18%" },
              { label: "0%", value: "0%" },
            ],
          },
        ]}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default Inventario;
