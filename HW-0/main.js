function init() {
    canvas = document.getElementById("pink");
    gl = canvas.getContext("webgl2");

    gl.clearColor(241, 221, 207, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function render() {

}

window.onload = init;
