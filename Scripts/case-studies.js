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







let hoverCardEl = document.getElementById('hoverCard');

const hoverContent = {
    marketSizing: "Estimated market size for the D2C apparel market and online apparel segment, with a focus on casual wear penetration using a top-down approach by categories.",
    expertInsights: "In-depth insights derived from market experts to validate trends and highlight actionable opportunities.",
    customerFeed: "Customer surveys and interviews conducted to understand preferences and key factors influencing purchase behavior.",
    competitorIdentificarion: "Detailed analysis and benchmarking of competitors across multiple performance metrics.",
    marketPenetration: "Calculation of market penetration levels and potential growth opportunities in the target segments."
};

function showHoverCard(sectionId) {
    hoverCardEl.classList.add("active");
    hoverCardEl.textContent = hoverContent[sectionId]; // Update hover card content dynamically
    hoverCardEl.style.fontFamily = "Cygre";
    hoverCardEl.style.color = "White";
    hoverCardEl.style.fontSize = "20px";
    hoverCardEl.style.fontWeight = "400";
    hoverCardEl.style.textAlign = "center";
    hoverCardEl.style.padding = "30px";
    hoverCardEl.style.display="flex";
    hoverCardEl.style.justifyContent="center";
    hoverCardEl.style.alignItems="center";
}

function hideHoverCard() {
    hoverCardEl.classList.remove("active");
    hoverCardEl.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard(section.id));
    section.addEventListener('mouseout', hideHoverCard);
});


//neuro case study

let hoverCardEl1 = document.getElementById('hoverCard1');

const hoverContent1 = {
  comprehensiveResearch: "We conducted extensive secondary research to gather critical information on the medical devices industry in India, focusing on the neuro cranial market segment. This included analysing market trends, competitor strategies, and regulatory factors.",
  healthcareInfra: "Our team delved into the healthcare infrastructure in India, specifically targeting hospitals with neurosurgery departments. This analysis provided valuable insights into the availability and accessibility of neurosurgical services.",
  financialModelling: "We developed detailed financial models to estimate the market size by both volume and value, offering a clear picture of potential revenue opportunities in the cranial implant segment.",
  primaryInterviews: "To gain deeper insights into buying behaviour, we conducted primary interviews with 10 neurosurgeons. This qualitative research helped us understand the decision-making process, key personnel involved, and the critical pain points faced by practitioners when purchasing neuro solutions.",
};

function showHoverCard1(sectionId) {
    hoverCardEl1.classList.add("active");
    hoverCardEl1.textContent = hoverContent1[sectionId]; // Update hover card content dynamically
    hoverCardEl1.style.fontFamily = "Cygre";
    hoverCardEl1.style.color = "White";
    hoverCardEl1.style.fontSize = "20px";
    hoverCardEl1.style.fontWeight = "400";
    hoverCardEl1.style.textAlign = "center";
    hoverCardEl1.style.padding = "30px";
    hoverCardEl1.style.display="flex";
    hoverCardEl1.style.justifyContent="center";
    hoverCardEl1.style.alignItems="center";
}

function hideHoverCard1() {
    hoverCardEl1.classList.remove("active");
    hoverCardEl1.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard1(section.id));
    section.addEventListener('mouseout', hideHoverCard1);
});


// telecom case study

let hoverCardEl2 = document.getElementById('hoverCard1');

const hoverContent2 = {
  comprehensiveResearch: "We conducted extensive secondary research to gather critical information on the medical devices industry in India, focusing on the neuro cranial market segment. This included analysing market trends, competitor strategies, and regulatory factors.",
  healthcareInfra: "Our team delved into the healthcare infrastructure in India, specifically targeting hospitals with neurosurgery departments. This analysis provided valuable insights into the availability and accessibility of neurosurgical services.",
  financialModelling: "We developed detailed financial models to estimate the market size by both volume and value, offering a clear picture of potential revenue opportunities in the cranial implant segment.",
  primaryInterviews: "To gain deeper insights into buying behaviour, we conducted primary interviews with 10 neurosurgeons. This qualitative research helped us understand the decision-making process, key personnel involved, and the critical pain points faced by practitioners when purchasing neuro solutions.",
};

function showHoverCard2(sectionId) {
    hoverCardEl2.classList.add("active");
    hoverCardEl2.textContent = hoverContent1[sectionId]; // Update hover card content dynamically
    hoverCardEl2.style.fontFamily = "Cygre";
    hoverCardEl2.style.color = "White";
    hoverCardEl2.style.fontSize = "20px";
    hoverCardEl2.style.fontWeight = "400";
    hoverCardEl2.style.textAlign = "center";
    hoverCardEl2.style.padding = "30px";
    hoverCardEl2.style.display="flex";
    hoverCardEl2.style.justifyContent="center";
    hoverCardEl2.style.alignItems="center";
}

function hideHoverCard2() {
    hoverCardEl2.classList.remove("active");
    hoverCardEl2.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard2(section.id));
    section.addEventListener('mouseout', hideHoverCard2);
});

// IT case study


let hoverCardEl3 = document.getElementById('hoverCard3');

const hoverContent3 = {
  cloudMigration: "Migrated their legacy systems to a scalable cloud infrastructure, improving system performance and ensuring 100% uptime during peak periods.",
  unified: "Integrated CRM and ERP platforms to enhance data accuracy and streamline communication between departments.",
  inventory: "Deployed AI-driven inventory management tools, optimizing stock levels in real time and reducing stockouts.",
};

function showHoverCard3(sectionId) {
    hoverCardEl3.classList.add("active");
    hoverCardEl3.textContent = hoverContent3[sectionId]; // Update hover card content dynamically
    hoverCardEl3.style.fontFamily = "Cygre";
    hoverCardEl3.style.color = "White";
    hoverCardEl3.style.fontSize = "20px";
    hoverCardEl3.style.fontWeight = "400";
    hoverCardEl3.style.textAlign = "center";
    hoverCardEl3.style.padding = "30px";
    hoverCardEl3.style.display="flex";
    hoverCardEl3.style.justifyContent="center";
    hoverCardEl3.style.alignItems="center";
}

function hideHoverCard3() {
    hoverCardEl3.classList.remove("active");
    hoverCardEl3.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard3(section.id));
    section.addEventListener('mouseout', hideHoverCard3);
});


// finance case study

let hoverCardEl4 = document.getElementById('hoverCard4');

const hoverContent4 = {
  complianceCloud: "Implemented a cloud-based compliance system that automated reporting and ensured 98% regulatory compliance.",
  clientOnboarding: "Deployed AI-powered onboarding tools, reducing the time to onboard new clients by 50%.",
  riskManagement: "Integrated AI-driven risk management systems to detect potential regulatory risks in real-time and mitigate them proactively.",
};

function showHoverCard4(sectionId) {
    hoverCardEl4.classList.add("active");
    hoverCardEl4.textContent = hoverContent4[sectionId]; // Update hover card content dynamically
    hoverCardEl4.style.fontFamily = "Cygre";
    hoverCardEl4.style.color = "White";
    hoverCardEl4.style.fontSize = "20px";
    hoverCardEl4.style.fontWeight = "400";
    hoverCardEl4.style.textAlign = "center";
    hoverCardEl4.style.padding = "30px";
    hoverCardEl4.style.display="flex";
    hoverCardEl4.style.justifyContent="center";
    hoverCardEl4.style.alignItems="center";
}

function hideHoverCard4() {
    hoverCardEl4.classList.remove("active");
    hoverCardEl4.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard4(section.id));
    section.addEventListener('mouseout', hideHoverCard4);
});



// manufacturing case study

let hoverCardEl5 = document.getElementById('hoverCard5');

const hoverContent5 = {
  cloudERP: "Implemented a scalable ERP platform across all production plants, centralizing data and improving transparency in supply chain management.",
  predictive: " Deployed AI-powered predictive maintenance tools to monitor equipment health in real-time and reduce unplanned downtime.",
  supplyChain: "Integrated automated supply chain management tools to streamline procurement, reduce lead times, and optimize stock levels.",
};

function showHoverCard5(sectionId) {
    hoverCardEl5.classList.add("active");
    hoverCardEl5.textContent = hoverContent5[sectionId]; // Update hover card content dynamically
    hoverCardEl5.style.fontFamily = "Cygre";
    hoverCardEl5.style.color = "White";
    hoverCardEl5.style.fontSize = "20px";
    hoverCardEl5.style.fontWeight = "400";
    hoverCardEl5.style.textAlign = "center";
    hoverCardEl5.style.padding = "30px";
    hoverCardEl5.style.display="flex";
    hoverCardEl5.style.justifyContent="center";
    hoverCardEl5.style.alignItems="center";
}

function hideHoverCard5() {
    hoverCardEl5.classList.remove("active");
    hoverCardEl5.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard5(section.id));
    section.addEventListener('mouseout', hideHoverCard5);
});


// healthcare


// manufacturing case study

let hoverCardEl6 = document.getElementById('hoverCard6');

const hoverContent6 = {
  cloud: "Migrated all patient records to a secure cloud-based platform, improving accessibility and reducing data management costs by 30%.",
  his: " Integrated HIS platforms across all clinics and hospitals, enabling seamless data sharing and improving collaboration between healthcare providers.",
  patient: "Deployed an AI-powered patient scheduling system, reducing administrative workload and improving appointment management.",
};

function showHoverCard6(sectionId) {
    hoverCardEl6.classList.add("active");
    hoverCardEl6.textContent = hoverContent6[sectionId]; // Update hover card content dynamically
    hoverCardEl6.style.fontFamily = "Cygre";
    hoverCardEl6.style.color = "White";
    hoverCardEl6.style.fontSize = "20px";
    hoverCardEl6.style.fontWeight = "400";
    hoverCardEl6.style.textAlign = "center";
    hoverCardEl6.style.padding = "30px";
    hoverCardEl6.style.display="flex";
    hoverCardEl6.style.justifyContent="center";
    hoverCardEl6.style.alignItems="center";
}

function hideHoverCard6() {
    hoverCardEl6.classList.remove("active");
    hoverCardEl6.textContent = ""; // Clear content on hide
}

document.querySelectorAll('.key-intiative p').forEach((section) => {
    section.addEventListener('mouseover', () => showHoverCard6(section.id));
    section.addEventListener('mouseout', hideHoverCard6);
});





// reveal animation challenges
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.item-wrapper');

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
          item.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check in case items are already in view
  });
