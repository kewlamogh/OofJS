class OofJS {
    constructor (canvasDimens, foreverUpdate) { 
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
    clear() {
        this.pen.clearRect(0, 0, this.canvas.width, this.canvas.height); //clearing
    }
    #iterate(list, func) { //creating a function that makes iterating through lists a breeze
        for (var i = 0; i <= list.length - 1; i++) {
            func(list[i]); 
        }
    }
    render() {
        console.log(this)
        return;
        this.clear();
        this.#iterate(this.objects, function (currentObject) {
            if (currentObject.hasOwnProperty("img")) {
                this.pen.drawImage(currentObject.imgElement, currentObject.x, currentObject.y);
            }
            if (currentObject.shape == "rect"){
                this.pen.fillRect(currentObject.w, currentObject.h, currentObject.x, currentObject.y);
            }
        })
        if (this.foreverUpdate) {
            requestAnimationFrame(this.render); //if this is a game that is not static, then request the frame again
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
}