import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminTopbar from "./AdminTopbar.jsx";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-brand-pampas">
            <div className="flex min-h-screen">
                <AdminSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <AdminTopbar />

                    {/* Without a cap, tables stretch across the whole monitor
                        and the eyes have to travel from edge to edge. */}
                    <main className="mx-auto w-full max-w-[1600px] flex-1 px-[5%] py-8 lg:px-8 lg:py-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}