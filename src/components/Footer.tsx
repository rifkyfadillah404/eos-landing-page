import { Facebook, Instagram, Linkedin, Youtube, MapPin, Clock, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Informasi perusahaan">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-text">EOS</span>
            <span className="brand-name">TEKNOLOGI</span>
          </div>
          <p className="footer-tagline">Manufacturing System Specialist</p>
        </div>

        <div className="footer-office">
          <h3>Our Office</h3>
          <p className="office-name">PT. EOS TEKNOLOGI INDONESIA</p>
          
          <div className="office-info">
            <div className="info-item">
              <MapPin size={18} />
              <p>The Manhattan Square Mid Tower Building, Jl. TB Simatupang Kav 1 – S Ps. Minggu, Jakarta.</p>
            </div>
            
            <div className="info-item">
              <Clock size={18} />
              <div>
                <p>Senin – Jumat : 08.00 – 17.00</p>
                <p>Sabtu – Minggu : Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <div className="contact-list">
            <div className="contact-item">
              <Phone size={18} />
              <div>
                <p>Fast Respon (1): <a href="tel:+6281111 70405">+6281111 70405</a></p>
                <p>Fast Respon (2): <a href="tel:+628131828 8881">+62813 1828 8881</a></p>
                <p>Telp: <a href="tel:021-8064 1070">021 – 8064 1070</a></p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <a href="mailto:info@eosteknologi.com">info@eosteknologi.com</a>
            </div>
          </div>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#about">About Us</a>
          <span>·</span>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <p className="footer-copyright">
          Copyright © Rev. 2025 · <strong>EOS Teknologi</strong> · All rights reserved
        </p>
      </div>
    </footer>
  )
}
