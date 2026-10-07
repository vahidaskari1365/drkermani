'use client';

import { goSection } from '@/lib/router';

const NAV = [
  { href: '#about', label: 'درباره' },
  { href: '#services', label: 'خدمات' },
  { href: '#gallery', label: 'نمونه‌کارها' },
  { href: '#pricing', label: 'هزینه‌ها' },
  { href: '#team', label: 'تیم' },
  { href: '#contact', label: 'تماس' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto">
      {/* glass footer — the film stays visible behind */}
      <div className="glass-28 border-x-0 border-b-0 rounded-none">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 md:px-10 md:pt-20">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
            <div>
              <p className="display text-2xl text-white">دکتر حامد کرمانی</p>
              <p className="mt-3 text-[11px] tracking-[0.28em] text-white/55">
                ORAL &amp; MAXILLOFACIAL SURGEON
              </p>
              <p className="mt-6 max-w-xs text-[12px] font-normal leading-7 text-white/75">
                متخصص جراحی فک و صورت — ارتوسرجری، جراحی دو فک، جنیوپلاستی،
                بلفاروپلاستی، ایمپلنت و بازسازی فک
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-16 gap-y-3 sm:grid-cols-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goSection(n.href.slice(1));
                  }}
                  className="u-link w-fit text-[13px] font-normal text-white/85 transition-colors duration-300 hover:text-white"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/12 pt-8 text-[11px] font-normal text-white/55 md:flex-row md:items-center">
            <p>© ۱۴۰۵ مطب دکتر حامد کرمانی — تمامی حقوق محفوظ است.</p>
            <p className="label-num" dir="ltr">
              dromfs.com — Tehran, Iran
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
