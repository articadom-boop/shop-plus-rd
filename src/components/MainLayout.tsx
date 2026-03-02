import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

export function MainLayout() {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div
        className="flex-1 transition-all duration-300 flex flex-col"
        style={{ marginLeft: "var(--app-sidebar-width, 240px)" }}
        id="main-content"
      >
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
