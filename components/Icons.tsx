type IconSvgProps = {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

export function UploadIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function MicIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" fill="currentColor" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4m-4 0h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function MicOffIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m2 2 20 20M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.5-.35 2.18M12 19v4m-4 0h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function SendIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m22 2-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="m22 2-11 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function CloseIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function LoadingIcon({ size = 24, className }: IconSvgProps) {
  return (
    <svg className={`animate-spin ${className ?? ""}`} fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function ImageIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" width="18" x="3" y="3" />
      <circle cx="8.5" cy="8.5" fill="currentColor" r="1.5" />
      <path d="m21 15-5-5L5 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function UserIcon({ size = 24, ...props }: IconSvgProps) {
  return (
    <svg fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
