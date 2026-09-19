import './style.css'
import { animate, stagger, inView } from 'motion'

// Header goes solid after scrolling past the hero
const header = document.getElementById('header')
const onScroll = () => {
  header.classList.toggle('is-solid', window.scrollY > 40)
}
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')
let menuOpen = false

const setMenu = (open) => {
  menuOpen = open
  menuToggle.setAttribute('aria-expanded', String(open))
  mobileMenu.classList.toggle('is-open', open)
  animate(mobileMenu, { height: open ? 'auto' : 0 }, { duration: 0.35, easing: [0.22, 1, 0.36, 1] })
}

menuToggle.addEventListener('click', () => setMenu(!menuOpen))
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})

// Hero load sequence: staggered pop-in, one orchestrated moment
animate(
  '[data-hero-item]',
  { opacity: [0, 1], y: [24, 0] },
  { delay: stagger(0.12, { start: 0.15 }), duration: 0.7, easing: [0.22, 1, 0.36, 1] }
)

// Section reveals, triggered once when scrolled into view
inView('.reveal-left', (element) => {
  animate(element, { opacity: [0, 1], x: [-32, 0] }, { duration: 0.8, easing: [0.22, 1, 0.36, 1] })
}, { amount: 0.4 })

inView('.reveal-right', (element) => {
  animate(element, { opacity: [0, 1], x: [32, 0] }, { duration: 0.8, easing: [0.22, 1, 0.36, 1] })
}, { amount: 0.4 })

inView('.gallery-pop', (element) => {
  animate(element, { opacity: [0, 1], y: [28, 0] }, { duration: 0.6, easing: [0.22, 1, 0.36, 1] })
}, { amount: 0.2 })

// Reel cards autoplay by default; nudge playback in case a browser defers it
document.querySelectorAll('.reel-card video').forEach((video) => {
  video.play().catch(() => {})
})
