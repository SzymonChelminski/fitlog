import Link from 'next/link';
import Logo from './Logo';

const NAV_GROUPS = [
  {
    heading: 'Product',
    links: [
      { label: 'Pricing', href: '#' },
      { label: 'About',   href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',   href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy',    href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] mt-10 bg-custom-page text-custom-text-main sm:mt-14">

      <div className="h-px w-full bg-gradient-to-r from-transparent via-custom-primary/40 to-transparent" />

      <div className="px-4 pt-12 pb-5 sm:px-6 sm:pt-16 sm:pb-6 md:px-8">

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex flex-col gap-4">
            <Logo size={36} isText={true} />
            <p className="max-w-[200px] text-sm leading-relaxed text-custom-text-muted/55 sm:max-w-[240px] sm:text-base">
              Precision performance tracking for the modern athlete.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {NAV_GROUPS.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-custom-text-muted/40 sm:text-xs">
                  {heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="w-fit text-sm text-custom-text-muted/60 transition-colors hover:text-custom-text-main sm:text-base"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

        </div>

        <div className="mt-10 h-px bg-custom-border sm:mt-12" />

        <div className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.68rem] text-custom-text-muted/40 sm:text-xs">
            © {new Date().getFullYear()} Fitlog. All rights reserved.
          </p>
          <p className="text-[0.68rem] uppercase tracking-widest text-custom-text-muted/25 sm:text-xs">
            v1.0.0-stable
          </p>
        </div>

      </div>
    </footer>
  );
}
