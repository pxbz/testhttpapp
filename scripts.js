let clickCounter = 0;
document.getElementById("test").setAttribute("onclick", "aaa()");

function aaa() {
  document.getElementById("test").innerHTML = `Click counter: ${++clickCounter}`;
}