import React from "react";
import PropTypes from "prop-types";



const ProgressBar = ({
    value,
    current,
    target,
    label,
    caption,
    height = 8,
    colorClass = "from-green-400 to-blue-400",
}) => {
    
    let pct = 0;
    if (typeof value === "number") {
        pct = value;
    } else if (typeof current === "number" && typeof target === "number" && target > 0) {
        pct = Math.round((current / target) * 100);
    }
    
    const safePct = Math.max(0, Math.min(100, Math.round(pct)));

    return (
        <div>
            {label && <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-700">{label}</div>
                {caption && <div className="text-sm text-gray-500">{caption}</div>}
            </div>}

            <div
                className="w-full bg-gray-200 rounded-full"
                style={{ height: `${height}px` }}
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={safePct}
                aria-label={label || "Progress"}
            >
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500 ease-out`}
                    style={{ width: `${safePct}%` }}
                />
            </div>

            {!label && caption && (
                <div className="mt-2 text-sm text-gray-500">{caption}</div>
            )}
        </div>
    );
};

ProgressBar.propTypes = {
    value: PropTypes.number,
    current: PropTypes.number,
    target: PropTypes.number,
    label: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    colorClass: PropTypes.string,
};

export default ProgressBar;
