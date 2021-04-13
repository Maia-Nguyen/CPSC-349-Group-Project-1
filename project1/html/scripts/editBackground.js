var colorBg = document.querySelector(".colorPicker");
var body = document.getElementById("backgroundColor");

function setBgColor() {
    body.style.background = colorBg.value;

    CSS.textContent = body.style.background;
}

colorBg.addEventListener("input", setBgColor);

