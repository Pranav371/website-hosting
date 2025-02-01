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


document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const customPointer = document.getElementById('customPointer');
    let isHovering = false;
    let autoScrollInterval;
    let touchStartX = 0;
    let touchScrollLeft = 0;
    let isDragging = false;
  
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      navigator.msMaxTouchPoints > 0;
  
    // Custom pointer handling
    function updatePointerPosition(e) {
      if (isTouchDevice) return;
      
      const x = e.clientX;
      const y = e.clientY;
      customPointer.style.left = `${x}px`;
      customPointer.style.top = `${y}px`;
    }
  
    function showPointer() {
      if (isTouchDevice) return;
      customPointer.style.opacity = '1';
      cardContainer.classList.add('active');
    }
  
    function hidePointer() {
      if (isTouchDevice) return;
      customPointer.style.opacity = '0';
      cardContainer.classList.remove('active');
      customPointer.classList.remove('dragging');
    }
  
    function updatePointerState(isDragging) {
      if (isTouchDevice) return;
      customPointer.classList.toggle('dragging', isDragging);
      customPointer.textContent = isDragging ? 'Release' : 'Drag';
    }
  
    // Mouse event handlers
    function handleMouseEnter(e) {
      if (isTouchDevice) return;
      isHovering = true;
      showPointer();
      updatePointerPosition(e);
    }
  
    function handleMouseLeave() {
      if (isTouchDevice) return;
      isHovering = false;
      hidePointer();
      clearInterval(autoScrollInterval);
    }
  
    function handleMouseMove(e) {
      if (isTouchDevice) return;
      updatePointerPosition(e);
  
      if (!isHovering) return;
  
      const rect = cardContainer.getBoundingClientRect();
      const containerWidth = rect.width;
      const mouseX = e.clientX - rect.left;
      const scrollWidth = cardContainer.scrollWidth - containerWidth;
      
      const deadZone = containerWidth * 0.2;
      
      if (mouseX < deadZone || mouseX > containerWidth - deadZone) {
        const center = containerWidth / 2;
        const distance = mouseX - center;
        const maxSpeed = 3;
        
        const speed = (distance / center) * maxSpeed;
        
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          const newScrollLeft = cardContainer.scrollLeft + speed;
          if (newScrollLeft >= 0 && newScrollLeft <= scrollWidth) {
            cardContainer.scrollLeft = newScrollLeft;
          }
        }, 16);
      } else {
        clearInterval(autoScrollInterval);
      }
    }
  
    // Mouse drag handlers
    function handleMouseDown(e) {
      if (isTouchDevice) return;
      isDragging = true;
      touchStartX = e.clientX;
      touchScrollLeft = cardContainer.scrollLeft;
      updatePointerState(true);
      cardContainer.style.cursor = 'grabbing';
    }
  
    function handleMouseUp() {
      if (isTouchDevice) return;
      isDragging = false;
      updatePointerState(false);
      cardContainer.style.cursor = 'none';
    }
  
    function handleDragMove(e) {
      if (!isDragging || isTouchDevice) return;
      const dx = e.clientX - touchStartX;
      cardContainer.scrollLeft = touchScrollLeft - dx;
    }
  
    // Touch handlers
    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      touchScrollLeft = cardContainer.scrollLeft;
    }
  
    function handleTouchMove(e) {
      if (!isTouchDevice) return;
      const touchX = e.touches[0].clientX;
      const touchDiff = touchStartX - touchX;
      cardContainer.scrollLeft = touchScrollLeft + touchDiff;
    }
  
    // Initialize
    function init() {
      if (isTouchDevice) {
        cardContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        cardContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      } else {
        cardContainer.addEventListener('mouseenter', handleMouseEnter);
        cardContainer.addEventListener('mouseleave', handleMouseLeave);
        cardContainer.addEventListener('mousemove', handleMouseMove);
        cardContainer.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleDragMove);
      }
    }
  
    // Cleanup
    function cleanup() {
      clearInterval(autoScrollInterval);
      if (isTouchDevice) {
        cardContainer.removeEventListener('touchstart', handleTouchStart);
        cardContainer.removeEventListener('touchmove', handleTouchMove);
      } else {
        cardContainer.removeEventListener('mouseenter', handleMouseEnter);
        cardContainer.removeEventListener('mouseleave', handleMouseLeave);
        cardContainer.removeEventListener('mousemove', handleMouseMove);
        cardContainer.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleDragMove);
      }
    }
  
    init();
    window.addEventListener('unload', cleanup);
  });