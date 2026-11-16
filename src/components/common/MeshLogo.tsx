// The XSignOn Mesh mark: the angular XSignOn shield with a small mesh of linked nodes inside it. The shield
// is red and the mesh takes the text colour, so it works on light and dark backgrounds.

export function MeshLogo({ size = 56, title }: { size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d="M12 2 20.5 5v7.2L12 22 3.5 12.2V5Z" stroke="#c6001d" strokeWidth="1.7" />
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M12 7.2 8 11 12 14.8 16 11ZM8 11H5.6M16 11h2.4M12 14.8v2.6M12 7.2V5.4" />
        <path d="M8 11 12 11 16 11" />
        <path d="M12 7.2V14.8" />
      </g>
      <g fill="currentColor">
        <circle cx="12" cy="7.2" r="1.15" />
        <circle cx="8" cy="11" r="1.15" />
        <circle cx="16" cy="11" r="1.15" />
        <circle cx="12" cy="14.8" r="1.15" />
      </g>
      <circle cx="12" cy="11" r="1.5" fill="#c6001d" />
    </svg>
  );
}
