// Axedia Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');

            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');

            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="mobile-menu-content">
                        <a href="#testimonials">Testimonials</a>
                        <a href="#about">About</a>
                        <a href="#why-us">Why Us</a>
                        <a href="#methodology">Process</a>
                        <a href="#live-transfer">Live Transfers</a>
                        <a href="#faq">FAQ</a>
                        <div class="mobile-menu-actions">
                            <a href="#pilot" class="btn btn-primary">Book a Strategy Call</a>
                        </div>
                    </div>
                `;
                document.querySelector('.navbar').appendChild(mobileMenu);

                // Add mobile menu styles dynamically
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(8, 7, 28, 0.98);
                        backdrop-filter: blur(20px);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 24px;
                        transform: translateY(-10px);
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                    }
                    .mobile-menu.active {
                        transform: translateY(0);
                        opacity: 1;
                        visibility: visible;
                    }
                    .mobile-menu-content {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                    }
                    .mobile-menu-content a {
                        color: rgba(255, 255, 255, 0.7);
                        text-decoration: none;
                        font-size: 1rem;
                        padding: 8px 0;
                        transition: color 0.2s;
                    }
                    .mobile-menu-content a:hover {
                        color: #00ffff;
                    }
                    .mobile-menu-actions {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        margin-top: 16px;
                        padding-top: 16px;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -6px);
                    }
                `;
                document.head.appendChild(style);
            }

            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(8, 7, 28, 0.95)';
        } else {
            navbar.style.background = 'rgba(8, 7, 28, 0.8)';
        }

        lastScroll = currentScroll;
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll('.feature-card, .methodology-card, .use-case-card, .testimonial-card');

    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const visibleStyle = document.createElement('style');
    visibleStyle.textContent = `
        .feature-card.visible,
        .methodology-card.visible,
        .use-case-card.visible,
        .testimonial-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(visibleStyle);

    // Timeline/Methodology scroll animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the track line first
                const track = entry.target.querySelector('.timeline-track');
                if (track) {
                    track.classList.add('visible');
                }

                // Then animate each phase with staggered delay
                const phases = entry.target.querySelectorAll('.timeline-phase');
                phases.forEach((phase, index) => {
                    setTimeout(() => {
                        phase.classList.add('visible');
                    }, index * 200);
                });

                // Stop observing after animation
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timelineObserver.observe(timeline);
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-value');

    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;

                // Skip if already animated or not a numeric value
                if (target.dataset.animated) return;
                target.dataset.animated = true;

                // Check if it's a numeric value that can be animated
                const match = value.match(/^\$?([\d.]+)([M+%]*)/);
                if (match && match[1]) {
                    const num = parseFloat(match[1]);
                    const prefix = value.startsWith('$') ? '$' : '';
                    const suffix = match[2] || '';
                    const duration = 2000;
                    const steps = 60;
                    const stepValue = num / steps;
                    let current = 0;

                    const counter = setInterval(() => {
                        current += stepValue;
                        if (current >= num) {
                            target.textContent = value;
                            clearInterval(counter);
                        } else {
                            target.textContent = prefix + Math.floor(current) + suffix;
                        }
                    }, duration / steps);
                }
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    stats.forEach(stat => statsObserver.observe(stat));

    // Button hover effects
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Parallax effect for hero glow
    const heroGlow = document.querySelector('.hero-glow');

    if (heroGlow) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;

            heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

    // =====================================================
    // SCROLL TO TOP BUTTON WITH PROGRESS INDICATOR
    // =====================================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        const progressCircle = scrollToTopBtn.querySelector('.progress-ring-circle');
        const circumference = 2 * Math.PI * 22; // r=22 for 50px button

        if (progressCircle) {
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;
        }

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;

            // Show/hide button
            if (scrollTop > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }

            // Update progress ring
            if (progressCircle) {
                const offset = circumference - (scrollPercent * circumference);
                progressCircle.style.strokeDashoffset = offset;
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =====================================================
    // MOBILE STICKY CTA BAR
    // =====================================================
    const mobileCta = document.getElementById('mobileCta');

    if (mobileCta) {
        let lastScrollTop = 0;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Show after scrolling past hero section
            if (scrollTop > heroHeight && window.innerWidth <= 768) {
                // Hide when scrolling down quickly, show when scrolling up or slow scroll
                if (scrollTop > lastScrollTop + 10) {
                    mobileCta.classList.remove('visible');
                } else {
                    mobileCta.classList.add('visible');
                }
            } else {
                mobileCta.classList.remove('visible');
            }

            lastScrollTop = scrollTop;
        });
    }

    // =====================================================
    // COOKIE CONSENT BANNER
    // =====================================================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');

    if (cookieBanner) {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('axedia_cookie_consent');

        if (!cookieConsent) {
            // Show banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 1500);
        }

        if (acceptCookies) {
            acceptCookies.addEventListener('click', function() {
                localStorage.setItem('axedia_cookie_consent', 'accepted');
                cookieBanner.classList.remove('visible');
                // Here you would initialize analytics, etc.
            });
        }

        if (declineCookies) {
            declineCookies.addEventListener('click', function() {
                localStorage.setItem('axedia_cookie_consent', 'declined');
                cookieBanner.classList.remove('visible');
            });
        }
    }

    // =====================================================
    // SCROLL-TRIGGERED ANIMATIONS
    // =====================================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .stagger-children');

    if (animatedElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally stop observing after animation
                    // animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    // =====================================================
    // LAZY LOADING FOR IMAGES
    // =====================================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    // Add fade-in effect for lazy loaded images
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // =====================================================
    // PRELOAD CRITICAL RESOURCES
    // =====================================================
    // Preload fonts and critical images after page load
    window.addEventListener('load', function() {
        // Add font-display: swap support check
        if ('fonts' in document) {
            document.fonts.ready.then(function() {
                document.body.classList.add('fonts-loaded');
            });
        }
    });

    console.log('Axedia website initialized successfully!');
});
