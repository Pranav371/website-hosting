document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navOptions = document.getElementById("nav-options");
  const servicesLink = document.querySelector(".services-link");

  // Toggle mobile menu
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    navOptions.classList.toggle("show"); // Changed from .active to .show
    console.log(
      "Hamburger clicked, nav-options classes:",
      navOptions.classList
    ); // Debug line
  });

  // Handle dropdown toggle for both mobile and desktop
  servicesLink.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    if (window.innerWidth <= 768) {
      const hasDropdown = this.closest(".has-dropdown");
      hasDropdown.classList.toggle("active");
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navOptions.contains(e.target) && e.target !== hamburger) {
      navOptions.classList.remove("show"); // Changed from .active to .show
      document.querySelector(".has-dropdown").classList.remove("active");
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navOptions.classList.remove("show"); // Changed from .active to .show
      document.querySelector(".has-dropdown").classList.remove("active");
    }
  });
});

var lastScrollTop = 0;

navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-100px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  let currentSlide = 0;

  function updateSlides() {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
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
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateSlides();
    });
  });

  // Optional: Auto-play
  // setInterval(nextSlide, 5000);
});


//customer insights carousel 
const sections = document.querySelectorAll(".section");
let currentSection = 0;
const autoPlayInterval = 5000;

function activateSection(index) {
  sections.forEach((section) => {
    const content = section.querySelector(".section-content");
    section.classList.remove("active");
    content.style.maxHeight = "0";
  });

  const activeSection = sections[index];
  const content = activeSection.querySelector(".section-content");
  activeSection.classList.add("active");
  
  // Calculate needed height dynamically
  const contentHeight = content.scrollHeight + "px";
  content.style.maxHeight = contentHeight;
  
  // Smooth scroll handling
  // const containerTop = document.querySelector('.container1').offsetTop;
  // const currentScroll = window.pageYOffset;
  // if (currentScroll > containerTop) {
  //   window.scrollTo({
  //     top: containerTop,
  //     behavior: 'smooth'
  //   });
  // }
}

sections.forEach((section, index) => {
  section.querySelector(".section-header").addEventListener("click", () => {
    activateSection(index);
  });
});

setInterval(() => {
  currentSection = (currentSection + 1) % sections.length;
  activateSection(currentSection);
}, autoPlayInterval);
  
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    currentSection = (currentSection + 1) % sections.length;
    activateSection(currentSection);
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    currentSection = (currentSection - 1 + sections.length) % sections.length;
    activateSection(currentSection);
  }
});



// case studies animation

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  let touchStartX = 0;
  let touchStartY = 0;
  let touchScrollLeft = 0;
  let isDragging = false;
  let lastDragTime = 0;
  let dragVelocity = 0;

  // Add smooth scroll behavior to container
  cardContainer.style.scrollBehavior = 'smooth';
  cardContainer.style.overscrollBehavior = 'contain';

  // Check if device supports touch
  const isTouchDevice = 'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  // Mouse drag handlers with improved physics
  function handleMouseDown(e) {
    isDragging = true;
    touchStartX = e.clientX;
    touchScrollLeft = cardContainer.scrollLeft;
    cardContainer.style.cursor = 'grabbing';
    lastDragTime = Date.now();
    dragVelocity = 0;
    
    // Stop any ongoing smooth scroll
    cardContainer.style.scrollBehavior = 'auto';
    e.preventDefault();
  }

  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    cardContainer.style.cursor = 'grab';
    
    // Apply momentum scrolling
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastDragTime;
    if (timeElapsed < 50 && Math.abs(dragVelocity) > 0.5) {
      const momentum = dragVelocity * 50;
      cardContainer.style.scrollBehavior = 'smooth';
      cardContainer.scrollLeft += momentum;
    }
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentX = e.clientX;
    const dx = touchStartX - currentX;
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastDragTime;
    
    if (timeElapsed > 0) {
      dragVelocity = dx / timeElapsed;
    }
    
    cardContainer.scrollLeft = touchScrollLeft + dx;
    lastDragTime = currentTime;
    touchStartX = currentX;
    touchScrollLeft = cardContainer.scrollLeft;
  }

  // Enhanced touch handlers with improved sensitivity
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].pageY;
    touchScrollLeft = cardContainer.scrollLeft;
    lastDragTime = Date.now();
    dragVelocity = 0;
    
    // Stop any ongoing smooth scroll
    cardContainer.style.scrollBehavior = 'auto';
  }

  function handleTouchMove(e) {
    if (!isTouchDevice) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].pageY;
    
    // Calculate both X and Y difference
    const dx = touchStartX - touchX;
    const dy = Math.abs(touchStartY - touchY);
    
    // Only scroll horizontally if horizontal scroll is more significant
    if (Math.abs(dx) > dy) {
      e.preventDefault();
      
      const currentTime = Date.now();
      const timeElapsed = currentTime - lastDragTime;
      
      if (timeElapsed > 0) {
        dragVelocity = dx / timeElapsed;
      }
      
      cardContainer.scrollLeft = touchScrollLeft + dx;
      lastDragTime = currentTime;
      touchStartX = touchX;
      touchScrollLeft = cardContainer.scrollLeft;
    }
  }

  function handleTouchEnd() {
    // Apply momentum scrolling on touch end
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastDragTime;
    
    if (timeElapsed < 50 && Math.abs(dragVelocity) > 0.5) {
      const momentum = dragVelocity * 50;
      cardContainer.style.scrollBehavior = 'smooth';
      cardContainer.scrollLeft += momentum;
    }
  }

  // Initialize
  function init() {
    // Add CSS for smoother scrolling
    cardContainer.style.cssText = `
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    `;

    if (isTouchDevice) {
      cardContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
      cardContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      cardContainer.addEventListener('touchend', handleTouchEnd);
    } else {
      cardContainer.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('selectstart', (e) => isDragging && e.preventDefault());
    }
  }

  // Cleanup
  function cleanup() {
    if (isTouchDevice) {
      cardContainer.removeEventListener('touchstart', handleTouchStart);
      cardContainer.removeEventListener('touchmove', handleTouchMove);
      cardContainer.removeEventListener('touchend', handleTouchEnd);
    } else {
      cardContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleDragMove);
    }
  }

  init();
  window.addEventListener('unload', cleanup);
});
