import { useRef, useState } from "react";
import { Search, Barcode, Plus, Minus, Trash2, CreditCard, X, Save, ShoppingBag, Clock, Car, UserPlus, ChevronDown } from "lucide-react";
import { StatusBadge } from "@/components/ui-custom";
import { toast } from "sonner";

const products = [
  { id: 1, name: "Arroz Selecto 5lb", price: 285, stock: 45, category: "Alimentos", img: "🍚" },
  { id: 2, name: "Aceite Crisol 1L", price: 320, stock: 30, category: "Alimentos", img: "🫒" },
  { id: 3, name: "Leche Milex 1L", price: 95, stock: 60, category: "Lácteos", img: "🥛" },
  { id: 4, name: "Café Santo Domingo 1lb", price: 450, stock: 25, category: "Bebidas", img: "☕" },
  { id: 5, name: "Azúcar Caña 2lb", price: 120, stock: 80, category: "Alimentos", img: "🍬" },
  { id: 6, name: "Pasta Princesa 400g", price: 85, stock: 100, category: "Alimentos", img: "🍝" },
  { id: 7, name: "Jabón Hispano 3pk", price: 175, stock: 40, category: "Limpieza", img: "🧼" },
  { id: 8, name: "Agua Crystal 5gal", price: 150, stock: 20, category: "Bebidas", img: "💧" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface OpenAccount {
  id: string;
  label: string;
  description: string;
  items: CartItem[];
  comprobante: string;
  createdAt: string;
}

let accountCounter = 3;

const Ventas = () => {
  const [accounts, setAccounts] = useState<OpenAccount[]>([
    {
      id: "acc-1",
      label: "Toyota Corolla 2020",
      description: "Placa A123456 — Juan Pérez",
      items: [
        { id: 1, name: "Arroz Selecto 5lb", price: 285, qty: 2 },
        { id: 4, name: "Café Santo Domingo 1lb", price: 450, qty: 1 },
      ],
      comprobante: "consumidor",
      createdAt: "10:30 AM",
    },
    {
      id: "acc-2",
      label: "Honda Civic 2018",
      description: "Placa B789012 — María García",
      items: [
        { id: 2, name: "Aceite Crisol 1L", price: 320, qty: 3 },
      ],
      comprobante: "credito",
      createdAt: "11:15 AM",
    },
  ]);
  const [activeAccountId, setActiveAccountId] = useState("acc-1");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeAccount = accounts.find((a) => a.id === activeAccountId);
  const cart = activeAccount?.items ?? [];
  const comprobante = activeAccount?.comprobante ?? "consumidor";

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;

  const setCart = (updater: (prev: CartItem[]) => CartItem[]) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === activeAccountId ? { ...a, items: updater(a.items) } : a))
    );
  };

  const setComprobante = (value: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === activeAccountId ? { ...a, comprobante: value } : a))
    );
  };

  const addToCart = (product: typeof products[0]) => {
    if (!activeAccount) {
      toast.error("Crea una cuenta primero");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const filtered = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleQuickAdd = () => {
    if (!filtered.length) {
      toast.error("No hay productos para agregar");
      return;
    }
    addToCart(filtered[0]);
    toast.success(`${filtered[0].name} agregado`);
  };

  const handleScanner = () => {
    searchInputRef.current?.focus();
    toast.info("Escáner listo. Escribe o escanea el código de barras.");
  };

  const handleCheckout = (mode: "contado" | "credito") => {
    if (!cart.length) {
      toast.error("El carrito está vacío");
      return;
    }
    toast.success(
      mode === "contado"
        ? `Venta cobrada por RD$ ${total.toFixed(2)}`
        : `Venta guardada a crédito por RD$ ${total.toFixed(2)}`
    );
    setAccounts((prev) => prev.filter((a) => a.id !== activeAccountId));
    const remaining = accounts.filter((a) => a.id !== activeAccountId);
    setActiveAccountId(remaining.length > 0 ? remaining[0].id : "");
  };

  const handleSavePending = () => {
    if (!cart.length) {
      toast.error("No hay productos para guardar");
      return;
    }
    toast.success("Cuenta guardada como pendiente");
  };

  const handleCancelSale = () => {
    if (!activeAccount) {
      toast.info("No hay cuenta activa");
      return;
    }
    setAccounts((prev) => prev.filter((a) => a.id !== activeAccountId));
    const remaining = accounts.filter((a) => a.id !== activeAccountId);
    setActiveAccountId(remaining.length > 0 ? remaining[0].id : "");
    toast.info("Cuenta cancelada");
  };

  const handleCreateAccount = () => {
    if (!newLabel.trim()) {
      toast.error("Ingresa un nombre o identificador para la cuenta");
      return;
    }
    const id = `acc-${++accountCounter}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" });
    setAccounts((prev) => [
      ...prev,
      { id, label: newLabel.trim(), description: newDescription.trim(), items: [], comprobante: "consumidor", createdAt: timeStr },
    ]);
    setActiveAccountId(id);
    setShowNewAccountModal(false);
    setNewLabel("");
    setNewDescription("");
    toast.success(`Cuenta "${newLabel.trim()}" creada`);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col gap-3 animate-fade-in">
      {/* Account Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {accounts.map((acc) => {
          const accTotal = acc.items.reduce((s, i) => s + i.price * i.qty, 0);
          return (
            <button
              key={acc.id}
              onClick={() => setActiveAccountId(acc.id)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-left transition-all border ${
                acc.id === activeAccountId
                  ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20"
                  : "bg-card border-border hover:border-primary/20 hover:bg-secondary/50"
              }`}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Car className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold truncate max-w-[140px] ${acc.id === activeAccountId ? "text-primary" : "text-foreground"}`}>
                  {acc.label}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {acc.items.length} items · RD$ {accTotal.toLocaleString()}
                </p>
              </div>
              {acc.id === activeAccountId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelSale();
                  }}
                  className="ml-1 p-0.5 rounded hover:bg-destructive/10 transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              )}
            </button>
          );
        })}
        <button
          onClick={() => setShowNewAccountModal(true)}
          className="flex-shrink-0 h-[52px] px-4 rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-medium flex items-center gap-2 hover:border-primary/30 hover:text-primary transition-colors"
        >
          <Plus className="h-4 w-4" /> Nueva Cuenta
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Products Section */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar producto o pieza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button onClick={handleScanner} className="h-10 px-4 rounded-lg bg-secondary text-foreground text-sm font-medium flex items-center gap-2 hover:bg-muted transition-colors">
              <Barcode className="h-4 w-4" /> Escáner
            </button>
            <button onClick={handleQuickAdd} className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
              <Plus className="h-4 w-4" /> Agregar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 content-start">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-hover transition-all text-left group hover:ring-2 hover:ring-primary/30"
              >
                <div className="text-3xl mb-2">{p.img}</div>
                <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                <p className="text-lg font-bold text-primary mt-1">RD$ {p.price.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Stock: {p.stock}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-[380px] bg-card rounded-lg shadow-card flex flex-col">
          {activeAccount ? (
            <>
              {/* Cart Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-foreground text-sm truncate">{activeAccount.label}</h2>
                    <p className="text-xs text-muted-foreground truncate">{activeAccount.description || `Abierta a las ${activeAccount.createdAt}`}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {cart.length} items
                  </span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ShoppingBag className="h-10 w-10 mb-2 opacity-30" />
                    <p className="text-sm">Agrega productos a esta cuenta</p>
                  </div>
                )}
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">RD$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateQty(item.id, -1)} className="h-7 w-7 rounded-md bg-card flex items-center justify-center hover:bg-muted transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="h-7 w-7 rounded-md bg-card flex items-center justify-center hover:bg-muted transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-foreground w-20 text-right">
                      RD$ {(item.price * item.qty).toFixed(2)}
                    </p>
                    <button onClick={() => removeItem(item.id)} className="p-1 rounded hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Comprobante Type */}
              <div className="px-4 py-3 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Tipo de Comprobante</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "consumidor", label: "Consumidor Final" },
                    { key: "credito", label: "Crédito Fiscal" },
                    { key: "gubernamental", label: "Gubernamental" },
                    { key: "exportacion", label: "Exportación" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setComprobante(t.key)}
                      className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        comprobante === t.key
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-muted"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="px-4 py-3 border-t border-border space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">RD$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ITBIS (18%)</span>
                  <span className="text-foreground">RD$ {itbis.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Descuento</span>
                  <span className="text-foreground">RD$ 0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">RD$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-border space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCheckout("contado")}
                    className="flex-1 h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                  >
                    <CreditCard className="h-4 w-4" /> Cobrar
                  </button>
                  <button
                    onClick={() => handleCheckout("credito")}
                    className="flex-1 h-11 rounded-lg bg-success text-success-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Clock className="h-4 w-4" /> Crédito
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSavePending}
                    className="flex-1 h-9 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-muted transition-colors"
                  >
                    <Save className="h-3.5 w-3.5" /> Pendiente
                  </button>
                  <button
                    onClick={handleCancelSale}
                    className="flex-1 h-9 rounded-lg bg-destructive/10 text-destructive text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-destructive/20 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" /> Cancelar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
              <Car className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm font-medium mb-1">Sin cuentas abiertas</p>
              <p className="text-xs text-center mb-4">Crea una nueva cuenta para comenzar a agregar productos</p>
              <button
                onClick={() => setShowNewAccountModal(true)}
                className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors"
              >
                <Plus className="h-4 w-4" /> Nueva Cuenta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Account Modal */}
      {showNewAccountModal && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setShowNewAccountModal(false)}>
          <div className="bg-card rounded-xl shadow-card-hover w-full max-w-md p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-1">Nueva Cuenta Abierta</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Crea una cuenta para un cliente, vehículo o trabajo en progreso
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Nombre / Identificador *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Toyota Corolla 2020, Mesa #3, Juan Pérez..."
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Placa A123456, Cliente frecuente, Reparación motor..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border-none text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewAccountModal(false)}
                className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateAccount}
                className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
