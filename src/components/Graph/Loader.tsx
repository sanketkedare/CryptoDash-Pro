export default function Loader() {
  return (
    <div className="flex flex-col gap-2 h-full p-2">
      <div className="flex-1 flex items-end gap-1.5 px-2">
        {[55, 75, 45, 85, 60, 90, 70, 80, 50, 95, 65, 85].map((h, i) => (
          <div
            key={i}
            className="shimmer flex-1 rounded-t"
            style={{ height: `${h}%`, opacity: 0.5 + (i % 3) * 0.15 }}
          />
        ))}
      </div>
      <div className="flex gap-6 px-2 shrink-0">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shimmer h-2 w-10 rounded" />
        ))}
      </div>
    </div>
  );
}
