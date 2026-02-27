import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../hooks/useAuth";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface Props {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
}

export default function Navbar({
  collapsed,
  setCollapsed,
  setMobileOpen,
}: Props) {
  const { user, logout } = useAuth();

  return (
    <div className="h-14 bg-white shadow flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <button
          className="hidden lg:block"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <h1 className="font-semibold">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.firstName}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
