class OofJS {
  constructor(canvasDimens, foreverUpdate) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = canvasDimens.w;
    this.canvas.height = canvasDimens.h;
    this.foreverUpdate = foreverUpdate;
    this.pen = this.canvas.getContext("2d");
    this.objects = []; //objects to draw
    this.keysPressed = {};
    
    let k = {}
    document.onkeydown = function (e) {k[e.key] = true};
    document.onkeyup = function (e) {delete k[e.key]};
    this.keysPressed = k;
  }
  setStyleForCanvas(styling) {
    for (var i in styling) {
      this.canvas.style[i] = styling[i];
    }
  }
  isPressed(key) {
    return key /*is*/ in this.keysPressed
  }
  setAttr(name, p, nv) {
    let selectedIndex;
    for (var i = 0; i<=this.objects.length - 1;i ++) {
      if (this.objects[i].name == name) {
        selectedIndex = i;
      }
    }
    if (selectedIndex == undefined) {
      return null;
    }
    this.objects[selectedIndex][p] = nv;
    return nv;
  }
  getAttr(name, p) {
    let selectedIndex;
    for (var i = 0; i<=this.objects.length - 1;i ++) {
      if (this.objects[i].name == name) {
        selectedIndex = i;
      }
    }
    if (selectedIndex == undefined) {
      return null;
    } else {
      return this.objects[selectedIndex][p]
    }
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
  addObject(x, y, w, h, name, color = "black", isImg = false, imgSource = "") {
    if (isImg == false) {
      this.objects.push({
        x: x,
        y: y,
        w: w,
        h: h,
        shape: 'rect',
        name: name,
        col: color
      })
    } else if (isImg) {
      let img = document.createElement("img");
      img.src = imgSource;
      img.width = w;
      img.height = h;
      this.objects.push({
        x: x,
        y: y,
        img: true,
        imgElement: img,
        shape: undefined,
        name: name
      })
    }
  }
  render() {
    this.draw(this);
  }
  draw(inst) {
    inst.eraseAll();
    inst.#iterate(inst.objects, function (currentObject) {
      if (currentObject.hasOwnProperty("img")) {
        inst.pen.drawImage(currentObject.imgElement, currentObject.x, currentObject.y);
      }
      if (currentObject.shape == "rect") {
        inst.pen.fillStyle = currentObject.col;
        inst.pen.fillRect(currentObject.x, currentObject.y, currentObject.w, currentObject.h);
      }
    })
    inst.callback(inst);
  }
  callback(inst) {
    if (inst.foreverUpdate) {
      requestAnimationFrame(function () {inst.draw(inst)}); 
    }
  }
  onclick(func) {
    this.canvas.addEventListener("click", function (e) {func(e)})
  }
}