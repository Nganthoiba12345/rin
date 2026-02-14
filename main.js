// script.js – stem first, then branches, then leaves, then flower

const seedTrigger = document.getElementById('seedTrigger');
const gardenBed = document.getElementById('gardenBed');
const valentineMsg = document.getElementById('valentineMessage');

// track if animation is running
let isGrowing = false;

// inject all rose elements with branches and CSS leaves
function setupRoseElements() {
    gardenBed.innerHTML = `
        <!-- seed -->
        <div class="seed-element">🌰</div>
        
        <!-- main stem -->
        <div class="stem-element"></div>
        
        <!-- thorns on main stem -->
        <div class="thorn thorn-left" style="bottom: 80px;"></div>
        <div class="thorn thorn-right" style="bottom: 80px;"></div>
        <div class="thorn thorn-left" style="bottom: 140px;"></div>
        <div class="thorn thorn-right" style="bottom: 140px;"></div>
        <div class="thorn thorn-left" style="bottom: 200px;"></div>
        <div class="thorn thorn-right" style="bottom: 200px;"></div>
        <div class="thorn thorn-left" style="bottom: 260px;"></div>
        <div class="thorn thorn-right" style="bottom: 260px;"></div>
        <div class="thorn thorn-left" style="bottom: 320px;"></div>
        <div class="thorn thorn-right" style="bottom: 320px;"></div>
        
        <!-- BRANCH CONTAINERS with CSS leaves -->
        <!-- Branch 1 (left lower) with 2 CSS leaves -->
        <div class="branch-container-1">
            <div class="branch-1"></div>
            <div class="leaf-css-1a"></div>
            <div class="leaf-css-1b"></div>
        </div>
        
        <!-- Branch 2 (right middle) with 2 CSS leaves -->
        <div class="branch-container-2">
            <div class="branch-2"></div>
            <div class="leaf-css-2a"></div>
            <div class="leaf-css-2b"></div>
        </div>
        
        <!-- Branch 3 (left upper) with 1 CSS leaf -->
        <div class="branch-container-3">
            <div class="branch-3"></div>
            <div class="leaf-css-3a"></div>
        </div>
        
        <!-- rose bud -->
        <div class="rose-bud"></div>
        
        <!-- full rose flower -->
        <div class="rose-flower">
            <div class="rose-petal-outer petal1"></div>
            <div class="rose-petal-outer petal2"></div>
            <div class="rose-petal-outer petal3"></div>
            <div class="rose-petal-outer petal4"></div>
            <div class="rose-petal-outer petal5"></div>
            <div class="rose-petal-outer petal6"></div>
            <div class="rose-petal-inner"></div>
            <div class="rose-petal-center"></div>
            <div class="rose-stamens"></div>
        </div>
    `;
}

// initial setup
setupRoseElements();
gardenBed.classList.add('seed-stage');
valentineMsg.classList.remove('show');

// core animation sequence - PERFECT SEQUENCE
function startBloomSequence() {
    if (isGrowing) return;
    isGrowing = true;

    // hide message
    valentineMsg.classList.remove('show');

    // reset to seed
    gardenBed.className = '';
    void gardenBed.offsetWidth;
    gardenBed.classList.add('seed-stage');

    // 1. STEM appears (0.4s) - stem grows completely
    setTimeout(() => {
        gardenBed.classList.remove('seed-stage');
        gardenBed.classList.add('stem-stage');
    }, 400);

    // 2. BRANCHES appear AFTER stem is fully grown (1.2s)
    // Stem takes 0.8s to grow, plus a small pause
    setTimeout(() => {
        gardenBed.classList.remove('stem-stage');
        gardenBed.classList.add('branch-stage');
        // Branch animations start playing automatically
    }, 1400);

    // 3. LEAVES appear AFTER branches have fully grown (branches take 1s to grow)
    setTimeout(() => {
        gardenBed.classList.remove('branch-stage');
        gardenBed.classList.add('leaves-stage');
    }, 2800); // 1.4s stem + 1.4s for branches to grow

    // 4. BUD appears
    setTimeout(() => {
        gardenBed.classList.remove('leaves-stage');
        gardenBed.classList.add('bud-stage');
    }, 3800);

    // 5. FLOWER fully blooms
    setTimeout(() => {
        gardenBed.classList.remove('bud-stage');
        gardenBed.classList.add('flower-stage');
    }, 5200);

    // 6. HAPPY VALENTINE'S DAY message
    setTimeout(() => {
        valentineMsg.classList.add('show');
        setTimeout(() => {
            isGrowing = false;
        }, 800);
    }, 6600);
}

// ----- EVENT LISTENERS -----
seedTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    startBloomSequence();
});

// keyboard support
seedTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startBloomSequence();
        seedTrigger.style.transform = 'translateY(8px)';
        seedTrigger.style.boxShadow = '0 4px 0 #b35e5e, 0 20px 25px -8px #a0495e';
        setTimeout(() => {
            seedTrigger.style.transform = '';
            seedTrigger.style.boxShadow = '';
        }, 150);
    }
});

// double-click on garden also starts
gardenBed.addEventListener('dblclick', () => {
    startBloomSequence();
});
