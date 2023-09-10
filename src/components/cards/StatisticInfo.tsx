import Link from "next/link";
import React, { ReactNode } from "react";
type IconProps = React.HTMLAttributes<SVGElement>;

interface MiniStatisticsProps {
  name: string;
  color: string;
  value: number;
  icon: JSX.Element;
  link?: string;
}
function StatisticInfo({
  icon,
  value,
  name,
  color,
  link,
}: MiniStatisticsProps) {
  return (
    <>
      {link ? (
        <Link
          href={link as string}
          style={{ backgroundColor: color }}
          className={`flex flex-col w-full   p-5  rounded-xl hover:cursor-pointer `}
        >
          <div className="flex justify-end -mt-8 ">{icon}</div>

          <div className="-mt-8 text-heading1-bold text-lime-50">{value}</div>
          <div className="capitalize text-body-normal text-lime-50">{name}</div>
        </Link>
      ) : (
        <div
          style={{ backgroundColor: color }}
          className={`flex flex-col w-full   p-5  rounded-xl hover:cursor-pointer `}
        >
          <div className="flex justify-end -mt-8 ">{icon}</div>

          <div className="-mt-8 text-heading1-bold text-lime-50">{value}</div>
          <div className="capitalize text-body-normal text-lime-50">{name}</div>
        </div>
      )}
    </>
  );
}

export default StatisticInfo;
