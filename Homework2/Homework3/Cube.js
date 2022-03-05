function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    var positions = [
        0, 0, 0, //index 0
        1, 0, 0, //index 1
        1, 1, 0, //index 2
        0, 1, 0, //index 3

        0, 0, 1, //index 4
        1, 0, 1, //index 5
        1, 1, 1, //index 6
        0, 1, 1, //index 7

        // --> Insert your vertex positions here
    ];

    var indices = [
        0, 1,
        1, 2,
        2, 3,
        3, 0,

        4, 5,
        5, 6,
        6, 7,
        7, 4,

        0, 4,
        1, 5,
        2, 6,
        3, 7,

        0, 1, 2,
        0, 3, 2,
        0, 4, 1,
        0, 5, 3,
        1, 5, 4,
        1, 2, 7,
        1, 4, 7,
        7, 4, 6,
        6, 4, 5,
        5, 6, 3,
        3, 7, 6,
        6, 2, 3
        // --> Insert you index values here
    ];

    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    MV = gl.getUniformLocation(program, "MV");
    this.MV = mat4();

    this.render = function () {
        gl.useProgram( program );

        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};