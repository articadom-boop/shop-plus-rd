import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

export function MainLayout() {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 ml-[240px] transition-all duration-300 flex flex-col" id="main-content">
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
