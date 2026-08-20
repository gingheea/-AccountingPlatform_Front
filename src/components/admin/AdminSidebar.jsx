import { NavLink } from "react-router-dom";
import {
    RxArchive,
    RxChatBubble,
    RxDashboard,
    RxIdCard,
    RxFileText,
    RxGear,
    RxLayers, RxPerson,
} from "react-icons/rx";

const navItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: RxDashboard,
        end: true,
    },
    {
        label: "Services",
        href: "/admin/services",
        icon: RxLayers,
    },
    {
        label: "Pricing Packages",
        href: "/admin/pricing-packages",
        icon: RxFileText,
    },
    {
        label: "Requests",
        href: "/admin/requests",
        icon: RxGear,
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: RxPerson,
    },
    {
        label: "Documents",
        href: "/admin/documents",
        icon: RxArchive,
    },
    {
        label: "Subscriptions",
        href: "/admin/subscriptions",
        icon: RxIdCard,
    },
    {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: RxChatBubble,
    },
];

export default function AdminSidebar() {
    const baseLinkClass =
        "flex items-center gap-3 rounded-button px-4 py-3 text-sm font-semibold transition-colors";

    return (
        <aside className="hidden w-72 shrink-0 border-r border-brand-border bg-white px-4 py-6 lg:flex lg:flex-col">
            <div className="mb-8 px-2">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Accounting
                </p>

                <h1 className="mt-2 font-heading text-2xl font-bold text-brand-ink">
                    Admin Panel
                </h1>
            </div>

            <nav className="flex flex-1 flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            end={item.end}
                            className={({ isActive }) =>
                                `${baseLinkClass} ${
                                    isActive
                                        ? "bg-brand-madison text-white shadow-soft"
                                        : "text-brand-muted hover:bg-brand-pampas hover:text-brand-madison"
                                }`
                            }
                        >
                            <Icon className="size-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="rounded-card border border-brand-border bg-brand-pampas p-4">
                <p className="text-sm font-semibold text-brand-ink">
                    Admin access
                </p>
                <p className="mt-1 text-sm leading-6 text-brand-muted">
                    Manage services, packages and client requests.
                </p>
            </div>
        </aside>
    );
}