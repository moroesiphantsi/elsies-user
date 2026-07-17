
import React, { useEffect, useState } from "react";
import "./Home.css";

import {
  FaTshirt,
  FaPrint,
  FaPalette,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaChevronUp,
  FaStar,
  FaFacebook,
  FaSlidersH,
  FaTruck,
  FaEye
} from "react-icons/fa";


function Home() {
  const [showTop, setShowTop] = useState(false);
  
  // Interactive Feature States
  const [selectedGarment, setSelectedGarment] = useState("tshirt");
  const [selectedTech, setSelectedTech] = useState("embroidery");
  const [estimateQty, setEstimateQty] = useState(50);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState("embroidery");

  // Track Order Simulated State
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 400) setShowTop(true);
      else setShowTop(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quick live price calculation logic based on inputs
  const calculatePrice = () => {
    const basePrice = selectedTech === "embroidery" ? 85 : 60;
    const qtyDiscount = estimateQty > 100 ? 0.8 : estimateQty > 50 ? 0.9 : 1.0;
    return Math.round(basePrice * estimateQty * qtyDiscount);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!orderId) return;
    setOrderStatus("Processing - High-Density Stitching Stage");
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="home">
      {/* 1. ANNOUNCEMENT BAR (New Feature) */}
      <div className="announcement-bar">
        <span className="announcement-tag">Create.Print.Embroider.Impress</span>
        <p>Bringing Your Ideas To Life With Premium Printing & Embroidery.</p>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">

          <div className="badge">Elsies Print & Embroidery</div>
          <h1>
            Creative Printing
            <span>That Builds Brands</span>
          </h1>
          <p>
            Professional embroidery, high-definition printing, and personalized branding solutions 
            meticulously crafted for corporations, luxury events, and forward-thinking individuals.
          </p>

          <div className="hero-buttons">
            <a href="https://wa.me/27827187044" className="primary-btn">
              <FaWhatsapp /> Get Quote
            </a>
            <a href="/print-out" className="secondary-btn">
              <FaCalculator /> Print Out
            </a>
            <a href="/print-calculator" className="secondary-btn">

              <FaCalculator /> Price Calculator
            </a>
            <a href="/services" className="secondary-btn">
              <FaCalculator /> Explore Services
            </a>
          </div>
        </div>

        <div className="floating-shape one"></div>
        <div className="floating-shape two"></div>
      </section>

      {/* 2. REAL-TIME INTERACTIVE CUSTOMIZER (New Feature) */}
      <section className="customizer-section">
        <div className="section-header">
          <span className="section-badge">Live Lab</span>
          <h2>Visual Studio Preview</h2>
          <p className="section-text">Simulate your branded look directly inside your web browser before placing an order.</p>
        </div>


        <div className="customizer-container">
          <div className="customizer-preview">
            <div className={`garment-view ${selectedGarment}`}>
              <div className="texture-overlay"></div>
              {/* Dynamic Stitch Preview Display */}
              <div className={`mockup-logo ${selectedTech}`}>
                <span>YOUR BRAND HERE</span>
                <p className="stitch-line"></p>
              </div>
            </div>
            <p className="preview-indicator">
              <FaEye /> Live 3D Simulation Mode
            </p>
          </div>

          <div className="customizer-controls">
            <h3>Configure Your Order</h3>
            
            <div className="control-group">
              <label>1. Select Canvas</label>
              <div className="control-grid">

                <button 
                  className={selectedGarment === "tshirt" ? "active" : ""} 
                  onClick={() => setSelectedGarment("tshirt")}
                >
                  Classic Tee
                </button>
                <button 
                  className={selectedGarment === "hoodie" ? "active" : ""} 
                  onClick={() => setSelectedGarment("hoodie")}
                >
                  Luxury Hoodie
                </button>
                <button 
                  className={selectedGarment === "cap" ? "active" : ""} 
                  onClick={() => setSelectedGarment("cap")}
                >
                  Premium Cap
                </button>

              </div>
            </div>

            <div className="control-group">
              <label>2. Branding Medium</label>
              <div className="control-grid">
                <button 
                  className={selectedTech === "embroidery" ? "active" : ""} 
                  onClick={() => setSelectedTech("embroidery")}
                >
                  Embroidery (Stitched)
                </button>
                <button 
                  className={selectedTech === "printing" ? "active" : ""} 
                  onClick={() => setSelectedTech("printing")}
                >
                  Screen Printing
                </button>
              </div>
            </div>


            <div className="pricing-box">
              <div className="price-title">Estimated Investment</div>
              <div className="price-value">R {calculatePrice()}</div>
              <p>For custom wholesale runs, please connect directly for specialized pricing.</p>
              <a href="https://wa.me/27827187044" className="primary-btn fluid-btn">
                Lock In This Quote <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MATERIAL TABS (New Feature) */}
      <section className="material-tabs-section">
        <div className="section-header">
          <h2>Premium Finishes & Thread Art</h2>
          <p className="section-text">Run your hands through unmatched quality. Select a process to view its details.</p>
        </div>

        <div className="tabs-container">
          <div className="tabs-header">
            <button className={activeTab === "embroidery" ? "active" : ""} onClick={() => setActiveTab("embroidery")}>
              Thread Embroidery
            </button>
            <button className={activeTab === "dtf" ? "active" : ""} onClick={() => setActiveTab("dtf")}>
              Direct-to-Film (DTF)
            </button>
            <button className={activeTab === "sublimation" ? "active" : ""} onClick={() => setActiveTab("sublimation")}>
              Full Sublimation
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "embroidery" && (
              <div className="tab-panel">

                <h3>High-Density Dimensional Stitching</h3>
                <p>Perfect for corporate polos, premium jackets, caps, and headwear. We utilize high-grade Madeira threads for a fade-resistant, classic shine.</p>
                <ul>
                  <li>Up to 15 colors stitched simultaneously</li>
                  <li>Over 10,000 stitch capacity per logo run</li>
                  <li>Exceptional durability through industrial washings</li>
                </ul>
              </div>
            )}
            {activeTab === "dtf" && (
              <div className="tab-panel">
                <h3>Vibrant Multi-Color Prints</h3>
                <p>Our direct-to-film printing produces highly stretchable, bright designs that bond natively with all fabric fibers without cracking over time.</p>
                <ul>

                  <li>Full-color gradients & photograph quality</li>
                  <li>Super thin, soft-hand texture feel</li>
                  <li>Fits cotton, polyester, leather, and blends</li>
                </ul>
              </div>
            )}
            {activeTab === "sublimation" && (
              <div className="tab-panel">
                <h3>All-Over Embedded Ink Infusion</h3>
                <p>Ideal for performance sportswear, active uniforms, and custom team jerseys. High-temperature dye links instantly with the polyester fiber structure.</p>
                <ul>
                  <li>Absolutely zero ink feel on the surface</li>
                  <li>Permanent, un-scratchable branding</li>
                  <li>Unlimited print placements & patterns</li>

                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PREMIUM SERVICES */}
      <section className="services">
        <h2>Our Premium Services</h2>
        <p className="section-text">Modern printing and branding solutions engineered with micro-precision.</p>

        <div className="service-grid">
          <div className="service-card">
            <FaTshirt />
            <h3>Embroidery</h3>
            <p>Premium multi-thread clothing branding, custom corporate badges, and workwear uniforms.</p>
            <FaArrowRight className="arrow" />
          </div>

          <div className="service-card">
            <FaPrint />
            <h3>Printing</h3>
            <p>High-resolution vinyl transfers, screen-printing, and high-volume garment outputs.</p>
            <FaArrowRight className="arrow" />
          </div>

          <div className="service-card">
            <FaPalette />
            <h3>Creative Designs</h3>
            <p>Professional digitizing, high-vector conversion, and custom layouts tailored for stitches.</p>
            <FaArrowRight className="arrow" />
          </div>
        </div>
      </section>

      {/* 4. DRAG-AND-DROP PRICE SLIDER (New Feature) */}
      <section className="calculator-slider-section">
        <div className="slider-card-wrapper">

          <div className="slider-details">
            <h2>Wholesale Calculator</h2>
            <p>Slide to estimate bulk wholesale discount savings for your upcoming corporate campaigns.</p>
            
            <div className="slider-container">
              <input 
                type="range" 
                min="10" 
                max="500" 
                value={estimateQty} 
                onChange={(e) => setEstimateQty(parseInt(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-labels">
                <span>10 Units</span>
                <span><strong>{estimateQty} Units</strong></span>
                <span>500+ Units</span>
              </div>
            </div>
          </div>

          
          <div className="slider-stats-display">
            <div>
              <h3>Estimated Price</h3>
              <h2>R {calculatePrice()}</h2>
            </div>
            <div>
              <h3>Est. Delivery</h3>
              <p>5 - 7 Business Days</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <div className="why-content">
          <h2>Why Elsies?</h2>
          <ul>
            <li><FaCheckCircle /> Premium Quality Stitches</li>
            <li><FaClock /> Fast Production Turnaround</li>
            <li><FaShieldAlt /> Trusted & Secure Service</li>
            <li><FaUsers /> Over 1,000 Happy Clients</li>
          </ul>
        </div>

        <div className="stats">
          <div>
            <h1>500+</h1>
            <p>Trusted Corporate Clients</p>

          </div>
          <div>
            <h1>1000+</h1>
            <p>Completed Runs</p>
          </div>
          <div>
            <h1>24/7</h1>
            <p>WhatsApp Support</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="process">
        <h2>How It Works</h2>
        <div className="process-grid">
          <div>
            <span>1</span>
            <h3>Upload Design</h3>
            <p>Submit your brand artwork, logo, or reference vector image directly.</p>
          </div>
          <div>
            <span>2</span>

            <h3>Choose Branding</h3>
            <p>Select modern embroidery finishes or highly durable digital screen transfers.</p>
          </div>
          <div>
            <span>3</span>
            <h3>Enjoy Delivery</h3>
            <p>Your orders undergo rigorous quality checking and are delivered directly.</p>
          </div>
        </div>
      </section>

      {/* 6. LIVE SIMULATED ORDER TRACKING (New Feature) */}
      <section className="tracker-section">
        <div className="tracker-card">
          <h2><FaTruck /> Track Your Production Run</h2>
          <p>Instantly check the staging updates of your custom order in our design room.</p>
          
          <form onSubmit={handleTrackOrder} className="tracker-form">

            <input 
              type="text" 
              placeholder="Enter Order ID (e.g., EP-2026-88)" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="tracker-input"
            />
            <button type="submit" href= "/profile-login" className="tracker-btn">Check Status</button>
          </form>

          {orderStatus && (
            <div className="tracker-result-box">
              <span className="pulse-indicator"></span>
              <p>Current Status: <strong>{orderStatus}</strong></p>
            </div>
          )}
        </div>
      </section>

      {/* 7. DYNAMIC ACCORDION FAQ (New Feature) */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p className="section-text">Got questions about materials, formats, or timing? We've got answers.</p>
        </div>

        <div className="faq-wrapper">
          <div className={`faq-item ${activeFAQ === 0 ? "active" : ""}`} onClick={() => toggleFAQ(0)}>
            <div className="faq-question">
              <h3>What is your minimum order quantity (MOQ)?</h3>
              <span className="faq-toggle-icon"></span>
            </div>
            <div className="faq-answer">
              <p>To deliver premium quality and industrial setup, we recommend a minimum order of 10 items for custom embroidery runs. Contact us directly for special exceptions on luxury corporate prototyping.</p>
            </div>
          </div>

          <div className={`faq-item ${activeFAQ === 1 ? "active" : ""}`} onClick={() => toggleFAQ(1)}>
            <div className="faq-question">
              <h3>What file formats do you accept for custom digitizing?</h3>
              <span className="faq-toggle-icon"></span>
            </div>
            <div className="faq-answer">
              <p>We accept PNG, JPG, PDF, SVG, AI, and EPS files. If your design is pixelated, our in-house designers will vectorize and digitize it to produce a pristine stitch profile.</p>
            </div>
          </div>

          <div className={`faq-item ${activeFAQ === 2 ? "active" : ""}`} onClick={() => toggleFAQ(2)}>
            <div className="faq-question">
              <h3>Do you deliver across the country?</h3>
              <span className="faq-toggle-icon"></span>
            </div>
            <div className="faq-answer">
              <p>Yes, we offer fully insured door-to-door courier deliveries across South Africa so your fresh garments arrive safe, secure, and ready to wear.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <FaRocket />
        <h2>Your Brand. Our Precision.</h2>
        <p>We unite industry-leading tech, high-density threads, and modern graphic expertise to formulate garments that look beautiful and feel luxury class.</p>
      </section>

      {/* 8. CLIENT REVIEWS CAROUSEL / TESTIMONIALS (New Feature) */}
      <section className="testimonials-section">
        <h2>What Our Partners Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="stars-wrapper">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"The stitching resolution Elsies delivered on our company polo collars was breathtaking. True 2026 premium class!"</p>
            <h4>- Sarah M., Brand Manager</h4>
          </div>
          <div className="testimonial-card">
            <div className="stars-wrapper">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"Flawless DTF transfers on our heavy hoodies. No cracking, survived over 20 hot wash cycles already."</p>
            <h4>- David K., Event Producer</h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready For Something Amazing?</h2>
        <a href="/print-out">Start Printing Now</a>
      </section>

      {/* 9. FLOATING ACTION DOCK (Replaced simple buttons) */}
      <div className="floating-dock">
        <a href="https://wa.me/27827187044" className="dock-item whatsapp-dock" title="WhatsApp Chat">
          <FaWhatsapp />
        </a>
        <a href="https://www.facebook.com/share/18dwypXPWz/" className="dock-item facebook-dock" title="Facebook Chat">
          <FaFacebook />
        </a>
        <a href="/print-calculator" className="dock-item calc-dock" title="Dynamic Calculator">
          <FaSlidersH />

        </a>
      </div>

      {showTop && (
        <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}

export default Home;
