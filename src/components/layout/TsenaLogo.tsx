export default function TsenaLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: { box: 28, text: 14, sub: 7 },
    md: { box: 36, text: 18, sub: 8 },
    lg: { box: 48, text: 24, sub: 10 },
  };
  const d = dimensions[size];

  return (
    <svg
      width={d.box + (size === 'sm' ? 70 : size === 'md' ? 90 : 120)}
      height={d.box}
      viewBox={`0 0 ${d.box + (size === 'sm' ? 70 : size === 'md' ? 90 : 120)} ${d.box}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tsena logo"
    >
      {/* Icon: stylized "T" with shopping bag shape */}
      <rect width={d.box} height={d.box} rx={d.box * 0.22} fill="#0d3b2e" />
      <path
        d={
          size === 'sm'
            ? `M8 10h12M14 10v12M10 22h8`
            : size === 'md'
            ? `M10 12h16M18 12v16M12 28h12`
            : `M14 16h20M24 16v20M16 36h16`
        }
        stroke="#f0c040"
        strokeWidth={size === 'sm' ? 2 : size === 'md' ? 2.5 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Accent dot */}
      <circle
        cx={d.box * 0.78}
        cy={d.box * 0.22}
        r={d.box * 0.08}
        fill="#f0c040"
      />

      {/* Text */}
      <text
        x={d.box + 8}
        y={d.box * 0.62}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize={d.text}
        fill="#0d3b2e"
        letterSpacing="-0.02em"
      >
        Tsena
      </text>
      <text
        x={d.box + 8}
        y={d.box * 0.62 + d.sub + 2}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        fontSize={d.sub}
        fill="#6b7280"
        letterSpacing="0.12em"
      >
        MARKETPLACE
      </text>
    </svg>
  );
}
