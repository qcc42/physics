// simulation.js

const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

class Ball {
    constructor(x, y, radius, color) {
        this.x = x; // Position X
        this.y = y; // Position Y
        this.radius = radius;
        this.color = color;
        this.vx = 0; // Velocity X
        this.vy = 0; // Velocity Y
        this.ax = 0; // Acceleration X
        this.ay = 0; // Acceleration Y
        this.mass = 1; // Mass
    }

    applyForce(fx, fy) {
        this.ax += fx / this.mass;
        this.ay += fy / this.mass;
    }

    update(deltaTime) {
        // Update velocity
        this.vx += this.ax * deltaTime;
        this.vy += this.ay * deltaTime;

        // Update position
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        // Reset acceleration
        this.ax = 0;
        this.ay = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize the ball
const ball = new Ball(400, 100, 20, 'blue');

// Gravity constant (pixels per second squared)
const gravity = 980;

// Ground position
const groundY = canvas.height - 50;

// Time variables
let lastTime = null;

function animate(time) {
    if (!lastTime) lastTime = time;
    const deltaTime = (time - lastTime) / 1000; // Convert to seconds
    lastTime = time;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity
    ball.applyForce(0, ball.mass * gravity);

    // Update ball physics
    ball.update(deltaTime);

    // Collision with ground
    if (ball.y + ball.radius > groundY) {
        ball.y = groundY - ball.radius;
        ball.vy *= -0.7; // Reverse velocity with damping
    }

    // Draw ground
    ctx.fillStyle = 'green';
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Draw the ball
    ball.draw(ctx);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
