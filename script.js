// Execute Redesign Animations
document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Text Splitting for Hero
    if(document.querySelector('.hero-content h1')) {
        splitTextToWords('.hero-content h1');
        
        const heroTl = gsap.timeline();
        heroTl.from('.hero-content h1 .word-inner', {
            y: "110%",
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.2
        })
        .from('.hero-content p', {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out"
        }, "-=0.3")
        .from('.hero-content .btn', {
            y: 20,
            opacity: 0,
            duration: 1.1,
            ease: "power2.out"
        }, "-=0.6")
        .from('.fin-bg-overlay', {
            opacity: 0,
            duration: 2,
            ease: "power1.inOut"
        }, "-=1.5");
    }

    // 2. Animate Counters
    animateCounters();
    // 9. Testimonials Line-by-Line Reveal
    if(document.querySelector('.testimonial-card p')) {
        // Wrap words for line-by-line feel
        splitTextToWords('.testimonial-card p');
        
        gsap.utils.toArray('.testimonial-card').forEach(card => {
            gsap.from(card.querySelectorAll('.word-inner'), {
                scrollTrigger: { trigger: card, start: "top 80%" },
                y: "100%",
                opacity: 0,
                duration: 0.6,
                stagger: 0.02,
                ease: "power2.out"
            });
            gsap.from(card.querySelector('.client-info'), {
                scrollTrigger: { trigger: card, start: "top 80%" },
                y: 20,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power2.out"
            });
        });
    }
    // 8. Expertise / Strategy Connecting Lines
    if(document.querySelector('.strategy-line')) {
        gsap.to('.strategy-line', {
            scrollTrigger: {
                trigger: '.expertise-list',
                start: 'top 70%',
                end: 'bottom 80%',
                scrub: 1
            },
            strokeDashoffset: 0
        });
        
        gsap.to('.strategy-node', {
            scrollTrigger: { trigger: '.expertise-list', start: 'top 70%' },
            scale: 1.5,
            duration: 0.5,
            stagger: 0.3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
        
        // Hover effects
        document.querySelectorAll('.expertise-item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, { x: 10, duration: 0.3, ease: 'power2.out' });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' });
            });
        });
    }
    // 7. Micro-animations for services
    if(document.querySelector('.draw-line-anim')) {
        gsap.utils.toArray('.micro-anim-wrapper').forEach(wrapper => {
            const path = wrapper.querySelector('.draw-line-anim');
            if(path) {
                gsap.to(path, {
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top 80%"
                    },
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        });
    }
    // 6. About Page Timeline Drawing
    if(document.querySelector('.timeline-line-svg line')) {
        const tLine = document.querySelector('.timeline-line-svg line');
        gsap.set(tLine, { strokeDasharray: "1000", strokeDashoffset: "1000" });
        
        gsap.to(tLine, {
            scrollTrigger: {
                trigger: '.milestones-timeline',
                start: 'top 60%',
                end: 'bottom 80%',
                scrub: 1
            },
            strokeDashoffset: 0
        });
    }
    // 5. CTA Graph Animation
    if(document.querySelector('.cta-graph-line')) {
        const ctaPath = document.querySelector('.cta-graph-line');
        const ctaLength = ctaPath.getTotalLength();
        ctaPath.style.strokeDasharray = ctaLength;
        ctaPath.style.strokeDashoffset = ctaLength;
        
        gsap.to('.cta-graph-line', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 80%',
            },
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.out"
        });
    }
    // 4. Smarter Approach Dashboard Animation (Enhanced)
    if(document.querySelector('.revenue-line')) {
        const path = document.querySelector('.revenue-line');
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        const dashTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.dashboard-anim-wrapper',
                start: 'top 80%',
            }
        });

        dashTl.to('.revenue-line', {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power3.inOut"
        })
        .from('.data-node', {
            scale: 0,
            opacity: 0,
            transformOrigin: "center center",
            stagger: 0.3,
            duration: 0.6,
            ease: "back.out(2)"
        }, "-=1.5")
        .from('.dashboard-anim-wrapper div', {
            y: 10,
            opacity: 0,
            stagger: 0.3,
            duration: 0.5,
            ease: "power2.out"
        }, "-=1");

        // Continuous pulse for data nodes
        gsap.to('.data-node', {
            scale: 1.3,
            opacity: 0.7,
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            transformOrigin: "center center",
            ease: "sine.inOut",
            stagger: 0.2,
            delay: 2 // Start after initial reveal
        });
    }
    
    // 3. Magnetic Buttons (Hover effect)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });
});

// --- PREMIUM REDESIGN LOGIC ---

// Page Transition Logic
function clearPageTransition() {
    if (document.body) {
        document.body.classList.remove('page-transitioning');
    }
}

document.addEventListener("DOMContentLoaded", clearPageTransition);
window.addEventListener("pageshow", clearPageTransition);
window.addEventListener("load", clearPageTransition);
clearPageTransition();

// Utility: Split text into words for GSAP
function splitTextToWords(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        const html = el.innerHTML;
        const lines = html.split(/<br\s*\/?>/i);
        el.innerHTML = '';
        lines.forEach((line, index) => {
            const words = line.trim().split(/\s+/);
            words.forEach(word => {
                if(!word) return;
                const wrap = document.createElement('span');
                wrap.className = 'word-wrap';
                const inner = document.createElement('span');
                inner.className = 'word-inner';
                inner.innerHTML = word + '&nbsp;';
                wrap.appendChild(inner);
                el.appendChild(wrap);
            });
            if (index < lines.length - 1) {
                el.appendChild(document.createElement('br'));
            }
        });
        });
}

// Utility: Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isFloat = target % 1 !== 0;
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: "top 90%"
            },
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: isFloat ? 0.1 : 1 },
            onUpdate: function() {
                counter.innerHTML = isFloat ? Number(this.targets()[0].innerHTML).toFixed(1) : Math.round(this.targets()[0].innerHTML);
            }
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Basic sticky header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (scrollPos > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// GSAP ScrollTrigger Animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Text splitting utility for cool text animations
    const splitTextToSpans = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const text = el.innerText;
            // Split by whitespace but keep the whitespace tokens
            const parts = text.split(/(\s+)/);
            
            el.innerHTML = parts.map(part => {
                if (part.trim() === '') {
                    // Handle whitespace and newlines
                    return part.includes('\n') ? '<br>' : part;
                } else {
                    // Wrap the entire word in an inline-block to prevent mid-word breaking
                    const chars = part.split('').map(char => 
                        `<span class="char" style="display:inline-block; opacity:0; transform:translateY(20px);">${char}</span>`
                    ).join('');
                    return `<span style="display:inline-block; white-space: nowrap;">${chars}</span>`;
                }
            }).join('');
        });
    };

    // Apply splitting to main headings
    splitTextToSpans('.smarter-header h2, .compliant-text h2, .insights-header h2, .expertise-header h2, .cta-section h2');

    // Advanced Text Animation for Headings
    gsap.utils.toArray('.smarter-header h2, .compliant-text h2, .insights-header h2, .expertise-header h2, .cta-section h2').forEach(heading => {
        gsap.to(heading.querySelectorAll('.char'), {
            scrollTrigger: { trigger: heading, start: "top 85%" },
            y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.5)"
        });
    });

    // About Section Text
    gsap.from(".about-text h2, .about-text p, .about-text .btn", {
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    });

    // ----------------------------------------------------
    // Right-side Visual Animation (Advanced GSAP)
    // ----------------------------------------------------
    
    // 1. Enter Animation: smooth slide + scale + rotation
    gsap.fromTo(".front-image", 
        { x: 100, opacity: 0, rotationZ: 8, scale: 0.92 },
        { 
            scrollTrigger: { trigger: ".about-section", start: "top 75%" },
            x: 0, opacity: 1, rotationZ: 8, scale: 1, duration: 1.5, ease: "power3.out"
        }
    );
    gsap.fromTo(".image-bg-card", 
        { x: 80, opacity: 0, rotationZ: -2, scale: 0.9 },
        { 
            scrollTrigger: { trigger: ".about-section", start: "top 75%" },
            x: 0, opacity: 1, rotationZ: -10, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.2
        }
    );

    // 2. Continuous Floating Motion (Using yPercent so it stacks perfectly with mouse x/y parallax)
    gsap.to(".front-image", {
        yPercent: -3,
        rotationZ: "-=1.5",
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });

    gsap.to(".image-bg-card", {
        yPercent: 3,
        rotationZ: "+=2",
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });

    // 3. Interactive Mouse Parallax & 3D Tilt
    const aboutWrapper = document.querySelector('.about-image');
    const aboutImage = document.querySelector('.front-image');
    const aboutShape = document.querySelector('.image-bg-card');

    if (aboutWrapper && aboutImage && aboutShape) {
        gsap.set(aboutWrapper, { perspective: 1000 });

        aboutWrapper.addEventListener('mousemove', (e) => {
            const rect = aboutWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Deep parallax for the main image with 3D tilt and dynamic shadow
            gsap.to(aboutImage, {
                x: x * 35,
                y: y * 35,
                rotationX: -y * 12,
                rotationY: x * 12,
                boxShadow: `${-x * 30}px ${-y * 30 + 20}px 40px rgba(0,0,0,0.15)`,
                duration: 0.6,
                ease: "power2.out"
            });

            // Subtle parallax for the background shape (depth effect)
            gsap.to(aboutShape, {
                x: x * 12,
                y: y * 12,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        aboutWrapper.addEventListener('mouseleave', () => {
            gsap.to(aboutImage, {
                x: 0, y: 0, rotationX: 0, rotationY: 0,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                duration: 1.2, ease: "power3.out"
            });
            gsap.to(aboutShape, {
                x: 0, y: 0,
                duration: 1.2, ease: "power3.out"
            });
        });
    }

    // ----------------------------------------------------
    // Hero Scroll Parallax
    // ----------------------------------------------------
    gsap.to(".hero", {
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        backgroundPosition: "50% 100%",
        ease: "none"
    });

    gsap.to(".hero-content p, .hero-content .btn", {
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom center", scrub: true },
        y: -40, opacity: 0, ease: "none"
    });

    // ----------------------------------------------------
    // Stats Section (Premium Animation)
    // ----------------------------------------------------
    
    // 1. Section entrance (smooth fade-up)
    gsap.from(".stats-section", {
        scrollTrigger: { trigger: ".stats-section", start: "top 85%" },
        y: 40, opacity: 0, duration: 1.2, ease: "power2.out"
    });

    // 2. Word-by-word staggered reveal for heading using clip-path effect
    const statsHeading = document.querySelector('.stats-heading');
    if (statsHeading) {
        const text = statsHeading.innerText;
        statsHeading.innerHTML = text.split(' ').map(word => 
            `<span style="display:inline-block; overflow:hidden; vertical-align:top; padding-bottom: 5px;"><span class="word" style="display:inline-block; transform:translateY(110%); opacity: 0;">${word}&nbsp;</span></span>`
        ).join('');

        gsap.to(statsHeading.querySelectorAll('.word'), {
            scrollTrigger: { trigger: ".stats-section", start: "top 75%" },
            y: "0%", opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out"
        });
    }

    // 3. Left image: zoom-out + fade-in
    gsap.fromTo(".stats-main-image", 
        { scale: 1.15, opacity: 0 },
        { 
            scrollTrigger: { trigger: ".stats-section", start: "top 75%" },
            scale: 1, opacity: 1, duration: 1.5, ease: "power3.out"
        }
    );

    // 4. Image interaction: Vertical parallax on scroll
    gsap.to(".stats-main-image", {
        scrollTrigger: { trigger: ".stats-section", start: "top bottom", end: "bottom top", scrub: 1 },
        y: 40, ease: "none"
    });

    // 5. Statistics cards sequentially from right to left (slide-in + fade + scale)
    gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats-section", start: "top 75%" },
        x: 60, scale: 0.9, opacity: 0, 
        duration: 0.8, 
        stagger: { each: 0.15, from: "end" }, // Animates right-to-left
        ease: "back.out(1.2)"
    });

    // 6. Smooth count-up Number Animation
    document.querySelectorAll('.stat-card h4').forEach(el => {
        const text = el.innerText; // e.g., "25+", "5K+"
        const match = text.match(/(\d+)([^\d]*)/); // Extracts numbers and suffixes
        if (match) {
            const endNum = parseInt(match[1]);
            const suffix = match[2] || "";
            
            ScrollTrigger.create({
                trigger: ".stats-section",
                start: "top 75%",
                onEnter: () => {
                    const counter = { val: 0 };
                    gsap.to(counter, {
                        val: endNum, duration: 2, ease: "power2.out",
                        onUpdate: () => {
                            el.innerText = Math.floor(counter.val) + suffix;
                        }
                    });
                },
                once: true
            });
        }
    });

    // 7. Card depth (subtle floating motion) & Hover interactions
    gsap.utils.toArray(".stat-card").forEach((card, i) => {
        // Continuous floating with staggered delays
        gsap.to(card, {
            y: -8, duration: 3 + i * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3
        });

        // Hover scale & shadow (applied carefully via JS so it doesn't conflict with floating transform)
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.03, boxShadow: "0 15px 35px rgba(0,0,0,0.15)", duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, boxShadow: "0 10px 20px rgba(0,0,0,0.05)", duration: 0.3, ease: "power2.out" });
        });
    });
    // ----------------------------------------------------
    // Compliant Section (Premium Layout & Animation)
    // ----------------------------------------------------
    
    // 1. Paragraph word stagger reveal
    const compliantP = document.querySelector('.compliant-text p');
    if (compliantP) {
        const text = compliantP.innerText;
        compliantP.innerHTML = text.split(' ').map(word => 
            `<span style="display:inline-block; overflow:hidden; vertical-align:top; padding-bottom: 2px;"><span class="p-word" style="display:inline-block; transform:translateY(110%); opacity:0;">${word}&nbsp;</span></span>`
        ).join('');

        gsap.to(compliantP.querySelectorAll('.p-word'), {
            scrollTrigger: { trigger: ".compliant-section", start: "top 75%" },
            y: "0%", opacity: 1, duration: 0.6, stagger: 0.015, ease: "power2.out"
        });
    }

    // 2. Magnetic Button Effect
    const magnetBtn = document.querySelector('.compliant-text .btn');
    if (magnetBtn) {
        gsap.from(magnetBtn, {
            scrollTrigger: { trigger: ".compliant-section", start: "top 65%" },
            y: 40, opacity: 0, duration: 0.8, ease: "back.out(1.5)"
        });

        magnetBtn.addEventListener('mousemove', (e) => {
            const rect = magnetBtn.getBoundingClientRect();
            const h = rect.width / 2;
            const w = rect.height / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - w;

            gsap.to(magnetBtn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        magnetBtn.addEventListener('mouseleave', () => {
            gsap.to(magnetBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
    }

    // 3. Premium Image Curtain Reveal & Parallax
    const compliantImgWrapper = document.querySelector('.compliant-image-wrapper');
    if (compliantImgWrapper) {
        gsap.set(".compliant-image-wrapper", { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".team-image", { scale: 1.3 });

        const compliantImgTl = gsap.timeline({
            scrollTrigger: { trigger: ".compliant-image-wrapper", start: "top 80%" }
        });
        
        compliantImgTl.to(".compliant-image-wrapper", {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut"
        })
        .to(".team-image", {
            scale: 1,
            duration: 1.8,
            ease: "power3.out"
        }, "-=1.2");

        gsap.to(".team-image", {
            scrollTrigger: { trigger: ".compliant-image-wrapper", start: "top bottom", end: "bottom top", scrub: 1 },
            y: 50,
            ease: "none"
        });
    }
    // ----------------------------------------------------
    // Enhanced Smarter Approach Section
    // ----------------------------------------------------
    gsap.from(".smarter-header p", {
        scrollTrigger: { trigger: ".smarter-section", start: "top 75%" },
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    });

    // 1. Entrance animation for service cards (Staggered scale, fade and slide up)
    gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 75%" },
        y: 60, scale: 0.95, opacity: 0, duration: 1, stagger: 0.15, ease: "back.out(1.2)"
    });

    // 2. Icon fade and slight slide on scroll (safe entry)
    gsap.from(".service-icon", {
        scrollTrigger: { trigger: ".services-grid", start: "top 75%" },
        y: -15, opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out", delay: 0.2
    });

    // 3. Magnetic Hover Effect & Parallax for the Service Cards
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to center of card
            const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
            
            gsap.to(card, {
                x: x,
                y: y,
                duration: 0.4,
                ease: "power2.out"
            });
            
            if(icon) {
                gsap.to(icon, {
                    x: x * 1.5,
                    y: y * 1.5,
                    rotation: x * 0.5,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            if(icon) {
                gsap.to(icon, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            }
        });
    });

        // ----------------------------------------------------
    // Insights Section Enhanced Animations
    // ----------------------------------------------------
    if (document.querySelector(".insights-grid")) {
        gsap.from(".insight-card", {
            scrollTrigger: { trigger: ".insights-grid", start: "top 85%", once: true },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all"
        });
    }

    // ----------------------------------------------------
    // Expertise Section Enhanced Animations
    // ----------------------------------------------------
    
    // Animate the Explore services button
    gsap.from(".expertise-header .btn", {
        scrollTrigger: { trigger: ".expertise-header", start: "top 80%" },
        x: 30, opacity: 0, duration: 1, ease: "back.out(1.5)"
    });

    // Iterate over each expertise row to animate them sequentially
    gsap.utils.toArray(".expertise-row").forEach((row, index) => {
        // Animate the list items (slide in and fade)
        const items = row.querySelectorAll(".expertise-item");
        gsap.from(items, {
            scrollTrigger: { trigger: row, start: "top 75%" },
            x: index % 2 === 0 ? -50 : 50, // Alternate entry direction
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Animate icons fading and sliding in (avoiding scale to prevent CSS conflict)
        const icons = row.querySelectorAll(".expertise-icon");
        gsap.from(icons, {
            scrollTrigger: { trigger: row, start: "top 75%" },
            x: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.2,
            ease: "power2.out"
        });

        // Premium mask reveal for images with subtle parallax
        const imgWrapper = row.querySelector(".expertise-image-wrapper");
        const img = row.querySelector(".expertise-image-wrapper img");
        
        if(imgWrapper && img) {
            // Set initial clipped state
            gsap.set(imgWrapper, { clipPath: "inset(100% 0% 0% 0% round 24px)" });
            
            // Unmask wrapper
            gsap.to(imgWrapper, {
                scrollTrigger: { trigger: row, start: "top 70%" },
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                duration: 1.2,
                ease: "power4.inOut"
            });
            
            // Image scale down alongside unmask
            gsap.from(img, {
                scrollTrigger: { trigger: row, start: "top 70%" },
                scale: 1.2,
                duration: 1.5,
                ease: "power3.out"
            });
            
            // Subtle scroll parallax
            gsap.to(img, {
                scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
                y: 30,
                ease: "none"
            });
        }
    });



    // ----------------------------------------------------
    // CTA Section Background Parallax & Reveal
    // ----------------------------------------------------
    
    // Background scroll parallax
    gsap.to(".cta-section", {
        scrollTrigger: { trigger: ".cta-section", start: "top bottom", end: "bottom top", scrub: true },
        backgroundPosition: "50% 100%",
        ease: "none"
    });

    // Content reveal
    gsap.from(".cta-container p", {
        scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
        y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out"
    });

    gsap.from(".cta-container .btn-cta", {
        scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
        y: 30, opacity: 0, duration: 1, delay: 0.4, ease: "back.out(1.5)"
    });

    // ----------------------------------------------------
    // Footer Section Animations
    // ----------------------------------------------------
    
    const footerTl = gsap.timeline({
        scrollTrigger: { trigger: ".footer-section", start: "top 85%" }
    });

    // Fade in the columns sequentially
    footerTl.from(".footer-col", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Stagger links
    footerTl.from(".links-col ul li", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.4");

    // Fade in the bottom footer strip
    footerTl.from(".footer-bottom", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.2");

    // About Page specific animations
    if(document.querySelector('.about-hero-section')) {
        const aboutHeroTl = gsap.timeline();
        
        aboutHeroTl.from('.about-hero-card', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from('.about-hero-content h1', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from('.about-hero-content p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from('.btn-who-we-are', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.4");
    }

    // Milestones Page Specific Animations
    if(document.querySelector('.milestones-section')) {
                const collageTl = gsap.timeline({
            scrollTrigger: { trigger: '.milestones-collage', start: 'top 75%' }
        });
        collageTl.from('.collage-left', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' })
                 .from('.collage-right', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
                 .from('.collage-center', { y: 60, opacity: 0, scale: 0.95, duration: 1.2, ease: 'power4.out' }, "-=0.6");

                gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 85%' },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // Powering & Track Record Sections
    if(document.querySelector('.powering-section')) {
        gsap.from('.powering-header h2', {
            scrollTrigger: { trigger: '.powering-section', start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out'
        });
        
        gsap.from('.powering-header p', {
            scrollTrigger: { trigger: '.powering-section', start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out'
        });

                gsap.from('.powering-left, .powering-right-top, .powering-right-bottom', {
            scrollTrigger: { trigger: '.powering-collage', start: 'top 75%' },
            y: 50, scale: 0.95, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
        });

        gsap.from('.track-record-content', {
            scrollTrigger: { trigger: '.track-record-section', start: 'top 60%' },
            x: -50, opacity: 0, duration: 1, ease: 'power3.out'
        });

        gsap.from('.track-record-image', {
            scrollTrigger: { trigger: '.track-record-section', start: 'top 60%' },
            x: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });
        
        gsap.from('.stat-item', {
            scrollTrigger: { trigger: '.track-stats', start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)'
        });
    }

        gsap.from('.why-image-wrapper', {
            scrollTrigger: { trigger: '.why-choose-us-section', start: 'top 70%' },
            x: -50, opacity: 0, duration: 1, ease: 'power3.out'
        });

        gsap.from('.feature-card', {
            scrollTrigger: { trigger: '.why-choose-us-section', start: 'top 60%' },
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)'
        });

        gsap.from('.team-header-content', {
            scrollTrigger: { trigger: '.team-section', start: 'top 75%' },
            x: -50, opacity: 0, duration: 1, ease: 'power3.out'
        });

        gsap.from('.btn-learn-more', {
            scrollTrigger: { trigger: '.team-section', start: 'top 75%' },
            x: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });

        gsap.from('.team-card', {
            scrollTrigger: { trigger: '.team-grid', start: 'top 75%' },
            y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)'
        });
        // Added content-related animation for the feature icons
        gsap.from('.feature-card svg', {
            scrollTrigger: { trigger: '.why-choose-us-section', start: 'top 60%' },
            scale: 0, rotation: -45, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: 'back.out(1.5)'
        });

    // Services Page specific animations
    if(document.querySelector('.services-hero-section')) {
        const servicesHeroTl = gsap.timeline();
        
        servicesHeroTl.from('.services-hero-wrapper', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from('.services-hero-content h1', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from('.services-hero-content p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .from('.hero-stats-widget', {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.4")
        .from('.hero-client-widget', {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.6");
    }

    // Detailed Services Animations
    if(document.querySelector('.detailed-services-section')) {
        const serviceRows = document.querySelectorAll('.service-row');
        
        serviceRows.forEach((row, index) => {
            const content = row.querySelector('.service-content');
            const imageGroup = row.querySelector('.service-image-group');
            const isReverse = row.classList.contains('reverse');
            
            // Content slides from left or right
            gsap.from(content, {
                scrollTrigger: { trigger: row, start: 'top 75%' },
                x: isReverse ? 50 : -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            // Image slides from opposite side
            gsap.from(imageGroup, {
                scrollTrigger: { trigger: row, start: 'top 75%' },
                x: isReverse ? -50 : 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            // Tags pop in
            gsap.from(row.querySelectorAll('.service-tags span'), {
                scrollTrigger: { trigger: row, start: 'top 75%' },
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.3,
                ease: 'back.out(1.5)'
            });
        });
    }

    // Who We Are Masonry Section Animations
    if(document.querySelector('.who-we-are-section')) {
        gsap.from('.who-we-are-section h2', {
            scrollTrigger: { trigger: '.who-we-are-section', start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out'
        });

        // Animate left column cards
        gsap.from('.left-col .who-card', {
            scrollTrigger: { trigger: '.left-col', start: 'top 75%' },
            y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)'
        });

        // Animate right column cards
        gsap.from('.right-col .who-card', {
            scrollTrigger: { trigger: '.right-col', start: 'top 75%' },
            y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)'
        });
    }

        // Insights Staggered Section Animations
    if(document.querySelector('.insights-staggered-grid')) {
        gsap.from('.insights-section h2', {
            scrollTrigger: { trigger: '.insights-section', start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out'
        });

        gsap.from('.stagger-col', {
            scrollTrigger: { trigger: '.insights-staggered-grid', start: 'top 75%' },
            y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
        });
    }

    // Success Stories Animations
    if(document.querySelector('.success-stories-section')) {
        gsap.from('.success-stories-header', {
            scrollTrigger: { trigger: '.success-stories-section', start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out'
        });

        gsap.from('.testimonials-grid', { scrollTrigger: { trigger: '.testimonials-grid', start: 'top 75%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    }

    // Blog Page Hero Animations
    if(document.querySelector('.blog-hero-section')) {
        const blogHeroTl = gsap.timeline();
        
        blogHeroTl.from('.blog-hero-wrapper', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from('.learn-more-wrapper', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(2)"
        }, "-=0.6")
        .from('.blog-hero-content h1', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .from('.blog-hero-content p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");
    }

    // Popular Blogs Section Animations
    if(document.querySelector('.popular-blogs-section')) {
        gsap.from('.popular-blogs-section h2', {
            scrollTrigger: { trigger: '.popular-blogs-section', start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out'
        });

        // Animate grid as a whole container to prevent any CSS transform conflict on inner cards
        gsap.from('.popular-blogs-grid', {
            scrollTrigger: { trigger: '.popular-blogs-grid', start: 'top 75%' },
            y: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });
    }

    // Blog CTA Animations
    if(document.querySelector('.blog-cta-section')) {
        const ctaTl = gsap.timeline({
            scrollTrigger: { trigger: '.blog-cta-section', start: 'top 80%' }
        });
        
        ctaTl.from('.blog-cta-section h2', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' })
             .from('.blog-cta-section p', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.5")
             .from('.btn-outline-white', { y: 20, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, "-=0.5");
    }
}

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const overlay = document.querySelector('.mobile-overlay');

    if (!toggleBtn || !navContainer) return;

    function toggleMenu(forceClose = false) {
        const isOpen = navContainer.classList.contains('mobile-open');
        const willOpen = forceClose ? false : !isOpen;

        if (willOpen) {
            navContainer.classList.add('mobile-open');
            toggleBtn.classList.add('is-active');
            if (overlay) overlay.classList.add('active');
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');
        } else {
            navContainer.classList.remove('mobile-open');
            toggleBtn.classList.remove('is-active');
            if (overlay) overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    if (overlay) {
        overlay.addEventListener('click', () => toggleMenu(true));
    }
    
    document.addEventListener('click', (e) => {
        if(navContainer.classList.contains('mobile-open') && !navContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleMenu(true);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navContainer.classList.contains('mobile-open')) {
            toggleMenu(true);
        }
    });

    const navLinks = navContainer.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(true);
        });
    });

    // About Section Redesign Animations
    if(document.querySelector('.about-redesign')) {
        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-redesign',
                start: "top 75%",
            }
        });
        
        aboutTl.from('.section-badge', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        })
        .from('.about-title', {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.2")
        .from('.about-desc', {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.4")
        .from('.about-features li', {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.3")
        .from('.about-cta-wrapper', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2")
        .from('.image-wrapper-main', {
            x: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        }, "-=1.2")
        .from('.image-decoration-box', {
            scale: 0.8,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.2)"
        }, "-=0.6")
        .from('.floating-badge', {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "back.out(1.5)"
        }, "-=0.4");
        
        // Continuous floating for badge
        gsap.to('.floating-badge', {
            y: -10,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1
        });
        
        // Parallax background elements
        gsap.to('.circle-blur', {
            scrollTrigger: { trigger: '.about-redesign', scrub: 1 },
            y: 100,
            x: 50
        });
        gsap.to('.dots-pattern', {
            scrollTrigger: { trigger: '.about-redesign', scrub: 1 },
            y: -80,
            rotation: 15
        });
    }

    // Expertise Interactive Items
    const expertiseItems = document.querySelectorAll('.interactive-item');
    const expertiseImg = document.getElementById('expertise-interactive-img');
    
    if (expertiseItems.length > 0 && expertiseImg) {
        expertiseItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all
                expertiseItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked
                this.classList.add('active');
                
                // Get the new image source
                const newImgSrc = this.getAttribute('data-img');
                
                // Animate image out
                gsap.to(expertiseImg, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.3,
                    onComplete: () => {
                        // Change source
                        expertiseImg.src = newImgSrc;
                        
                        // Animate image in
                        gsap.to(expertiseImg, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                });
            });
        });
    }

    // Expertise Interactive Items - Row 2
    const expertiseItems2 = document.querySelectorAll('.interactive-item-2');
    const expertiseImg2 = document.getElementById('expertise-interactive-img-2');
    
    if (expertiseItems2.length > 0 && expertiseImg2) {
        expertiseItems2.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all
                expertiseItems2.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked
                this.classList.add('active');
                
                // Get the new image source
                const newImgSrc = this.getAttribute('data-img');
                
                // Animate image out
                gsap.to(expertiseImg2, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.3,
                    onComplete: () => {
                        // Change source
                        expertiseImg2.src = newImgSrc;
                        
                        // Animate image in
                        gsap.to(expertiseImg2, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                });
            });
        });
    }
});

// =========================================================================
// FOOTER NEWSLETTER JAVASCRIPT VALIDATION (REPLACES NATIVE VALIDATION)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.setAttribute('novalidate', 'true');
        
        const input = form.querySelector('input');
        const btn = form.querySelector('button');
        
        // Find or create error element
        let errorEl = form.parentElement.querySelector('.newsletter-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'newsletter-error';
            form.after(errorEl);
        }
        
        function validateEmail(value) {
            const trimmed = value.trim();
            if (!trimmed) {
                return { valid: false, message: 'Email address is required.' };
            }
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(trimmed)) {
                return { valid: false, message: 'Please enter a valid email address.' };
            }
            return { valid: true };
        }
        
        function showError(msg) {
            errorEl.textContent = msg;
            errorEl.classList.add('visible');
            form.classList.add('input-error');
        }
        
        function clearError() {
            errorEl.textContent = '';
            errorEl.classList.remove('visible');
            form.classList.remove('input-error');
        }
        
        if (input) {
            input.addEventListener('input', () => {
                if (form.classList.contains('input-error')) {
                    const result = validateEmail(input.value);
                    if (result.valid) {
                        clearError();
                    }
                }
            });
        }
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = input ? input.value : '';
            const result = validateEmail(val);
            
            if (!result.valid) {
                showError(result.message);
                if (input) input.focus();
            } else {
                clearError();
                if (btn) {
                    btn.textContent = 'Submitted!';
                    btn.style.background = '#5e7438';
                    btn.disabled = true;
                }
                setTimeout(() => {
                    window.location.href = '404.html';
                }, 600);
            }
        });
    });
});

