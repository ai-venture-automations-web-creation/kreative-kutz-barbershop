/* =============================================
   Kreative Kutz Barbershop — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Sticky Navbar ----
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Mobile Menu ----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function () {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // ---- Scroll Animations ----
    var animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                // Stagger delay for grid children
                var parent = entry.target.parentElement;
                var siblings = parent ? parent.querySelectorAll('.slide-up, .fade-in') : [];
                var idx = Array.prototype.indexOf.call(siblings, entry.target);
                var delay = idx > 0 ? idx * 100 : 0;

                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });

    // ---- Active Nav Link on Scroll ----
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ---- Gallery Lightbox ----
    var galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var img = item.querySelector('img');
            if (!img) return;

            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 0.3s ease;padding:20px;';

            var lightboxImg = document.createElement('img');
            lightboxImg.src = img.src.replace('w=600', 'w=1200').replace('h=600', 'h=1200');
            lightboxImg.alt = img.alt;
            lightboxImg.style.cssText = 'max-width:90%;max-height:90vh;object-fit:contain;border-radius:8px;transform:scale(0.9);transition:transform 0.3s ease;';

            overlay.appendChild(lightboxImg);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(function () {
                overlay.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            });

            function closeLightbox() {
                overlay.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(function () {
                    overlay.remove();
                    document.body.style.overflow = '';
                }, 300);
            }

            overlay.addEventListener('click', closeLightbox);

            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
