class Dialogue {
  constructor(lines) {
    this.lines = lines;
    this.currentLineIndex = 0;
    this.heightTiles = 9;
    this.finished = true;
  }

  drawBox() {
    if (!this.finished) {
      // Variables (box)
      let myHeight = this.heightTiles * window.tilemap.tileHeight;
      let x = 0;
      let y = height - myHeight;

      // Render box
      fill(255);
      rect(x, y, width, myHeight);

      // Variables (text)
      let {
        text: lineText,
        color = "black",
        size = 2
      } = this.lines[this.currentLineIndex];

      // Render text
      fill(color);
      textSize(size * window.tilemap.tileHeight);
      text(lineText, window.tilemap.tileWidth, y + window.tilemap.tileHeight * 2);
    }
  }

  nextLine() {
    this.currentLineIndex++;
    console.log(this.lines);

    if (this.currentLineIndex == this.lines.length) {
      this.finished = true;
    }
  }

  restore() {
    this.currentLineIndex = 0;
    this.finished = false;
  }
}




