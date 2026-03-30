// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Form submissions
    const earlyAccessForm = document.getElementById('earlyAccessForm');
    const ctaForm = document.getElementById('ctaForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');

    // Handle early access form
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSubmit(this, 'early access');
        });
    }

    // Handle CTA form
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSubmit(this, 'waitlist');
        });
    }

    // Handle form submission
    function handleSubmit(form, type) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Joining...';
        button.disabled = true;
        
        // Simulate API call (replace with actual implementation)
        setTimeout(() => {
            // Store email in localStorage for demo purposes
            const signups = JSON.parse(localStorage.getItem('bytechat_signups') || '[]');
            signups.push({
                email: email,
                type: type,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('bytechat_signups', JSON.stringify(signups));
            
            // Reset form
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
            
            // Show success modal
            showModal();
            
            // Log for demo
            console.log(`New ${type} signup:`, email);
        }, 1500);
    }

    // Modal functions
    function showModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking X
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and other elements
    const animateElements = document.querySelectorAll('.feature-card, .value-point, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Dynamic typing effect for hero section (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.innerHTML = text.slice(0, index + 1);
                index++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (hero && heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add real-time email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                this.title = 'Please enter a valid email address';
            } else {
                this.style.borderColor = '';
                this.title = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }
        });
    });

    // Track page view for analytics (placeholder)
    console.log('ByteChat landing page loaded');
    
    // Add some demo data for stats
    updateDemoStats();
});

// Update demo stats dynamically
function updateDemoStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const targets = ['1,247', '89', '24/7'];
    
    statNumbers.forEach((stat, index) => {
        if (index < targets.length) {
            animateNumber(stat, targets[index]);
        }
    });
}

// Animate numbers
function animateNumber(element, target) {
    const isNumeric = /^\d+$/.test(target.replace(/,/g, ''));
    
    if (isNumeric) {
        const num = parseInt(target.replace(/,/g, ''));
        let current = 0;
        const increment = num / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                current = num;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 30);
    } else {
        element.textContent = target;
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Add touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    const interactiveElements = document.querySelectorAll('button, a, .feature-card');
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        el.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    });
}

// Performance optimization - lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add error handling for form submissions
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
