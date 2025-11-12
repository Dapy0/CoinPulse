import { Outlet } from "@tanstack/react-router";

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-6">Main Layout</header>

      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
