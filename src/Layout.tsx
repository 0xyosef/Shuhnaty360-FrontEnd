import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
import AppSidebar from "./components/AppSidebar";
import Header from "./components/header/Header";
import SidebarMobileToggle from "./components/SidebarMobileToggle";
import { SidebarProvider } from "./components/ui/sidebar";

const Layout = React.memo(() => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-full relative overflow-hidden">
        <SidebarMobileToggle />
        <Header />
        <ScrollRestoration
          getKey={(location) => {
            return location.key;
          }}
        />
        <Toaster position="bottom-left" />
        <div className="max-w-full md:p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
});

export default Layout;
