import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  google: (props: SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.73 1.9-3.41 0-6.18-2.8-6.18-6.18s2.77-6.18 6.18-6.18c1.93 0 3.3.73 4.08 1.48l2.7-2.7C18.43 2.84 15.75 2 12.48 2c-5.46 0-9.92 4.45-9.92 9.92s4.46 9.92 9.92 9.92c5.22 0 9.4-3.53 9.4-9.62 0-.58-.05-1.15-.14-1.68z" fill="currentColor"/>
    </svg>
  ),
  happy: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  ),
  sad: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="12" y2="12" />
      <line x1="15" x2="15.01" y1="12" y2="12" />
    </svg>
  ),
  energetic: (props: SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m14.31 8 2.09-2.5-2.22-1.74-2.5 2.23" />
      <path d="m9.69 16 2.09 2.5 2.22 1.74-2.5-2.23" />
      <path d="M7 12a5 5 0 0 0 9.35-2.5" />
      <path d="M17 12a5 5 0 0 0-9.35 2.5" />
    </svg>
  ),
  calm: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  ),
  romantic: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9a.5.5 0 0 1 .5-.5h.01a.5.5 0 0 1 .5.5v.01a.5.5 0 0 1-.5.5h-.01a.5.5 0 0 1-.5-.5z"/>
      <path d="M15 9a.5.5 0 0 1 .5-.5h.01a.5.5 0 0 1 .5.5v.01a.5.5 0 0 1-.5.5h-.01a.5.5 0 0 1-.5-.5z"/>
      <path d="M12 2a8.75 8.75 0 0 0-7.55 4.9" stroke="red" fill="red" />
      <path d="M12 2a8.75 8.75 0 0 1 7.55 4.9" stroke="red" fill="red" />
    </svg>
  ),
  focused: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <circle cx="15.5" cy="9.5" r="1.5" />
      <path d="M4.5 12.5h-2" />
      <path d="M19.5 12.5h2" />
    </svg>
  ),
  party: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 14 1.5 2h5l1.5-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
      <path d="m12 6-1-2-2 1" />
      <path d="m12 6 1-2 2 1" />
    </svg>
  ),
  melancholic: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <path d="M9 9l-1 2" />
      <path d="M15 9l1 2" />
      <path d="M8 14s-1.5 2-1.5 3.5" />
    </svg>
  )
};
