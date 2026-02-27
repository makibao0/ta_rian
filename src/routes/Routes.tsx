import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faDatabase, faHome } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

export interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  icon: IconDefinition;
  private?: boolean;
  showSidebar: boolean;
}

export const appRoutes: AppRoute[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    icon: faHome,
    showSidebar: true,
    private: true,
  },
  {
    path: "/product",
    name: "Product",
    element: <Product />,
    icon: faDatabase,
    showSidebar: true,
    private: true,
  },
  {
    path: "/product/:id",
    name: "Product Detail",
    element: <ProductDetail />,
    icon: faDatabase,
    showSidebar: false,
    private: true,
  },
];
