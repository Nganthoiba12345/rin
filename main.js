// DOM Elements
const chocolateBox = document.getElementById('chocolateBox');
const boxTop = document.getElementById('boxTop');
const chocolatesContainer = document.getElementById('chocolatesContainer');
const messageContainer = document.getElementById('messageContainer');
const instruction = document.getElementById('instruction');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const clickCount = document.getElementById('clickCount');

// State variables
let isBoxOpen = false;
let openCount = 0;

// Chocolate types with icons and names
const chocolateTypes = [
    { icon: 'fa-candy-cane', name: 'Mint' },
    { icon: 'fa-seedling', name: 'Hazelnut' },
    { icon: 'fa-fire', name: 'Chili' },
    { icon: 'fa-lemon', name: 'Orange' },
    { icon: 'fa-wine-bottle', name: 'Rum' },
    { icon: 'fa-cookie-bite', name: 'Cookie' },
    { icon: 'fa-pepper-hot', name: 'Spicy' },
    { icon: 'fa-stroopwafel', name: 'Caramel' }
];

// Event listeners
chocolateBox.addEventListener('click', openBox);
openBtn.addEventListener('click', openBox);
closeBtn.addEventListener('click', closeBox);

// Function to open the chocolate box
function openBox() {
    if (isBoxOpen) return; // Don't open if already open
    
    isBoxOpen = true;
    openCount++;
    clickCount.textContent = `Box opened: ${openCount} time${openCount !== 1 ? 's' : ''}`;
    
    // Animate the box opening
    boxTop.style.transform = 'rotateX(-120deg)';
    
    // Hide the instruction
    instruction.classList.add('hidden');
    
    // Show chocolates after a delay
    setTimeout(() => {
        chocolatesContainer.classList.add('visible');
        
        // Generate chocolate elements if not already generated
        if (!chocolatesContainer.hasChildNodes()) {
            generateChocolates();
        }
        
        // Show message after chocolates appear
        setTimeout(() => {
            messageContainer.classList.add('visible');
        }, 500);
    }, 800);
    
    // Add a little bounce effect to the box
    chocolateBox.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        chocolateBox.style.transform = 'translateY(0)';
    }, 300);
    
    // Create confetti
    createConfetti();
    
    // Update button states
    updateButtonStates();
}

// Function to close the chocolate box
function closeBox() {
    if (!isBoxOpen) return; // Don't close if already closed
    
    isBoxOpen = false;
    
    // Animate the box closing
    boxTop.style.transform = 'rotateX(0deg)';
    
    // Hide chocolates and message
    chocolatesContainer.classList.remove('visible');
    messageContainer.classList.remove('visible');
    
    // Show instruction after a delay
    setTimeout(() => {
        instruction.classList.remove('hidden');
    }, 1000);
    
    // Add a little bounce effect to the box
    chocolateBox.style.transform = 'translateY(-5px)';
    setTimeout(() => {
        chocolateBox.style.transform = 'translateY(0)';
    }, 200);
    
    // Update button states
    updateButtonStates();
}

// Function to update button states
function updateButtonStates() {
    if (isBoxOpen) {
        openBtn.disabled = true;
        closeBtn.disabled = false;
    } else {
        openBtn.disabled = false;
        closeBtn.disabled = true;
    }
}

// Function to generate chocolate elements
function generateChocolates() {
    chocolatesContainer.innerHTML = '';
    
    chocolateTypes.forEach((chocolate, index) => {
        const chocolateElement = document.createElement('div');
        chocolateElement.className = 'chocolate';
        chocolateElement.style.animationDelay = `${index * 0.2}s`;
        
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'chocolate-details';
        
        const icon = document.createElement('i');
        icon.className = `fas ${chocolate.icon}`;
        
        const name = document.createElement('span');
        name.textContent = chocolate.name;
        
        detailsDiv.appendChild(icon);
        detailsDiv.appendChild(name);
        chocolateElement.appendChild(detailsDiv);
        
        chocolatesContainer.appendChild(chocolateElement);
        
        // Add click event to each chocolate
        chocolateElement.addEventListener('click', () => {
            // Make the chocolate jump
            chocolateElement.style.transform = 'translateY(-30px) scale(1.2)';
            
            // Return to original position
            setTimeout(() => {
                chocolateElement.style.transform = 'translateY(0) scale(1)';
            }, 300);
        });
    });
}

// Add hover effect to the chocolate box
chocolateBox.addEventListener('mouseenter', () => {
    chocolateBox.style.transform = 'scale(1.05)';
});

chocolateBox.addEventListener('mouseleave', () => {
    if (!isBoxOpen) {
        chocolateBox.style.transform = 'scale(1)';
    }
});

// Confetti effect
function createConfetti() {
    const confettiCount = 50;
    const container = document.querySelector('.container');
    
    // Remove old confetti
    document.querySelectorAll('.confetti').forEach(confetti => {
        confetti.remove();
    });
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
        confetti.style.top = `${50 + (Math.random() - 0.5) * 30}%`;
        
        container.appendChild(confetti);
        
        // Animate confetti
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        let posX = 50 + (Math.random() - 0.5) * 30;
        let posY = 50 + (Math.random() - 0.5) * 30;
        
        let opacity = 1;
        const animateConfetti = () => {
            posX += x;
            posY += y;
            y += 0.08; // gravity effect
            opacity -= 0.01;
            
            confetti.style.left = `${posX}%`;
            confetti.style.top = `${posY}%`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animateConfetti);
    }
}

// Helper function for random colors
function getRandomColor() {
    const colors = ['#f8d568', '#d32f2f', '#8b5a2b', '#6b4226', '#ffcc99', '#e74c3c', '#f39c12', '#ffffff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add social sharing functionality
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        alert('Share the chocolate love! 🍫\n\nWishing you a Happy Chocolate Day!\n\nSpread sweetness and joy today!');
    });
});

// Initialize button states
updateButtonStates();