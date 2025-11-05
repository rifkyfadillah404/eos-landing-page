import './Partners.css'

const partners = [
  { name: 'Yamakawa', logo: '/partner/yamakawa.jpg' },
  { name: 'SRI', logo: '/partner/sri.jpg' },
  { name: 'Fuji Bold', logo: '/partner/fuji_bold.jpg' },
  { name: 'Epiterma', logo: '/partner/epiterma.jpg' },
  { name: 'Bukaka', logo: '/partner/bukaka.jpg' },
  { name: 'Seidensticker', logo: '/partner/seidensticker.jpg' },
  { name: 'Anugrah', logo: '/partner/anugrah.jpg' }
]

export function Partners() {
  return (
    <section className="partners" aria-labelledby="partners-heading">
      <div className="partners-content">
        <div className="partners-header">
          <p className="eyebrow">PARTNERS</p>
          <h2 id="partners-heading">Dipercaya oleh perusahaan terkemuka</h2>
        </div>
        
        <div className="partners-scroll-wrapper">
          <div className="partners-track">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div key={`partner-1-${index}`} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`partner-2-${index}`} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
