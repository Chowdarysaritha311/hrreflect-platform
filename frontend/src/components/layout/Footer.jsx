import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Contact', path: '/contact' },
  ],
  'For Candidates': [
    { name: 'Job Vacancies', path: '/vacancies' },
    { name: 'Register as Job Seeker', path: '/job-seekers' },
  ],
};

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hrreflect1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/hrreflect1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hr-reflect1/?viewAsMember=true',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5 group">
              <div className="bg-white rounded-xl px-4 py-2 inline-flex items-center group-hover:opacity-90 transition-opacity shadow-sm">
                <img
                  src="/hrr-logo.jpg"
                  alt="HRReflect"
                  className="h-9 w-auto object-contain"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span style="font-family:Syne,sans-serif;font-weight:800;font-size:18px;color:#F97316">HR<span style="color:#111827">Reflect</span></span>';
                  }}
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-sm">
              India's modern HR consultancy delivering top-tier talent for forward-thinking companies. Trusted by 30+ businesses across Bangalore and growing.
            </p>
            <div className="space-y-2 mb-6">
              <a href="tel:+919452155154" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Phone size={14} className="text-brand-red flex-shrink-0" /> +91 94521 55154
              </a>
              <a href="mailto:info@hrreflect.com" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Mail size={14} className="text-brand-red flex-shrink-0" /> info@hrreflect.com
              </a>
              <span className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="text-brand-red flex-shrink-0" /> Kanakapura Road, Bangalore 560082
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors text-white">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                      <span>{link.name}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
                {/* Admin login — subtle, only visible to team */}
                {group === 'For Candidates' && (
                  <li className="pt-3 border-t border-white/5 mt-3">
                    <Link to="/admin/login" className="text-gray-600 hover:text-gray-400 text-xs transition-colors flex items-center gap-1">
                      🔐 Admin Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} HRReflect. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Kanakapura Road, Bangalore, Karnataka 560082</p>
        </div>
      </div>
    </footer>
  );
}
