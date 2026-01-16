// JavaScript for gradual scroll-based color change
const navbar = document.getElementById('navbar');
const links = navbar.querySelectorAll('a');

// Function to interpolate between two colors (for background and text)
function interpolateColor(startColor, endColor, factor) {
    const start = startColor.match(/\d+/g).map(Number);
    const end = endColor.match(/\d+/g).map(Number);
    const result = start.map((s, i) => Math.round(s + (end[i] - s) * factor));
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

// Scroll event handler
function handleScroll() {
    const scrollY = window.scrollY;
    const maxScroll = 200; // Distance over which the transition happens (adjust as needed)
    const progress = Math.min(scrollY / maxScroll, 1); // 0 to 1

    // Interpolate background from semi-transparent white to solid blue
    const bgStart = 'rgba(255, 255, 255, 0.9)'; // Semi-transparent
    const bgEnd = '#007bff'; // Solid blue
    const newBg = progress === 0 ? bgStart : interpolateColor(bgStart, bgEnd, progress);

    // Interpolate text color from dark to white
    const textStart = '#333';
    const textEnd = '#fff';
    const newTextColor = interpolateColor(textStart, textEnd, progress);

    // Apply styles
    navbar.style.backgroundColor = newBg;
    links.forEach(link => {
        link.style.color = newTextColor;
    });

    // Request next frame for smooth animation
    requestAnimationFrame(handleScroll);
}

// Start listening on scroll
window.addEventListener('scroll', handleScroll);
// Initial call to set starting state
handleScroll();