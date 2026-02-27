import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";

import AppLayout from "../components/layout/AppLayout";
import { appRoutes } from "./Routes";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/" />}>
          {appRoutes
            .filter((route) => route.private)
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
