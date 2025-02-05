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


// var lastScrollTop = 0;

// navbar = document.getElementById('navbar');
// window.addEventListener('scroll',function(){
//   var scrollTop = window.pageYOffset || document.documentElement.scrollTop

//   if (scrollTop > lastScrollTop){
//     navbar.style.top = "-100px";
//   }

//   else{
//     navbar.style.top = "0";
//   }
//   lastScrollTop = scrollTop;
// });


let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
let ticking = false; // Prevents excessive function calls

window.addEventListener('scroll', function () {
  if (!ticking) {
    requestAnimationFrame(() => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        navbar.style.top = "-100px"; // Hide navbar
      } else {
        navbar.style.top = "0"; // Show navbar
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      ticking = false;
    });

    ticking = true;
  }
});





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

  // // Touch support
  // let touchStartX = 0;
  // let touchEndX = 0;
  // let touchStartY = 0;
  // let touchEndY = 0;

  // const track = document.querySelector('.carousel-track');

  // track.addEventListener('touchstart', e => {
  //     stopAutoPlay();
  //     touchStartX = e.changedTouches[0].screenX;
  //     touchStartY = e.changedTouches[0].screenY;
  // }, { passive: true });

  // track.addEventListener('touchend', e => {
  //     touchEndX = e.changedTouches[0].screenX;
  //     touchEndY = e.changedTouches[0].screenY;

  //     // Calculate horizontal and vertical distance
  //     const deltaX = touchEndX - touchStartX;
  //     const deltaY = touchEndY - touchStartY;

  //     // Only handle horizontal swipes if they're more horizontal than vertical
  //     if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //         if (deltaX > 50) {
  //             prevSlide();
  //         } else if (deltaX < -50) {
  //             nextSlide();
  //         }
  //     }

  //     startAutoPlay();
  // }, { passive: true });

  // // Mouse support
  // track.addEventListener('mouseenter', stopAutoPlay);
  // track.addEventListener('mouseleave', startAutoPlay);

  // // Keyboard support
  // document.addEventListener('keydown', (e) => {
  //     if (e.key === 'ArrowLeft') {
  //         stopAutoPlay();
  //         prevSlide();
  //         startAutoPlay();
  //     } else if (e.key === 'ArrowRight') {
  //         stopAutoPlay();
  //         nextSlide();
  //         startAutoPlay();
  //     }
  // });

  // // Handle visibility change
  // document.addEventListener('visibilitychange', () => {
  //     if (document.hidden) {
  //         stopAutoPlay();
  //     } else {
  //         startAutoPlay();
  //     }
  // });

  // Button navigation (optional - add these buttons in HTML if needed)
  
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









// let carousel = document.querySelector('.carousel1');
// let container = document.querySelector('.carousel-container1');
// let items = document.querySelectorAll('.carousel-item1');
// const texts = document.querySelectorAll('.text');
// let currentIndex = 0;
// let touchStartY = 0;
// let touchEndY = 0;
// let isAnimating = false;
// let isAtLastSlide = false;
// let isScrollLocked = false;
// let lastScrollTime = 0;
// const desktopScrollCooldown = 800;
// const mobileScrollCooldown = 100; // Much shorter cooldown for mobile

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     const isMobile = window.innerWidth <= 768;
//     if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
//       isScrollLocked = true;
//       // Only lock body scroll on desktop
//       if (!isMobile) {
//         document.body.style.overflow = 'hidden';
//       }
//     } else {
//       isScrollLocked = false;
//       if (!isMobile) {
//         document.body.style.overflow = '';
//       }
//     }
//   });
// }, {
//   threshold: [0, 0.95, 1],
//   rootMargin: '0px'
// });

// observer.observe(container);

// function scrollCarousel(duration = desktopScrollCooldown) {
//   if (isAnimating) return;
  
//   isAnimating = true;
//   const offset = -currentIndex * (items[0].clientHeight);
  
//   carousel.style.transform = `translateY(${offset}px)`;

//   items.forEach((item, index) => {
//     if (index === currentIndex) {
//       item.classList.add('visible');
//       item.classList.remove('hidden');
//       texts[index].classList.add('visible');
//       texts[index].classList.remove('hidden');
//     } else {
//       item.classList.remove('visible');
//       item.classList.add('hidden');
//       texts[index].classList.remove('visible');
//       texts[index].classList.add('hidden');
//     }
//   });

//   isAtLastSlide = currentIndex === items.length - 1;

//   setTimeout(() => {
//     isAnimating = false;
//   }, duration);
// }

// container.addEventListener('wheel', (e) => {
//   const isMobile = window.innerWidth <= 768;
//   const scrollCooldown = isMobile ? mobileScrollCooldown : desktopScrollCooldown;
  
//   // Desktop scroll handling
//   if (!isMobile) {
//     if (currentIndex === 0 && e.deltaY < 0) {
//       isScrollLocked = false;
//       document.body.style.overflow = '';
//       return;
//     }
    
//     if (isAtLastSlide && e.deltaY > 0) {
//       isScrollLocked = false;
//       document.body.style.overflow = '';
//       return;
//     }
    
//     if (!isScrollLocked) return;
    
//     const now = Date.now();
//     if (now - lastScrollTime < scrollCooldown) {
//       e.preventDefault();
//       return;
//     }
    
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!isAnimating) {
//       lastScrollTime = now;
//       if (e.deltaY > 0) {
//         currentIndex = Math.min(currentIndex + 1, items.length - 1);
//       } else {
//         currentIndex = Math.max(currentIndex - 1, 0);
//       }
//       scrollCarousel();
//     }
//   } 
//   // Mobile scroll handling
//   else {
//     const now = Date.now();
//     // Check for rapid scrolling that indicates carousel interaction
//     if (Math.abs(e.deltaY) > 50) {
//       if (isScrollLocked && !isAnimating) {
//         // Handle carousel movement
//         if (now - lastScrollTime >= scrollCooldown &&
//             !(currentIndex === 0 && e.deltaY < 0) && 
//             !(isAtLastSlide && e.deltaY > 0)) {
//           lastScrollTime = now;
//           if (e.deltaY > 0) {
//             currentIndex = Math.min(currentIndex + 1, items.length - 1);
//           } else {
//             currentIndex = Math.max(currentIndex - 1, 0);
//           }
//           scrollCarousel(mobileScrollCooldown);
//         }
//       }
//     }
//   }
// }, { passive: true }); // Changed to passive: true for better mobile scrolling

// let initialTouchY = null;
// let currentTouchY = null;
// let isTouchScrolling = false;
// let touchStartTime = 0;
// let lastTouchTime = 0;

// document.addEventListener('touchstart', (e) => {
//   const isMobile = window.innerWidth <= 768;
//   if (!isMobile) return;
  
//   initialTouchY = e.touches[0].clientY;
//   currentTouchY = initialTouchY;
//   isTouchScrolling = true;
//   touchStartTime = Date.now();
// }, { passive: true });

// document.addEventListener('touchmove', (e) => {
//   const isMobile = window.innerWidth <= 768;
//   if (!isMobile || !isTouchScrolling) return;
  
//   currentTouchY = e.touches[0].clientY;
//   const touchDiff = initialTouchY - currentTouchY;
  
//   const now = Date.now();
//   // Only handle quick, intentional swipes
//   if (now - lastTouchTime >= mobileScrollCooldown && Math.abs(touchDiff) > 30) {
//     const rect = container.getBoundingClientRect();
//     const isWithinCarousel = e.touches[0].clientY >= rect.top && 
//                             e.touches[0].clientY <= rect.bottom;
    
//     if (isWithinCarousel && isScrollLocked) {
//       lastTouchTime = now;
//       // Handle carousel movement for significant swipes
//       if (!isAnimating && 
//           !(currentIndex === 0 && touchDiff < 0) && 
//           !(isAtLastSlide && touchDiff > 0)) {
//         if (touchDiff > 0) {
//           currentIndex = Math.min(currentIndex + 1, items.length - 1);
//         } else {
//           currentIndex = Math.max(currentIndex - 1, 0);
//         }
//         scrollCarousel(mobileScrollCooldown);
//       }
//     }
//   }
// }, { passive: true });

// document.addEventListener('touchend', (e) => {
//   initialTouchY = null;
//   currentTouchY = null;
//   isTouchScrolling = false;
// }, { passive: true });

// window.addEventListener('resize', () => {
//   const duration = window.innerWidth <= 768 ? mobileScrollCooldown : desktopScrollCooldown;
//   scrollCarousel(duration);
// });

// scrollCarousel();


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

// document.addEventListener('DOMContentLoaded', () => {
//   const cardContainer = document.getElementById('cardContainer');
//   let isHovering = false;
//   let isTouchDevice = false;
//   let autoScrollInterval;
//   let touchStartX = 0;
//   let touchScrollLeft = 0;

//   // Check if device supports touch
//   function checkTouchDevice() {
//     return ('ontouchstart' in window) || 
//            (navigator.maxTouchPoints > 0) || 
//            (navigator.msMaxTouchPoints > 0);
//   }

//   // Auto scroll based on mouse position
//   function handleMouseMove(e) {
//     if (!isHovering || isTouchDevice) return;

//     const rect = cardContainer.getBoundingClientRect();
//     const containerWidth = rect.width;
//     const mouseX = e.clientX - rect.left;
//     const scrollWidth = cardContainer.scrollWidth - containerWidth;
    
//     // Calculate dead zone (20% from each edge)
//     const deadZone = containerWidth * 0.5;
    
//     // If mouse is in the left 20% or right 20% of container
//     if (mouseX < deadZone || mouseX > containerWidth - deadZone) {
//       // Calculate scroll speed based on distance from center
//       const center = containerWidth / 2;
//       const distance = mouseX - center;
//       const maxSpeed = 5; // Maximum scroll speed
      
//       // Normalize the speed between -1 and 1, then multiply by maxSpeed
//       const speed = (distance / center) * maxSpeed;
      
//       clearInterval(autoScrollInterval);
//       autoScrollInterval = setInterval(() => {
//         // Ensure we don't scroll past the bounds
//         const newScrollLeft = cardContainer.scrollLeft + speed;
//         if (newScrollLeft >= 0 && newScrollLeft <= scrollWidth) {
//           cardContainer.scrollLeft = newScrollLeft;
//         }
//       }, 16); // ~60fps
//     } else {
//       // Stop scrolling in the dead zone
//       clearInterval(autoScrollInterval);
//     }
//   }

//   // Desktop mouse handlers
//   function handleMouseEnter() {
//     if (isTouchDevice) return;
//     isHovering = true;
//   }

//   function handleMouseLeave() {
//     if (isTouchDevice) return;
//     isHovering = false;
//     clearInterval(autoScrollInterval);
//   }

//   // Touch handlers
//   function handleTouchStart(e) {
//     touchStartX = e.touches[0].clientX;
//     touchScrollLeft = cardContainer.scrollLeft;
//   }

//   function handleTouchMove(e) {
//     if (!isTouchDevice) return;

//     const touchX = e.touches[0].clientX;
//     const touchDiff = touchStartX - touchX;
    
//     // Add some resistance at the edges
//     if (
//       (cardContainer.scrollLeft === 0 && touchDiff < 0) || 
//       (cardContainer.scrollLeft === cardContainer.scrollWidth - cardContainer.clientWidth && touchDiff > 0)
//     ) {
//       // Reduce the scroll effect by 70% at the edges
//       cardContainer.scrollLeft = touchScrollLeft + (touchDiff * 0.3);
//     } else {
//       cardContainer.scrollLeft = touchScrollLeft + touchDiff;
//     }
//   }

//   function handleTouchEnd(e) {
//     const touchEndX = e.changedTouches[0].clientX;
//     const touchDiff = touchStartX - touchEndX;
    
//     // Add momentum scrolling
//     if (Math.abs(touchDiff) > 50) {
//       const momentum = touchDiff * 0.2;
//       const targetScroll = cardContainer.scrollLeft + momentum;
      
//       cardContainer.scrollTo({
//         left: targetScroll,
//         behavior: 'smooth'
//       });
//     }
//   }

//   // Initialization
//   function init() {
//     isTouchDevice = checkTouchDevice();
    
//     // Add appropriate event listeners based on device type
//     if (isTouchDevice) {
//       cardContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
//       cardContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
//       cardContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
//     } else {
//       cardContainer.addEventListener('mouseenter', handleMouseEnter);
//       cardContainer.addEventListener('mouseleave', handleMouseLeave);
//       cardContainer.addEventListener('mousemove', handleMouseMove);
//     }
//   }

//   // Clean up function
//   function cleanup() {
//     clearInterval(autoScrollInterval);
    
//     if (isTouchDevice) {
//       cardContainer.removeEventListener('touchstart', handleTouchStart);
//       cardContainer.removeEventListener('touchmove', handleTouchMove);
//       cardContainer.removeEventListener('touchend', handleTouchEnd);
//     } else {
//       cardContainer.removeEventListener('mouseenter', handleMouseEnter);
//       cardContainer.removeEventListener('mouseleave', handleMouseLeave);
//       cardContainer.removeEventListener('mousemove', handleMouseMove);
//     }
//   }

//   // Initialize
//   init();

//   // Clean up on page unload
//   window.addEventListener('unload', cleanup);
// });