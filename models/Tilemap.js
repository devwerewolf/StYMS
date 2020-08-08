class Tilemap {
  constructor(img, tileWidth, tileHeight, tileReferences = []) {
    this.img = img;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    
    this.tileDictionary = tileReferences.reduce((acc, cur) => {
      const { name } = cur;
      delete cur.name;
      
      return {
        ...acc,
        [name]: {
          ...cur
        }
      }
    }, {});
    
    this.collisionData = {};
  }
  
  drawTile(dx, dy, x, y, w = 1, h = 1) {
    let dTileX = dx * this.tileWidth;
    let dTileY = dy * this.tileHeight;
    let tileX = x * this.tileWidth;
    let tileY = y * this.tileHeight;
    let fullWidth = w * this.tileWidth;
    let fullHeight = h * this.tileHeight;
    
    image(this.img, dTileX, dTileY, fullWidth, fullHeight, tileX, tileY, fullWidth, fullHeight);
  }
  
  drawReference(dx, dy, name) {
    const { x1, y1, x2, y2, stop = false } = this.tileDictionary[name];
    let original = { dx, dy }
    
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        this.drawTile(dx, dy, x, y);
        dx++;
        
        this.collisionData[coordinates(dx - 1, dy)] = stop;
      }
      
      dx = original.dx;
      dy++;
    }
  }
  
  refresh() {
    this.collisionData = {};
  }
}


/*
{
  "8,10": true
}
*/