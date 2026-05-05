export function AvailableTag() {
  return (
    <div className="inline-flex items-center shrink-0">
      <span className="flex items-center gap-2 text-sm text-fg-tertiary">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{
            backgroundColor: "rgb(var(--status-available))",
            animation: "pulse-available 3s ease-in-out infinite",
          }}
        />
        Available for work
      </span>
    </div>
  );
}
