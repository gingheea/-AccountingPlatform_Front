import { typeClass, typeLabel } from "../../../constants/requests";

export default function RequestTypeBadge({ requestType }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${typeClass(requestType)}`}
        >
            {typeLabel(requestType)}
        </span>
    );
}
