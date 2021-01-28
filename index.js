const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!checkHex(hex)) return;

  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + strippedHex;
  reset();
});

const checkHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

const convertHexToRGB = (hex) => {
  if (!checkHex(hex)) return null;

  let strippedHex = hex.replace("#", "");
  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

const convertRGBToHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secongPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + firstPair + secongPair + thirdPair;
  return hex;#
};

const alterColor = (hex, percent) => {
  const { r, g, b } = convertHexToRGB(hex);

  const amount = Math.floor((percent / 100) * 255);
  const newR = increaseWithinRange(r, amount);
  const newG = increaseWithinRange(g, amount);
  const newB = increaseWithinRange(b, amount);

  return (newHex = convertRGBToHex(newR, newG, newB));
};

const increaseWithinRange = (hex, amount) => {
  const newHex = hex + amount;
  if (newHex > 255) return 255;
  if (newHex < 0) return 0;
  return newHex;
};

slider.addEventListener("input", () => {
  if (!checkHex(hexInput.value)) return;
  sliderText.textContent = `${slider.value}%`;

  const sliderValue = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;

  const alteredHex = alterColor(hexInput.value, sliderValue);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  reset();
});

const reset = () => {
  slider.value = 0;
  sliderText.innerText = `0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};
