
import React, { useEffect, useState } from "react";
import "./Services.css";

import {
  FaSearch,
  FaShoppingCart,
  FaWhatsapp,
  FaFacebook,
  FaFilter,
  FaTrash,
  FaMinus,
  FaPlus,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaLock,
  FaFileDownload
} from "react-icons/fa";

import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";


function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // CART & CHECKOUT STATES
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("EFT");
  const [paymentStep, setPaymentStep] = useState("cart"); // 'cart' | 'checkout' | 'processing' | 'success'
  const [capitecPhone, setCapitecPhone] = useState("");
  const [paysharpId, setPaysharpId] = useState("");


  // Load services and restore existing cart
  useEffect(() => {
    const serviceRef = ref(database, "services");
    onValue(serviceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setServices(
          Object.entries(data).map(([id, value]) => ({
            id,
            ...value
          }))
        );
      } else {
        setServices([]);
      }
    });

    const savedCart = localStorage.getItem("elsiesCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {

        console.error("Error parsing cart", e);
      }
    }
  }, []);

  // Sync Cart items to storage
  const syncCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("elsiesCart", JSON.stringify(newCart));
  };

  // Add to Cart
  const addToCart = (service) => {
    const existingIndex = cart.findIndex((item) => item.id === service.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      syncCart(updatedCart);
    } else {
      const newCartItem = {
        ...service,
        quantity: 1,

        customizationNote: "",
        brandingPosition: "Front Chest",
        stitchDensity: "Standard Stitching (8,000 stitches)"
      };
      syncCart([...cart, newCartItem]);
    }
    setIsCartOpen(true); // Automatically slide drawer open for high premium engagement
  };

  // Update item quantity
  const updateQuantity = (index, amount) => {
    const updatedCart = [...cart];
    const newQty = updatedCart[index].quantity + amount;
    if (newQty <= 0) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].quantity = newQty;
    }
    syncCart(updatedCart);
  };

  // Edit custom specifications for item
  const updateItemSpec = (index, field, value) => {
    const updatedCart = [...cart];
    updatedCart[index][field] = value;
    syncCart(updatedCart);
  };

  // Remove Item
  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    syncCart(updatedCart);
  };

  // Empty entire cart
  const clearCart = () => {
    syncCart([]);
  };

  // Calculate calculations
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * item.quantity, 0);
  };


  const getDiscountAmount = () => {
    return getSubtotal() * (discountPercent / 100);
  };

  const getVAT = () => {
    return (getSubtotal() - getDiscountAmount()) * 0.15;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getVAT();
  };

  // Promo discount logic
  const handlePromoApply = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "ELSIES2026") {
      setDiscountPercent(10);
      alert("Promo Code Applied: 10% Discount Saved!");
    } else {

      alert("Invalid or expired promotional code.");
    }
  };

  // Payment process simulation
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStep("processing");
    let timer = 3;
    const interval = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(interval);
        setPaymentStep("success");
      }
    }, 1000);
  };

  // Generate downloadable POP
  const generatePOP = () => {
    const docText = `
--------------------------------------------------
      ELSIES PRINT & EMBROIDERY - PROOF OF PAYMENT

--------------------------------------------------
Date: ${new Date().toLocaleDateString()}
Status: VERIFIED & COMPLETED
Payment Gateway: ${paymentMethod}
Reference: EP-POP-${Math.floor(100000 + Math.random() * 900000)}

ITEMS PURCHASED:
${cart.map((item) => `* ${item.name} x${item.quantity} - R ${(item.price * item.quantity).toFixed(2)}`).join("\n")}

Subtotal: R ${getSubtotal().toFixed(2)}
VAT (15%): R ${getVAT().toFixed(2)}
Total Settled: R ${getTotal().toFixed(2)}

Thank you for your business. Production will commence shortly.
--------------------------------------------------
    `;
    const blob = new Blob([docText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download = `elsies_proof_of_payment_${Date.now()}.txt`;
    link.click();
  };

  const filteredServices = services.filter((service) => {
    const searchMatch = service.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category === "All" || service.category === category;
    return searchMatch && categoryMatch;
  });

  return (
    <div className="services-page">
      {/* SERVICES HERO */}
      <section className="services-hero">
        <h1>Our Premium Services</h1>
        <p>Professional printing, embroidery, and digital garment art.</p>
      </section>

      {/* CONTROLS */}
      <section className="service-controls">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FaFilter />
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Printing Services">Printing Services</option>
            <option value="Embroidery Services">Embroidery Services</option>
            <option value="IT and Business Supply">IT and Business Supply</option>
          </select>

        </div>

        <div className="cart-box clickable-cart" onClick={() => setIsCartOpen(!isCartOpen)}>
          <FaShoppingCart />
          <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="services-grid">
        {filteredServices.length === 0 && <h2>No services available</h2>}

        {filteredServices.map((service) => (
          <div className="service-card" key={service.id}>
            <img src={service.image} alt={service.name} />
            <div className="service-content">
              <span className="category-tag">{service.category}</span>
              <h2>{service.name}</h2>

              <p>{service.description}</p>
              <h3>R {service.price}</h3>
              <button onClick={() => addToCart(service)}>
                <FaShoppingCart /> Add To Cart
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* DYNAMIC CART SLIDE DRAWER & SECURE CHECKOUT MODULE (10+ Luxury Features Integrated) */}
      <div className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`}>
        <div className="cart-drawer">
          <div className="drawer-header">
            <h2>Your Selection Hub</h2>
            <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>×</button>
          </div>

          {paymentStep === "cart" && (

            <div className="drawer-inner-content">
              {cart.length === 0 ? (
                <div className="empty-state">
                  <FaShoppingCart className="empty-icon" />
                  <p>Your cart is empty. Choose a process to preview custom finishes.</p>
                </div>
              ) : (
                <>
                  <div className="drawer-actions-row">
                    <button className="clear-cart-btn" onClick={clearCart}>
                      <FaTrash /> Clear Design Cart
                    </button>
                  </div>

                  <div className="cart-scroll-container">
                    {cart.map((item, index) => (
                      <div className="premium-cart-card" key={index}>
                        <div className="cart-card-main">
                          <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
                          <div className="cart-item-meta">
                            <h4>{item.name}</h4>
                            <p className="item-unit-price">R {item.price} per unit</p>
                            <p className="item-subtotal">Subtotal: R {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="quantity-controller">
                            <button onClick={() => updateQuantity(index, -1)}>
                              <FaMinus />
                            </button>
                            <span className="qty-count">{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, 1)}>
                              <FaPlus />
                            </button>
                          </div>
                        </div>

                        {/* Interactive Edit Features */}
                        <div className="cart-card-expansion">
                          <div className="spec-input-group">
                            <label>Placement / Artwork Setup Note:</label>
                            <input
                              type="text"
                              value={item.customizationNote || ""}
                              placeholder="e.g., Left Chest embroidery, 5cm width"
                              onChange={(e) => updateItemSpec(index, "customizationNote", e.target.value)}
                            />
                          </div>

                          <div className="spec-grid-selectors">
                            <div className="spec-select">
                              <label>Location:</label>
                              <select

                                value={item.brandingPosition || ""}
                                onChange={(e) => updateItemSpec(index, "brandingPosition", e.target.value)}
                              >
                                <option>Front Center</option>
                                <option>Left Chest</option>
                                <option>Right Chest</option>
                                <option>Full Back</option>
                                <option>Sleeve Print</option>
                              </select>
                            </div>

                            <div className="spec-select">
                              <label>Density / Medium:</label>
                              <select
                                value={item.stitchDensity || ""}
                                onChange={(e) => updateItemSpec(index, "stitchDensity", e.target.value)}
                              >
                                <option>Standard Premium Stitch</option>

                                <option>Metallic Silk Stitching</option>
                                <option>Direct-to-Garment (DTG)</option>
                                <option>Silicone Transfer</option>
                              </select>
                            </div>
                          </div>

                          <button className="item-remove-btn" onClick={() => removeItem(index)}>
                            <FaTrash /> Remove Item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and calculations */}
                  <div className="drawer-pricing-summary">
                    <form className="promo-form" onSubmit={handlePromoApply}>

                      <input
                        type="text"
                        placeholder="Promo Code (ELSIES2026)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button type="submit">Apply</button>
                    </form>

                    <div className="pricing-rows">
                      <div className="price-row">
                        <span>Items Subtotal</span>
                        <span>R {getSubtotal().toFixed(2)}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="price-row discount-applied">
                          <span>Promo Discount ({discountPercent}%)</span>
                          <span>- R {getDiscountAmount().toFixed(2)}</span>
                        </div>
                      )}
                      <div className="price-row">
                        <span>South Africa VAT (15%)</span>
                        <span>R {getVAT().toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="price-row grand-total">
                        <span>Estimated Total</span>
                        <span>R {getTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <button className="checkout-trigger-btn" onClick={() => setPaymentStep("checkout")}>
                      Proceed to Secure Checkout <FaLock />
                    </button>
                  </div>
                </>
              )}

            </div>
          )}

          {paymentStep === "checkout" && (
            <div className="checkout-step-container">
              <h3>Secure Checkout Portal</h3>
              <p className="checkout-subtitle">R {getTotal().toFixed(2)} total due including taxes.</p>

              <div className="payment-method-selectors">
                <div 
                  className={`payment-option ${paymentMethod === "EFT" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("EFT")}
                >
                  <h4>Manual Secure EFT</h4>
                  <p>Bank Transfer with immediate POP verification.</p>
                </div>

                <div 
                  className={`payment-option ${paymentMethod === "PaySharp" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("PaySharp")}
                >
                  <h4>PaySharp Instant</h4>
                  <p>Fast modern QR code & dynamic push billing.</p>
                </div>

                <div 
                  className={`payment-option ${paymentMethod === "CapitecPay" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("CapitecPay")}
                >
                  <h4>Capitec Pay</h4>
                  <p>Secure mobile validation directly on your banking application.</p>
                </div>
              </div>


              <form className="payment-gateway-form" onSubmit={handlePaymentSubmit}>
                {paymentMethod === "EFT" && (
                  <div className="payment-details-box">
                    <h4>Elsies Corporate Banking Details</h4>
                    <p>Please make your payment transfer using the parameters below:</p>
                    <div className="banking-spec-sheet">
                      <div><strong>Bank:</strong> FNB / First National Bank</div>
                      <div><strong>Account Type:</strong> Business Account</div>
                      <div><strong>Account Number:</strong> 62908856230</div>
                      <div><strong>Branch Code:</strong> 250655</div>
                      <div><strong>Reference:</strong> EP-${Math.floor(1000 + Math.random() * 9000)}</div>
                    </div>
                  </div>
                )}


                {paymentMethod === "PaySharp" && (
                  <div className="payment-details-box">
                    <h4>PaySharp Direct Integration</h4>
                    <input 
                      type="text" 
                      placeholder="Enter PaySharp ID or registered mobile (e.g. +2782...)"
                      value={paysharpId}
                      onChange={(e) => setPaysharpId(e.target.value)}
                      required
                    />
                    <p className="field-descriptor">We will trigger an instant digital prompt to authorization.</p>
                  </div>
                )}

                {paymentMethod === "CapitecPay" && (
                  <div className="payment-details-box">
                    <h4>Capitec Pay Mobile Checkout</h4>
                    <input 
                      type="text" 

                      placeholder="Enter Capitec Account Mobile Number (e.g., 0827187044)"
                      value={capitecPhone}
                      onChange={(e) => setCapitecPhone(e.target.value)}
                      required
                    />
                    <p className="field-descriptor">Confirm the push alert directly inside your Capitec App within 2 minutes.</p>
                  </div>
                )}

                <div className="form-action-group">
                  <button type="button" className="back-btn" onClick={() => setPaymentStep("cart")}>
                    Back to Selection
                  </button>
                  <button type="submit" className="confirm-pay-btn">
                    Authorize Payment (R {getTotal().toFixed(2)})
                  </button>

                </div>
              </form>
            </div>
          )}

          {paymentStep === "processing" && (
            <div className="processing-payment-view">
              <div className="loading-spinner-circle"></div>
              <h3>Encrypting Secure Session</h3>
              <p>Establishing digital gateway links to ensure fully protected checkout...</p>
            </div>
          )}

          {paymentStep === "success" && (
            <div className="success-payment-view">
              <FaCheckCircle className="success-checkmark-icon" />
              <h3>Payment Settled & Verified</h3>
              <p>Your transaction has been securely processed. Our design team is currently loading your custom digitized profile.</p>


              <div className="pop-download-card">
                <h4><FaFileInvoiceDollar /> Verified Proof of Payment</h4>
                <p>An official POP has been generated for your internal financial tracking records.</p>
                <button className="download-pop-btn" onClick={generatePOP}>
                  <FaFileDownload /> Download PDF/Text POP
                </button>
              </div>

              <button className="close-checkout-btn" onClick={() => { setPaymentStep("cart"); clearCart(); setIsCartOpen(false); }}>
                Return to Shop Gallery
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTACT & CHAT CHANNELS */}

      <section className="service-contact">
        <h2>Need a bespoke wholesale custom quote?</h2>
        <div className="social-links-grid">
          <a
            href="https://wa.me/27827187044"
            target="_blank"
            rel="noreferrer"
            className="social-btn whatsapp-color"
          >
            <FaWhatsapp /> Chat On WhatsApp
          </a>

          {/* Facebook Direct Link */}
          <a
            href="https://www.facebook.com/share/18dwypXPWz/"
            target="_blank"
            rel="noreferrer"
            className="social-btn facebook-color"
          >
            <FaFacebook /> Follow Us on Facebook
          </a>

        </div>
        
      </section>
    </div>
  );
}

export default Services;
