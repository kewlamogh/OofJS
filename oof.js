class OofJS {
  constructor(canvasDimens, foreverUpdate) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = canvasDimens.w;
    this.canvas.height = canvasDimens.h;
    this.foreverUpdate = foreverUpdate;
    this.pen = this.canvas.getContext("2d");
    this.objects = []; //objects to draw
  }
  inject() {
    document.body.appendChild(this.canvas); //injecting canvas
  }
  eraseAll() {
    this.pen.clearRect(0, 0, this.canvas.width, this.canvas.height); //clearing
  }
  #iterate(list, func) { //creating a function that makes iterating through lists a breeze
    for (var i = 0; i <= list.length - 1; i++) {
      func(list[i]);
    }
  }
  addObject(x, y, w, h, isImg = false, imgSource = "") {
    if (!isImg) {
      this.objects.push({
        x: x,
        y: y,
        w: w,
        h: h
      })
    } else {
      let img = document.createElement("img");
      img.src = imgSource;
      img.width = w;
      img.height = h;

      this.objects.push({
        x: x,
        y: y,
        img: true,
        imgElement: img
      })
    }
  }
  draw() {
    this.eraseAll();
    this.#iterate(this.objects, function (currentObject) {
      if (currentObject.hasOwnProperty("img")) {
        this.pen.drawImage(currentObject.imgElement, currentObject.x, currentObject.y);
      }
      if (currentObject.shape == "rect") {
        this.pen.fillRect(currentObject.w, currentObject.h, currentObject.x, currentObject.y);
      }
    })
    this.callback();
  }
  callback() {
    if (this.foreverUpdate) {
      requestAnimationFrame(this.draw); //requestAnimationFrame creates a bad scope
      //if I try manual callback it breaks (the page doesn't load)
      //and i might get an exeption :( (max callback stack exceeded)
    }
  }
}