---
Task ID: 1
Agent: main (Super Z)
Task: Scroll-scrubbed video homepage for dromfs.com (Dr. Hamed Kermani OMFS clinic)

Work Log:
- Loaded fullstack-dev skill; initialized Next.js 16 environment
- Analyzed source video: 1920x1080, 30fps, 10.03s, 301 frames
- Scraped dromfs.com via page_reader (site geo-blocked from sandbox): services, prices, hours, team, contact, address
- Extracted 151 frames @ 1152x648 (2.9MB) to public/frames/ + poster.jpg
- dromfs.com images unreachable directly -> used image-search skill (OSS-hosted) for clinic/gallery/team imagery; downloaded Vazirmatn woff2 fonts locally
- Built editorial/cinematic design system in globals.css (ink/paper/accent tokens, Vazirmatn @font-face, u-link, reveal, scroll-cue, cine-img)
- Built ScrollVideoHero.tsx: scrub track h-[320vh]/md:h-[430vh] + sticky h-screen viewport; scroll progress maps linearly to 151 frames; rAF lerp engine; DPR-aware cover-fit canvas; progress exported as CSS var --p for overlay fade (no re-renders); preloader with thin progress line; reduced-motion support
- Fixed React StrictMode bug: split preload effect (guarded) from scrub-engine effect (always re-attached listeners)
- Built Navbar (glass on scroll, fullscreen editorial mobile menu), About, Services (editorial index rows with hover image reveal), Gallery (dark hairline grid), Pricing (two editorial tables, real prices), Team, Contact (hours/channels/address), Footer
- RTL fa layout, dir=ltr fixes for phone numbers/instagram handle
- Verified via agent-browser: scrub math exact (p=0.404@1200px etc), 10-sample full sweep shows 10 distinct frames, anchor nav exact, mobile 390px OK, console clean, lint clean

Stage Summary:
- Single scrub system lives ONLY in ScrollVideoHero.tsx; no nested scroll containers anywhere
- Content: all dromfs.com info (services, prices in Toman, hours, team, 02166921500, 09382080270, address, Instagram, Aparat, Google Maps)
- Dev server running on port 3000; production-ready
