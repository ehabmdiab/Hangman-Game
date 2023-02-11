export default function popUp(win) {
  let div = document.createElement("div");
  div.className = "popup";
  div.textContent = win ? `Congrats You won !` : `Game Over !`;

  let ok = document.createElement("button");
  ok.className = "ok";
  ok.textContent = "OK";

  if (win) {
    div.style.color = "#00FF4C";
  }

  ok.onclick = function () {
    location.reload();
  };

  div.appendChild(ok);
  document.body.appendChild(div);
}
