document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navOptions = document.getElementById('nav-options');
  const servicesLink = document.querySelector('.services-link');

  // Toggle mobile menu
  hamburger.addEventListener('click', function(e) {
      e.stopPropagation();  // Prevent event bubbling
      navOptions.classList.toggle('show');  // Changed from .active to .show
      console.log('Hamburger clicked, nav-options classes:', navOptions.classList);  // Debug line
  });

  // Handle dropdown toggle for both mobile and desktop
  servicesLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();  // Prevent event bubbling
      
      if (window.innerWidth <= 768) {
          const hasDropdown = this.closest('.has-dropdown');
          hasDropdown.classList.toggle('active');
      }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
      if (!navOptions.contains(e.target) && e.target !== hamburger) {
          navOptions.classList.remove('show');  // Changed from .active to .show
          document.querySelector('.has-dropdown').classList.remove('active');
      }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
          navOptions.classList.remove('show');  // Changed from .active to .show
          document.querySelector('.has-dropdown').classList.remove('active');
      }
  });
});


let lastScrollTop = 0;
    let isScrolling = false;
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navOptions = document.getElementById('nav-options');

    function throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    window.addEventListener('scroll', throttle(function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;

        if (Math.abs(scrollDelta) < 10) return;

        if (isScrolling) {
            clearTimeout(isScrolling);
        }

        if (scrollDelta > 0 && scrollTop > 80) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;

        isScrolling = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }, 100));








document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentIndex = 0;
    const slideDuration = 10000; // 5 seconds
  
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };
  
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };
  
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };
  
    // Automatically cycle slides
    setInterval(nextSlide, slideDuration);
  
    // Attach event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  
    // Show the first slide
    showSlide(currentIndex);
  });
  