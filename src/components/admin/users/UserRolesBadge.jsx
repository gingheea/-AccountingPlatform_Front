export default function UserRolesBadge({ roles = [] }) {
    if (!roles.length) {
        return (
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-gothic">
                No roles
            </span>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
                <span
                    key={role}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        role === "Admin"
                            ? "bg-brand-madison text-white"
                            : "bg-brand-pampas text-brand-madison"
                    }`}
                >
                    {role}
                </span>
            ))}
        </div>
    );
}