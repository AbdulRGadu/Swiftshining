// Enhanced Swift Shining Path Ltd Website JavaScript
// Professional animations, interactions, and dynamic content

// Global mobile menu function for backup
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuPanel = mobileMenu?.querySelector('.fixed.right-0');
  
  if (mobileMenu && menuPanel) {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      // Open menu
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        menuPanel.classList.remove('translate-x-full');
      }, 10);
    } else {
      // Close menu
      menuPanel.classList.add('translate-x-full');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    }
  }
}

class WebsiteController {
  constructor() {
    this.isLoaded = false;
    this.animations = new AnimationController();
    this.navigation = new NavigationController();
    this.forms = new FormController();
    this.performance = new PerformanceController();
    this.carousel = new CarouselController();
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    console.log('🚀 Swift Shining Path Ltd Website Initializing...');
    
    // Initialize all components
    this.animations.init();
    this.navigation.init();
    this.forms.init();
    this.performance.init();
    // Initialize carousel only if present
    if (document.querySelector('.carousel-slide')) {
      this.carousel.init();
    }
    
    // Setup global interactions
    this.setupGlobalInteractions();
    this.setupScrollEffects();
    this.setupCounterAnimations();
    this.setupDynamicContent();
    
    // Mark as loaded
    this.isLoaded = true;
    document.body.classList.add('website-loaded');
    
    console.log('✅ Website fully initialized');
  }

  setupGlobalInteractions() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Dynamic year update
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Enhanced button interactions
    this.setupButtonEffects();
  }

  setupButtonEffects() {
    document.querySelectorAll('.btn-primary, button[class*="bg-gradient"]').forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'absolute inset-0 rounded-full bg-white opacity-20 transform scale-0 transition-transform duration-300';
        button.appendChild(ripple);
        requestAnimationFrame(() => {
          ripple.style.transform = 'scale(1)';
        });
      });

      button.addEventListener('mouseleave', (e) => {
        const ripples = button.querySelectorAll('span[class*="scale"]');
        ripples.forEach(ripple => {
          ripple.addEventListener('transitionend', () => ripple.remove());
          ripple.style.transform = 'scale(0)';
        });
      });
    });
  }

  setupScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add animation classes based on data attributes
          if (element.dataset.animation) {
            element.classList.add(element.dataset.animation);
          } else {
            // Default animations
            element.classList.add('animate-fade-in');
          }
          
          // Trigger counter animations
          if (element.classList.contains('counter')) {
            this.animateCounter(element);
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-slide-up, .animate-fade-in, .counter, [data-animation]').forEach(el => {
      observer.observe(el);
    });

    // Parallax effect for hero section
    this.setupParallaxEffects();
  }

  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Hero background parallax
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const backgroundElements = heroSection.querySelectorAll('.animate-float');
        backgroundElements.forEach((element, index) => {
          const speed = 0.2 + (index * 0.1);
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupCounterAnimations() {
    this.counters = document.querySelectorAll('.counter');
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  setupDynamicContent() {
    // Setup marquee animation pause on hover
    document.querySelectorAll('.animate-marquee').forEach(marquee => {
      marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
      });
      marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
      });
    });

    // Setup card hover effects
    this.setupCardHoverEffects();
  }

  setupCardHoverEffects() {
    document.querySelectorAll('.group').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        // Add subtle scaling and shadow effects
        const cardContent = card.querySelector('.relative');
        if (cardContent) {
          cardContent.style.transform = 'translateY(-2px)';
        }
      });

      card.addEventListener('mouseleave', (e) => {
        const cardContent = card.querySelector('.relative');
        if (cardContent) {
          cardContent.style.transform = 'translateY(0)';
        }
      });
    });
  }
}

class AnimationController {
  constructor() {
    this.animationQueue = [];
    this.isAnimating = false;
  }

  init() {
    // Setup staggered animations for page load
    this.setupPageLoadAnimations();
  }

  setupPageLoadAnimations() {
    // Stagger navigation items
    const navItems = document.querySelectorAll('nav a, nav button');
    navItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Animate hero content
    setTimeout(() => {
      const heroContent = document.querySelector('#home .relative');
      if (heroContent) {
        heroContent.classList.add('animate-fade-in');
      }
    }, 500);
  }

  addToQueue(animation) {
    this.animationQueue.push(animation);
    if (!this.isAnimating) {
      this.processQueue();
    }
  }

  processQueue() {
    if (this.animationQueue.length === 0) {
      this.isAnimating = false;
      return;
    }

    this.isAnimating = true;
    const animation = this.animationQueue.shift();
    animation().then(() => {
      this.processQueue();
    });
  }
}

class NavigationController {
  constructor() {
    this.mobileMenuOpen = false;
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'up';
  }

  init() {
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupActiveStates();
  }

  setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');

    console.log('Mobile menu elements:', { menuBtn, mobileMenu, closeBtn });

    if (menuBtn && mobileMenu && closeBtn) {
      const menuPanel = mobileMenu.querySelector('.fixed.right-0');

      const toggleMenu = () => {
        console.log('Toggle menu called, current state:', this.mobileMenuOpen);
        if (this.mobileMenuOpen) {
          // Close menu
          console.log('Closing menu');
          menuPanel.classList.add('translate-x-full');
          this.mobileMenuOpen = false;
          setTimeout(() => {
            mobileMenu.classList.add('hidden');
          }, 300);
        } else {
          // Open menu
          console.log('Opening menu');
          mobileMenu.classList.remove('hidden');
          this.mobileMenuOpen = true;
          setTimeout(() => {
            menuPanel.classList.remove('translate-x-full');
          }, 10);
        }
      };

      menuBtn.addEventListener('click', toggleMenu);
      closeBtn.addEventListener('click', toggleMenu);
      
      // Close when clicking backdrop
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
          toggleMenu();
        }
      });
      
      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenuOpen) {
          toggleMenu();
        }
      });
    }
  }

  setupScrollEffects() {
    let ticking = false;

    const updateNavigation = () => {
      const currentScrollY = window.scrollY;
      const nav = document.querySelector('nav');
      
      if (currentScrollY > 100) {
        nav.classList.add('bg-white/95', 'shadow-lg');
        nav.classList.remove('bg-white/80');
      } else {
        nav.classList.add('bg-white/80');
        nav.classList.remove('bg-white/95', 'shadow-lg');
      }

      // Update scroll direction
      this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
      this.lastScrollY = currentScrollY;
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupActiveStates() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('text-primary-600'));
          
          // Add active class to current link
          if (activeLink) {
            activeLink.classList.add('text-primary-600');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

class FormController {
  constructor() {
    this.forms = [];
  }

  init() {
    this.setupContactForm();
    this.setupFormValidation();
    this.setupFormAnimations();
  }

  setupContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }
  }

  handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      this.showSuccessMessage();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      e.target.reset();
    }, 2000);
  }

  showSuccessMessage() {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Message sent successfully!</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  setupFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    this.displayFieldValidation(field, isValid, errorMessage);
    return isValid;
  }

  displayFieldValidation(field, isValid, errorMessage) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    if (!isValid) {
      field.classList.add('border-red-500');
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error text-red-500 text-sm mt-1';
      errorDiv.textContent = errorMessage;
      field.parentNode.appendChild(errorDiv);
    } else {
      field.classList.remove('border-red-500');
      field.classList.add('border-green-500');
    }
  }

  clearFieldError(field) {
    field.classList.remove('border-red-500', 'border-green-500');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  setupFormAnimations() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentNode.classList.add('form-focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentNode.classList.remove('form-focused');
      });
    });
  }
}

class PerformanceController {
  constructor() {
    this.imageObserver = null;
    this.prefetchedUrls = new Set();
  }

  init() {
    this.setupLazyLoading();
    this.setupPrefetching();
    this.optimizeAnimations();
  }

  setupLazyLoading() {
    // Lazy load images
    const imageObserverOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px'
    };

    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('loading');
            this.imageObserver.unobserve(img);
          }
        }
      });
    }, imageObserverOptions);

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.imageObserver.observe(img);
    });
  }

  setupPrefetching() {
    // Prefetch critical resources on hover
    document.querySelectorAll('a[href^="#"], button').forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.prefetchCriticalResources();
      }, { once: true });
    });
  }

  prefetchCriticalResources() {
    const criticalImages = [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3',
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b'
    ];

    criticalImages.forEach(url => {
      if (!this.prefetchedUrls.has(url)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        this.prefetchedUrls.add(url);
      }
    });
  }

  optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.body.classList.add('reduced-animations');
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach(element => {
        if (document.hidden) {
          element.style.animationPlayState = 'paused';
        } else {
          element.style.animationPlayState = 'running';
        }
      });
    });
  }
}

// Initialize website when DOM is ready
const website = new WebsiteController();

// Export for global access if needed
window.SwiftShiningPath = {
  website,
  version: '2.0.0',
  initialized: () => website.isLoaded
};

class CarouselController {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 4;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
  }

  init() {
    this.setupCarousel();
    this.startAutoPlay();
  }

  setupCarousel() {
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.carousel-slide');

    // Add click handlers to dots
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideNumber = parseInt(e.target.dataset.slide);
        this.goToSlide(slideNumber);
        this.resetAutoPlay();
      });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });

    // Add touch/swipe support for mobile
    this.setupTouchSupport();
  }

  goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > this.totalSlides) return;

    // Update current slide
    this.currentSlide = slideNumber;

    // Update slides
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
      if (index + 1 === slideNumber) {
        slide.classList.add('active');
        slide.style.opacity = '1';
      } else {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      }
    });

    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index + 1 === slideNumber) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update hero content based on slide
    this.updateHeroContent(slideNumber);
  }

  nextSlide() {
    const nextSlide = this.currentSlide === this.totalSlides ? 1 : this.currentSlide + 1;
    this.goToSlide(nextSlide);
  }

  previousSlide() {
    const prevSlide = this.currentSlide === 1 ? this.totalSlides : this.currentSlide - 1;
    this.goToSlide(prevSlide);
  }

  updateHeroContent(slideNumber) {
    const heroTitle = document.querySelector('#home h1');
    const heroSubtitle = document.querySelector('#home p');
    
    if (!heroTitle || !heroSubtitle) return;

    const contentVariations = [
      {
        title: "Elevate Your Supply Chain to New Heights",
        subtitle: "Experience seamless logistics solutions with Swift Shining Path Limited. From customs clearing to freight forwarding, we deliver excellence across the global supply chain."
      },
      {
        title: "Golden Excellence in Global Logistics",
        subtitle: "Trusted by industry leaders worldwide. Our golden standard of service ensures your cargo reaches its destination safely and on time."
      },
      {
        title: "Innovative Solutions for Modern Business",
        subtitle: "Cutting-edge logistics technology meets proven expertise. We're your strategic partner in navigating the complexities of global trade."
      },
      {
        title: "Your Success is Our Mission",
        subtitle: "Every shipment matters. We treat your cargo with the care and attention it deserves, ensuring smooth operations and satisfied customers."
      }
    ];

    const content = contentVariations[slideNumber - 1];
    if (content) {
      // Animate content change
      heroTitle.style.opacity = '0';
      heroSubtitle.style.opacity = '0';
      
      setTimeout(() => {
        heroTitle.textContent = content.title;
        heroSubtitle.textContent = content.subtitle;
        heroTitle.style.opacity = '1';
        heroSubtitle.style.opacity = '1';
      }, 300);
    }
  }

  setupTouchSupport() {
    let startX = 0;
    let endX = 0;
    const heroSection = document.querySelector('#home');

    if (!heroSection) return;

    heroSection.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    }, { passive: true });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.previousSlide();
      }
      this.resetAutoPlay();
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  resetAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  resumeAutoPlay() {
    this.startAutoPlay();
  }
}

// Development helpers
if (process?.env?.NODE_ENV === 'development') {
  console.log('🔧 Development mode enabled');
  window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', e.error);
  });
}