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
  const carouselSections = document.querySelectorAll('.carousel-section');
  let currentIndex = 0;

  const switchSection = () => {
      // Reset the current progress bar
      const currentSection = carouselSections[currentIndex];
      const progressBar = currentSection.querySelector('#progress');
      progressBar.style.animation = 'none'; // Reset animation
      void progressBar.offsetWidth; // Trigger reflow to restart animation
      progressBar.style.animation = ''; // Restart animation

      // Hide the current section and move to the next
      currentSection.style.display = 'none';
      currentIndex = (currentIndex + 1) % carouselSections.length; // Loop back to the start
      const nextSection = carouselSections[currentIndex];
      nextSection.style.display = 'block';

      // Restart progress bar animation
      const nextProgressBar = nextSection.querySelector('#progress');
      nextProgressBar.style.animation = 'progressBar 5s linear forwards';
  };

  // Initialize the carousel display
  carouselSections.forEach((section, index) => {
      section.style.display = index === 0 ? 'block' : 'none';
  });

  // Set up interval to switch sections
  setInterval(switchSection, 5000); // Matches progress bar animation duration
});
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  const updateCarousel = () => {
      items.forEach((item, index) => {
          item.classList.remove('active', 'left', 'right');
          if (index === currentIndex) {
              item.classList.add('active');
          } else if (index === (currentIndex - 1 + items.length) % items.length) {
              item.classList.add('left');
          } else if (index === (currentIndex + 1) % items.length) {
              item.classList.add('right');
          }
      });
  };

  const moveToNext = () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
  };

  const moveToPrev = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
  };

  // Initial state
  updateCarousel();

  // Auto-move carousel every 5 seconds
  setInterval(moveToNext, 5000);

  // Optional: Event listeners for manual navigation (add buttons for this if needed)
  document.querySelector('.next-btn')?.addEventListener('click', moveToNext);
  document.querySelector('.prev-btn')?.addEventListener('click', moveToPrev);
});







document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for reveal animations
  const sections = document.querySelectorAll('.carousel-header, .carousel-container, .text-reveal');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));

  // Carousel functionality
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  let isAnimating = false;
  let autoPlayInterval;

  function updateCarousel() {
      items.forEach((item, index) => {
          item.classList.remove('active', 'prev', 'next');
          
          if (index === currentIndex) {
              item.classList.add('active');
          } else if (index === (currentIndex - 1 + items.length) % items.length) {
              item.classList.add('prev');
          } else if (index === (currentIndex + 1) % items.length) {
              item.classList.add('next');
          }
      });
  }

  function nextSlide() {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
      setTimeout(() => { isAnimating = false; }, 500); // Match transition duration
  }

  function prevSlide() {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
      setTimeout(() => { isAnimating = false; }, 500); // Match transition duration
  }

  function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
      clearInterval(autoPlayInterval);
  }

  // Initialize carousel
  updateCarousel();
  startAutoPlay();
  
});






// pillars animation

document.addEventListener('DOMContentLoaded', () => {
  // Initialize IntersectionObserver
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view'); // Add the in-view class
          observer.unobserve(entry.target); // Stop observing the element after animation
        }
      });
    },
    { threshold: 0.0 } // Trigger when 20% of the element is visible
  );

  // Select elements to observe
  const pillarsTitle = document.querySelector('.pillars-title');
  const pillars = document.querySelector('.pillars');

  // Observe elements
  if (pillarsTitle){
      observer.observe(pillarsTitle);
  }
  if (pillars) observer.observe(pillars);
});



//slider
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;
let isAnimating = false;

function updateSlider(index) {
    if (isAnimating) return;
    isAnimating = true;

    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === currentIndex) return;
        currentIndex = index;
        updateSlider(currentIndex);
    });
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Touch support
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
});

// Intersection Observer for performance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.backgroundAttachment = 'fixed';
        }
    });
}, { threshold: 0.1 });

slides.forEach(slide => observer.observe(slide));





//testimonials
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevButton = document.getElementById('prev-slide');
  const nextButton = document.getElementById('next-slide');
  let currentIndex = 0;
  const slideDuration = 5000; // 5 seconds

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


document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    let isDragging = false;
    let startX;
    let scrollLeft;
  
    // Mouse handlers for desktop drag-to-scroll
    function handleMouseDown(e) {
      isDragging = true;
      startX = e.pageX - cardContainer.offsetLeft;
      scrollLeft = cardContainer.scrollLeft;
      cardContainer.style.cursor = 'grabbing';
    }
  
    function handleMouseMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - cardContainer.offsetLeft;
      const walk = (x - startX) * 2;
      cardContainer.scrollLeft = scrollLeft - walk;
    }
  
    function handleMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      cardContainer.style.cursor = 'grab';
      snapToNearestCard();
    }
  
    // Snap to nearest card function
    function snapToNearestCard() {
      const cards = Array.from(cardContainer.querySelectorAll('.card'));
      const containerCenter = cardContainer.scrollLeft + (cardContainer.offsetWidth / 2);
      
      let closestCard = null;
      let minDistance = Infinity;
  
      cards.forEach(card => {
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });
  
      if (closestCard) {
        closestCard.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  
    // Event listeners for mouse drag
    cardContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  
    // Cleanup
    window.addEventListener('beforeunload', () => {
      cardContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    });
  });
