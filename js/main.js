// ------------------------------
// 1. Logo Animation & Dialogue
// ------------------------------

// Animate logo entry on page load
gsap.from(".nexus-logo", {
  duration: 1.2,
  y: -50,
  opacity: 0,
  ease: "power2.out"
});

// Elements for logo hover dialogue
const logoLink = document.querySelector('.nexus-logo-link');
const logoDialogue = document.getElementById('logoDialogue');

// Show/hide project name on logo hover
if (logoLink && logoDialogue) {
  logoLink.addEventListener('mouseenter', () => {
    gsap.to(logoDialogue, {
      opacity: 1,
      scale: 1.08,
      y: -10,
      duration: 0.45,
      ease: "power2.out",
      pointerEvents: "auto"
    });
  });
  logoLink.addEventListener('mouseleave', () => {
    gsap.to(logoDialogue, {
      opacity: 0,
      scale: 0.95,
      y: 0,
      duration: 0.35,
      ease: "power2.in",
      pointerEvents: "none"
    });
  });
}

// Also show/hide dialogue when hovering the 3D logo canvas
const threeContainer = document.getElementById('three-container');
if (threeContainer && logoDialogue) {
  threeContainer.addEventListener('mouseenter', () => {
    gsap.to(logoDialogue, {
      opacity: 1,
      scale: 1.08,
      y: -10,
      duration: 0.45,
      ease: "power2.out",
      pointerEvents: "auto"
    });
  });
  threeContainer.addEventListener('mouseleave', () => {
    gsap.to(logoDialogue, {
      opacity: 0,
      scale: 0.95,
      y: 0,
      duration: 0.35,
      ease: "power2.in",
      pointerEvents: "none"
    });
  });
}

// ------------------------------
// 2. Logo 3D Animation (Three.js)
// ------------------------------

// Setup Three.js scene for the logo
const container = document.getElementById('three-container');
if (container) {
  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 2.5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(120, 120);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x00ffff, 1.2, 100);
  pointLight.position.set(2, 2, 3);
  scene.add(pointLight);

  // Load logo texture and create sphere
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('assets/nexus.png', function(texture) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const geometry = new THREE.SphereGeometry(0.95, 128, 128);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0xffffff,
      shininess: 120,
      specular: 0x00ffff,
      emissive: 0x111111,
      emissiveIntensity: 0.2
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Neon glow effect
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.18 
    });
    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 128, 128),
      glowMaterial
    );
    scene.add(glowSphere);

    // Animate rotation
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.02;
      glowSphere.rotation.y += 0.02;
      renderer.render(scene, camera);
    }
    animate();
  });

  // Center the canvas visually
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.height = "120px";
  container.style.margin = "0 auto";
}

// ------------------------------
// 3. GSAP Logo Effects (Continuous)
// ------------------------------

// Continuous 3D rotation and glow pulse for logo
gsap.to(".nexus-logo", {
  rotationY: 360,
  repeat: -1,
  duration: 8,
  ease: "linear",
  transformOrigin: "50% 50%",
  modifiers: {
    rotationY: gsap.utils.unitize(v => v % 360)
  }
});

gsap.to(".nexus-logo", {
  boxShadow: "0 0 64px 24px #0ff8, 0 0 128px 32px #0ff4, inset 0 8px 24px #fff6",
  filter: "drop-shadow(0 0 32px #0ff)",
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: "power1.inOut"
});

// ------------------------------
// 4. Search Overlay Functionality
// ------------------------------

// Elements for search overlay
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

// Show overlay when search icon is clicked
if (searchBtn && searchOverlay && searchInput) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
  });
}

// Close overlay on ESC key
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Escape' &&
    searchOverlay.classList.contains('active')
  ) {
    searchOverlay.classList.remove('active');
  }
});

// Prevent form submission (demo only)
if (searchForm && searchOverlay) {
  searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = searchInput.value.trim();

  // Move search bar to top
  document.querySelector('.search-overlay-content').classList.add('top');

  // Show loading animation
  searchInput.classList.add('search-loading');
  searchResultsMessage.textContent = 'Searching...';

  setTimeout(() => {
    let results = Math.floor(Math.random() * 40);
    if (!query) results = 0;

    searchInput.classList.remove('search-loading');
    searchResultsMessage.textContent = `${results} result${results === 1 ? '' : 's'}`;
  }, 1200);
});
}

// Close overlay when logo is clicked (prevents navigation)
if (logoLink && searchOverlay) {
  logoLink.addEventListener('click', (e) => {
    if (searchOverlay.classList.contains('active')) {
      e.preventDefault();
      searchOverlay.classList.remove('active');
    }
  });
}

// -------------------------------
// 5. Search Functionality (Simulated)
// -------------------------------

const searchResultsMessage = document.getElementById('searchResultsMessage');

// Simulate search (replace with your real search logic)
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = searchInput.value.trim();

  // Show loading animation
  searchInput.classList.add('search-loading');
  searchResultsMessage.textContent = 'Searching...';

  // Simulate async search (replace with real AJAX/fetch)
  setTimeout(() => {
    // Example: random results for demo
    let results = Math.floor(Math.random() * 40);
    if (!query) results = 0;

    searchInput.classList.remove('search-loading');
    searchResultsMessage.textContent = `${results} result${results === 1 ? '' : 's'}`;
  }, 1200);
});

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const pauseBtn = document.querySelector('.slide-pause');
let currentSlide = 0;
let slideInterval;
let paused = false;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    if (i === idx) {
      gsap.fromTo(
        slide,
        { opacity: 0, x: 80, scale: 1.05 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power4.out", overwrite: "auto" }
      );
      slide.classList.add('active');
    } else if (slide.classList.contains('active')) {
      gsap.to(
        slide,
        { opacity: 0, x: -80, scale: 0.98, duration: 0.9, ease: "power4.in", overwrite: "auto",
          onComplete: () => slide.classList.remove('active')
        }
      );
    } else {
      slide.style.opacity = 0;
      slide.classList.remove('active');
    }
    dots[i].classList.toggle('active', i === idx);
  });
  currentSlide = idx;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function startSlides() {
  slideInterval = setInterval(nextSlide, 15000);
}

function stopSlides() {
  clearInterval(slideInterval);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    if (!paused) {
      stopSlides();
      startSlides();
    }
  });
});

pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.classList.toggle('paused', paused);
  if (paused) {
    stopSlides();
  } else {
    startSlides();
  }
});

// Initialize
showSlide(0);
startSlides();

// Fade in punchline/tagline from the left on page load
gsap.fromTo(
  ".hero-subtitle, .hero-title",
  { opacity: 0, x: -60 },
  { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", stagger: 0.3 }
);