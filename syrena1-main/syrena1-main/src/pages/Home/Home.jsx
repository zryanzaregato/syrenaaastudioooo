import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, BarChart3, Share2, Pen, Monitor, Palette, ArrowUpRight, Sparkles, TrendingUp, Award, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../../components/PageTransition/PageTransition';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import CinematicText from '../../components/CinematicText/CinematicText';
import Button from '../../components/Button/Button';
import Magnetic from '../../components/Magnetic/Magnetic';
import Counter from '../../components/Counter/Counter';
import HeroScene3D from '../../components/HeroScene3D/HeroScene3D';
import ParallaxImage from '../../components/Parallax/ParallaxImage';
import ParallaxElement from '../../components/Parallax/ParallaxElement';
import TestimonialSlider from '../../components/TestimonialSlider/TestimonialSlider';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Search, title: 'SEO Strategy', desc: 'Data-driven search optimization and semantic architecture that puts your brand directly where high-intent buyers search.', tag: 'Visibility' },
  { icon: BarChart3, title: 'Paid Advertising', desc: 'Precision-targeted performance campaigns across Google, Meta, and LinkedIn engineered for hyper-efficient CAC and scalable ROAS.', tag: 'Performance' },
  { icon: Share2, title: 'Social Media', desc: 'Authentic community building, creative cultural narratives, and viral campaigns that turn casual followers into lifelong brand advocates.', tag: 'Community' },
  { icon: Pen, title: 'Content Marketing', desc: 'Compelling editorial storytelling, thought-leadership pillars, and conversion copywriting that command industry authority.', tag: 'Storytelling' },
  { icon: Monitor, title: 'Web Development', desc: 'Ultra-fast, conversion-obsessed digital flagships engineered with modern WebGL, 60fps animations, and headless architecture.', tag: 'Engineering' },
  { icon: Palette, title: 'Brand Identity', desc: 'Comprehensive visual design systems, bespoke typography, and strategic positioning that create instant emotional resonance.', tag: 'Design' },
];

const featuredWork = [
  {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    title: 'Vertex Global Rebrand',
    category: 'Brand Identity & Strategy',
    description: 'Complete digital transformation and design system for a $400M enterprise SaaS unicorn.',
    stats: '+210% Pipeline Velocity',
    year: '2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    title: 'Ember E-Commerce Flagship',
    category: 'Digital Flagship & Headless',
    description: 'High-converting headless commerce platform with custom WebGL 3D configuration tools.',
    stats: '+240% Conversion Rate',
    year: '2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    title: 'Lumen Health Acquisition Engine',
    category: 'Growth & Multi-Channel Media',
    description: 'Data-engineered programmatic media ecosystem scaling telehealth across 14 markets.',
    stats: '340% ROAS Increase',
    year: '2025',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    title: 'Aura Studio Digital Ecosystem',
    category: 'Creative Direction & Web',
    description: 'Bespoke editorial website experience celebrating Scandinavian architectural excellence.',
    stats: '4.8M Organic Impressions',
    year: '2025',
  },
];

const clientLogos = [
  'VERTEX', 'EMBER & CO', 'LUMEN HEALTH', 'CASCADE AUDIO', 'MERIDIAN LABS', 'PRISM AI', 'ATLAS DIGITAL', 'FORGE MEDIA'
];

export default function Home() {
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  // Pinned Horizontal Showcase ScrollTrigger
  useEffect(() => {
    const section = horizontalSectionRef.current;
    const track = horizontalTrackRef.current;
    if (!section || !track) return;

    // Check if on desktop screen
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 600}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <PageTransition>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className={styles.hero}>
        {/* Interactive Three.js WebGL Particle Mesh */}
        <HeroScene3D />

        {/* Subtle Background Glows */}
        <div className={styles.heroBlob1} />
        <div className={styles.heroBlob2} />
        <div className={styles.gridPattern} />

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroInner}>
            <div className={styles.badgeWrap}>
              <span className={styles.heroBadge}>
                <span className={styles.badgeDot} />
                <span>Next-Gen Digital Marketing &amp; Creative Studio</span>
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              <CinematicText type="words" delay={0.1} triggerOnScroll={false}>
                We craft digital
              </CinematicText>{' '}
              <CinematicText type="words" delay={0.25} triggerOnScroll={false}>
                experiences that drive
              </CinematicText>{' '}
              <span className={styles.titleHighlight}>
                <CinematicText type="words" delay={0.4} triggerOnScroll={false}>
                  extraordinary growth.
                </CinematicText>
              </span>
            </h1>

            <p className={styles.heroDesc}>
              Syrena partners with category-defining brands to fuse cinematic visual craft, data science, and high-velocity digital marketing into unfair competitive advantage.
            </p>

            <div className={styles.heroCtas}>
              <Button to="/contact" variant="secondary" size="lg" icon magnetic data-hover>
                Start a Project
              </Button>
              <Button to="/work" variant="outlineLight" size="lg" magnetic data-hover>
                Explore Selected Work
              </Button>
            </div>

            {/* Floating Stats Bar */}
            <ParallaxElement speed={0.15} className={styles.heroStatsWrap}>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>$120M+</span>
                  <span className={styles.heroStatLabel}>Revenue Generated</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>150+</span>
                  <span className={styles.heroStatLabel}>Global Projects</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>340%</span>
                  <span className={styles.heroStatLabel}>Average Client ROI</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>12yr</span>
                  <span className={styles.heroStatLabel}>Industry Mastery</span>
                </div>
              </div>
            </ParallaxElement>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span>EXPLORE</span>
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CLIENTS TICKER ═══════════════════════ */}
      <section className={styles.clientsStrip}>
        <div className="container">
          <p className={styles.clientsLabel}>Trusted by industry leaders and high-growth disruptors</p>
        </div>
        <div className={styles.logoTrack}>
          <div className={styles.logoScroll}>
            {[...clientLogos, ...clientLogos, ...clientLogos].map((name, i) => (
              <span key={i} className={styles.clientLogo}>
                <span className={styles.clientLogoBullet}>/</span> {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SERVICES SHOWCASE ═══════════════════════ */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="label">Capabilities &amp; Mastery</span>
            <h2>
              <CinematicText type="words">Services engineered for market dominance</CinematicText>
            </h2>
            <p>
              From strategic market penetration to high-conversion WebGL digital ecosystems, we provide full-funnel digital acceleration tailored for leaders.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={styles.serviceCard} data-cursor="EXPLORE">
                  <div className={styles.serviceTop}>
                    <span className={styles.serviceTag}>{s.tag}</span>
                    <span className={styles.serviceNumber}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.serviceIcon}>
                    <s.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                  <Link to="/services" className={styles.serviceLink} data-hover>
                    <span>Discover Capability</span>
                    <ArrowRight size={14} />
                  </Link>
                  <div className={styles.serviceGlow} />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className={styles.centerCta}>
            <Magnetic strength={0.3}>
              <Button to="/services" variant="outline" icon data-hover>
                View Full Capabilities Matrix
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PINNED HORIZONTAL WORK SHOWCASE ═══════════════════════ */}
      <section ref={horizontalSectionRef} className={styles.horizontalShowcaseSection}>
        <div className={styles.horizontalHeader}>
          <div className="container">
            <div className={styles.horizontalTitleRow}>
              <div>
                <span className="label" style={{ color: 'var(--frost)' }}>Selected Showcase</span>
                <h2 className={styles.horizontalHeading}>
                  <CinematicText type="words">Featured Case Studies</CinematicText>
                </h2>
              </div>
              <p className={styles.horizontalSubtext}>
                Scroll through recent client transformations that benchmarked new industry standards.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.horizontalTrackWrapper}>
          <div ref={horizontalTrackRef} className={styles.horizontalTrack}>
            {featuredWork.map((project, idx) => (
              <div key={idx} className={styles.horizontalCard} data-cursor="VIEW">
                <Link to="/work" className={styles.horizontalCardLink}>
                  <div className={styles.horizontalImageWrap}>
                    <ParallaxImage
                      src={project.image}
                      alt={project.title}
                      speed={0.15}
                      scale={1.25}
                      className={styles.horizontalParallaxImg}
                    />
                    <div className={styles.cardFloatingYear}>{project.year}</div>
                    <div className={styles.cardHoverOverlay}>
                      <span className={styles.exploreCircle}>
                        <ArrowUpRight size={28} />
                      </span>
                    </div>
                  </div>
                  <div className={styles.horizontalCardMeta}>
                    <div className={styles.horizontalCardCategory}>{project.category}</div>
                    <h3 className={styles.horizontalCardTitle}>{project.title}</h3>
                    <p className={styles.horizontalCardDesc}>{project.description}</p>
                    <div className={styles.horizontalCardStat}>
                      <TrendingUp size={16} color="var(--frost)" />
                      <span>{project.stats}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS & IMPACT ═══════════════════════ */}
      <section className={`section section--gradient ${styles.statsSection}`}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.statsHeader}>
            <span className="label" style={{ color: 'var(--frost)' }}>By The Numbers</span>
            <h2>
              <CinematicText type="words">Proven metrics that redefine industries</CinematicText>
            </h2>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <Counter end={150} suffix="+" label="Flagship Projects Delivered" />
            </div>
            <div className={styles.statBox}>
              <Counter end={48} label="Active Enterprise Partners" />
            </div>
            <div className={styles.statBox}>
              <Counter end={12} suffix=" Yrs" label="Excellence in Market" />
            </div>
            <div className={styles.statBox}>
              <Counter end={340} suffix="%" label="Average ROI Multiplier" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className={`section ${styles.testimonialSection}`}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="label" style={{ paddingLeft: 0 }}>Client Testimonials</span>
            <h2>
              <CinematicText type="words">What industry pioneers say about Syrena</CinematicText>
            </h2>
          </div>
          <ScrollReveal delay={0.15}>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ IMMERSIVE CTA BANNER ═══════════════════════ */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBlob1} />
        <div className={styles.ctaBlob2} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.ctaInner}>
            <span className="label" style={{ paddingLeft: 0, color: 'var(--frost)' }}>Let's Build the Future</span>
            <h2 className={styles.ctaTitle}>
              <CinematicText type="words">Ready to outperform your industry?</CinematicText>
            </h2>
            <p className={styles.ctaDesc}>
              Let's discuss how Syrena's multidisciplinary team of designers, engineers, and growth strategists can propel your brand forward.
            </p>
            <div className={styles.ctaButtonRow}>
              <Magnetic strength={0.35}>
                <Button to="/contact" variant="secondary" size="lg" icon magnetic data-hover>
                  Book Discovery Call
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
