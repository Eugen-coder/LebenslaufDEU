document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn, .nav-logo, #back-to-top');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hamburger menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    
    if (navToggle && navList) {
        const navIcon = navToggle.querySelector('i');
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('is-active');
            if (navIcon) {
                if (navList.classList.contains('is-active')) {
                    navIcon.classList.remove('bx-menu');
                    navIcon.classList.add('bx-x');
                } else {
                    navIcon.classList.remove('bx-x');
                    navIcon.classList.add('bx-menu');
                }
            }
        });

        // Close menu when a link is clicked
        const mobileNavLinks = navList.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('is-active')) {
                    navList.classList.remove('is-active');
                    if (navIcon) {
                        navIcon.classList.remove('bx-x');
                        navIcon.classList.add('bx-menu');
                    }
                }
            });
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if (backToTopButton) {
                if (getComputedStyle(backToTopButton).display === 'none') {
                    backToTopButton.style.display = 'flex';
                }
            }
        } else {
            if (backToTopButton) backToTopButton.style.display = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                
                // Animate progress bars
                if (entry.target.classList.contains('skill-card')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        if(targetWidth) {
                            bar.style.width = targetWidth;
                        }
                    });
                }

                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});