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
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;
  let animationFrameId = null;
  let prevX = 0;
  let velocity = 0;
  let lastTimestamp = 0;

  // Remove default smooth scroll behavior to implement custom physics
  cardContainer.style.scrollBehavior = 'auto';
  
  // Optimize performance with transform
  cardContainer.style.willChange = 'transform';
  
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateScroll(timestamp) {
    if (!isDragging && Math.abs(velocity) > 0.1) {
      // Apply deceleration
      velocity *= 0.95;
      
      // Update scroll position with velocity
      cardContainer.scrollLeft += velocity;

      // Continue animation
      animationFrameId = requestAnimationFrame(updateScroll);
    } else {
      velocity = 0;
      cancelAnimationFrame(animationFrameId);
    }
  }

  function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    scrollLeft = cardContainer.scrollLeft;
    prevX = startX;
    lastTimestamp = Date.now();
    velocity = 0;

    // Cancel any ongoing animation
    cancelAnimationFrame(animationFrameId);

    cardContainer.style.cursor = 'grabbing';
    cardContainer.style.userSelect = 'none';
  }

  function handleDragMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const dx = currentX - prevX;
    const timestamp = Date.now();
    const dt = timestamp - lastTimestamp;

    if (dt > 0) {
      // Calculate velocity (pixels per millisecond)
      velocity = dx / dt * 16; // Scale for 60fps
    }

    // Update scroll position with direct manipulation
    cardContainer.scrollLeft = cardContainer.scrollLeft - dx;

    prevX = currentX;
    lastTimestamp = timestamp;
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cardContainer.style.cursor = 'grab';
    cardContainer.style.userSelect = '';

    // Start deceleration animation
    if (Math.abs(velocity) > 0.1) {
      animationFrameId = requestAnimationFrame(updateScroll);
    }
  }

  // Intersection Observer to optimize off-screen elements
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('card')) {
          entry.target.style.willChange = entry.isIntersecting ? 'transform' : 'auto';
        }
      });
    },
    { root: cardContainer, threshold: 0.1 }
  );

  // Observe all cards
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });

  function init() {
    // Apply optimized styles
    cardContainer.style.cssText = `
      overflow-x: auto;
      cursor: grab;
      -webkit-overflow-scrolling: touch;
      overflow-y: hidden;
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
    `;

    // Mouse events
    cardContainer.addEventListener('mousedown', handleDragStart, { passive: false });
    window.addEventListener('mousemove', handleDragMove, { passive: false });
    window.addEventListener('mouseup', handleDragEnd);

    // Touch events
    cardContainer.addEventListener('touchstart', handleDragStart, { passive: false });
    cardContainer.addEventListener('touchmove', handleDragMove, { passive: false });
    cardContainer.addEventListener('touchend', handleDragEnd);

    // Prevent click events during drag
    cardContainer.addEventListener('click', (e) => {
      if (Math.abs(velocity) > 0.1) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  function cleanup() {
    cancelAnimationFrame(animationFrameId);
    observer.disconnect();
    
    cardContainer.removeEventListener('mousedown', handleDragStart);
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
    
    cardContainer.removeEventListener('touchstart', handleDragStart);
    cardContainer.removeEventListener('touchmove', handleDragMove);
    cardContainer.removeEventListener('touchend', handleDragEnd);
  }

  init();
  window.addEventListener('unload', cleanup);
});