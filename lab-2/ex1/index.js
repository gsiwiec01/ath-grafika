"use strict";  // gives improved error-checking in scripts.

var canvas;    // The canvas element on which we will draw.
var graphics;  // A 2D graphics context for drawing on the canvas.

/**
 *  The draw() function is called by init() after the page loads,
 *  to draw the content of the canvas.  At the start, clear the canvas
 *  and save a copy of the state; restore the state at the end.  (These
 *  actions are not necessary in this program, since the function will
 *  only be called once.)
 */
function draw() {
    graphics.clearRect(0, 0, 600, 600);

    graphics.rotate(Math.PI / 4);
    graphics.translate(100, -300);
    graphics.fillStyle = '#00f';
    graphics.fillRect(200, 200, 200, 200);

    graphics.strokeStyle = '#000';
    graphics.lineWidth = 4;
    graphics.translate(0, 0);
    graphics.strokeRect(200, 200, 200, 200);
}


/**
 * This function can be called to add a collection of extra drawing function to
 * a graphics context, to make it easier to draw basic shapes with that context.
 * The parameter, graphics, must be a canvas 2d graphics context.
 *
 * The following new functions are added to the graphics context:
 *
 *    graphics.strokeLine(x1,y1,x2,y2) -- stroke the line from (x1,y1) to (x2,y2).
 *    graphics.fillCircle(x,y,r) -- fill the circle with center (x,y) and radius r.
 *    graphics.strokeCircle(x,y,r) -- stroke the circle.
 *    graphics.fillOval(x,y,r1,r2) -- fill oval with center (x,y) and radii r1 and r2.
 *    graphics.stokeOval(x,y,r1,r2) -- stroke the oval
 *    graphics.fillPoly(x1,y1,x2,y2,...) -- fill polygon with vertices (x1,y1), (x2,y2), ...
 *    graphics.strokePoly(x1,y1,x2,y2,...) -- stroke the polygon.
 *    graphics.getRGB(x,y) -- returns the color components of pixel at (x,y) as an array of
 *         four integers in the range 0 to 255, in the order red, green, blue, alpha.
 *
 * (Note that "this" in a function that is called as a member of an object refers to that
 * object.  Here, this will refer to the graphics context.)
 */
function addGraphicsContextExtras(graphics) {
    graphics.strokeLine = function (x1, y1, x2, y2) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
    }
    graphics.fillCircle = function (x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, 2 * Math.PI, false);
        this.fill();
    }
    graphics.strokeCircle = function (x, y, radius) {
        this.beginPath();
        this.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.stroke();
    }
    graphics.fillPoly = function () {
        if (arguments.length < 6)
            return;
        this.beginPath();
        this.moveTo(arguments[0], arguments[1]);
        for (var i = 2; i + 1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i], arguments[i + 1]);
        }
        this.closePath();
        this.fill();
    }
    graphics.strokePoly = function () {
        if (arguments.length < 4)
            return;
        this.beginPath();
        this.moveTo(arguments[0], arguments[1]);
        for (var i = 2; i + 1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i], arguments[i + 1]);
        }
        this.closePath();
        this.stroke();
    }
    graphics.fillOval = function (x, y, horizontalRadius, verticalRadius) {
        this.save();
        this.translate(x, y);
        this.scale(horizontalRadius, verticalRadius);
        this.beginPath();
        this.arc(0, 0, 1, 0, 2 * Math.PI, false);
        this.restore();
        this.fill();
    }
    graphics.strokeOval = function (x, y, horizontalRadius, verticalRadius) {
        this.save();
        this.translate(x, y);
        this.scale(horizontalRadius, verticalRadius);
        this.beginPath();
        this.arc(0, 0, 1, 0, 2 * Math.PI, false);
        this.restore();
        this.stroke();
    }
    graphics.getRGB = function (x, y) {
        var color = this.getImageData(x, y, 1, 1);
        return color.data;
    }
}    // end of addGraphicsContextExtras()

/**
 * The init() funciton is called after the page has been
 * loaded.  It initializes the canvas and graphics variables.
 * It calles addGraphicsContextExtras(graphics) to add the extra
 * drawing functions to the graphics context, and it calls draw()
 * to draw on the canvas.
 */
function init() {
    try {
        canvas = document.getElementById("canvas");
        graphics = canvas.getContext("2d");
    } catch (e) {
        document.getElementById("canvasholder").innerHTML =
            "Canvas graphics is not supported.<br>" +
            "An error occurred while initializing graphics.";
    }
    addGraphicsContextExtras(graphics);
    draw();  // Call draw() to draw on the canvas.
}
