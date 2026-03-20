// Active nav link — highlight based on current page filename
(function () {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var map = {
        'about.html': 'nav-about',
        'programs.html': 'nav-programs',
        'resources.html': 'nav-resources',
        'book.html': 'nav-book'
    };
    var id = map[page];
    if (id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('active');
    }
})();

// Mobile nav toggle
function toggleNav() {
    document.getElementById('navWrap').classList.toggle('open');
}

// Book page — session selector
function selectSession(el) {
    document.querySelectorAll('.session-opt').forEach(function (o) { o.classList.remove('selected'); });
    el.classList.add('selected');
}

// Book page — form submit
function submitForm() {
    var btn = document.querySelector('.btn-book');
    if (!btn) return;
    btn.textContent = ' Request Sent! I\'ll be in touch within 24 hours.';
    btn.style.background = '#7a9e7e';
    btn.disabled = true;
}

// Scroll-triggered reveal
function initReveal() {
    var els = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
}

document.addEventListener('DOMContentLoaded', initReveal);

// Carousel (About page gallery)
window.addEventListener('load', function () {
    var cur = 0;
    var track = document.getElementById('carouselTrack');
    if (!track) return;
    var slides = track.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');
    var counter = document.getElementById('carouselCurrent');
    var total = slides.length;
    var timer = null;

    function goTo(n) {
        cur = ((n % total) + total) % total;
        track.style.transform = 'translateX(-' + (cur * 100) + '%)';
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === cur);
        }
        if (counter) counter.textContent = cur + 1;
    }

    window.goTo = goTo;
    window.carouselNext = function () { goTo(cur + 1); resetTimer(); };
    window.carouselPrev = function () { goTo(cur - 1); resetTimer(); };

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(function () { goTo(cur + 1); }, 4000);
    }

    // Touch swipe
    var tx = 0;
    track.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 50) { dx < 0 ? window.carouselNext() : window.carouselPrev(); }
    }, { passive: true });

    track.addEventListener('mouseenter', function () { clearInterval(timer); });
    track.addEventListener('mouseleave', function () { resetTimer(); });

    goTo(0);
    resetTimer();
});
