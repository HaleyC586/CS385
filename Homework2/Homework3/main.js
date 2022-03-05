angle = 0;
function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(241/255.0, 156/255.0, 187/255.0, 1.0);

    cube = new Cube(gl, 20);
    render();
}

function render() {
    angle = angle + 1;
    r = rotate(angle,1, 1, 1);
    cube.MV = r;

    gl.clear(gl.COLOR_BUFFER_BIT);
    cube.render();
    requestAnimationFrame(render);
}

window.onload = init;