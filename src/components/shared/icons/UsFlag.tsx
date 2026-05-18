export function UsFlag() {
  return (
    <svg
      viewBox="0 0 30 22"
      width={20}
      height={14}
      aria-hidden
      className="block shrink-0 border border-border-emphasis"
    >
      {Array.from({ length: 13 }, (_, index) => (
        <rect
          key={index}
          x="0"
          y={index * (22 / 13)}
          width="30"
          height={22 / 13}
          fill={index % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect x="0" y="0" width="13" height={22 * (7 / 13)} fill="#3C3B6E" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={1.4 + col * 2.5}
            cy={1.4 + row * 2.5}
            r="0.55"
            fill="#FFFFFF"
          />
        )),
      )}
    </svg>
  );
}
