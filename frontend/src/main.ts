import './style.css'
import { initLocale, onLocaleChange, t } from './i18n.ts'
import {
  refreshRailLabels,
  renderHeader,
  renderLeftRail,
  renderRightRail,
  setupGlobalListeners,
  setupNav,
  updateActiveLink,
} from './nav.ts'
import { getPage, type PageId } from './pages.ts'

const app = document.querySelector<HTMLDivElement>('#app')!
const validPages: PageId[] = [
  'home',
  'who-we-are',
  'our-collection',
  'more-about-beer',
  'video',
  'connection',
]

let currentPage: PageId = 'home'

function renderStars(): string {
  const stars = Array.from({ length: 80 }, () => {
    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 2 + 0.5
    const delay = Math.random() * 5
    const duration = Math.random() * 3 + 2
    return `<span class="star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${duration}s"></span>`
  }).join('')
  return `<div class="starfield" aria-hidden="true">${stars}</div>`
}

function pageFromHash(): PageId {
  const hash = window.location.hash.replace('#', '')
  return validPages.includes(hash as PageId) ? (hash as PageId) : 'home'
}

function buildUrl(id: PageId): string {
  const base = `${window.location.pathname}${window.location.search}`
  return id === 'home' ? base : `${base}#${id}`
}

function renderPage(id: PageId, scrollToTop = true): void {
  currentPage = id
  const page = getPage(id)
  const main = document.querySelector<HTMLElement>('#main-content')
  if (!main) return

  main.innerHTML = page.render()
  updateActiveLink(id)
  updateFooter()
  document.title = t('brand')
  if (scrollToTop) window.scrollTo({ top: 0, behavior: 'smooth' })
}

function navigateTo(id: PageId): void {
  if (id === currentPage) {
    closeNavIfOpen()
    return
  }

  history.pushState({ page: id }, '', buildUrl(id))
  renderPage(id)
  closeNavIfOpen()
}

function closeNavIfOpen(): void {
  document.getElementById('site-nav')?.classList.remove('open')
  document.body.classList.remove('nav-open')
  document.querySelector<HTMLButtonElement>('.menu-toggle')?.setAttribute('aria-expanded', 'false')
}

function updateFooter(): void {
  const footer = document.querySelector<HTMLElement>('.site-footer p')
  if (footer) footer.textContent = t('footer')
}

function refreshAll(): void {
  refreshRailLabels()
  renderPage(currentPage, false)
}

function teardown(): void {
  const win = window as Window & { __staKacTeardown?: () => void }
  win.__staKacTeardown?.()
  win.__staKacTeardown = undefined
}

function init(): void {
  teardown()
  initLocale()
  currentPage = pageFromHash()

  app.innerHTML = `
    ${renderStars()}
    <div class="cosmos-bg" aria-hidden="true"></div>
    <div class="cosmos-grid" aria-hidden="true"></div>
    <div class="cosmos-nebula cosmos-nebula-red" aria-hidden="true"></div>
    <div class="cosmos-nebula cosmos-nebula-teal" aria-hidden="true"></div>
    <div class="app-shell">
      ${renderLeftRail()}
      <div class="app-main">
        ${renderHeader()}
        <main id="main-content">${getPage(currentPage).render()}</main>
        <footer class="site-footer">
          <p>${t('footer')}</p>
        </footer>
      </div>
      ${renderRightRail()}
    </div>
  `

  const popstateHandler = () => {
    const id = pageFromHash()
    if (id !== currentPage) renderPage(id)
  }

  const localeUnsubscribe = onLocaleChange(refreshAll)

  setupNav(navigateTo)
  setupGlobalListeners(navigateTo)
  updateActiveLink(currentPage)
  document.title = t('brand')
  history.replaceState({ page: currentPage }, '', buildUrl(currentPage))
  window.addEventListener('popstate', popstateHandler)

  const win = window as Window & { __staKacTeardown?: () => void }
  win.__staKacTeardown = () => {
    window.removeEventListener('popstate', popstateHandler)
    localeUnsubscribe()
  }
}

init()
