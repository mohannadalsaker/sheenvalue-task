const StatusBadge = ({ status }: { status: "In Stock" | "Low Stock" }) => {
  return (
    <p
      className={`py-1 px-2 rounded-full font-semibold ${
        status === "In Stock"
          ? "bg-primary-gradient text-white"
          : "bg-slate-100 text-secondary-bg"
      }`}
    >
      {status}
    </p>
  );
};

export default StatusBadge;
