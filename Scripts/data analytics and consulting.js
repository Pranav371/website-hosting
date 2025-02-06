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










//carousel


document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Event Listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlides();
        });
    });

    // Optional: Auto-play
    // setInterval(nextSlide, 5000);
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

