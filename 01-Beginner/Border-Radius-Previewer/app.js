//Get the HTML elements
const topLeftInput = document.querySelector("#top-left");
const topRightInput = document.querySelector("#top-right");
const allBordersInput = document.querySelector("#all-borders");
const bottomLeftInput = document.querySelector("#bottom-left");
const bottomRightInput = document.querySelector("#bottom-right");

const rectangle = document.querySelector("#rectangle");

//updates each of the edges individually
topLeftInput.addEventListener("input", () => {
    rectangle.style.borderTopLeftRadius = `${topLeftInput.value}px`;
});
topRightInput.addEventListener("input", () => {
    rectangle.style.borderTopRightRadius = `${topRightInput.value}px`;
});
bottomLeftInput.addEventListener("input", () => {
    rectangle.style.borderBottomLeftRadius = `${bottomLeftInput.value}px`;
});
bottomRightInput.addEventListener("input", () => {
    rectangle.style.borderBottomRightRadius = `${bottomRightInput.value}px`;
});

//updates all edges
allBordersInput.addEventListener("input", () => {
    const value = allBordersInput.value;

    if (!isNaN(value)) {
        topLeftInput.value = value;
        topRightInput.value = value;
        bottomLeftInput.value = value;
        bottomRightInput.value = value;
        rectangle.style.borderRadius = `${value}px`;
    }
});

// copy border-radius properties to clipboard
const copyBtn = document.querySelector("#copyBtn");
const msg = document.querySelector("#msg");
copyBtn.addEventListener("click", function () {
    //create a string with border-radius properties
    const borderRadiusCSS = `border-radius: ${topLeftInput.value}px ${topRightInput.value}px ${bottomRightInput.value}px ${bottomLeftInput.value}px;`;

    navigator.clipboard
        .writeText(borderRadiusCSS)
        .then(() => {
            msg.style.display = "block";
            msg.textContent = "CSS successfully copied!";
            setTimeout(() => {
                msg.style.display = "none";
            }, 2000);
        })
        .catch(() => {
            msg.style.display = "block";
            msg.textContent = "CSS copy failed!";
            setTimeout(() => {
                msg.style.display = "none";
            }, 2000);
        });
});

// clean border-radius input values
const cleanBtn = document.querySelector("#cleanBtn");
cleanBtn.addEventListener("click", function () {
    const inputs = document.querySelectorAll("input");

    const defaultValue = 0;

    inputs.forEach((input) => {
        input.value = "";
        input.placeholder = defaultValue;
    });

    rectangle.style.borderRadius = `${defaultValue}px`;
    copyBtn.style.backgroundColor = "white";
    copyBtn.style.borderColor = "rgb(22, 133, 170)";
});
