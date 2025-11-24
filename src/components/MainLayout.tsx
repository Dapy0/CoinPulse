import { Link, Outlet } from "@tanstack/react-router";
import PieChartIcon from "./Logo";
import { SideBarBtn } from "./SideBarBtn";
import { IconChartAreaLine, IconMenu2, IconMoon, IconSun, IconWallet } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export const MainLayout = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen  bg-background dark:text-white ">
      <div
        className={`${isSidebarOpen ? "block" : "hidden"} md:hidden backdrop-blur-xs fixed inset-0 z-10 transition-all`}
      />

      <aside
        className={`fixed top-0 left-0 right-0 z-30 p-4  flex flex-col gap-6  
 ${isSidebarOpen ? "translate-y-0 md:w-72" : "-translate-y-full md:w-20"} md:static md:h-full md:top-0 md:flex md:flex-col md:translate-y-0  bg-foreground border-r border-r-gray-300 dark:border-r-gray-700 shadow-sm `}
      >
        <div className={`flex justify-between items-center gap-2 ${isSidebarOpen ? "md:flex-row" : "md:flex-col"}`}>
          <div className="flex gap-2 items-center text-center">
            <PieChartIcon className="size-10 text-blue-600" />
            <h3 className={`text-2xl font-bold ${isSidebarOpen ? "inline" : "hidden "}`}>CoinPulse</h3>
          </div>
          <IconMenu2 onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="dark:text-gray-400  text-gray-600" />
        </div>

        <nav className={`flex flex-col flex-1 gap-4 md:mt-2 ${isSidebarOpen ? "*:aspect-auto" : "*:aspect-square"} `}>
          <hr className={`border-gray-300 dark:border-gray-700 w-full h-auto aspect-auto! `} />
          <SideBarBtn to={"/"} expanded={isSidebarOpen}>
            <IconChartAreaLine /> Market
          </SideBarBtn>
          <SideBarBtn to={"/portfolio"} expanded={isSidebarOpen}>
            <IconWallet />
            Portfolio
          </SideBarBtn>
          {/* <SideBarBtn to={"/news"}>News</SideBarBtn> */}
        </nav>

        <div className={`flex flex-col gap-3 w-full items-center ${isSidebarOpen ? "items-stretch" : "items-center"}`}>
          <hr className="border-gray-300 dark:border-gray-700 w-full" />

          <div className="flex items-center justify-between">
            <div className={`flex gap-3 items-center ${!isSidebarOpen && "hidden"}`}>
              <img
                className="size-fit rounded-full max-w-10 max-h-10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9bfBo_L7BNZePomtQc7t__D1KOK6tEa8wlXClIpMd8cSl0f0PoOW6gRtvrShjqjYd8TH9OKo9qO4Xszt0_xMPa5S-UDERKVfWMHEvcrY4d0EUNB-WapI19oA9IQQAqkD_w8A4ekEYEFuVr7ZmaYnl0yqQGDtMgN3sX21pOtj3i2EGfWrKvyBOM4wGBnyGe_XxdqKqQJ1EeQXcOfj3nItbharMa2vcdthJK7V1iFFNothQV7NOg3d5470bogGng4PDC6c8GQWUIMdf"
                alt="img"
              />
              <div className="self-start">
                <p className="text-sm font-medium ">Alexey</p>
                <Link
                  className=" text-xs text-gray-600 dark:text-gray-400 hover:text-primary"
                  to={"/"}
                  search={{ page: 10 }}
                >
                  Settings
                </Link>
              </div>
            </div>
            <button
              className=" p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors active:bg-gray-700 dark:active:bg-gray-300"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} className="text-gray-600" />}
            </button>
          </div>
        </div>
      </aside>

      <header className="md:hidden flex justify-between items-center p-4 shadow-sm bg-foreground">
        <div className="flex gap-1 items-center text-center">
          <PieChartIcon className="size-8 text-blue-600" />
          <h3 className={`text-xl  font-bold `}>CoinPulse</h3>
        </div>
        <IconMenu2 onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="dark:text-gray-400  text-gray-600" />
      </header>

      {/* flex flex-col  */}
      <div className="flex-1  p-8 overflow-hidden  overflow-y-auto  sm:no-scrollbar ">
        <Outlet />
      </div>
    </div>
  );
};
