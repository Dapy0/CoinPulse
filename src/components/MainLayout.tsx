import { Link, Outlet } from "@tanstack/react-router";
import PieChartIcon from "./Logo";
import { SideBarBtn } from "./SideBarBtn";
import { IconChartAreaLine, IconWallet } from "@tabler/icons-react";

export const MainLayout = () => {
  const DEVtoggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex h-screen bg-background  dark:text-white">
      <button className="absolute size-10 top-5 right-5" onClick={DEVtoggleTheme}>
        Swap
      </button>

      <aside className="p-4 min-w-60 bg-foreground dark:bg-foreground-d border-r border-r-gray-300 dark:border-r-gray-700 flex flex-col">
        <div className="flex gap-2 items-center">
          <PieChartIcon className="size-10 text-blue-500" />
          <h3 className="text-2xl font-bold ">CoinPulse</h3>
        </div>
        <div className="flex flex-col flex-1 gap-4 mt-8">
          <SideBarBtn to={"/"}>
            <IconChartAreaLine /> Market
          </SideBarBtn>
          <SideBarBtn to={"/portfolio"}>
            <IconWallet />
            Portfolio
          </SideBarBtn>
          {/* <SideBarBtn to={"/news"}>News</SideBarBtn> */}
        </div>
        <div className="flex flex-col gap-3">
          <hr className="border-gray-300 dark:border-gray-700" />

          <div className="flex gap-3 max-w-10 items-center">
            <img
              className="size-fit rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9bfBo_L7BNZePomtQc7t__D1KOK6tEa8wlXClIpMd8cSl0f0PoOW6gRtvrShjqjYd8TH9OKo9qO4Xszt0_xMPa5S-UDERKVfWMHEvcrY4d0EUNB-WapI19oA9IQQAqkD_w8A4ekEYEFuVr7ZmaYnl0yqQGDtMgN3sX21pOtj3i2EGfWrKvyBOM4wGBnyGe_XxdqKqQJ1EeQXcOfj3nItbharMa2vcdthJK7V1iFFNothQV7NOg3d5470bogGng4PDC6c8GQWUIMdf"
              alt="img"
            />
            <div className="">
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
        </div>
      </aside>

      <div className="flex-1 p-8 lg:self-center">
        <Outlet />
      </div>
    </div>
  );
};
