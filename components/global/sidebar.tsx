/** @format */
"use client";

import { useSidebarCollapse } from "@/app/(frontend)/providers/collapse-sidebar";
import clsx from "clsx";

import {
  Home,
  SquareActivity,
  Users,
  PackageSearch,
  Weight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the type for sidebar items
type SidebarItem = {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

// Define the sidebar items
const sidebarItems: SidebarItem[] = [
  { id: "dashboard", icon: Home, label: "Dashboard", href: "/" },
  { id: "sales", icon: Weight, label: "Sales", href: "/sales" },
  { id: "customers", icon: Users, label: "Customers", href: "/customers" },
  { id: "stocks", icon: SquareActivity, label: "Stocks", href: "/stocks" },
  { id: "products", icon: PackageSearch, label: "Products", href: "/products" },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen: collapsed } = useSidebarCollapse();
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed left-0 top-[60px] h-screen border-r transition-all duration-300",
          collapsed ? "w-[4rem]" : "w-[16rem]"
        )}
      >
        <nav className="flex flex-col mt-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex px-4 py-2 items-center ${
                  isActive ? "bg-gray-100 dark:bg-bgactive" : ""
                }`}
              >
                <item.icon className="w-4 h-4" />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
