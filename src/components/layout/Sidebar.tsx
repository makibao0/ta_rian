import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../routes/Routes";

interface Props {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  setMobileOpen,
}: Props) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full bg-white shadow-lg
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:static
        `}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <span className="font-bold">Menu</span>
          <button onClick={() => setMobileOpen(false)}>
            <FontAwesomeIcon icon={faX} className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-4 px-2">
          {appRoutes
            .filter((menu) => menu.showSidebar)
            .map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`
                  }
                >
                  <FontAwesomeIcon icon={Icon} className="w-5 h-5" />
                  {!collapsed && <span>{menu.name}</span>}
                </NavLink>
              );
            })}
        </nav>
      </aside>
    </>
  );
}
