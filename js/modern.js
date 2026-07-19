document.addEventListener("DOMContentLoaded", function () {
  // --- Core Layout Elements ---
  const header = document.querySelector("header");
  const blobs = document.querySelectorAll(".blob");
  const timelines = document.querySelectorAll(".timeline-container");

  // --- Unified Scroll Event Handler ---
  const handleScroll = () => {
    // 1. Header Scrolled Styling
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // 2. Parallax Background Blobs Weaving
    const scrollY = window.scrollY;
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.12;
      const driftY = scrollY * speed;
      const driftX = Math.sin((scrollY * 0.0008) + index) * 45;
      blob.style.transform = `translate(${driftX}px, ${driftY}px)`;
    });

    // 3. Timeline Progress Drawing Line Path
    timelines.forEach(timeline => {
      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const entryThreshold = viewportHeight * 0.9;
      const exitThreshold = viewportHeight * 0.15;
      
      const totalDist = entryThreshold - exitThreshold;
      const progressDist = entryThreshold - rect.top;
      
      let percent = (progressDist / (rect.height + totalDist - rect.height)) * 100;
      percent = Math.min(Math.max(percent, 0), 100);
      
      timeline.style.setProperty("--scroll-percent", `${percent}%`);
    });
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run immediately on load

  // --- Mobile Hamburger Navigation ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // --- Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // --- Active Nav Link Highlighting (Intersection Observer) ---
  const sections = document.querySelectorAll("section[id]");
  const navLi = document.querySelectorAll(".nav-links li");

  const navObserverOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px", // Triggers when section occupies middle of viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLi.forEach((li) => {
          li.classList.remove("active");
          const link = li.querySelector("a");
          if (link && link.getAttribute("href") === `#${id}`) {
            li.classList.add("active");
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // --- Scroll Reveal Animation (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  
  const revealObserverOptions = {
    root: null,
    rootMargin: "0px 0px -18% 0px", // Trigger slightly higher up, making items appear sequentially as you scroll
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        
        // Trigger progress bar animation if inside a skill card
        if (entry.target.classList.contains("skill-card")) {
          const fill = entry.target.querySelector(".skill-progress-fill");
          if (fill) {
            const targetVal = fill.getAttribute("data-progress");
            fill.style.width = targetVal + "%";
          }
        }

        // Unobserve once element has revealed itself
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Stats Counter Animation (Intersection Observer) ---
  const statsSection = document.querySelector(".stats-section");
  const counters = document.querySelectorAll(".stat-number");
  let counterAnimated = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-to"), 10);
      const suffix = counter.getAttribute("data-suffix") || "";
      const duration = 1500; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quad formula
        const easeProgress = progress * (2 - progress);
        
        const currentValue = Math.floor(easeProgress * target);
        counter.textContent = currentValue + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if (statsSection && counters.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  // --- Custom Premium Cursor ---
  const cursorDot = document.querySelector(".custom-cursor-dot");
  const cursorOutline = document.querySelector(".custom-cursor-outline");

  if (cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update dot position instantly
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Animate trailing outline smoothly
    const animateOutline = () => {
      // Linear interpolation (lerp) for smooth lag effect
      const ease = 0.12; 
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateOutline);
    };
    requestAnimationFrame(animateOutline);

    // Hover states
    const interactiveSelectors = "a, button, input, textarea, .service-card, .project-card, .timeline-content, .hamburger";
    const interactives = document.querySelectorAll(interactiveSelectors);

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("cursor-hover");
        cursorOutline.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("cursor-hover");
        cursorOutline.classList.remove("cursor-hover");
      });
    });
  }

  // --- Dynamic Hover Glowing Card Pointer Tracker ---
  const glowCards = document.querySelectorAll(".service-card, .project-card, .skill-card");
  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // --- Dynamic Particle Background System ---
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // slow elegant drift
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2.5 + 1.5; // larger particles
        this.color = Math.random() > 0.5 ? "rgba(99, 102, 241, 0.65)" : "rgba(168, 85, 247, 0.65)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle Cyber Grid Overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)"; // visible grid lines
      ctx.lineWidth = 1;
      const gridSize = 65;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update, Draw, and Connect Particles
      particles.forEach((p, idx) => {
        p.update();
        p.draw();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22; // higher connection line opacity
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };
    animate();
  }
});
