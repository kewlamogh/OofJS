let oof = new OofJS({w: 500, h: 500}, true);
oof.setStyleForCanvas({
    "border": "2px solid black"
});

oof.inject();
oof.addObject(0, 0, 10, 10, "square_dude", "red", false, "");
oof.addObject(0, 50, w = 10, h = 10, "lol", "red", true, "def_pfp.jpg");
async function main() {
    if (oof.isPressed("a")) {
        oof.setAttr("square_dude", "x", 50)
        oof.setAttr("lol", "x", 20)
    }
    await new Promise(resolve => setTimeout(resolve, 10));
    requestAnimationFrame(main);
}
main();