import React, { useState } from "react";

const image = (id, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const projects = [
  {
    image: "photo-1600210492486-724fe5c67fb0",
    title: "Rooms to slow down in",
    detail: "LIVING · LAYERED NEUTRALS",
    className: "project-card--tall",
  },
  {
    image: "photo-1616486338812-3dadae4b4ace",
    title: "A quieter kind of statement",
    detail: "DETAIL · NATURAL TEXTURES",
    className: "",
  },
  {
    image: "photo-1600607687939-ce8a6c25118c",
    title: "Made for every day",
    detail: "HOME · CONSIDERED LIVING",
    className: "project-card--wide",
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </p>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [comparison, setComparison] = useState(52);
  const [emailReady, setEmailReady] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleInquiry = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const brief = formData.get("brief");
    const subject = encodeURIComponent(`A new project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Hello Luxe Interior,\n\n${brief}\n\nYou can reach me at ${email}.`,
    );

    window.location.href = `mailto:hello@luxeinterior.com?subject=${subject}&body=${body}`;
    setEmailReady(true);
  };

  return (
    <>
      <header className="site-header">
        <a
          aria-label="Luxe Interior, home"
          className="brand"
          href="#home"
          onClick={closeMenu}
        >
          <img
            alt=""
            className="brand-mark"
            src="/luxe-interior-logo.jpeg"
            width="64"
            height="64"
          />
          <span className="brand-copy">
            <span className="brand-name">Luxe Interior</span>
            <span className="brand-tagline">DESIGN · BUILD · INSTALL</span>
          </span>
        </a>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <span />
          <span />
        </button>

        <nav
          aria-label="Main navigation"
          className={`main-nav${menuOpen ? " is-open" : ""}`}
        >
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#work" onClick={closeMenu}>The work</a>
          <a href="#transformation" onClick={closeMenu}>Before & after</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Start a project <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero" id="home">
          <div
            aria-hidden="true"
            className="hero-image"
            style={{
              backgroundImage: `url("${image("photo-1600607687939-ce8a6c25118c", 2400)}")`,
            }}
          />
          <div aria-hidden="true" className="hero-shade" />
          <div className="hero-vertical-note">MADE FOR THE WAY YOU LIVE</div>

          <div className="hero-content">
            <Eyebrow>YOUR HOME, FROM FIRST THOUGHT TO FINAL TOUCH</Eyebrow>
            <h1 id="hero-title">
              A space to
              <br />
              <em>come home</em> to.
            </h1>
            <p className="hero-description">
              From the first sketch to the last cushion, we bring every detail
              of your home together — thoughtfully, beautifully, completely.
            </p>
            <div className="hero-actions">
              <a className="button button--gold" href="#work">
                Discover our work <ArrowIcon />
              </a>
              <a className="text-link" href="#approach">
                The Luxe approach <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <span>DESIGNED WITH INTENTION</span>
            <span className="hero-bottom-center">
              ONE TEAM <span>·</span> EVERY DETAIL
            </span>
            <a href="#approach">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span aria-hidden="true" className="hero-index">01 / 04</span>
        </section>

        <section aria-labelledby="intro-title" className="intro" id="approach">
          <div className="intro-top">
            <Eyebrow>GOOD DESIGN IS ONLY THE BEGINNING</Eyebrow>
            <span className="intro-index">001 — THE LUXE DIFFERENCE</span>
          </div>
          <div className="intro-grid">
            <h2 id="intro-title">
              From bare
              <br />
              walls to <em>belonging.</em>
            </h2>
            <div className="intro-copy">
              <p>
                A home should feel like yours long before the keys are handed
                over. That’s why we take care of the whole journey — one
                considered detail, one trusted team, one seamless handover.
              </p>
              <a className="underlined-link" href="#contact">
                Tell us what home means to you <ArrowIcon diagonal />
              </a>
            </div>
          </div>
          <div className="service-strip">
            <div className="service-strip-label">THE WHOLE HOME, HANDLED</div>
            {["DESIGN", "BUILD", "BESPOKE FURNITURE", "INSTALL"].map(
              (step, index) => (
                <div className="service-strip-step" key={step}>
                  <span>0{index + 1}</span>
                  {step}
                  {index < 3 && <i aria-hidden="true">—</i>}
                </div>
              ),
            )}
          </div>
        </section>

        <section aria-labelledby="work-title" className="work-section" id="work">
          <div className="section-heading">
            <div>
              <Eyebrow>SPACES WITH A POINT OF VIEW</Eyebrow>
              <h2 id="work-title">
                Thoughtfully made.
                <br />
                <em>Easy to live in.</em>
              </h2>
            </div>
            <p className="section-heading-note">
              Warm materials. Honest craftsmanship.
              <br />
              A home that feels like no one else’s.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card ${project.className}`}
                key={project.title}
              >
                <div className="project-image-wrap">
                  <img
                    alt={`Interior inspiration: ${project.title.toLowerCase()}`}
                    className="project-image"
                    loading="lazy"
                    src={image(project.image)}
                  />
                  <span className="project-number">0{index + 1}</span>
                  <a
                    aria-label={`Discuss ${project.title}`}
                    className="project-open"
                    href="#contact"
                  >
                    <ArrowIcon diagonal />
                  </a>
                </div>
                <div className="project-caption">
                  <h3>{project.title}</h3>
                  <span>{project.detail}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="image-note">
            IMAGERY SHOWN FOR INSPIRATION · YOUR PROJECT PHOTOGRAPHY GOES HERE
          </p>
        </section>

        <section
          aria-labelledby="transformation-title"
          className="transformation"
          id="transformation"
        >
          <div className="transformation-heading">
            <div>
              <Eyebrow>THE BEFORE IS JUST THE BEGINNING</Eyebrow>
              <h2 id="transformation-title">
                See what a little
                <br />
                <em>vision can do.</em>
              </h2>
            </div>
            <p>
              Every transformation starts with listening. Then we make the
              details — and the whole picture — feel just right.
            </p>
          </div>
          <div className="comparison">
            <img
              alt="Finished interior with warm, natural materials"
              className="comparison-after"
              draggable="false"
              src={image("photo-1600607687920-4e2a09cf159d", 2000)}
            />
            <div
              aria-hidden="true"
              className="comparison-before"
              style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
            >
              <img
                alt=""
                draggable="false"
                src={image("photo-1600210491369-e753d80a41f3", 2000)}
              />
            </div>
            <span className="comparison-label comparison-label--before">
              BEFORE
            </span>
            <span className="comparison-label comparison-label--after">
              AFTER
            </span>
            <div
              aria-hidden="true"
              className="comparison-handle"
              style={{ left: `${comparison}%` }}
            >
              <span>↔</span>
            </div>
            <input
              aria-label="Drag to compare the before and after images"
              className="comparison-slider"
              max="100"
              min="0"
              onChange={(event) => setComparison(Number(event.target.value))}
              type="range"
              value={comparison}
            />
          </div>
          <div className="comparison-foot">
            <span>← DRAG TO REVEAL</span>
            <span>IMAGERY SHOWN FOR INSPIRATION · SWAP IN YOUR BEFORE & AFTER PHOTOS</span>
            <span>01 / 01</span>
          </div>
        </section>

        <section aria-labelledby="promise-title" className="promise">
          <div className="promise-image">
            <img
              alt="An inviting living room with considered lighting and natural finishes"
              loading="lazy"
              src={image("photo-1600210491892-03d54c0aaf87", 1600)}
            />
            <div aria-hidden="true" className="promise-image-shade" />
            <div className="promise-image-note">THE FINISH IS IN THE FEELING</div>
          </div>
          <div className="promise-copy">
            <Eyebrow>ONE STUDIO, START TO FINISH</Eyebrow>
            <h2 id="promise-title">
              No hand-offs.
              <br />
              No loose ends.
              <br />
              <em>Just home.</em>
            </h2>
            <p>
              Design, construction, custom furniture and final styling — all
              under one roof. The people who imagine your home are there to
              bring it to life.
            </p>
            <div className="promise-detail">
              <span className="promise-detail-number">01—04</span>
              <span>IDEA → DRAWING → BUILD → THE FIRST NIGHT IN</span>
            </div>
            <a className="underlined-link" href="#contact">
              Make your first move <ArrowIcon diagonal />
            </a>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact" id="contact">
          <div className="contact-top">
            <Eyebrow>EVERY GREAT HOME STARTS SOMEWHERE</Eyebrow>
            <span className="intro-index">LET’S BEGIN WITH A CONVERSATION</span>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <h2 id="contact-title">
                Tell us about
                <br />
                <em>your place.</em>
              </h2>
              <p>
                A new home, a room ready for a rethink, or just a first idea —
                we’d love to hear what you have in mind.
              </p>
              <span className="contact-mark">L · I</span>
            </div>
            <form className="contact-form" onSubmit={handleInquiry}>
              <label>
                YOUR NAME
                <input autoComplete="name" name="name" required type="text" />
              </label>
              <label>
                EMAIL ADDRESS
                <input
                  autoComplete="email"
                  name="email"
                  required
                  type="email"
                />
              </label>
              <label>
                A LITTLE ABOUT YOUR PROJECT
                <textarea
                  name="brief"
                  placeholder="What are you dreaming up?"
                  required
                  rows="3"
                />
              </label>
              <button className="button button--gold form-submit" type="submit">
                Prepare your enquiry <ArrowIcon />
              </button>
              {emailReady && (
                <p className="form-status" role="status">
                  Your email app should open with your enquiry ready. We look
                  forward to hearing from you.
                </p>
              )}
              <p className="form-note">
                YOUR EMAIL APP WILL OPEN WITH YOUR MESSAGE READY TO SEND.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#home">
          <img
            alt=""
            loading="lazy"
            src="/luxe-interior-logo.jpeg"
            width="92"
            height="92"
          />
          <span>
            <strong>Luxe Interior</strong>
            <small>DESIGN · BUILD · INSTALL</small>
          </span>
        </a>
        <span className="footer-copy">MADE WITH INTENTION. MADE TO LAST.</span>
        <a className="back-to-top" href="#home">
          BACK TO TOP ↑
        </a>
        <span className="copyright">© LUXE INTERIOR</span>
      </footer>
    </>
  );
}

export default App;
