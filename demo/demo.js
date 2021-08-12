let oof = new OofJS({w: 500, h: 500}, true); //initializing oofjs
oof.setStyleForCanvas({ 
    "border": "2px solid black"
}); //setting canvas styles
oof.inject(); //injecting canvas
oof.addObject(0, 0, 10, 10, "square_dude", "red", false, ""); //adding a square
oof.addObject(0, 50, w = 10, h = 10, "lol", "red", true, "def_pfp.jpg"); //adding an image
async function main() {
    if (oof.isPressed("a")) { 
        oof.setAttr("square_dude", "x", 50);
        oof.setAttr("lol", "x", 20);
    } //if a is pressed set square_dude's x to 50 and lol's x to 20
    if (oof.isPressed("z")) {
        alert("hallo")
    } 
    if (oof.isPressed("q")) {
        alert("you pressed a wrong key.")
    }
    await new Promise(resolve => setTimeout(resolve, 10)); //slowing down the loop to scratch-like speed so I don't have to worry about sin and cos
    requestAnimationFrame(main); //requesting this animation frame
}
main(); //calling