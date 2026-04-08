import { useEffect, useRef, useState } from "react";
import "./App.css";

import portraitImg from './assets/portrait.jpg';

// --- Typewriter hook ---
function useTypewriter(text, speed = 60, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// --- Fade-in on scroll ---
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- Magnetic icon ---
function MagneticIcon({ href, children, label }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    el.style.transform = `translate(${(e.clientX - cx) * 0.35}px, ${(e.clientY - cy) * 0.35}px)`;
  };

  const handleLeave = () => {
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      className="magnetic-icon"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function App() {
  const { displayed, done } = useTypewriter("Hey, I'm Tudor", 110);
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    const move = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      {/* ── Top nav ── */}
      <header className="top-nav">
        <span className="nav-name">Tudor</span>
        <nav className="nav-links">
          <MagneticIcon href="mailto:tudor.barsan46@gmail.com" label="Email">
            <MailIcon />
          </MagneticIcon>
          <MagneticIcon href="https://linkedin.com/in/tudor-barsan" label="LinkedIn">
            <LinkedInIcon />
          </MagneticIcon>
          <MagneticIcon href="https://github.com/Tudor-Barsan" label="GitHub">
            <GitHubIcon />
          </MagneticIcon>
        </nav>
      </header>

      <main className="container">
        {/* ── Hero ── */}
        <FadeIn className="hero" delay={0}>
          <div className="hero-text">
            <h1 className="hero-name">
              {displayed}
              {!done && <span className="cursor-blink">|</span>}
            </h1>
            <p className="hero-eyebrow">Computer Science @ UWaterloo</p>
          </div>
          <div className="hero-photo">
            {portraitImg ? (
              <img src={portraitImg} alt="Tudor" />
            ) : (
              <div className="photo-placeholder" />
            )}
          </div>
        </FadeIn>

        <div className="divider-line" />

        {/* ── Lately ── */}
        <FadeIn delay={100}>
          <section className="section">
            <h2 className="section-heading">lately</h2>
            <div className="entries">
              <div className="entry">
                <span className="entry-tag">work</span>
                <p>
                  Joining{" "}
                  <span className="accent-text">Databricks</span>{" "}
                  in Mountain View this summer. Excited to be back in the Bay working on impactful problems in an accelerating environment!
                </p>
              </div>
              <div className="entry">
                <span className="entry-tag">prev</span>
                <p>
                  Spent winter '26 at {" "}
                  <span className="accent-text">Stripe</span>{" "}
                  in San Francisco, working on {" "}
                  <span className="accent-text">core payments</span>.
                  Really enjoyed the product and people.
                </p>
              </div>
              <div className="entry">
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── Otherwise ── */}
        <FadeIn delay={120}>
          <section className="section">
            <h2 className="section-heading">otherwise</h2>
            <div className="entries">
              <div className="entry">
                <span className="entry-tag">reading</span>
                <p>
                  Immersing myself in the beauty of literature. Working on finishing books before picking up new ones. Currently reading: 
                  <span className="accent-text"> The Daily Stoic</span>.
                </p>
              </div>
              <div className="entry">
                <span className="entry-tag">Sports</span>
                <p>
                  Getting back into the sports I love (basketball, soccer, volleyball), and trying out new ones (pickleball).
                </p>
              </div>
              <div className="entry">
                <span className="entry-tag">Hiking</span>
                <p>
                  Taking advantage of California's beautiful nature and completing a variety of hikes from the cliffs of Point Reyes to Monterey Bay.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  );
}

// --- SVG Icons ---
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
