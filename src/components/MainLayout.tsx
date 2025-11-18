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
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <div className="flex h-screen bg-background  dark:text-white ">
      <aside className={`p-4  bg-foreground dark:bg-foreground-d border-r border-r-gray-300 dark:border-r-gray-700 flex flex-col shadow-sm  ${isExpanded ? " min-w-70 p-4" : "min-w-20 w-20 p-2 items-center"} transition-all duration-300`}>
        <div className={`flex flex-col items-center  gap-4 ${isExpanded && "flex-row  justify-between" }`}>
          <div className="flex gap-2 items-center text-center">
            <PieChartIcon className="size-10 text-blue-600" />
            <h3 className={`text-2xl font-bold ${!isExpanded && "hidden" }` }>CoinPulse</h3>
          </div>
          <IconMenu2 onClick={() => setIsExpanded(!isExpanded)} className="dark:text-gray-400  text-gray-500" />
        </div>
        

        <div className="flex flex-col flex-1 gap-4 mt-8">
          <hr className="border-gray-300 dark:border-gray-700 w-full" />
          <SideBarBtn to={"/"} expanded={isExpanded}>
            <IconChartAreaLine /> Market
          </SideBarBtn>
          <SideBarBtn to={"/portfolio"} expanded={isExpanded}>
            <IconWallet />Portfolio
          </SideBarBtn>
          {/* <SideBarBtn to={"/news"}>News</SideBarBtn> */}
        </div>
        <div className={`flex flex-col gap-3 w-full items-center ${isExpanded && "items-stretch"}`}>
          <hr className="border-gray-300 dark:border-gray-700 w-full" />

          <div className="flex items-center justify-between">
            <div className={`flex gap-3 items-center ${!isExpanded && "hidden"}`}>
              <img
                className="size-fit rounded-full max-w-10"
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
      {/* flex flex-col  */}
      <div className="flex-1 p-8 overflow-hidden  ">
        <Outlet />
      </div>
    </div>
  );
};
