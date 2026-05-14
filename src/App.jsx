import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Menu, X, ArrowRight, Star, Calendar, Clock, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

function Navbar({ onBook }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-[3rem] transition-all duration-500 flex items-center justify-between px-6 py-4 ${isScrolled ? 'bg-cream/80 backdrop-blur-md border border-moss/10 text-moss' : 'bg-transparent text-cream'}`}>
      <div className="flex items-center justify-center">
        <img src="./logo.png" alt="Blessed Hair Braiding & Locs" className="h-20 md:h-24 w-auto object-contain" style={{ imageRendering: 'high-quality' }} />
      </div>
      
      <div className="hidden md:flex gap-8 font-sans font-medium text-sm items-center">
        <a href="#services" className="hover-lift">Services</a>
        <a href="#philosophy" className="hover-lift">Philosophy</a>
        <a href="#process" className="hover-lift">Experience</a>
      </div>

      <button onClick={onBook} className={`hidden md:block btn-hover-layer hover-magnetic px-6 py-2 rounded-full font-medium text-sm transition-colors ${isScrolled ? 'bg-terracotta text-cream' : 'bg-cream text-moss'}`}>
        Book Now
      </button>

      <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 mt-4 w-full bg-cream text-moss rounded-[2rem] p-6 flex flex-col gap-4 shadow-xl md:hidden border border-moss/10">
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <button onClick={() => { setMobileMenuOpen(false); onBook(); }} className="bg-terracotta text-cream px-6 py-3 rounded-full font-medium w-full mt-2">
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero({ onBook }) {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12 lg:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          src="./hero-bg.jpg" 
          alt="Natural Hair Textures" 
          className="w-full h-full object-cover"
          style={{ imageRendering: 'high-quality' }}
        />
      </div>

      <div className="relative z-10 text-white max-w-4xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        <p className="hero-text text-xl md:text-2xl font-sans mb-2 font-medium">Blessed Hair Braiding & Locs</p>
        <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-serif italic leading-none mb-8">
          Beauty <br className="hidden md:block"/> Redefined.
        </h1>
        <div className="hero-text">
          <button onClick={onBook} className="bg-terracotta hover-magnetic btn-hover-layer text-cream px-8 py-4 rounded-full font-sans font-medium flex items-center gap-2 group shadow-xl">
            Book Your Appointment
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
      </div>
    </section>
  );
}

function Features({ onBook }) {
  // Card 1 Logic
  const [styles, setStyles] = useState(['Knotless Braids', 'Boho Braids', 'Protective Styles']);
  useEffect(() => {
    const interval = setInterval(() => {
      setStyles(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2 Logic
  const msgs = [
    "New client consultation confirmed...",
    "Loc retwist session scheduled...",
    "Protective style completed successfully..."
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (charIndex < msgs[msgIndex].length) {
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setMsgIndex((prev) => (prev + 1) % msgs.length);
        }, 2000);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [charIndex, msgIndex]);

  // Card 3 Logic
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [activeDay, setActiveDay] = useState(3);

  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-cream text-charcoal">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif italic mb-16 text-moss">Interactive Beauty Services</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="feature-card bg-white rounded-[2rem] p-8 shadow-sm border border-moss/5 flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="font-sans font-bold text-xl mb-2 text-moss">Luxury Braiding Styles</h3>
              <p className="text-sm text-charcoal/70">Customized protective styles tailored to you.</p>
            </div>
            <div className="relative h-32 flex items-center justify-center mt-8">
              {styles.map((style, i) => (
                <div 
                  key={style}
                  className="absolute w-full text-center py-3 rounded-full font-serif text-lg border border-moss/10 bg-cream shadow-sm"
                  style={{
                    transform: `translateY(${i === 0 ? 0 : i === 1 ? -15 : -30}px) scale(${i === 0 ? 1 : i === 1 ? 0.95 : 0.9})`,
                    opacity: i === 0 ? 1 : i === 1 ? 0.6 : 0.3,
                    zIndex: 10 - i,
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {style}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card bg-moss text-cream rounded-[2rem] p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></div>
                <span className="font-mono text-xs uppercase tracking-wider text-cream/70">Live Booking Feed</span>
              </div>
              <h3 className="font-sans font-bold text-xl mb-2">Professional Loc Care</h3>
              <p className="text-sm text-cream/70">Healthy loc maintenance and scalp-focused care.</p>
            </div>
            <div className="font-mono text-sm text-terracotta h-16 mt-8">
              {msgs[msgIndex].substring(0, charIndex)}
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card bg-white rounded-[2rem] p-8 shadow-sm border border-moss/5 flex flex-col justify-between min-h-[300px]">
             <div>
              <h3 className="font-sans font-bold text-xl mb-2 text-moss">Premium Salon Experience</h3>
              <p className="text-sm text-charcoal/70">Clean environment and personalized consultations.</p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between mb-4 relative">
                {days.map((day, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-colors ${activeDay === i ? 'text-cream' : 'bg-cream text-charcoal hover:bg-moss/10'}`}
                  >
                    {day}
                  </button>
                ))}
                {/* SVG Cursor selecting day */}
                <div 
                  className="absolute top-0 left-0 w-8 h-8 rounded-full bg-terracotta z-0 transition-all duration-300 ease-out flex items-center justify-center"
                  style={{ transform: `translateX(${activeDay * (100 / (days.length - 1)) * (days.length - 1)}px)`, width: '32px' }}
                >
                   {/* We calculate position based on Flex spacing approximation, actual implementation uses exact offsets but for simplicity we rely on layout */}
                   {/* The above transform logic needs a specific offset map or absolute positioning per item. Let's simplify. */}
                </div>
                 {/* Re-doing the layout for the cursor to work perfectly */}
              </div>
               {/* Fixed day selector layout */}
              <div className="relative flex justify-between mb-4">
                <div 
                  className="absolute top-0 left-0 w-8 h-8 rounded-full bg-terracotta transition-all duration-500 ease-out"
                  style={{ left: `calc(${activeDay * (100 / 6)}% - ${activeDay === 6 ? 0 : activeDay === 0 ? 0 : 0}px)`, transform: activeDay === 0 ? 'translateX(0)' : activeDay === 6 ? 'translateX(-100%)' : `translateX(-50%)`, left: activeDay === 0 ? '0%' : activeDay === 6 ? '100%' : `${activeDay * (100/6)}%` }}
                ></div>
                {days.map((day, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`relative z-10 w-8 h-8 flex items-center justify-center font-mono text-xs transition-colors ${activeDay === i ? 'text-cream' : 'text-charcoal hover:text-moss'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <button onClick={onBook} className="w-full py-3 rounded-full bg-moss text-cream font-sans text-sm hover-magnetic btn-hover-layer">
                Save Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section id="philosophy" ref={containerRef} className="relative py-32 px-6 md:px-12 lg:px-24 bg-charcoal text-cream overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="./braids.jpg" 
          alt="Salon Parallax Texture" 
          className="w-full h-full object-cover"
          style={{ imageRendering: 'high-quality' }}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center bg-cream/95 backdrop-blur-md p-12 md:p-24 rounded-[3rem] shadow-2xl border border-moss/10">
        <p className="phil-text text-4xl md:text-5xl lg:text-6xl font-serif italic text-moss leading-tight">
          We focus on: healthy hair, precision artistry, and confidence.
        </p>
      </div>
    </section>
  );
}

function Process() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');
      
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[cards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
            scale: 0.9,
            filter: "blur(20px)",
            opacity: 0.5,
            ease: "none"
          });
        } else {
           ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "+=100%", // Give it some scrolling room
            pin: true,
            pinSpacing: true, // Keep spacing for the last element
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "Understanding hair goals, scalp condition, and desired style.",
      anim: (
        <svg className="w-32 h-32 animate-spin-slow text-terracotta" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Precision Styling",
      desc: "Carefully crafted braids or loc styling using professional techniques.",
      anim: (
        <div className="w-32 h-32 relative overflow-hidden flex flex-col justify-center gap-4">
           <div className="w-full h-[1px] bg-moss"></div>
           <div className="w-full h-1 bg-terracotta relative">
              <div className="absolute top-0 left-0 w-1/3 h-full bg-cream animate-scan"></div>
           </div>
           <div className="w-full h-[1px] bg-moss"></div>
        </div>
      )
    },
    {
      num: "03",
      title: "Confidence Reveal",
      desc: "Final polished look with healthy finish and styling recommendations.",
      anim: (
        <div className="flex items-center justify-center h-32 gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 bg-terracotta rounded-full animate-waveform"
              style={{ animationDelay: `${i * 0.15}s`, height: i % 2 === 0 ? '60%' : '100%' }}
            ></div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="process" ref={containerRef} className="bg-cream relative">
      <style>{`
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes scan {
          0% { left: -33%; }
          100% { left: 100%; }
        }
        .animate-scan { animation: scan 2s ease-in-out infinite alternate; }
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .animate-waveform { animation: waveform 1s ease-in-out infinite; }
      `}</style>
      
      {steps.map((step, i) => (
        <div key={step.num} className="process-card h-[100vh] w-full flex items-center justify-center p-6 bg-cream">
          <div className="w-full max-w-4xl bg-white rounded-[3rem] p-12 md:p-24 shadow-sm border border-moss/10 flex flex-col md:flex-row items-center gap-12 justify-between">
            <div className="flex-1">
              <div className="font-mono text-terracotta mb-4">Step {step.num}</div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-moss mb-6">{step.title}</h2>
              <p className="text-lg text-charcoal/80 font-sans">{step.desc}</p>
            </div>
            <div className="w-48 h-48 flex flex-shrink-0 items-center justify-center bg-cream rounded-[2rem] border border-moss/5 shadow-inner">
              {step.anim}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function Pricing({ onBook }) {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-cream relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif italic text-moss mb-16">Book Your Appointment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-[2rem] p-8 border border-moss/10 flex flex-col hover-lift">
            <h3 className="text-2xl font-sans font-bold text-moss mb-4">Braiding Services</h3>
            <p className="text-charcoal/70 mb-8 flex-1">Knotless, boho, and customized protective styles.</p>
            <button onClick={onBook} className="w-full py-4 rounded-full border border-moss text-moss font-medium hover:bg-moss hover:text-cream transition-colors">
              Book Now
            </button>
          </div>
          
          <div className="bg-moss rounded-[2rem] p-8 border border-moss flex flex-col hover-lift transform md:-translate-y-4 shadow-xl">
            <div className="text-terracotta font-mono text-xs uppercase mb-2">Most Popular</div>
            <h3 className="text-2xl font-sans font-bold text-cream mb-4">Loc Maintenance</h3>
            <p className="text-cream/70 mb-8 flex-1">Professional retwists, styling, and scalp care.</p>
            <button onClick={onBook} className="w-full py-4 rounded-full bg-terracotta text-cream font-medium hover-magnetic btn-hover-layer">
              Reserve Your Spot
            </button>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-moss/10 flex flex-col hover-lift">
            <h3 className="text-2xl font-sans font-bold text-moss mb-4">Luxury Styling</h3>
            <p className="text-charcoal/70 mb-8 flex-1">Premium packages and personalized beauty consultations.</p>
            <button onClick={onBook} className="w-full py-4 rounded-full border border-moss text-moss font-medium hover:bg-moss hover:text-cream transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onBook }) {
  return (
    <footer className="bg-charcoal text-cream rounded-t-[4rem] px-6 py-16 md:px-12 lg:px-24 relative z-10 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <h3 className="text-3xl font-serif italic mb-4">Blessed Hair Braiding & Locs</h3>
            <p className="text-cream/70 font-sans max-w-sm">
              Luxury braiding, loc maintenance, and protective hairstyles for modern women.
            </p>
            <div className="mt-8 flex items-center gap-3 bg-cream/5 px-4 py-2 rounded-full inline-flex border border-cream/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-mono text-xs uppercase tracking-wider text-cream/90">Appointments Available</span>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-8">
            <h4 className="font-mono text-sm mb-6 text-terracotta">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm text-cream/70">
              <li><a href="#services" className="hover:text-cream transition-colors">Services</a></li>
              <li><a href="#philosophy" className="hover:text-cream transition-colors">Philosophy</a></li>
              <li><a href="#process" className="hover:text-cream transition-colors">Experience</a></li>
              <li><button onClick={onBook} className="hover:text-cream transition-colors">Book Online</button></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-mono text-sm mb-6 text-terracotta">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-cream/70">
              <li className="flex items-center gap-3"><MapPin size={16}/> 48 Kathryn Ave, Florence, KY, 41042</li>
              <li className="flex items-center gap-3"><Clock size={16}/> Mon-Fri: 8am - 7pm</li>
              <li className="flex items-center gap-3"><Star size={16}/> blessedhb2030@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-sm text-cream/50">
          <p>&copy; {new Date().getFullYear()} Blessed Hair Braiding & Locs. All rights reserved.</p>
          <div className="flex gap-4">
            <Instagram size={20} className="hover:text-terracotta transition-colors cursor-pointer"/>
            <Facebook size={20} className="hover:text-terracotta transition-colors cursor-pointer"/>
            <Twitter size={20} className="hover:text-terracotta transition-colors cursor-pointer"/>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const phone = form.phone.value;
    
    // Change button text to show loading state
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Connecting...';
    btn.disabled = true;

    // Send email notification silently via formsubmit.co
    fetch("https://formsubmit.co/ajax/blessedhb2030@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          _subject: "✨ New Booking Alert from Website!",
          Name: firstName,
          Phone: phone,
          Message: `${firstName} with the number ${phone} is proceeding to book a service on Booksy.`
      })
    })
    .finally(() => {
        // Always redirect to Booksy after
        window.location.href = "https://booksy.com/en-us/857647_blessed-hair-braiding-locs_braids-locs_20765_florence#ba_s=vl_1";
    });
  };

  return (
    <div className="min-h-screen selection:bg-terracotta selection:text-cream font-sans">
      <Navbar onBook={handleOpenModal} />
      <Hero onBook={handleOpenModal} />
      <Features onBook={handleOpenModal} />
      <Philosophy />
      <Process />
      <Pricing onBook={handleOpenModal} />
      <Footer onBook={handleOpenModal} />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/80 backdrop-blur-sm transition-opacity">
          <div className="bg-cream p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative animate-fadeIn">
            <button onClick={handleCloseModal} className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-3xl font-serif italic text-moss mb-2">Book Appointment</h3>
            <p className="text-charcoal/70 text-sm mb-8">Please enter your details to continue to our booking page.</p>
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-moss mb-2">First Name</label>
                <input type="text" name="firstName" required className="w-full px-4 py-3 rounded-xl border border-moss/20 bg-white focus:outline-none focus:border-terracotta transition-colors" placeholder="e.g. Sarah" />
              </div>
              <div>
                <label className="block text-sm font-medium text-moss mb-2">Phone Number</label>
                <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-moss/20 bg-white focus:outline-none focus:border-terracotta transition-colors" placeholder="(555) 000-0000" />
              </div>
              <button type="submit" className="w-full py-4 rounded-full bg-terracotta text-cream font-medium hover-magnetic btn-hover-layer">
                Continue to Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
