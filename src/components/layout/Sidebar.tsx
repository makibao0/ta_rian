import { faX, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
  const { user, logout } = useAuth();
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

        {/* Logout button - mobile only */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
              {user?.firstName?.[0]?.toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => { logout(); setMobileOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition font-medium text-sm"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
