import { Icons } from "@/components/Icons";
type IconProps = React.HTMLAttributes<SVGElement>;

interface ChildLink {
  route: string;
  label: string;
}

interface ParentLink {
  icon: (props: IconProps & { active?: boolean }) => JSX.Element;
  route: string;
  label: string;
  child?: ChildLink[];
}

export const sidebarLinks: ParentLink[] = [
  {
    icon: Icons.dashboard,
    route: "/",
    label: "Dashboard",
  },
  {
    icon: Icons.products,
    route: "/products",
    label: "Products",
    child: [
      { route: "/products", label: "List Products" },
      { route: "/products/new", label: "Creat Products" },
      { route: "/products/reviews", label: "Reviews" },
    ],
  },
  {
    icon: Icons.categories,
    route: "/categories",
    label: "Categories",
    child: [
      { route: "/categories", label: "List Categories" },
      { route: "/categories/new", label: "Create Category" },
    ],
  },
  {
    icon: Icons.brands,
    route: "/brands",
    label: "Brands",
    child: [
      { route: "/brands", label: "Brands List" },
      { route: "/brands/new", label: "Create Brand" },
    ],
  },
  {
    icon: Icons.orders,
    route: "/orders",
    label: "Orders",
  },
  {
    icon: Icons.customers,
    route: "/customers",
    label: "Customers",
  },
  {
    icon: Icons.refunds,
    route: "/refunds",
    label: "Refunds",
    child: [
      { route: "/refunds", label: "Refunds Requests" },
      { route: "/refunds/settings", label: "Refund Settings" },
    ],
  },
  {
    icon: Icons.categories,
    route: "/settings",
    label: "Site Settings",
  },
  {
    icon: Icons.logout,
    route: "/",
    label: "Lougout",
  },
];

export const OrderStatus = [
  { value: "pending", status: "PENDING", color: "#9F7AEA" },
  { value: "shipped", status: "SHIPPED", color: "#4299E1" },
  { value: "cancelled", status: "CANCELLED", color: "#F56565" },
];
export const CustomerStatus = [
  { value: "active", status: "ACTIVE", color: "#9F7AEA" },
  { value: "passive", status: "PASSIVE", color: "#4299E1" },
  { value: "blocked", status: "BLOCKED", color: "#F56565" },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
