// Axedia Website JavaScript

// Demo Audio Player
function playDemoAudio() {
    const audio = document.getElementById('demo-audio');
    const btn = document.getElementById('demo-audio-btn');
    const playIcon = btn.querySelector('.play-icon');
    const pauseIcon = btn.querySelector('.pause-icon');
    const btnText = btn.querySelector('span');

    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        btnText.textContent = 'Pause Demo';
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        btnText.textContent = 'Hear a Demo';
    }

    // Reset button when audio ends
    audio.onended = function() {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        btnText.textContent = 'Hear a Demo';
    };
}

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

    // =====================================================
    // CALENDAR BOOKING POPUP
    // =====================================================
    const calendarOverlay = document.getElementById('calendarOverlay');
    const calendarClose = document.getElementById('calendarClose');
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const timeSlotsEl = document.getElementById('timeSlots');
    const userTimezoneEl = document.getElementById('userTimezone');

    // Steps
    const stepDate = document.getElementById('stepDate');
    const stepForm = document.getElementById('stepForm');
    const stepConfirm = document.getElementById('stepConfirm');
    const backToDateBtn = document.getElementById('backToDate');
    const bookingForm = document.getElementById('bookingForm');
    const closeConfirmationBtn = document.getElementById('closeConfirmation');

    // Display elements
    const selectedDateEl = document.getElementById('selectedDate');
    const selectedTimeEl = document.getElementById('selectedTime');
    const confirmDateEl = document.getElementById('confirmDate');
    const confirmTimeEl = document.getElementById('confirmTime');
    const confirmEmailEl = document.getElementById('confirmEmail');

    // Calendar state
    let currentDate = new Date();
    let selectedDay = null;
    let selectedTime = null;

    // Available time slots (9 AM - 5 PM, 30-min intervals)
    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
    ];

    // Detect user timezone
    function getUserTimezone() {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const abbr = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
            return `${tz.replace(/_/g, ' ')} (${abbr})`;
        } catch (e) {
            return 'Eastern Time (ET)';
        }
    }

    // Open calendar popup
    function openCalendar() {
        if (calendarOverlay) {
            calendarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCalendar();
            if (userTimezoneEl) {
                userTimezoneEl.textContent = getUserTimezone();
            }
        }
    }

    // Close calendar popup
    function closeCalendar() {
        if (calendarOverlay) {
            calendarOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Reset state
            resetCalendar();
        }
    }

    // Reset calendar state
    function resetCalendar() {
        selectedDay = null;
        selectedTime = null;
        currentDate = new Date();
        if (stepDate) stepDate.classList.remove('hidden');
        if (stepForm) stepForm.classList.add('hidden');
        if (stepConfirm) stepConfirm.classList.add('hidden');
        if (timeSlotsEl) {
            timeSlotsEl.innerHTML = '<p class="time-slots-empty">Select a date to see available times</p>';
        }
        if (bookingForm) bookingForm.reset();
    }

    // Render calendar
    function renderCalendar() {
        if (!calendarDays || !currentMonthEl) return;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;

        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Today's date for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Clear and render days
        calendarDays.innerHTML = '';

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayEl = document.createElement('button');
            dayEl.className = 'calendar-day other-month disabled';
            dayEl.textContent = daysInPrevMonth - i;
            dayEl.disabled = true;
            calendarDays.appendChild(dayEl);
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('button');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const dateToCheck = new Date(year, month, day);
            dateToCheck.setHours(0, 0, 0, 0);

            // Check if past date or weekend
            const dayOfWeek = dateToCheck.getDay();
            const isPast = dateToCheck < today;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isToday = dateToCheck.getTime() === today.getTime();

            if (isPast || isWeekend) {
                dayEl.classList.add('disabled');
                dayEl.disabled = true;
            } else {
                dayEl.addEventListener('click', () => selectDay(day, month, year));
            }

            if (isToday) {
                dayEl.classList.add('today');
            }

            if (selectedDay && selectedDay.day === day && selectedDay.month === month && selectedDay.year === year) {
                dayEl.classList.add('selected');
            }

            calendarDays.appendChild(dayEl);
        }

        // Next month days to fill grid
        const totalCells = calendarDays.children.length;
        const remaining = 42 - totalCells; // 6 rows × 7 days
        for (let i = 1; i <= remaining && totalCells + i <= 42; i++) {
            const dayEl = document.createElement('button');
            dayEl.className = 'calendar-day other-month disabled';
            dayEl.textContent = i;
            dayEl.disabled = true;
            calendarDays.appendChild(dayEl);
        }

        // Update navigation buttons
        const prevMonth = new Date(year, month - 1, 1);
        if (prevMonthBtn) {
            prevMonthBtn.disabled = prevMonth < new Date(today.getFullYear(), today.getMonth(), 1);
        }
    }

    // Select a day
    function selectDay(day, month, year) {
        selectedDay = { day, month, year };
        selectedTime = null;
        renderCalendar();
        renderTimeSlots();
    }

    // Render time slots
    function renderTimeSlots() {
        if (!timeSlotsEl || !selectedDay) return;

        timeSlotsEl.innerHTML = '';

        // Simulate some slots being unavailable (random for demo)
        const unavailable = new Set([
            timeSlots[Math.floor(Math.random() * timeSlots.length)],
            timeSlots[Math.floor(Math.random() * timeSlots.length)]
        ]);

        timeSlots.forEach(time => {
            if (unavailable.has(time)) return; // Skip unavailable

            const slotEl = document.createElement('button');
            slotEl.className = 'time-slot';
            slotEl.textContent = time;

            if (selectedTime === time) {
                slotEl.classList.add('selected');
            }

            slotEl.addEventListener('click', () => selectTime(time));
            timeSlotsEl.appendChild(slotEl);
        });
    }

    // Select a time
    function selectTime(time) {
        selectedTime = time;

        // Update UI
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.toggle('selected', slot.textContent === time);
        });

        // Proceed to form
        setTimeout(() => {
            goToForm();
        }, 300);
    }

    // Go to form step
    function goToForm() {
        if (!selectedDay || !selectedTime) return;

        // Format selected date
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(selectedDay.year, selectedDay.month, selectedDay.day);
        const dayName = dayNames[date.getDay()];
        const monthName = monthNames[selectedDay.month];

        const dateStr = `${dayName}, ${monthName} ${selectedDay.day}, ${selectedDay.year}`;

        // Calculate end time (30 min later)
        const [hourMin, period] = selectedTime.split(' ');
        const [hour, min] = hourMin.split(':').map(Number);
        let endHour = hour;
        let endMin = min + 30;
        let endPeriod = period;

        if (endMin >= 60) {
            endMin = endMin - 60;
            endHour = endHour + 1;
            if (endHour === 12 && period === 'AM') endPeriod = 'PM';
            if (endHour > 12) endHour = endHour - 12;
        }

        const timeStr = `${selectedTime} - ${endHour}:${endMin.toString().padStart(2, '0')} ${endPeriod} ${getUserTimezone().split('(')[1]?.replace(')', '') || 'ET'}`;

        // Update display
        if (selectedDateEl) selectedDateEl.textContent = dateStr;
        if (selectedTimeEl) selectedTimeEl.textContent = timeStr;

        // Show form
        if (stepDate) stepDate.classList.add('hidden');
        if (stepForm) stepForm.classList.remove('hidden');
    }

    // Go back to date selection
    function goToDate() {
        if (stepForm) stepForm.classList.add('hidden');
        if (stepDate) stepDate.classList.remove('hidden');
    }

    // Handle form submission
    function handleBookingSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const company = formData.get('company');
        const message = formData.get('message');

        // Here you would typically send this to your backend/email service
        // For now, we'll simulate a successful booking

        const submitBtn = document.getElementById('submitBooking');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Booking...</span>';
        }

        // Simulate API call
        setTimeout(() => {
            // Update confirmation display
            if (confirmDateEl) confirmDateEl.textContent = selectedDateEl?.textContent || '';
            if (confirmTimeEl) confirmTimeEl.textContent = selectedTimeEl?.textContent || '';
            if (confirmEmailEl) confirmEmailEl.textContent = email;

            // Show confirmation
            if (stepForm) stepForm.classList.add('hidden');
            if (stepConfirm) stepConfirm.classList.remove('hidden');

            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span>Confirm Booking</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                `;
            }

            // Log booking data (in production, send to backend)
            console.log('Booking submitted:', {
                date: selectedDateEl?.textContent,
                time: selectedTimeEl?.textContent,
                name,
                email,
                phone,
                company,
                message
            });
        }, 1000);
    }

    // Event listeners
    if (calendarClose) {
        calendarClose.addEventListener('click', closeCalendar);
    }

    if (calendarOverlay) {
        calendarOverlay.addEventListener('click', (e) => {
            if (e.target === calendarOverlay) {
                closeCalendar();
            }
        });
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    if (backToDateBtn) {
        backToDateBtn.addEventListener('click', goToDate);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    if (closeConfirmationBtn) {
        closeConfirmationBtn.addEventListener('click', closeCalendar);
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && calendarOverlay?.classList.contains('active')) {
            closeCalendar();
        }
    });

    // Expose openCalendar globally for button clicks
    window.openBookingCalendar = openCalendar;

    console.log('Axedia website initialized successfully!');
});
