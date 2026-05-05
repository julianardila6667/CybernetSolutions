# Cybernet Solutions

Modern marketing site for **Cybernet Solutions** — AI-powered network and cybersecurity services.

> *We connect real people with reliable, scalable and secure technology.*

## Tech stack

Pure **HTML + CSS + JavaScript** — no frameworks, no build step.

```
.
├── index.html       # Page structure
├── styles.css       # Design system, layout, animations, responsive
├── script.js        # Mobile menu, scroll-spy, counters, forms
└── assets/
    └── logo.svg     # Brand logo
```

## Features

- Sticky glass header with scroll-aware state
- Animated hero with gradient blob and live "network monitor" mock
- Stats with animated counters (10+, 500+, 99%, 24/7)
- Three service cards with featured highlight
- Mission pillars (Customized · Proactive · Continuous Innovation)
- Founder section
- Journey timeline (2014 → 2025) with growth card
- Customer testimonials
- Contact form with `mailto:` integration
- Newsletter subscribe form
- Fully responsive (desktop / tablet / mobile)
- Reveal-on-scroll animations via `IntersectionObserver`
- Accessibility: ARIA, focus states, `prefers-reduced-motion`

## Run locally

Just open `index.html` in your browser.

For full font rendering and smooth navigation, serve it via a tiny local server:

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deployment

The site is fully static — drop the contents on any host:

- **GitHub Pages** — enable Pages on the `main` branch
- **Netlify** / **Vercel** — drag & drop the folder, no config needed
- **Any static host** (S3, Cloudflare Pages, etc.)

## Contact

cybernetsolutionss@hotmail.com
