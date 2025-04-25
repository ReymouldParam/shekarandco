// header
const menuToggle = document.getElementById('menu-toggle');
const navWrapper = document.getElementById('nav-wrapper');

menuToggle.addEventListener('click', function () {
    navWrapper.classList.toggle('show-nav');
    menuToggle.classList.toggle('active');
});



// Navbar highlight on scroll
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav a');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Remove the 'active' class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Add the 'active' class to the clicked nav item
            e.target.classList.add('active');
        });
    });
});



// SECTION1
// GSAP Animation
window.addEventListener('load', () => {
    console.log("Running GSAP...");

    const tl = gsap.timeline({
        defaults: {
            ease: "slow(0.7, 0.7, false)", // ultra smooth ease
            duration: 1.5                  // baseline slower animation
        }
    });

    tl.from(".left-section", {
        clipPath: "inset(0% 100% 0% 0%)", // reveals from left to right
        opacity: 0,
        duration: 2.5,                    // ⏳ slower duration
        ease: "slow(0.7, 0.7, false)"     // 🧈 ultra-smooth easing
    })
        .from(".middle-section", {
            opacity: 0,
            scale: 0.85,
            duration: 1.8
        }, "-=1")
        .from(".right-section .business-card", {
            y: 80,
            opacity: 0,
            scale: 0.92,
            duration: 1.6
        }, "-=1")
        .from(".download-btn", {
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 1.5
        }, "-=1")
    // .from(".stats-section", {
    //     y: 80,
    //     opacity: 0,
    //     scale: 0.85,   // ✅ Add scale-up effect
    //     duration: 1.5
    // }, "-=1")
    // .from(".stat-item", {
    //     y: 50,
    //     opacity: 0,
    //     scale: 0.90,
    //     stagger: {
    //         each: 0.9,
    //         from: "center"
    //     },
    //     duration: 2
    // }, "-=1.2");
});
// === Numbers count-up ===
function animateCountUp(element, target, duration = 4000) { // ⏳ slower animation
    let start = 0;
    const increment = target / (duration / 16); // approx. 60fps
    const plusSign = element.textContent.includes('+') ? '+' : '';

    const updateCounter = () => {
        start += increment;
        if (start >= target) {
            element.textContent = target + plusSign;
        } else {
            element.textContent = Math.floor(start) + plusSign;
            requestAnimationFrame(updateCounter);
        }
    };

    updateCounter();
}

function startStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-number');
    statItems.forEach((item) => {
        const rawText = item.textContent.replace('+', '');
        const target = parseInt(rawText);
        animateCountUp(item, target, 4000); // ✅ slowed to 4 seconds
    });
}

// ABOUT SECTION ANIMATION
window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",  // When top of section hits 80% of viewport
            toggleActions: "play none none none", // Play only once
        },
        defaults: {
            ease: "power3.out"
        }
    });

    // Animate image container
    aboutTimeline.from(".about-images", {
        x: -100,
        opacity: 0,
        scale: 0.9,
        rotateY: 10,
        duration: 1.5
    });

    // Staggered image reveal
    aboutTimeline.from(".about-images img", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        stagger: {
            each: 0.15,
            from: "start"
        },
        duration: 1
    }, "-=1");

    // Animate text content
    aboutTimeline.from(".about-content", {
        x: 100,
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 1.5
    }, "-=1.2");
});


// === Observer to trigger only when stats-section is visible ===
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startStatsAnimation();
            obs.unobserve(entry.target); // Run only once
        }
    });
}, {
    threshold: 0.5 // Adjust for earlier/later trigger
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// WHY CHOOSE US ANIMATION
const cards = document.querySelectorAll(".card");
let currentIndex = 0;

function arrangeStack() {
    cards.forEach((card, i) => {
        const indexFromTop = (i - currentIndex + cards.length) % cards.length;

        if (indexFromTop === 0) {
            // Top visible card
            gsap.set(card, {
                x: 0,
                scale: 1,
                opacity: 1,
                zIndex: cards.length,
                pointerEvents: "auto"
            });
        } else if (indexFromTop < 5) {
            // Stacked cards behind
            gsap.set(card, {
                x: -indexFromTop * 22,
                scale: 1 - indexFromTop * 0.02,
                opacity: 0.7 - indexFromTop * 0.1,
                zIndex: cards.length - indexFromTop,
                rotateX: -7 * indexFromTop, // <--- upward tilt
                transformOrigin: "center bottom", // pivot from bottom
                pointerEvents: "none"
            });
        } else {
            // Hide rest
            gsap.set(card, {
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none"
            });
        }
    });
}

function animateTopCardOut() {
    const currentCard = cards[currentIndex];
    gsap.to(currentCard, {
        x: 800,
        y: 100, // Move up slightly for angled effect
        rotation: 10, // Tilt the card a bit
        opacity: 0,
        duration: 2.8,
        ease: "power3.inOut",
        onComplete: () => {
            // Reset card to original position off-screen and invisible
            gsap.set(currentCard, { x: 0, y: 0, rotation: 0, opacity: 0 });
            currentIndex = (currentIndex + 1) % cards.length;
            arrangeStack(); // Rearrange stack with updated index
        }
    });
}


window.addEventListener("DOMContentLoaded", () => {
    arrangeStack();

    setInterval(() => {
        // Delay the exit animation to give time for reading
        setTimeout(() => {
            animateTopCardOut();
        }, 4500); // 2.5 seconds delay before exit animation starts
    }, 6000); // total cycle: 2.5s read time + 3.5s animation
});

// BOOK Animation
document.addEventListener("DOMContentLoaded", () => {
    const groupedServices = [
        {
            containerId: "flipbook1",
            pages: [
                {
                    title: "Audit & Assurance",
                    image: "./assets/images/management.svg",
                    items: ["Statutory Audit", "Internal Audit", "Tax Audit", "Management Audits"]
                },
                {
                    title: "Income Tax",
                    image: "./assets/images/management.svg",
                    items: ["Tax Planning", "Return Filing", "Assessment Help", "TDS Compliance"]
                },

            ]
        },
        {
            containerId: "flipbook2",
            pages: [
                {
                    title: "Goods & Services Tax (GST)",
                    image: "./assets/images/management.svg",
                    items: ["GST Registration", "Monthly Filing", "GST Audit", "Compliance Review"]
                },
                {
                    title: "Corporate Services",
                    image: "./assets/images/management.svg",
                    items: ["Company Formation", "ROC Filings", "Annual Compliance", "Secretarial Services"]
                }
            ]
        },
        {
            containerId: "flipbook3",
            pages: [
                {
                    title: "Tax Services",
                    image: "./assets/images/management.svg",
                    items: ["GST Registration", "Monthly Filing", "GST Audit", "Compliance Review"]
                },
                {
                    title: "Accounting Services",
                    image: "./assets/images/management.svg",
                    items: ["Company Formation", "ROC Filings", "Annual Compliance", "Secretarial Services"]
                }
            ]
        },
        {
            containerId: "flipbook4",
            pages: [
                {
                    title: "Professional Services",
                    image: "./assets/images/management.svg",
                    items: ["GST Registration", "Monthly Filing", "GST Audit", "Compliance Review"]
                },
                {
                    title: "Corporate Services",
                    image: "./assets/images/management.svg",
                    items: ["Company Formation", "ROC Filings", "Annual Compliance", "Secretarial Services"]
                }
            ]
        }
    ];

    const pageFlips = [];

    // Initialize books
    groupedServices.forEach(({ containerId, pages }) => {
        const container = document.getElementById(containerId);

        pages.forEach(service => {
            const page = document.createElement("div");
            page.classList.add("page");
            page.innerHTML = `
                <img src="${service.image}" alt="Brochure Image" class="brochure-image">
                <h3>${service.title}</h3>
                <ul>${service.items.map(item => `<li>${item}</li>`).join("")}</ul>
                <button class="know-more">Know More</button>
            `;
            container.appendChild(page);
        });

        const pageFlip = new St.PageFlip(container, {
            width: 300,
            height: 400,
            size: "fixed",
            showCover: false,
            mobileScrollSupport: false,

            // Smooth, elegant flipping
            flippingTime: 6000,
            flipDirection: 'top-right',

            // THICK SHADOW EFFECT
            maxShadowOpacity: 1,         // Very bold shadow
            shadowColor: '#000000',         // Pure black for depth
            shadowBlur: 45,                 // Soft & smooth edge spread
            shadowOffset: 22,               // Deeper shadow offset

            // Enhanced 3D and immersive look
            perspective: 2500,              // Stronger 3D page bend
            pageDepth: 4,                   // Make page feel thick & real

            // Visual Enhancements
            showPageCorners: true,
            useHardwareAcceleration: true,
            transformStyle: 'preserve-3d',
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Luxury feel
            drawShadow: true,

        });

        pageFlip.loadFromHTML(container.querySelectorAll(".page"));
        pageFlips.push(pageFlip);

        // 🔥 Open page with an angled look on initial load
        setTimeout(() => {
            pageFlip.flip(4);
        }, 500);
    });

    // Flip all books together every few seconds
    let currentPage = 0;
    const totalPages = groupedServices[0].pages.length;

    setInterval(() => {
        currentPage = (currentPage + 1) % totalPages;

        pageFlips.forEach(flip => {
            flip.flip(currentPage);
        });
    }, 8000);
});

// TESTIMONIALS SECTION ANIMATION
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".testimonial-card");
    const wrapper = document.querySelector(".testimonial-cards");
    const cardHeight = 220; // match the height of testimonial-wrapper
    const totalCards = cards.length;

    let index = 0;

    function scrollToNextCard() {
        gsap.to(wrapper, {
            y: -(cardHeight * index),
            duration: 0.8,
            ease: "power2.inOut",
        });

        index = (index + 1) % totalCards;
    }

    // Initial reset
    gsap.set(wrapper, { y: 0 });

    // Scroll every 5 seconds
    setInterval(scrollToNextCard, 5000);
});
// BROCHUIRE DOWNLOAD FUNCTIONALITY
function downloadBrochure() {
    const link = document.createElement("a");
    link.href = encodeURI("/assets/images/shaekar-and-co-Brochure.pdf"); // Use forward slashes
    link.download = "Shekar-and-Co Brochure.pdf"; // Desired downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//  ***************************** ABOUT PAGR ANIMATION *****************************
// section-2
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".section-about",
    start: "top 80%",
    once: true,
    onEnter: () => {
        // Animate image box from left
        gsap.from("#founder-image", {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        // Animate text content from right with stagger
        gsap.from(".text-content > *", {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
        });
    }
});

// section-3
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".section-container",
    start: "top 80%",
    once: true,
    onEnter: () => {
        gsap.from(".left-content", {
            x: -100,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out"
        });

        gsap.from(".right-cards > div", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
        });
    }
});