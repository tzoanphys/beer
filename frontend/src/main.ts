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

let currentPage: PageId = 'home'

function renderStars(): string {
  const stars = Array.from({ length: 80 }, (_, i) => {
    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 2 + 0.5
    const delay = Math.random() * 5
    const duration = Math.random() * 3 + 2
    return `<span class="star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${duration}s"></span>`
  }).join('')
  return `<div class="starfield" aria-hidden="true">${stars}</div>`
}

function renderPage(id: PageId, animate = true): void {
  currentPage = id
  const page = getPage(id)
  const main = document.querySelector<HTMLElement>('#main-content')
  if (!main) return

  const update = () => {
    main.innerHTML = page.render()
    updateActiveLink(id)
    updateFooter()
  }

  if (!animate) {
    update()
    return
  }

  main.classList.add('page-exit')
  setTimeout(() => {
    update()
    main.classList.remove('page-exit')
    main.classList.add('page-enter')
    requestAnimationFrame(() => main.classList.remove('page-enter'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 180)
}

function updateFooter(): void {
  const footer = document.querySelector<HTMLElement>('.site-footer p')
  if (footer) footer.textContent = t('footer')
}

function refreshAll(): void {
  refreshRailLabels()
  renderPage(currentPage, false)
}

function init(): void {
  initLocale()

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
        <main id="main-content">${getPage('home').render()}</main>
        <footer class="site-footer">
          <p>${t('footer')}</p>
        </footer>
      </div>
      ${renderRightRail()}
    </div>
  `

  setupGlobalListeners(app)
  setupNav((id) => renderPage(id), refreshAll)
  updateActiveLink('home')
  onLocaleChange(refreshAll)
}

init()
