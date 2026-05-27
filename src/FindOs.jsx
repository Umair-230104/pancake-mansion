import { Link } from "react-router";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import "./FindOs.css";

function FindOs() {
  return (
    <main className="find-os-page">
      <section className="find-os-content">
        <p className="find-os-label">Pancake Mansion</p>
        <h1 className="find-os-title">Find os</h1>

        <div className="social-links">
          <a
            href="https://www.instagram.com/pancakemansion"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
          >
            <FaInstagram className="social-icon" />
            <span className="social-name">Instagram</span>
            <span className="social-username">@pancakemansion</span>
          </a>

          <a
            href="https://www.tiktok.com/@pancakemansion1?lang=da"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
          >
            <FaTiktok className="social-icon" />
            <span className="social-name">TikTok</span>
            <span className="social-username">@pancakemansion1</span>
          </a>
        </div>

        <Link to="/" className="back-btn">
          Tilbage
        </Link>
      </section>
    </main>
  );
}

export default FindOs;
