function Map() {

    this.cellWidth = 32;
    this.cellHeight = 32;
    this.cellsWide = 50;
    this.cellsHigh = 50;
    this.width = this.cellsWide*this.cellWidth; //cellsize*number of cells
    this.height = this.cellsHigh*this.cellHeight; //cellsize*number of cells

    this.resetMap = function() {
        this.data = [];
        this.collisionData = [];
        for(var i =0; i<this.cellsHigh;i++) {
            this.data[i]=[];
            this.collisionData[i]=[];
            for(var j =0; j<this.cellsWide;j++) {
                if(i == 0 || j == 0 || i == this.cellsHigh-1 || j == this.cellsWide-1) {
                    this.data[i][j] = 0;
                    this.collisionData[i][j] = 1;
                } else {
                    this.data[i][j] = 52;
                    this.collisionData[i][j] = 0;
                }
            }
        }
    };

    this.addPoint = function(x,y) {
        this.data[y][x]=0;
        this.collisionData[y][x] = 1;
    };

    this.hitTest = function(x,y) {

        if(this.collisionData[y] && this.collisionData[y][x]) {
            //console.log(this.collisionData[y][x]);
            return this.collisionData[y][x];
        } else
            return false;
    };

    this.resetMap();
}

//node.js export
if( 'undefined' != typeof global ) { //global should be changed
    module.exports = global.Map = Map;
}