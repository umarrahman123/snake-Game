const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw a rectangle
ctx.fillStyle = "#FF0000"; // Set the fill color to red
ctx.fillRect(50, 50, 100, 100); // Draw a rectangle at (50, 50) with width 100 and height 100

// Draw a circle
ctx.beginPath(); // Start a new path
ctx.arc(200, 200, 50, 0, Math.PI * 2); // Draw a circle at (200, 200) with radius 50
ctx.fillStyle = "#00FF00"; // Set the fill color to green
ctx.fill(); // Fill the circle with the color
