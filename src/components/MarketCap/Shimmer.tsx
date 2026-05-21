export default function Shimmer() {
  return (
    <div className="flex flex-col gap-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
        >
          {/* Coin info */}
          <div className="flex items-center gap-2">
            <div className="shimmer w-7 h-7 rounded-full shrink-0" />
            <div className="flex flex-col gap-1">
              <div className="shimmer h-2.5 w-16 rounded" />
              <div className="shimmer h-2 w-8 rounded" />
            </div>
          </div>
          {/* Price */}
          <div className="text-right flex flex-col gap-1 items-end">
            <div className="shimmer h-2.5 w-14 rounded" />
            <div className="shimmer h-2 w-10 rounded" />
          </div>
          {/* Badge */}
          <div className="shimmer h-4 w-12 rounded" />
        </div>
      ))}
    </div>
  );
}
