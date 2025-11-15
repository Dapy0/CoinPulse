import { IconArrowsSort } from "@tabler/icons-react";
import React from "react";
import type { ICoinTableItemProps } from "./types";

function CoinTableItem({ index }: ICoinTableItemProps) {
  return <tr className="text-sm font-normal leading-normal text-right hover:bg-gray-200/70 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer">
    <td className="h-[68px] px-4 py-2 text-gray-500 dark:text-gray-400 text-center">{index}</td>
    <td className="h-[68px] px-4 py-2  ">
      <div className="flex gap-3 items-center text-left">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNvq_H8N45GVkTmbD5orOE2prDz67-zj7Ho8BBqIliq4pDozE341oYay99xCrwvk0g4oN1ZGOon8i5kvNGUK153MeXQ7g43Lr97OB6O5y8efpi5bTLiMeujhemHY7qC-TCA3dEiGh5AI1UC2D93_aeOKxJsD9U8lT_unElAmbN3i_OyYt8SH4MF-eEnRdYf47slUEYRsbnAxSBeW6eVI87aTqND6vrIGbrzGooP0fmppjingbux6UUu0Qw5ugk3CSKCW4eswFuqt5m" className="size-8 aspect-square rounded-full" />
        <div className="">
          <p className="font-medium">Bitcoin</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">btc</p>
        </div>
      </div>
    </td>
    <td className="h-[68px] px-4 py-2  ">$68,543.12</td>
    {/* text-red-400 */}
    <td className="h-[68px] px-4 py-2 text-green-500  dark:text-green-400">+2.54%</td>
    <td className="h-[68px] px-4 py-2  dark:text-green-400">$1.35T</td>
    <td className="h-[68px] px-4 py-2  dark:text-green-400">$45.6B</td>
  </tr>
}


function CoinTable() {
  return <div className="inline-block min-w-full align-middle">
    <div className="overflow-hidden rounded-xl border bg-foreground border-gray-300 dark:border-gray-800 ">
      <table className="min-w-full">
        <thead className="text-right ">
          <tr className="bg-background/20   uppercase text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-wider text-right">
            <th className="px-4 py-3 w-12 text-center text-xs ">#</th>
            <th className="px-4 py-3 w-12 text-center ">
              <div className="flex gap-2 items-center cursor-pointer text-left justify-start hover:text-black dark:hover:text-white text-xs">
                Name<IconArrowsSort className="size-[1.5em]" />
              </div>
            </th>
            <th className="px-4 py-3 w-12 text-center ">
              <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                Price<IconArrowsSort className="size-[1.5em]" />
              </div>
            </th>
            <th className="px-4 py-3 w-12 text-center ">
              <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                24hr %<IconArrowsSort className="size-[1.5em]" />
              </div>
            </th>
            <th className="px-4 py-3 w-12 text-center ">
              <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                Capitalization<IconArrowsSort className="size-[1.5em]" />
              </div>
            </th>
            <th className="px-4 py-3 w-12 text-center ">
              <div className="flex gap-2 items-center cursor-pointer justify-end dark:hover:text-white">
                Value(24hr)<IconArrowsSort className="size-[1.5em]" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-800">
          {
            [1, 23, 41, 23, 123, 123, 123, 13, 4].map((el, index) => <CoinTableItem key={index} index={index} />)
          }
        </tbody>
      </table>
    </div>
  </div>;
}

export default CoinTable;
