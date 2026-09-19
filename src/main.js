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

// Gallery carousel: infinite auto-scroll, pauses on hover/touch
const track = document.getElementById('carousel-track')
if (track) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Duplicate the cards once so the loop can wrap seamlessly
  const originalCards = Array.from(track.children)
  originalCards.forEach((card) => {
    track.appendChild(card.cloneNode(true))
  })

  if (!reduceMotion) {
    const play = () => {
      const setWidth = originalCards.reduce((sum, card) => sum + card.offsetWidth + 24, 0)
      return animate(
        track,
        { x: [0, -setWidth] },
        { duration: setWidth / 40, easing: 'linear', repeat: Infinity }
      )
    }

    let controls = play()
    const carousel = track.closest('.carousel')

    const pause = () => controls.pause()
    const resume = () => controls.play()

    carousel.addEventListener('mouseenter', pause)
    carousel.addEventListener('mouseleave', resume)
    carousel.addEventListener('touchstart', pause, { passive: true })
    carousel.addEventListener('touchend', resume)
  }
}
