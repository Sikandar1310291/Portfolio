import { useEffect, useRef, useState } from 'react'
import bearStanding from './assets/bear_standing.png'
import bearRunning from './assets/bear_running.png'
import bearLogo from './assets/bear_logo.png'
import bearBomb from './assets/bear_bomb.png'
import './index.css'

// Work projects data
const projects = [
  { name: 'HYATT', tag: 'SOCIAL MEDIA', bg: '#1a3a5c', textColor: '#fff' },
  { name: 'POPO', tag: 'BRANDING', bg: '#CC1540', textColor: '#fff' },
  { name: 'McDONALD\'S', tag: 'CAMPAIGNS', bg: '#FFC72C', textColor: '#000' },
  { name: 'SUNWAY CITY', tag: 'WEB DESIGN', bg: '#e8472b', textColor: '#fff' },
]

// Clients data
const clients = [
  "McDONALD'S", "BRIOHR", "COSMIC COOKWARE", "AAF INTL",
  "SKYWORLD", "UNICEF", "ISETAN", "MAMEE",
  "SIME DARBY", "SHELL", "SUNWAY CITY", "TAMASUK",
  "SÓL ESTATE", "RANHILL", "TEALIVE", "CU",
  "THE MIND", "UNIVERSAL MUSIC", "DIN TAI FUNG", "SUNWAY COLLEGE",
  "VITAGEN", "AISM", "BAD LAB", "BOSCH", "KDU",
]

export default function App() {
  const cursorRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const statementRefs = useRef([])
  const observerRef = useRef(null)

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
    }
    const hoverStart = () => cursor && cursor.classList.add('hover')
    const hoverEnd = () => cursor && cursor.classList.remove('hover')

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button, .capability-item, .client-logo, .work-card').forEach(el => {
      el.addEventListener('mouseenter', hoverStart)
      el.addEventListener('mouseleave', hoverEnd)
    })
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection Observer for fade-in
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.fade-in-up, .statement-word, .statement-description, .statement-bear-3d').forEach(el => {
      observerRef.current.observe(el)
    })

    return () => observerRef.current && observerRef.current.disconnect()
  }, [])

  // Hero parallax text
  const heroParallax = Math.min(scrollY * 0.4, 300)

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef} />

      {/* Side Tab */}
      <div className="side-tab">
        <div className="side-tab-logo">W.</div>
        <div className="side-tab-honors">Honors</div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="navbar-logo">
          <img src={bearLogo} alt="Bike Bear Logo" />
        </a>
        <button className="navbar-menu-btn" onClick={() => setMenuOpen(true)}>
          <div className="hamburger-icon">
            <span /><span /><span />
          </div>
          <div className="menu-bear-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.5 2 14.8 2.9 15.3 4.2C16.4 3.9 17.4 4.5 17.7 5.6C17.9 5.5 18.1 5.4 18.3 5.4C19.3 5.4 20.1 6.2 20.1 7.2C20.1 8 19.6 8.7 18.9 9C18.9 9.1 18.9 9.2 18.9 9.3C18.9 11.8 17.2 14 14.7 14.7C15.4 15.4 15.8 16.4 15.8 17.5V22H8.2V17.5C8.2 16.4 8.6 15.4 9.3 14.7C6.8 14 5.1 11.8 5.1 9.3C5.1 9.2 5.1 9.1 5.1 9C4.4 8.7 3.9 8 3.9 7.2C3.9 6.2 4.7 5.4 5.7 5.4C5.9 5.4 6.1 5.5 6.3 5.6C6.6 4.5 7.6 3.9 8.7 4.2C9.2 2.9 10.5 2 12 2Z" />
            </svg>
          </div>
        </button>
      </nav>

      {/* Fullscreen Menu */}
      <div className={`fullscreen-menu ${menuOpen ? 'open' : ''}`}>
        <button className="menu-close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        <div className="menu-left">
          <a href="#" className="menu-service-link">WEB DESIGN</a>
          <a href="#" className="menu-service-link">BRANDING</a>
          <a href="#" className="menu-service-link">SOCIAL MEDIA</a>
          <a href="#" className="menu-service-link">CAMPAIGNS</a>
          <a href="#" className="menu-service-link">SEARCH MARKETING</a>
          <a href="#" className="menu-service-link">VIDEO CONTENT</a>
          <div className="menu-nav-links">
            <a href="#" className="menu-nav-link">HOME</a>
            <a href="#" className="menu-nav-link">ABOUT</a>
            <a href="#" className="menu-nav-link">PROJECTS</a>
            <a href="#" className="menu-nav-link">CAREERS</a>
            <a href="#" className="menu-nav-link">BLOG</a>
            <a href="#" className="menu-nav-link">CONTACT</a>
          </div>
        </div>
        <div className="menu-right">
          <div className="menu-bear-cta">
            <div className="menu-bear-star">
              <div className="star-text">START A PROJECT<br/>WITH US</div>
            </div>
            <img src={bearStanding} alt="Bear mascot" className="menu-bear-img" />
          </div>
          <div className="menu-social-links">
            <a href="#" className="menu-social-link">f</a>
            <a href="#" className="menu-social-link">ig</a>
            <a href="#" className="menu-social-link">in</a>
            <a href="#" className="menu-social-link">tt</a>
          </div>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-text-container" style={{ transform: `translateY(${heroParallax * 0.3}px)` }}>
          <div className="hero-pill">WE ARE BIKE BEAR</div>
          <div className="hero-headline" style={{ transform: `translateX(-${scrollY * 0.1}px)` }}>
            DARE TO
          </div>
        </div>
        <img
          src={bearStanding}
          alt="Bear mascot"
          className="hero-bear"
          style={{ transform: `translateX(-50%) translateY(${scrollY * 0.2}px)` }}
        />
      </section>

      {/* ==================== TICKER ==================== */}
      <div className="ticker-wrap">
        <div className="ticker-content">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="ticker-item">
              WE ARE A <em>"BEARY"</em> CREATIVE DIGITAL AGENCY FOR HOOMANS
              <span className="ticker-star">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* ==================== BIGGER DARK SECTION ==================== */}
      <section className="statement-section">
        <div className="statement-bg">
          <div className="statement-bg-yellow" />
        </div>
        <img
          src={bearStanding}
          alt="Bear"
          className="statement-bear-3d fade-in-up"
          style={{ left: '5%', bottom: '0', top: 'auto', width: '35vw', maxWidth: '450px' }}
        />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'right', paddingRight: '60px' }}>
          <div className="statement-word fade-in-up">BIGGER</div>
          <div className="statement-description fade-in-up" style={{ right: '60px', top: '55%', textAlign: 'left' }}>
            We think bigger.<br />
            May not be in terms of the size<br />
            of our creative agency, but in<br />
            our big ideas, thinking and<br />
            creativity.
          </div>
        </div>
      </section>

      {/* ==================== BOLDER DARK SECTION ==================== */}
      <section className="statement-section">
        <div className="statement-bg" />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'left', paddingLeft: '60px', width: '100%' }}>
          <div className="statement-word fade-in-up" style={{ textAlign: 'left' }}>BOLDER</div>
          <div className="statement-description fade-in-up" style={{ left: '60px', top: '55%', maxWidth: '350px' }}>
            Being bold is in our DNA.<br />
            We dare to do what others will<br />
            not and embrace everything to<br />
            create impactful work.
          </div>
        </div>
        <img
          src={bearRunning}
          alt="Bear running"
          className="statement-bear-3d fade-in-up"
          style={{ right: '-5%', bottom: '0', top: 'auto', width: '40vw', maxWidth: '500px' }}
        />
      </section>

      {/* ==================== BETTER DARK SECTION ==================== */}
      <section className="statement-section" style={{ flexDirection: 'column' }}>
        <div className="statement-bg" />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', width: '100%' }}>
          <div className="statement-word fade-in-up" style={{ textAlign: 'center' }}>BETTER</div>
          <img
            src={bearStanding}
            alt="Bear"
            className="statement-bear-3d fade-in-up"
            style={{ position: 'relative', width: '25vw', maxWidth: '280px', margin: '-80px auto -20px', display: 'block' }}
          />
          <div className="statement-description fade-in-up" style={{ position: 'relative', left: 'auto', top: 'auto', margin: '0 auto', maxWidth: '450px', textAlign: 'center' }}>
            Better to work with.<br />
            In the end, it's just better to have an agency that will not only deliver
            but one that you'll enjoy working with as well.
          </div>
        </div>
      </section>

      {/* ==================== ABOUT PAWSIBLE ==================== */}
      <section className="pawsible-section fade-in-up">
        <div className="pawsible-pill">ABOUT</div>
        <h2 className="pawsible-headline">
          WE MAKE IT "PAWSIBLE"<br />
          TO STAND OUT FROM THIS <span className="pawsible-dash"></span><br />
          <em>CROWDED WORLD.</em>
        </h2>
        <div className="pawsible-body">
          <div className="pawsible-bomb">
            <img src={bearBomb} alt="Bomb" />
            <div className="bomb-label">DON'T<br />CLICK</div>
          </div>
          <div className="pawsible-text">
            <p>
              We live in an attention-hungry world, and standing out from the crowd isn't just important
              - it's absolutely essential. That's why as a creative digital marketing agency we get fired
              up about exploring ways for your customers to take notice of your business, product, service or
              brand. We know that mere "presence" alone won't cut it anymore, so let us help you create
              curiousity around your brand.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CAPABILITIES ==================== */}
      <section className="capabilities-section">
        <div className="capabilities-header fade-in-up">
          <h2 className="capabilities-title">OUR CAPABILITIES</h2>
        </div>
        <ul className="capabilities-list">
          {['WEB DESIGN', 'BRANDING', 'SOCIAL MEDIA', 'CAMPAIGN', 'SEARCH MARKETING', 'VIDEO CONTENT'].map((cap, i) => (
            <li key={cap} className="capability-item fade-in-up">
              <span className="capability-name">{cap}</span>
              <span className="capability-number">0{i + 1}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section Ticker */}
      <div className="section-ticker">
        <div className="ticker-content">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="ticker-item">
              OUR WORK <span className="ticker-star">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* ==================== OUR WORK ==================== */}
      <section className="work-section">
        <div className="work-header">
          <h2 className="work-title">OUR —&nbsp;<em>WORK.</em></h2>
        </div>
        <div className="work-grid">
          {projects.map((p) => (
            <div key={p.name} className="work-card">
              <div
                className="work-card-img"
                style={{
                  background: `${p.bg}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: p.textColor,
                  letterSpacing: '-2px',
                  padding: '20px',
                  textAlign: 'center',
                }}>
                  {p.name}
                </span>
              </div>
              <div className="work-card-info">
                <div className="work-card-name">{p.name}</div>
                <span className="work-card-tag">{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CLIENTS ==================== */}
      <section className="clients-section">
        <h2 className="clients-title fade-in-up">
          OUR HAPPY <span className="dash" style={{ display:'inline-block', width:'60px', height:'5px', background:'var(--black)', verticalAlign:'middle', margin:'0 20px' }} /> <em>HOOMANS</em>
        </h2>
        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client} className="client-logo fade-in-up">
              <span>{client}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section Ticker */}
      <div className="section-ticker">
        <div className="ticker-content">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="ticker-item">
              LET'S WORK TOGETHER <span className="ticker-star">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* ==================== CONTACT / HELLO ==================== */}
      <section className="contact-section">
        <a href="#" className="contact-pill">START A PROJECT WITH US</a>
        <div style={{ position: 'relative' }}>
          <div className="contact-headline">HELLO.</div>
          <a href="mailto:roar@bikebear.com.my" className="contact-fist-btn">
            LET'S GO!
          </a>
        </div>
      </section>

      {/* ==================== FOOTER TICKER ==================== */}
      <div className="footer-ticker">
        <div className="footer-ticker-content">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="footer-ticker-item">
              SAY HELLO AT <em>ROAR@BIKEBEAR.COM.MY</em>
              <span className="footer-ticker-star">✳</span>
              ROAR AT <em>ROAR@BIKEBEAR.COM.MY</em>
              <span className="footer-ticker-star">✳</span>
              EMAIL US AT <em>ROAR@BIKEBEAR.COM.MY</em>
              <span className="footer-ticker-star">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <span className="footer-copy">© 2025 BIKE BEAR SDN BHD (1069929-T). ALL RIGHTS RESERVED</span>
      </footer>
    </>
  )
}
