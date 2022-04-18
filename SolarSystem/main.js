var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Add your sphere creation and configuration code here
    sun = new Sphere();
    sun.radius = 8;
    earth = new Sphere();
    earth.radius = 4;
    earth.orbit = 30;
    moon = new Sphere();
    moon.radius = 2;
    moon.orbit = 12;

    D = 2 * (earth.orbit + moon.orbit + moon.radius);

    near = 10;
    far = near + D;

    sinAngle = (D/2)/(near + (D/2));

    F = 2 * Math.asin(sinAngle) * 180/Math.PI;

    P = perspective(F, 1, near, far);

    sun.P = P;
    earth.P = P;
    moon.P =P;

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    // Add your rendering sequence here
    ms = new MatrixStack();

    var V = translate(0, 0, (far - near)/2 + near);
    ms.load(V);

    ms.push();
    ms.scale(sun.radius);

    requestAnimationFrame(render);

    sun.MV = ms.current();
    sun.render();
    ms.pop();
    ms.push();
    ms.rotate(year, axis);
    ms.translate(earth.distance, 0, 0);
    ms.push();
    ms.rotate(day, axis);
    ms.scale(earth.radius);
    earth.MV = ms.current();
    earth.render();
    ms.pop();
    ms.translate(moon.distance, 0, 0);
    ms.scale(moon.radius);
    moon.MV = ms.current();
    moon.render();
    ms.pop();

}

window.onload = init;