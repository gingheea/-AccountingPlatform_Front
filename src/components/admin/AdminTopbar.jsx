import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxExit, RxHome } from "react-icons/rx";
import { useAuth } from "../../hooks/useAuth.js";

const mobileLinks = [
    {
        label: "Dashboard",
        href: "/admin",
        end: true,
    },
    {
        label: "Services",
        href: "/admin/services",
    },
    {
        label: "Pricing",
        href: "/admin/pricing-packages",
    },
    {
        label: "Requests",
        href: "/admin/requests",
    },
];

export default function AdminTopbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="sticky top-0 z-40 border-b border-brand-border bg-white/95 px-[5%] py-4 backdrop-blur-md lg:px-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Admin
                    </p>
                    <h2 className="font-heading text-xl font-bold text-brand-ink">
                        Control center
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                    >
                        <RxHome className="size-4" />
                        <span className="hidden sm:inline">На головну</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                    >
                        <RxExit className="size-4" />
                        <span className="hidden sm:inline">Вийти</span>
                    </button>
                </div>
            </div>

            <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
                {mobileLinks.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.end}
                        className={({ isActive }) =>
                            `whitespace-nowrap rounded-button px-4 py-2 text-sm font-semibold transition-colors ${
                                isActive
                                    ? "bg-brand-madison text-white"
                                    : "bg-brand-pampas text-brand-madison"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}