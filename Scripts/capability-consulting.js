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

  var lastScrollTop = 0;

  navbar = document.getElementById('navbar');
  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
    if (scrollTop > lastScrollTop){
      navbar.style.top = "-100px";
    }
  
    else{
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });


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
  let touchStartX = 0;
  let touchStartY = 0;
  let touchScrollLeft = 0;
  let isDragging = false;
  let animationFrameId = null;
  let velocity = 0;
  const samples = [];
  const maxSamples = 3;

  // Configuration
  const friction = 0.96;
  const minVelocity = 0.01;
  const snapThreshold = 15;

  // Add CSS for optimized scrolling
  cardContainer.style.cssText = `
    overflow-x: auto;
    cursor: grab;
    user-select: none;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  `;




  // Touch handlers
  function handleTouchStart(e) {
    cancelAnimation();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchScrollLeft = cardContainer.scrollLeft;
    samples.length = 0;
  }

  function handleTouchMove(e) {
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = Math.abs(touch.clientY - touchStartY);

    if (Math.abs(dx) > dy) {
      e.preventDefault();
      cardContainer.scrollLeft = touchScrollLeft - dx;
      updateVelocity(-dx, Date.now());
    }
  }

  function handleTouchEnd() {
    startInertia();
  }

  // Mouse handlers
  function handleMouseDown(e) {
    cancelAnimation();
    isDragging = true;
    touchStartX = e.clientX;
    touchScrollLeft = cardContainer.scrollLeft;
    cardContainer.style.cursor = 'grabbing';
    samples.length = 0;
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - touchStartX;
    cardContainer.scrollLeft = touchScrollLeft - dx;
    updateVelocity(-dx, Date.now());
  }

  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    cardContainer.style.cursor = 'grab';
    startInertia();
  }

  // Physics-based inertia
  function updateVelocity(dx, timestamp) {
    samples.push({ dx, timestamp });
    if (samples.length > maxSamples) samples.shift();
    
    if (samples.length > 1) {
      const oldest = samples[0];
      const newest = samples[samples.length - 1];
      const timeDiff = newest.timestamp - oldest.timestamp;
      velocity = (newest.dx - oldest.dx) / timeDiff;
    }
  }

  function startInertia() {
    cancelAnimation();
    let currentVelocity = velocity;
    let lastTime = Date.now();

    function animate() {
      if (Math.abs(currentVelocity) < minVelocity) return;

      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      const deltaScroll = currentVelocity * deltaTime;
      cardContainer.scrollLeft += deltaScroll;
      
      currentVelocity *= friction;
      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function cancelAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Event listeners
  cardContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  cardContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
  cardContainer.addEventListener('touchend', handleTouchEnd);
  cardContainer.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  // Cleanup
  window.addEventListener('beforeunload', () => {
    cardContainer.removeEventListener('touchstart', handleTouchStart);
    cardContainer.removeEventListener('touchmove', handleTouchMove);
    cardContainer.removeEventListener('touchend', handleTouchEnd);
    cardContainer.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });
});


