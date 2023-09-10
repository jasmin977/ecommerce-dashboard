"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppState } from "@/context";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLeftSideOpen } = useAppState();

  const sidebarStyles = {
    transition: "transform 0.3s ease",
    transform: isLeftSideOpen ? "translateX(0)" : "translateX(-100%)",
  };
  return (
    <section
      style={sidebarStyles}
      className="fixed top-0 left-0 z-30 w-64 h-screen transition-transform leftsidebar custom-scrollbar "
    >
      <div className="flex flex-col flex-1 w-full gap-2 px-6 pt-20">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <div key={link.label}>
              {link.child ? (
                <Accordion key={link.label} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={`flex   justify-between w-full  p-4 rounded-lg  hover:dark:bg-dark-5 hover:bg-light-3   ${
                        isActive && "dark:bg-dark-4 bg-light-3   "
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <link.icon {...(isActive ? { active: true } : {})} />

                        <p
                          className={`  max-lg:hidden font-medium truncate   ${
                            isActive && "text-blue   "
                          }`}
                        >
                          {link.label}
                        </p>
                      </div>
                    </AccordionTrigger>
                    {link.child && (
                      <AccordionContent>
                        {link.child.map((item) => (
                          <Link href={item.route} key={item.label}>
                            <div
                              className={`leftsidebar_link    items-center `}
                            >
                              {/*  <div
                                className={`w-[4px] h-[4px] rounded-full   gap-4
                              ${
                                pathname === item.route &&
                                " shadow-count-badge shadow-blue bg-blue"
                              }  bg-light-2  `}
                              /> */}
                              <link.icon
                                className="opacity-0"
                                {...(isActive ? { active: true } : {})}
                              />
                              <p
                                className={`hover:text-blue font-medium truncate ${
                                  pathname === item.route && "text-blue"
                                }`}
                              >
                                {item.label}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  href={link.route}
                  key={link.route}
                  className={`flex leftsidebar_link  justify-between w-full  p-4 rounded-lg  hover:dark:bg-dark-5 hover:bg-light-3  ${
                    isActive && "dark:bg-dark-4 bg-light-3    "
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <link.icon {...(isActive ? { active: true } : {})} />

                    <p
                      className={`  max-lg:hidden font-medium truncate  ${
                        isActive && "text-blue   "
                      }`}
                    >
                      {link.label}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
