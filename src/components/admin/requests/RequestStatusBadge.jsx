import { statusClass, statusLabel } from "../../../constants/requests";

export default function RequestStatusBadge({ status }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(status)}`}
        >
            {statusLabel(status)}
        </span>
    );
}
