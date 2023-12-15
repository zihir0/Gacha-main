import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import ProtectedRoute from "ProtectedRoutes";
import InventoryPage from "scenes/inventoryPage";
import AdminLoginPage from "scenes/adminLoginPage";
import AdminDashboardPage from "scenes/adminDashboard";
import AdminManageItemsPage from "scenes/adminManageItems";
import AdminManagePlayersPage from "scenes/adminManagePlayers";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const role = useSelector((state) => state.role);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/inventory"
              element={isAuth ? <InventoryPage /> : <Navigate to="/" />}
            />

            {/*Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                isAuth ? <AdminDashboardPage /> : <Navigate to="/admin" />
              }
            />
            <Route
              path="/admin/manage/Players"
              element={
                isAuth ? <AdminManagePlayersPage /> : <Navigate to="/admin" />
              }
            />
            <Route
              path="/admin/manage/Items"
              element={
                isAuth ? <AdminManageItemsPage /> : <Navigate to="/admin" />
              }
            />
            <Route
              element={<ProtectedRoute role={role} isAuth={isAuth} />}
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
