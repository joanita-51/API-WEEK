// const canvas = document.getElementById("canvas");
// const ctx1 = canvas.getContext("2d");

// ctx1.fillStyle = "green";
// ctx1.fillRect(10, 10, 150, 100);

const canvas2 = document.getElementById("canvas");
const ctx = canvas2.getContext("2d");

// Draw the ellipse
ctx.beginPath();
ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
ctx.stroke();

// Draw the ellipse's line of reflection
ctx.beginPath();
ctx.setLineDash([5, 5]);
ctx.moveTo(0, 200);
ctx.lineTo(200, 0);
ctx.stroke();