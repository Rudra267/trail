let highestZ = 1;
class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;
    
    init(paper) {
        const onMove = (x, y) => {
            if (!this.rotating) {
                this.mouseX = x;
                this.mouseY = y;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }
            const dirX = x - this.mouseTouchX;
            const dirY = y - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }
            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        };

        const onStart = (x, y, button) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            if (button === 0 || button === undefined) { // Left mouse button or touch
                this.mouseTouchX = x;
                this.mouseTouchY = y;
                this.prevMouseX = x;
                this.prevMouseY = y;
            }
            if (button === 2) { // Right mouse button
                this.rotating = true;
            }
        };

        const onEnd = () => {
            this.holdingPaper = false;
            this.rotating = false;
        };

        document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
        document.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX, e.touches[0].clientY));

        paper.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY, e.button));
        paper.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            onStart(e.touches[0].clientX, e.touches[0].clientY);
        });

        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
});

// Hide the popup initially
popup.style.display = "none";
