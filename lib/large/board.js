// Import or create JGO namespace
var JGO = JGO || {};

JGO.BOARD = JGO.BOARD || {};

JGO.BOARD.large = {
    textures: {
        black: '../lib/large/black.png',
        white: '../lib/large/white.png',
        shadow:'../lib/large/shadow.png',
        board: '../lib/large/shinkaya.jpg'
    },

    // Margins around the board, both on normal edges and clipped ones
    margin: {normal: 40, clipped: 40},

    // Shadow color, blur and offset
    boardShadow: {color: '#ffe0a8', blur: 30, offX: 5, offY: 5},

    // Lighter border around the board makes it more photorealistic
    border: {color: 'rgba(255, 255, 255, 0.3)', lineWidth: 2},

    // Amount of "extra wood" around the grid where stones lie
    padding: {normal: 20, clipped: 10},

    // Grid color and size, line widths
    grid: {color: '#202020', x: 50, y: 50, smooth: 0.0,
        borderWidth: 1.5, lineWidth: 1.2},

    // Star point radius
    stars: {radius: 3},

    // Coordinate color and font
    coordinates: {color: '#808080', font: 'normal 18px sanf-serif'},

    // Stone radius  and alpha for semi-transparent stones
    stone: {radius: 24, dimAlpha:0.6},

    // Shadow offset from center
    shadow: {xOff: -2, yOff: 2},

    // Mark base size and line width, color and font settings
    mark: {lineWidth: 1.5, blackColor: 'white', whiteColor: 'black',
        clearColor: 'black', font: 'normal 24px sanf-serif'}
};

JGO.BOARD.largeWalnut = JGO.util.extend(JGO.util.extend({}, JGO.BOARD.large), {
    textures: {board: '../lib/large/walnut.jpg', shadow: '../lib/large/shadow_dark.png'},
    boardShadow: {color: '#e2baa0'},
    grid: {color: '#101010', borderWidth: 1.8, lineWidth: 1.5}
});

JGO.BOARD.largeBW = JGO.util.extend(JGO.util.extend({}, JGO.BOARD.large), {
    textures: false
});

JGO.BOARD.resizeImage = function(newsize, imgsrc, callback) {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");    
    var canvasCopy = document.createElement("canvas");
    var copyCtx = canvasCopy.getContext("2d");
    
    img.onload = function() {
        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        copyCtx.drawImage(img, 0, 0);

        canvas.width = newsize;
        canvas.height = newsize;
        ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL());
    };

    img.src = imgsrc;
};

JGO.BOARD.custom = function(boardsize, areawidth, areaheight, overrides, callback) {
    var size = areawidth < areaheight ? areawidth : areaheight;
    var stonerad = Math.floor(size/(boardsize+1))/2;

    JGO.BOARD.resizeImage(stonerad*2, '../lib/large/black.png', function(blackimg) {
    JGO.BOARD.resizeImage(stonerad*2, '../lib/large/white.png', function(whiteimg) {
    JGO.BOARD.resizeImage(Math.floor(stonerad*3.5), '../lib/large/shadow_dark.png', function(shadowimg) {
    //JGO.BOARD.resizeImage(stonerad*2, '../lib/large/shinkaya.jpg', function(shinkayaimg) {
        callback(JGO.util.extend(JGO.util.extend({}, {
            textures: {
                black: blackimg,
                white: whiteimg,
                shadow:shadowimg,
                board: '../lib/large/shinkaya.jpg'
            },

            // Margins around the board, both on normal edges and clipped ones
            margin: {normal: (stonerad-3), clipped: (stonerad-3), color: '#404040' },

            // Shadow color, blur and offset
            boardShadow: {color: '#ffe0a8', blur: 0, offX: 0, offY: 0},

            // Lighter border around the board makes it more photorealistic
            border: {color: 'rgba(255, 255, 255, 0.3)', lineWidth: 2},

            // Amount of "extra wood" around the grid where stones lie
            padding: {normal: 1, clipped: 1},

            // Grid color and size, line widths
            grid: {color: '#202020', x: stonerad*2, y: stonerad*2, smooth: 0.0,
                borderWidth: 1, lineWidth: 1},

            // Star point radius
            stars: {radius: stonerad/5},

            // Coordinate color and font
            coordinates: {color: '#cccccc', font: 'normal 16px sanf-serif'},

            // Stone radius  and alpha for semi-transparent stones
            stone: {radius: stonerad, dimAlpha:0.6},

            // Shadow offset from center
            shadow: {xOff: 1, yOff: 3},

            // Mark base size and line width, color and font settings
            mark: {lineWidth: 1.5, blackColor: 'white', whiteColor: 'black',
                clearColor: 'black', font: 'normal '+(stonerad-3)+'px sanf-serif'}
        }), overrides));
    }); }); }); //3 resize callbacks
}