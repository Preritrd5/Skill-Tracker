const StatCard = ({ title, value, subtitle, variant = "default" }) => {
    const styles = {
        orange: "bg-gradient-to-r from-[#FF7C01] to-[#FFB800] text-white",
        blue: "bg-gradient-to-r from-[#007BFF] to-[#00C3FF] text-white",
        default: "bg-white text-gray-900 border border-gray-100",
    };

    return (
        <div className={`rounded-lg p-4 shadow-sm ${styles[variant]}`}>
            <div className="text-sm opacity-80">{title}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
            {subtitle && <div className="text-xs opacity-70 mt-1">{subtitle}</div>}
        </div>
    );
};

export default StatCard;
