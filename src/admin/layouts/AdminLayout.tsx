
import { useState } from "react";
import { AdminHeader } from "../components/components/AdminHeader";
import Sidebar from "../components/components/AdminSidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className="bg-gray-50 flex">
            <Sidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className="flex-1 flex flex-col">
                <AdminHeader />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default AdminLayout