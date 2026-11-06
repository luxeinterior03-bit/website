import React, { useEffect, useRef, useState } from "react";

const image = (id, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
const projectFolderUrl =
  "https://drive.google.com/drive/folders/1-KT5nFIEZJIluCKAf7A_ZIi41yIocjmr";
const projectGalleryUrl = contactEndpoint
  ? `${contactEndpoint}?view=gallery`
  : null;

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
  const [formStatus, setFormStatus] = useState("idle");
  const responseFrame = useRef(null);
  const galleryFrame = useRef(null);
  const responseTimeout = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleGalleryResize = (event) => {
      if (
        event.source === galleryFrame.current?.contentWindow &&
        event.data?.type === "luxe-gallery-height" &&
        Number.isFinite(event.data.height)
      ) {
        const height = Math.min(Math.max(event.data.height, 200), 30000);
        galleryFrame.current.style.height = `${height}px`;
      }
    };

    window.addEventListener("message", handleGalleryResize);
    return () => {
      window.removeEventListener("message", handleGalleryResize);
      window.clearTimeout(responseTimeout.current);
    };
  }, []);

  const handleInquiryResponse = () => {
    if (formStatus !== "pending") {
      return;
    }

    window.clearTimeout(responseTimeout.current);
    setFormStatus("success");
    document.querySelector(".contact-form")?.reset();
  };

  const handleInquiry = (event) => {
    if (!contactEndpoint || formStatus === "pending") {
      event.preventDefault();
      return;
    }

    setFormStatus("pending");
    window.clearTimeout(responseTimeout.current);
    responseTimeout.current = window.setTimeout(
      () => setFormStatus("error"),
      30000,
    );
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
          <a href="#work" onClick={closeMenu}>Projects</a>
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

          <div className="project-gallery">
            {projectGalleryUrl ? (
              <iframe
                className="project-gallery-frame"
                loading="lazy"
                ref={galleryFrame}
                src={projectGalleryUrl}
                title="Site work projects, before and after photos, and albums"
              />
            ) : (
              <div className="project-gallery-setup">
                <Eyebrow>THE PANCHSHEEL PROJECT</Eyebrow>
                <p>
                  The photo album will appear here once the Google photo
                  gallery is connected.
                </p>
                <a href={projectFolderUrl} rel="noreferrer" target="_blank">
                  Open the project folder <ArrowIcon diagonal />
                </a>
              </div>
            )}
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
              <div className="contact-actions" aria-label="Contact us by phone">
                <a className="contact-action" href="tel:+919917993855">
                  <span>CALL US</span>
                  <strong>+91 99179 93855</strong>
                </a>
                <a
                  className="contact-action contact-action--whatsapp"
                  href="https://wa.me/919917993855"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>WHATSAPP</span>
                  <strong>Message us <ArrowIcon diagonal /></strong>
                </a>
              </div>
              <span className="contact-mark">L · I</span>
            </div>
            <form
              action={contactEndpoint || undefined}
              className="contact-form"
              method="post"
              onSubmit={handleInquiry}
              target="luxe-contact-response"
            >
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
                  minLength="10"
                  name="brief"
                  placeholder="What are you dreaming up?"
                  required
                  rows="3"
                />
              </label>
              <label aria-hidden="true" className="form-trap">
                Leave this field empty
                <input autoComplete="off" name="website" tabIndex="-1" />
              </label>
              <button
                className="button button--gold form-submit"
                disabled={!contactEndpoint || formStatus === "pending"}
                type="submit"
              >
                {formStatus === "pending" ? "Sending…" : "Send your enquiry"}
                <ArrowIcon />
              </button>
              {formStatus === "success" && (
                <p className="form-status" role="status">
                  Thank you — your enquiry has been sent. We’ll be in touch
                  soon.
                </p>
              )}
              {formStatus === "error" && (
                <p className="form-status form-status--error" role="alert">
                  We couldn’t send your enquiry. Please email{" "}
                  <a href="mailto:luxeinterior03@gmail.com">
                    luxeinterior03@gmail.com
                  </a>{" "}
                  directly.
                </p>
              )}
              {!contactEndpoint && (
                <p className="form-note form-note--setup" role="status">
                  The enquiry form is being connected. For now, email{" "}
                  <a href="mailto:luxeinterior03@gmail.com">
                    luxeinterior03@gmail.com
                  </a>
                  .
                </p>
              )}
              <p className="form-note">
                YOUR DETAILS ARE SENT DIRECTLY TO LUXE INTERIOR.
              </p>
            </form>
          </div>
          <iframe
            aria-hidden="true"
            className="submission-frame"
            name="luxe-contact-response"
            onLoad={handleInquiryResponse}
            ref={responseFrame}
            src="about:blank"
            tabIndex="-1"
            title="Contact form response"
          />
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
        <span className="copyright">
          © LUXE INTERIOR ·{" "}
          <a href="mailto:luxeinterior03@gmail.com">
            LUXEINTERIOR03@GMAIL.COM
          </a>
          {" · "}
          <a href="tel:+919917993855">+91 99179 93855</a>
          {" · "}
          <a
            href="https://wa.me/919917993855"
            rel="noreferrer"
            target="_blank"
          >
            WHATSAPP
          </a>
        </span>
      </footer>
    </>
  );
}

export default App;
