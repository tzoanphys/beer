import { t } from './i18n.ts'

export type PageId = 'home' | 'who-we-are' | 'our-collection' | 'more-about-beer'

export interface Page {
  id: PageId
  labelKey: string
  render: () => string
}

const beers = [
  {
    name: 'Schrödinger Cat',
    style: 'Superposition Edition',
    abv: '6.5%',
    noteKey: 'beerSchrodingerNote',
    image: '/schrodinger-cat.jpeg',
    color: '#ff4d6d',
  },
  {
    name: 'Dark Matter',
    style: 'Amber Ale',
    abv: '5.6%',
    noteKey: 'beerDarkMatterNote',
    image: '/dark-matter.jpeg',
    color: '#ff6b35',
  },
  {
    name: 'Bottom Quark',
    style: 'Belgian Ale',
    abv: '5.0%',
    noteKey: 'beerBottomQuarkNote',
    image: '/bottom-quark.jpeg',
    color: '#d4a853',
  },
  {
    name: 'Supergravity',
    style: 'Tripel',
    abv: '10.0%',
    noteKey: 'beerSupergravityNote',
    image: '/supergravity.jpeg',
    color: '#e63946',
  },
  {
    name: 'White Dwarfs',
    style: 'Weizen',
    abv: '5.2%',
    noteKey: 'beerWhiteDwarfNote',
    image: '/white-dwarf.jpeg',
    color: '#2dd4bf',
  },
  {
    name: 'Dark Energy',
    style: 'Special Edition',
    abv: '7.4%',
    noteKey: 'beerDarkEnergyNote',
    image: '/dark-energy.jpeg',
    color: '#14b8a6',
  },
]

function renderStorySection(): string {
  return `
    <div class="story-layout">
      <figure class="founders-photo">
        <div class="founders-photo-frame">
          <img src="/founders.jpg" alt="${t('aboutPhotoCaption')}" loading="lazy" />
        </div>
        <figcaption>${t('aboutPhotoCaption')}</figcaption>
      </figure>

      <div class="story-text">
        <p class="story-paragraph">${t('aboutIntro')}</p>
        <p class="story-paragraph">${t('aboutSite')}</p>
        <p class="story-paragraph story-paragraph-accent">${t('aboutSocial')}</p>
      </div>
    </div>
  `
}

export function getPages(): Page[] {
  return [
    {
      id: 'home',
      labelKey: 'navHome',
      render: () => `
        <section class="page page-home">
          <div class="home-hero">
            <p class="eyebrow">${t('homeEyebrow')}</p>
            <h1 class="home-welcome">${t('homeWelcome')}</h1>
            <p class="home-brand">${t('homeTitle')}</p>
            <p class="home-tagline">${t('homeTagline')}</p>
            <p class="lead home-lead">${t('homeLead')}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-nav="our-collection">${t('homeCtaCollection')}</button>
              <button class="btn btn-ghost" data-nav="who-we-are">${t('homeCtaMission')}</button>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: 'who-we-are',
      labelKey: 'navWho',
      render: () => `
        <section class="page page-about">
          <header class="page-header">
            <p class="eyebrow">${t('aboutEyebrow')}</p>
            <h1>${t('aboutTitle')}</h1>
          </header>
          ${renderStorySection()}
        </section>
      `,
    },
    {
      id: 'our-collection',
      labelKey: 'navCollection',
      render: () => `
        <section class="page page-collection">
          <header class="page-header">
            <p class="eyebrow">${t('collectionEyebrow')}</p>
            <h1>${t('collectionTitle')}</h1>
            <p class="lead">${t('collectionLead')}</p>
          </header>
          <div class="beer-grid">
            ${beers
              .map(
                (beer) => `
              <article class="beer-card" style="--beer-accent: ${beer.color}">
                <div class="beer-card-glow"></div>
                <div class="beer-card-image">
                  <img src="${beer.image}" alt="${beer.name}" loading="lazy" />
                </div>
                <div class="beer-card-body">
                  <div class="beer-card-header">
                    <span class="beer-badge">${t('specimen')}</span>
                    <h2>${beer.name}</h2>
                    <p class="beer-style">${beer.style}</p>
                  </div>
                  <div class="beer-specs">
                    <span><strong>ABV</strong> ${beer.abv}</span>
                  </div>
                  <p>${t(beer.noteKey)}</p>
                </div>
              </article>
            `,
              )
              .join('')}
          </div>
        </section>
      `,
    },
    {
      id: 'more-about-beer',
      labelKey: 'navScience',
      render: () => `
        <section class="page page-science">
          <header class="page-header">
            <p class="eyebrow">${t('scienceEyebrow')}</p>
            <h1>${t('scienceTitle')}</h1>
            <p class="lead">${t('scienceLead')}</p>
          </header>
          <div class="science-timeline">
            <article class="timeline-item">
              <span class="timeline-step">01</span>
              <div>
                <h2>${t('step1Title')}</h2>
                <p>${t('step1Text')}</p>
              </div>
            </article>
            <article class="timeline-item">
              <span class="timeline-step">02</span>
              <div>
                <h2>${t('step2Title')}</h2>
                <p>${t('step2Text')}</p>
              </div>
            </article>
            <article class="timeline-item">
              <span class="timeline-step">03</span>
              <div>
                <h2>${t('step3Title')}</h2>
                <p>${t('step3Text')}</p>
              </div>
            </article>
            <article class="timeline-item">
              <span class="timeline-step">04</span>
              <div>
                <h2>${t('step4Title')}</h2>
                <p>${t('step4Text')}</p>
              </div>
            </article>
          </div>
          <div class="formula-box">
            <p class="formula-label">${t('formulaLabel')}</p>
            <code>C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ + Energy</code>
            <p class="formula-caption">${t('formulaCaption')}</p>
          </div>
        </section>
      `,
    },
  ]
}

export function getPage(id: PageId): Page {
  return getPages().find((p) => p.id === id) ?? getPages()[0]
}
