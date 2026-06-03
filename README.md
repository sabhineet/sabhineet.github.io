# Abhineet Srivastava — Academic Portfolio

> Physics researcher at the intersection of high-energy astrophysics and computational methods.

**Live site:** [sabhineet.github.io](https://sabhineet.github.io)

---

## About Me

I am an M.Sc. Physics student at UPES Dehradun, specialising in high-energy astrophysics and computational physics. My graduate thesis investigates disk-corona-jet connections in stellar-mass black holes using NuSTAR X-ray data. I also collaborate with the University of Delhi on stochastic dynamics of Brownian motion in non-conservative potentials.

I have completed the **Google Data Analytics Professional Certificate** (9-course Coursera specialisation) and maintain an open-source Computational Physics Library for students and researchers.

---

## Website Features

- **Cosmic dark mode** (default) with warm light mode — persisted via localStorage
- **Animated star-field** canvas background on the hero section
- **Scroll-reveal** animations using IntersectionObserver
- **Filterable certifications gallery** — filter by category without page reload
- **Embedded Computational Physics Library** (iframe preview)
- Fully responsive — mobile, tablet, desktop
- Semantic HTML5, accessible navigation, keyboard-navigable
- Zero external JS dependencies — vanilla HTML/CSS/JavaScript only

---

## Pages

| File | Description |
|---|---|
| `index.html` | Homepage: hero, about, skills, research preview, analytics section, open source, contact |
| `research.html` | Full research portfolio — graduate work, previous work, collaborators |
| `projects.html` | Coding projects and Computational Physics Library |
| `certifications.html` | Filterable certifications gallery — data analytics, astrophysics, training |
| `cv.html` | Full Curriculum Vitae with timeline layout |
| `style.css` | All styles — design tokens, dark/light themes, layout, components |
| `script.js` | Theme toggle, star canvas, navbar, mobile menu, scroll-reveal, cert filter, contact form |

---

## Research Interests

- Black hole accretion physics and disk-corona-jet coupling
- High-energy astrophysics and radiative transfer
- X-ray timing and spectral analysis (NuSTAR, HEASARC)
- Exoplanet detection and characterisation
- Stochastic dynamics and statistical mechanics
- Computational astrophysics and scientific machine learning
- Galaxy formation, dark matter, and dark energy

---

## Technical Skills

**Scientific Computing:** Python, C++, Fortran, MATLAB/Scilab, LaTeX  
**Astronomy Tools:** HEASoft, HEASARC, TOPCAT, Aladin, iSpec, SRIM, Gnuplot, Astropy, Stingray  
**Methods:** X-ray timing and spectral analysis, Monte Carlo simulation, Green's function methods, Fourier analysis, Random Forest regression  
**Python Libraries:** NumPy, SciPy, Pandas, Matplotlib, Seaborn, scikit-learn, Astropy  
**Platforms:** GitHub, Linux/Bash, Overleaf, Jupyter Notebooks

---

## Data Analytics Skills

**Google Data Analytics Professional Certificate** (9-course, Coursera/Google, 2025)  
**Tools:** SQL (BigQuery, PostgreSQL), R (tidyverse, ggplot2), Tableau, Excel/Spreadsheets  
**Skills:** Data cleaning, exploratory analysis, data visualisation, statistical analysis, case studies, data storytelling

---

## Featured Projects

### Computational Physics Library
Open-source numerical methods and physics simulators for students and researchers.  
**Live:** [sabhineet.github.io/computational-physics-library](https://sabhineet.github.io/computational-physics-library)

### NuSTAR X-ray Analysis Pipeline
Automated Python pipeline for reducing NuSTAR FITS data, extracting light curves, computing power density spectra and time lags.

### Brownian Motion Monte Carlo Simulator
Python Monte Carlo engine for stochastic Brownian motion in non-conservative potentials — ensemble statistics, MSD, velocity autocorrelations.

### Exoplanet Property Predictor
Random forest model trained on the NASA Exoplanet Archive to predict unmeasured planetary parameters from known observables.

### Ion Beam Implantation Simulation
SRIM-based pipeline for predicting implantation depth profiles of C⁺, N⁺, CO⁺ ions in Si(100) substrates.

---

## Certifications

- **Google Data Analytics Professional Certificate** — Google / Coursera, 2025
- Summer School on Gravitational-Wave Astronomy — ICTS-TIFR, Bengaluru, July 2025
- Astronomy: Exploring Time and Space — University of Arizona / Coursera
- From the Big Bang to Dark Energy — University of Tokyo / Coursera
- Python for Data Science — Coursera

Full list with verification links: [certifications page](certifications.html)

---

## Contact

- **Email:** abhixneet@gmail.com
- **GitHub:** [github.com/sabhineet](https://github.com/sabhineet)
- **LinkedIn:** [linkedin.com/in/abhineet-srivastava-](https://www.linkedin.com/in/abhineet-srivastava-/)

---

## Local Development

No build tools needed. This is a plain static site.

```bash
# Clone the repository
git clone https://github.com/sabhineet/sabhineet.github.io.git
cd sabhineet.github.io

# Open in browser — any method works:
open index.html                        # macOS
python -m http.server 8000             # Python live server (recommended)
npx serve .                            # Node.js serve
```

Then visit `http://localhost:8000` in your browser.

---

## Deployment

This site is hosted on **GitHub Pages** from the root of the `main` branch.

To deploy:
1. Push changes to the `main` branch
2. GitHub Pages automatically rebuilds and deploys within ~60 seconds
3. Live at `https://sabhineet.github.io`

---

## Adding Content

### Adding a Certificate
Open `certifications.html` and copy the `.cert-card` template:

```html
<div class="cert-card reveal" data-category="analytics">
  <span class="cert-org">Organisation · Platform</span>
  <h3>Certificate Name</h3>
  <div class="tags-wrap"><span class="tag">Tag</span></div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto">
    <span class="cert-date">Year</span>
    <a href="VERIFICATION_URL" target="_blank" rel="noopener" class="cert-verify">Verify ↗</a>
  </div>
</div>
```

Set `data-category` to `analytics`, `astrophysics`, or `training`. No other code changes needed.

### Adding a Research Project
Add a new `.research-item` block to `research.html`. Follow the existing pattern — `.r-meta` for date/type, `.r-body` for content.

### Adding a Coding Project
Add a new `.project-card` block to `projects.html`.

---

## Folder Structure

```
sabhineet.github.io/
├── index.html               # Homepage
├── research.html            # Research portfolio
├── projects.html            # Coding projects
├── certifications.html      # Certifications gallery
├── cv.html                  # Curriculum Vitae
├── style.css                # All styles
├── script.js                # All JavaScript
├── Master_CV_Abhineet_Srivastava.pdf   # CV PDF for download
├── assets/                  # Images and other assets
├── images/                  # Additional images
└── README.md                # This file
```

---

## Design System

The site uses a **cosmic editorial** aesthetic:

| Token | Value |
|---|---|
| Dark background | `#0d0c0a` |
| Accent (amber gold) | `#d4952f` |
| Heading font | Playfair Display |
| Body font | Source Serif 4 |
| Label/code font | DM Mono |
| UI font | Instrument Sans |

Dark mode is the default. Theme preference is saved to `localStorage`.

---

## Future Roadmap

- [ ] Add poster presentations page
- [ ] Add publication preprints when available (arXiv links)
- [ ] Add data analytics project showcase with embedded Tableau dashboards
- [ ] Add GitHub contribution graph (GitHub Stats API)
- [ ] Add blog/notes section for physics write-ups
- [ ] Add search functionality across research and projects

---

*© 2026 Abhineet Srivastava · UPES Dehradun*
