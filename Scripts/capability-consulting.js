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



//   expertise animation 

  document.addEventListener('DOMContentLoaded', function() {
    const tickerContainer = document.querySelector('.ticker-container');
    const textCard = document.querySelector('.our-expertise-text-card');
    
    // Clone items for smooth infinite scroll
    const items = document.querySelectorAll('.headline-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        textCard.appendChild(clone);
    });
  
    // Pause animation on hover
    tickerContainer.addEventListener('mouseenter', () => {
        textCard.style.animationPlayState = 'paused';
    });
  
    tickerContainer.addEventListener('mouseleave', () => {
        textCard.style.animationPlayState = 'running';
    });
  
    // Handle visibility change to prevent animation issues
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            textCard.style.animationPlayState = 'paused';
        } else {
            textCard.style.animationPlayState = 'running';
        }
    });
  });
  
  
  

  function selectCard(selectedCard) {
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.card-info');
        cards.forEach(card => {
            card.classList.remove('selected-info');
        });
        selectedCard.classList.add('selected-info');
    }
}







// carousel example


document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.showcase-slide');
  const indicators = document.querySelectorAll('.nav-indicator');
  const prevBtns = document.querySelectorAll('.carousel-control.prev');
  const nextBtns = document.querySelectorAll('.carousel-control.next');
  let currentSlide = 0;
  let isTransitioning = false;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateSlides(index) {
      if (isTransitioning) return;
      isTransitioning = true;

      slides.forEach(slide => {
          slide.style.transform = index > currentSlide ? 
              'translateX(50px)' : 'translateX(-50px)';
          slide.style.opacity = '0';
          slide.classList.remove('active');
      });
      indicators.forEach(indicator => indicator.classList.remove('active'));

      // Update carousel controls
      prevBtns.forEach(btn => btn.disabled = index === 0);
      nextBtns.forEach(btn => btn.disabled = index === slides.length - 1);

      setTimeout(() => {
          slides[index].style.transform = 'translateX(0)';
          slides[index].style.opacity = '1';
          slides[index].classList.add('active');
          indicators[index].classList.add('active');
          currentSlide = index;
          
          setTimeout(() => {
              isTransitioning = false;
          }, 600);
      }, 300);
  }

  function goToNextSlide() {
      if (currentSlide < slides.length - 1) {
          updateSlides(currentSlide + 1);
      }
  }

  function goToPrevSlide() {
      if (currentSlide > 0) {
          updateSlides(currentSlide - 1);
      }
  }

  // Indicator navigation
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          if (currentSlide !== index) {
              updateSlides(index);
          }
      });
  });

  // Carousel controls
  prevBtns.forEach(btn => {
      btn.addEventListener('click', goToPrevSlide);
  });

  nextBtns.forEach(btn => {
      btn.addEventListener('click', goToNextSlide);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
          goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
          goToNextSlide();
      }
  });

  // Touch navigation
  document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, false);

  function handleSwipe() {
      const swipeThreshold = 50;
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) > swipeThreshold) {
          if (swipeDistance > 0) {
              goToPrevSlide();
          } else {
              goToNextSlide();
          }
      }
  }

  // Handle visibility change (tab switching)
  document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
          isTransitioning = false;
      }
  });
});



// case studies animation 
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


