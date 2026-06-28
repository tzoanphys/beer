import { getLocale, isValidLocale, languages, setLocale, t, type Locale } from './i18n.ts'
import { getPages, type PageId } from './pages.ts'

let onNavigate: (id: PageId) => void = () => {}

function renderLangOptions(): string {
  return languages
    .map(
      (lang) =>
        `<li><button class="lang-option${getLocale() === lang.code ? ' active' : ''}" type="button" data-lang="${lang.code}">${lang.label}</button></li>`,
    )
    .join('')
}

export function renderLeftRail(): string {
  const pages = getPages()
  const navLinks = pages
    .map(
      (p) =>
        `<li><button class="nav-link" data-nav="${p.id}" type="button">${t(p.labelKey)}</button></li>`,
    )
    .join('')

  return `
    <aside class="left-rail" aria-label="Menu">
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </aside>

    <nav id="site-nav" class="site-nav" aria-label="Main navigation">
      <div class="nav-backdrop" aria-hidden="true"></div>
      <div class="nav-panel">
        <div class="nav-panel-brand">
          <button class="nav-panel-logo-btn" type="button" data-nav="home" aria-label="${t('brand')} — ${t('navHome')}">
            <img class="nav-panel-logo" src="/sta-kac-logo.png" alt="" width="64" height="64" />
          </button>
        </div>
        <div class="nav-panel-header">
          <span class="nav-panel-title">${t('navTitle')}</span>
          <button class="nav-close" type="button" aria-label="Close menu">&times;</button>
        </div>
        <ul class="nav-list">${navLinks}</ul>
        <p class="nav-footer">${t('navFooter')}</p>
      </div>
    </nav>
  `
}

export function renderRightRail(): string {
  return `
    <aside class="right-rail" aria-label="Language">
      <button class="lang-toggle" type="button" aria-expanded="false" aria-controls="lang-panel">
        ${t('language')}
      </button>
    </aside>

    <div id="lang-panel" class="lang-panel" aria-label="Language selection">
      <div class="lang-backdrop" aria-hidden="true"></div>
      <div class="lang-panel-inner">
        <div class="lang-panel-header">
          <span class="lang-panel-title">${t('language')}</span>
          <button class="lang-close" type="button" aria-label="Close">&times;</button>
        </div>
        <ul class="lang-list">${renderLangOptions()}</ul>
      </div>
    </div>
  `
}

export function renderHeader(): string {
  return `
    <header class="site-header">
      <a class="logo" href="#" data-nav="home" aria-label="${t('brand')} — ${t('navHome')}">
        <img class="logo-img" src="/sta-kac-logo.png" alt="${t('brand')}" width="72" height="72" />
      </a>
    </header>
  `
}

function closeNav(): void {
  const nav = document.getElementById('site-nav')
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
  nav?.classList.remove('open')
  toggle?.setAttribute('aria-expanded', 'false')
  document.body.classList.remove('nav-open')
}

function openNav(): void {
  closeLang()
  const nav = document.getElementById('site-nav')
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
  nav?.classList.add('open')
  toggle?.setAttribute('aria-expanded', 'true')
  document.body.classList.add('nav-open')
}

function closeLang(): void {
  const panel = document.getElementById('lang-panel')
  const toggle = document.querySelector<HTMLButtonElement>('.lang-toggle')
  panel?.classList.remove('open')
  toggle?.setAttribute('aria-expanded', 'false')
  document.body.classList.remove('lang-open')
}

function openLang(): void {
  closeNav()
  const panel = document.getElementById('lang-panel')
  const toggle = document.querySelector<HTMLButtonElement>('.lang-toggle')
  panel?.classList.add('open')
  toggle?.setAttribute('aria-expanded', 'true')
  document.body.classList.add('lang-open')
}

function bindControls(): void {
  const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
  const navClose = document.querySelector<HTMLButtonElement>('.nav-close')
  const navBackdrop = document.querySelector<HTMLDivElement>('.nav-backdrop')
  const langToggle = document.querySelector<HTMLButtonElement>('.lang-toggle')
  const langClose = document.querySelector<HTMLButtonElement>('.lang-close')
  const langBackdrop = document.querySelector<HTMLDivElement>('.lang-backdrop')

  menuToggle?.addEventListener('click', () => {
    document.getElementById('site-nav')?.classList.contains('open') ? closeNav() : openNav()
  })
  navClose?.addEventListener('click', closeNav)
  navBackdrop?.addEventListener('click', closeNav)

  langToggle?.addEventListener('click', () => {
    document.getElementById('lang-panel')?.classList.contains('open') ? closeLang() : openLang()
  })
  langClose?.addEventListener('click', closeLang)
  langBackdrop?.addEventListener('click', closeLang)
}

export function setupGlobalListeners(navigate: (id: PageId) => void): void {
  onNavigate = navigate

  const win = window as Window & { __staKacClickHandler?: (e: Event) => void }
  if (win.__staKacClickHandler) {
    document.removeEventListener('click', win.__staKacClickHandler)
  }

  const clickHandler = (e: Event) => {
    const navTarget = (e.target as HTMLElement).closest<HTMLElement>('[data-nav]')
    if (navTarget) {
      e.preventDefault()
      onNavigate(navTarget.dataset.nav as PageId)
      return
    }

    const langTarget = (e.target as HTMLElement).closest<HTMLElement>('[data-lang]')
    if (langTarget) {
      e.preventDefault()
      const code = langTarget.dataset.lang
      if (code && isValidLocale(code)) {
        setLocale(code)
        closeLang()
      }
      return
    }
  }

  win.__staKacClickHandler = clickHandler
  document.addEventListener('click', clickHandler)

  const winKey = window as Window & { __staKacEscapeHandler?: (e: KeyboardEvent) => void }
  if (winKey.__staKacEscapeHandler) {
    document.removeEventListener('keydown', winKey.__staKacEscapeHandler)
  }

  const escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeNav()
      closeLang()
    }
  }

  winKey.__staKacEscapeHandler = escapeHandler
  document.addEventListener('keydown', escapeHandler)
}

export function setupNav(navigate: (id: PageId) => void): void {
  onNavigate = navigate
  bindControls()
}

export function updateActiveLink(id: PageId): void {
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', (link as HTMLElement).dataset.nav === id)
  })
}

export function updateActiveLanguage(): void {
  const locale = getLocale()
  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.classList.toggle('active', (btn as HTMLElement).dataset.lang === locale)
  })
}

export function refreshRailLabels(): void {
  const pages = getPages()
  document.querySelectorAll('.nav-link').forEach((link) => {
    const id = (link as HTMLElement).dataset.nav
    const page = pages.find((p) => p.id === id)
    if (page) link.textContent = t(page.labelKey)
  })

  const title = document.querySelector('.nav-panel-title')
  const footer = document.querySelector('.nav-footer')
  const langToggle = document.querySelector('.lang-toggle')
  const langTitle = document.querySelector('.lang-panel-title')
  const navLogoBtn = document.querySelector<HTMLButtonElement>('.nav-panel-logo-btn')

  if (title) title.textContent = t('navTitle')
  if (footer) footer.textContent = t('navFooter')
  if (langToggle) langToggle.textContent = t('language')
  if (langTitle) langTitle.textContent = t('language')
  if (navLogoBtn) navLogoBtn.setAttribute('aria-label', `${t('brand')} — ${t('navHome')}`)

  const logoLink = document.querySelector<HTMLAnchorElement>('.logo')
  const logoImg = document.querySelector<HTMLImageElement>('.logo-img')
  const navLogo = document.querySelector<HTMLImageElement>('.nav-panel-logo')
  if (logoLink) logoLink.setAttribute('aria-label', `${t('brand')} — ${t('navHome')}`)
  if (logoImg) logoImg.alt = t('brand')
  if (navLogo) navLogo.alt = t('brand')

  const list = document.querySelector('.lang-list')
  if (list) list.innerHTML = renderLangOptions()

  updateActiveLanguage()
}
