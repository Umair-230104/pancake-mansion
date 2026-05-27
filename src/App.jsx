import { useEffect } from "react";
import { Routes, Route, Link } from "react-router";
import FindOs from "./FindOs.jsx";
import "./App.css";

function Home() {
  useEffect(() => {
    const steps = [
      {
        ids: [],
        label: "Trin 1",
        title: "Den perfekte bund",
        desc: "Tre luftige mini pandekager, gyldne og bløde — bagt til perfektion med sprøde kanter og et blødt hjerte. Alt godt starter her.",
      },
      {
        ids: ["t-dark", "t-white"],
        label: "Trin 2",
        title: "Dobbelt chokolade-magi",
        desc: "Mørk chokoladesovs møder hvid chokoladesovs i en drøm af sødme. Kontrasten er ikke bare smuk — den er uimodståelig.",
      },
      {
        ids: ["t-banana"],
        label: "Trin 3",
        title: "Solen i et bid",
        desc: "Friske bananskiver tilføjer en naturlig sødme og cremet blidhed. Ingen snyd — kun ægte frugt, skåret med kærlighed.",
      },
      {
        ids: ["t-straw"],
        label: "Trin 4",
        title: "Rød passion",
        desc: "Saftige, modne jordbær giver et frisk pust midt i al chokoladen. Det er det bid, der får dig til at lukke øjnene.",
      },
      {
        ids: ["t-blue"],
        label: "Trin 5",
        title: "Vilde blåbær",
        desc: "Blåbær med den helt rigtige syrlighed. De balancerer sødmen og tilføjer farve og karakter til hvert eneste bid.",
      },
      {
        ids: ["t-oreo"],
        label: "Trin 6",
        title: "Oreo — the crown",
        desc: "Knasende Oreo-drys forsegler mesterværket. Et krunch der afslutter oplevelsen og giver dig lyst til at starte forfra.",
      },
    ];

    const TOTAL = steps.length;
    const CIRCUM = 2 * Math.PI * 184;
    const dotsEl = document.getElementById("dots");

    if (dotsEl && dotsEl.children.length === 0) {
      steps.forEach(() => {
        const d = document.createElement("div");
        d.className = "dot";
        dotsEl.appendChild(d);
      });
    }

    let current = -1;

    function showStep(idx) {
      if (idx === current) return;
      current = idx;

      const allIds = steps.flatMap((s) => s.ids);
      allIds.forEach((id) =>
        document.getElementById(id)?.classList.remove("show"),
      );

      let delay = 0;
      for (let s = 0; s <= idx; s++) {
        steps[s].ids.forEach((id) => {
          setTimeout(
            () => document.getElementById(id)?.classList.add("show"),
            delay,
          );
          delay += 60;
        });
      }

      const panel = document.getElementById("text-panel");
      panel?.classList.remove("text-active");

      setTimeout(() => {
        const label = document.getElementById("step-label");
        const title = document.getElementById("step-title");
        const desc = document.getElementById("step-desc");

        if (label) label.textContent = steps[idx].label;
        if (title) title.textContent = steps[idx].title;
        if (desc) desc.textContent = steps[idx].desc;
        panel?.classList.add("text-active");
      }, 55);

      document.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === idx);
      });

      const offset = CIRCUM * (1 - (idx + 1) / TOTAL);
      const ring = document.getElementById("ring");
      if (ring) ring.style.strokeDashoffset = offset;
    }

    const HYSTERESIS = 0.08;

    function handleScroll() {
      const section = document.getElementById("builder");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / total);
      const raw = progress * TOTAL;
      const candidate = Math.min(TOTAL - 1, Math.floor(raw));
      const fraction = raw - Math.floor(raw);

      if (candidate > current && fraction > HYSTERESIS) showStep(candidate);
      if (candidate < current) showStep(candidate);
      if (current < 0) showStep(0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    showStep(0);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/*HERO*/}
      <section className="hero">
        <img src="/Logo.png" alt="Pancake Mansion logo" className="hero-logo" />
        <h1 className="hero-title">
          <em>Velkommen til</em>
          Pancake
          <br />
          Mansion
        </h1>
        <p className="hero-sub">
          Håndlavede mini pandekager — lagvis opbygget med kærlighed og de
          bedste toppings.
        </p>
        <div className="scroll-hint">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          Rul ned
        </div>
      </section>

      {/*BUILDER*/}
      <section className="builder-section" id="builder">
        <div className="sticky-stage">
          <div className="stage-layout">
            {/*TOP-DOWN PANCAKE SVG*/}
            <div className="pancake-scene">
              {/*Progress ring*/}
              <div className="progress-ring">
                <svg viewBox="0 0 376 376">
                  <circle
                    id="ring"
                    cx="188"
                    cy="188"
                    r="184"
                    strokeDasharray="1156"
                    strokeDashoffset="1156"
                  />
                </svg>
              </div>

              <svg
                id="pancake-svg"
                viewBox="0 0 400 420"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    id="panGrad"
                    cx="42%"
                    cy="38%"
                    r="60%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#F7C96A" />
                    <stop offset="38%" stopColor="#D98A2F" />
                    <stop offset="72%" stopColor="#B36820" />
                    <stop offset="100%" stopColor="#8A4C12" />
                  </radialGradient>
                  <radialGradient
                    id="rimGrad"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="68%" stopColor="transparent" />
                    <stop offset="100%" stopColor="#6A380Acc" />
                  </radialGradient>
                  <radialGradient
                    id="hiGrad"
                    cx="40%"
                    cy="34%"
                    r="38%"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#FCE8A060" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00000033" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <clipPath id="panClip">
                    <ellipse cx="200" cy="205" rx="176" ry="116" />
                  </clipPath>
                </defs>

                {/*Drop shadow*/}
                <ellipse
                  cx="202"
                  cy="350"
                  rx="155"
                  ry="22"
                  fill="url(#shadowGrad)"
                  opacity="0.5"
                />
                {/*Side edge*/}
                <ellipse cx="200" cy="214" rx="180" ry="118" fill="#7A430F" />
                {/*Top surface*/}
                <ellipse
                  cx="200"
                  cy="205"
                  rx="180"
                  ry="118"
                  fill="url(#panGrad)"
                />
                <ellipse
                  cx="200"
                  cy="205"
                  rx="180"
                  ry="118"
                  fill="url(#rimGrad)"
                />
                <ellipse
                  cx="200"
                  cy="205"
                  rx="180"
                  ry="118"
                  fill="url(#hiGrad)"
                />

                {/*Bubble texture*/}
                <g clipPath="url(#panClip)" opacity="0.2" fill="#7A4010">
                  <circle cx="155" cy="160" r="7" />
                  <circle cx="215" cy="140" r="5" />
                  <circle cx="258" cy="170" r="8" />
                  <circle cx="148" cy="218" r="6" />
                  <circle cx="200" cy="240" r="7" />
                  <circle cx="250" cy="222" r="5" />
                  <circle cx="168" cy="258" r="5" />
                  <circle cx="232" cy="260" r="4" />
                  <circle cx="132" cy="192" r="4" />
                  <circle cx="268" cy="196" r="5" />
                </g>

                <g clipPath="url(#panClip)">
                  {/*Step 1 · Dark chocolate drizzle*/}
                  <g id="t-dark" className="top-group">
                    <path
                      d="M55,198 Q120,152 180,195 Q240,238 298,180 Q328,152 340,200"
                      fill="none"
                      stroke="#1E0E06"
                      strokeWidth="12"
                      strokeLinecap="round"
                      opacity="0.80"
                    />
                    <path
                      d="M70,238 Q140,205 200,242 Q252,275 330,238"
                      fill="none"
                      stroke="#1E0E06"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.50"
                    />
                    <path
                      d="M110,148 Q162,122 200,148 Q238,174 282,142"
                      fill="none"
                      stroke="#1E0E06"
                      strokeWidth="7"
                      strokeLinecap="round"
                      opacity="0.40"
                    />
                  </g>

                  {/*Step 1b · White chocolate drizzle*/}
                  <g id="t-white" className="top-group">
                    <path
                      d="M75,172 Q140,130 200,172 Q260,214 325,172"
                      fill="none"
                      stroke="#F9E4B7"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.88"
                    />
                    <path
                      d="M95,252 Q158,222 210,258 Q252,286 308,256"
                      fill="none"
                      stroke="#F9E4B7"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.65"
                    />
                  </g>

                  {/*Step 2 · Banana slices*/}
                  <g id="t-banana" className="top-group">
                    <g transform="translate(98 174)">
                      <circle r="18" fill="#F5E040" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="7"
                        fill="#FDF07A"
                        opacity="0.55"
                      />
                      <circle r="5" fill="#C8A818" opacity="0.55" />
                    </g>

                    <g transform="translate(304 184)">
                      <circle r="18" fill="#F5E040" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="7"
                        fill="#FDF07A"
                        opacity="0.55"
                      />
                      <circle r="5" fill="#C8A818" opacity="0.55" />
                    </g>

                    <g transform="translate(132 282)">
                      <circle r="18" fill="#F5E040" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="7"
                        fill="#FDF07A"
                        opacity="0.55"
                      />
                      <circle r="5" fill="#C8A818" opacity="0.55" />
                    </g>

                    <g transform="translate(268 278)">
                      <circle r="18" fill="#F5E040" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="7"
                        fill="#FDF07A"
                        opacity="0.55"
                      />
                      <circle r="5" fill="#C8A818" opacity="0.55" />
                    </g>

                    <g transform="translate(200 112)">
                      <circle r="17" fill="#F5E040" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="7"
                        fill="#FDF07A"
                        opacity="0.55"
                      />
                      <circle r="5" fill="#C8A818" opacity="0.55" />
                    </g>
                  </g>

                  {/*Step 3 · Strawberries*/}
                  <g id="t-straw" className="top-group">
                    <g transform="translate(150 138) rotate(-18)">
                      <ellipse rx="16" ry="20" fill="#C0203A" />
                      <ellipse rx="9" ry="12" fill="#E03050" opacity="0.5" />
                      <ellipse cx="-2" cy="-18" rx="5" ry="4" fill="#3A7A20" />
                    </g>

                    <g transform="translate(250 140) rotate(22)">
                      <ellipse rx="16" ry="20" fill="#C0203A" />
                      <ellipse rx="9" ry="12" fill="#E03050" opacity="0.5" />
                      <ellipse cx="2" cy="-18" rx="5" ry="4" fill="#3A7A20" />
                    </g>

                    <g transform="translate(92 225) rotate(-10)">
                      <ellipse rx="15" ry="19" fill="#C0203A" />
                      <ellipse rx="8" ry="11" fill="#E03050" opacity="0.5" />
                      <ellipse cx="-2" cy="-17" rx="5" ry="4" fill="#3A7A20" />
                    </g>

                    <g transform="translate(306 236) rotate(14)">
                      <ellipse rx="15" ry="19" fill="#C0203A" />
                      <ellipse rx="8" ry="11" fill="#E03050" opacity="0.5" />
                      <ellipse cx="2" cy="-17" rx="5" ry="4" fill="#3A7A20" />
                    </g>
                  </g>

                  {/*Step 4 · Blueberries*/}
                  <g id="t-blue" className="top-group">
                    <g transform="translate(166 190)">
                      <circle r="12" fill="#3B2E8A" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="5"
                        fill="#6A5EC8"
                        opacity="0.55"
                      />
                    </g>

                    <g transform="translate(218 184)">
                      <circle r="11" fill="#3B2E8A" />
                      <circle
                        cx="-4"
                        cy="-4"
                        r="4"
                        fill="#6A5EC8"
                        opacity="0.55"
                      />
                    </g>

                    <g transform="translate(252 214)">
                      <circle r="12" fill="#3B2E8A" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="5"
                        fill="#6A5EC8"
                        opacity="0.55"
                      />
                    </g>

                    <g transform="translate(145 232)">
                      <circle r="11" fill="#3B2E8A" />
                      <circle
                        cx="-4"
                        cy="-4"
                        r="4"
                        fill="#6A5EC8"
                        opacity="0.55"
                      />
                    </g>

                    <g transform="translate(206 244)">
                      <circle r="12" fill="#3B2E8A" />
                      <circle
                        cx="-5"
                        cy="-5"
                        r="5"
                        fill="#6A5EC8"
                        opacity="0.55"
                      />
                    </g>

                    <g transform="translate(200 156)">
                      <circle r="10" fill="#4A3AA0" />
                      <circle
                        cx="-4"
                        cy="-4"
                        r="4"
                        fill="#6A5EC8"
                        opacity="0.55"
                      />
                    </g>
                  </g>

                  {/*Step 5 · Oreos*/}
                  <g id="t-oreo" className="top-group">
                    <g transform="translate(116 146) rotate(-18)">
                      <rect
                        x="-28"
                        y="-10"
                        width="56"
                        height="20"
                        rx="6"
                        fill="#130A06"
                      />
                      <rect
                        x="-23"
                        y="-6"
                        width="46"
                        height="12"
                        rx="4"
                        fill="none"
                        stroke="#2E1A0E"
                        strokeWidth="1.4"
                      />
                      <rect
                        x="-14"
                        y="-3"
                        width="28"
                        height="6"
                        rx="2"
                        fill="none"
                        stroke="#2E1A0E"
                        strokeWidth="1"
                      />
                    </g>

                    <g transform="translate(284 256) rotate(15)">
                      <rect
                        x="-28"
                        y="-10"
                        width="56"
                        height="20"
                        rx="6"
                        fill="#130A06"
                      />
                      <rect
                        x="-23"
                        y="-6"
                        width="46"
                        height="12"
                        rx="4"
                        fill="none"
                        stroke="#2E1A0E"
                        strokeWidth="1.4"
                      />
                      <rect
                        x="-14"
                        y="-3"
                        width="28"
                        height="6"
                        rx="2"
                        fill="none"
                        stroke="#2E1A0E"
                        strokeWidth="1"
                      />
                    </g>

                    <g transform="translate(204 288) rotate(-4)">
                      <rect
                        x="-30"
                        y="-10"
                        width="60"
                        height="20"
                        rx="6"
                        fill="#130A06"
                      />
                      <rect
                        x="-25"
                        y="-6"
                        width="50"
                        height="12"
                        rx="4"
                        fill="none"
                        stroke="#2E1A0E"
                        strokeWidth="1.4"
                      />
                      <rect
                        x="-15"
                        y="-3"
                        width="30"
                        height="6"
                        rx="2"
                        fill="none"
                        stroke="#2E1A0E"
                        strokeWidth="1"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            {/*TEXT + DOTS*/}
            <div className="text-panel" id="text-panel">
              <div className="step-label" id="step-label">
                Trin 1
              </div>
              <div className="step-title" id="step-title">
                Den perfekte bund
              </div>
              <div className="step-desc" id="step-desc">
                Tre luftige mini pandekager, gyldne og bløde — bagt til
                perfektion med sprøde kanter og et blødt hjerte. Alt godt
                starter her.
              </div>
              <div className="step-dots" id="dots"></div>
            </div>
          </div>
        </div>
      </section>

      {/*CTA*/}
      <section className="cta-section">
        <h2 className="cta-title">
          Dit næste
          <br />
          favorit øjeblik.
        </h2>
        <p className="cta-body">
          Pancake Mansion er skabt til dem der ved, at det bedste i livet kommer
          i små, søde bidder. Lad dig friste.
        </p>
        <Link to="/find-os" className="cta-btn">
          Find os nu
        </Link>
      </section>

      <footer>
        <strong>Pancake Mansion</strong>
        <span> · Håndlavede mini pandekager</span>
        <span> · Friske toppings hver dag</span>
        <span> · 2026</span>
      </footer>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-os" element={<FindOs />} />
    </Routes>
  );
}

export default App;
