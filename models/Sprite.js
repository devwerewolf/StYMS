class Sprite {
  constructor(tilemap, referenceName) {
    this.tilemap = tilemap;
    this.reference = this.tilemap.tileDictionary[referenceName];
    
    this.frames = [];
    this.frameCount = 0;
    
    const { x1, y1, x2, y2 } = this.reference;
    
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        this.frames.push({x, y});
      }
    }
  }
  
  drawAnimate(dx, dy, specificFrameIndices, cycleLength) {
    let maxLength = specificFrameIndices.length * cycleLength;
    let frameIndex = specificFrameIndices[Math.floor((this.frameCount % maxLength) / cycleLength)];
    let frame = this.frames[frameIndex];
    
    this.tilemap.drawTile(dx, dy, frame.x, frame.y);
    this.frameCount++;
  }
  
  clearAnimate() {
    this.frameCount = 0;
  }
}