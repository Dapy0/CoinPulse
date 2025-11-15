import { Outlet } from "@tanstack/react-router";
import PieChartIcon from "./Logo";
import { SideBarBtn } from "./SideBarBtn";

export const MainLayout = () => {
  const DEVtoggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex h-screen bg-background dark:bg-background-d">
      
      <button className="absolute size-10 top-5 right-5" onClick={DEVtoggleTheme}>Swap</button>

      <aside className="p-6 bg-foreground dark:bg-foreground-d border-r border-r-primary-900">
        <div className="flex gap-2 items-center">
          <PieChartIcon className="size-10 text-blue-500" />
          <h3 className="text-2xl font-bold  dark:text-white">CoinPulse</h3>
        </div>
        <div className="flex flex-col gap-4">
          <SideBarBtn to={'/'}>Market</SideBarBtn>
          <SideBarBtn to={'/portfolio'}>Portfolio</SideBarBtn>
          <SideBarBtn>News</SideBarBtn>
        </div>
      </aside>

      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
