var bas = true;
let sürükle = true;
var prevEvent, currentEvent;
var player = new Tone.Player({
  url: "c.mp3",
  loop: true
}).sync().start(0);
var pitchShift = new Tone.PitchShift({
  pitch: 0
}).toMaster();
player.connect(pitchShift);
Tone.Buffer.on('load', () => {
  callbacmuzik()
});
document.documentElement.onmousemove = function(event) {
  currentEvent = event;
}
var ekranYüksekligi = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
document.getElementById('kapsayici').addEventListener('mousedown', () => (sürükle = false, bas = true));
document.getElementById('kapsayici').addEventListener('mousemove', mousehareket);
document.getElementById('kapsayici').addEventListener('mouseup', kucul);

function mousehareket(event) {
  if(sürükle == false && bas == true) {
    imgManip(ekranYüksekligi - event.pageY);
    Tone.Transport.start();
  }
}
//https://pbs.twimg.com/media/D2VlaDqX0AATwqI?format=jpg&name=large
function kucul() {
  Tone.Transport.stop();
  bas = false;
  document.getElementById("img").style.width = "10vw";
  document.getElementById("img").style.height = "23vw";
  document.getElementsByClassName('icerik')[0].style.backgroundColor = "white";
  setTimeout(function() {
    document.getElementById('img').style.animation = "shake 0.24s cubic-bezier(.36,.07,.19,.97) both"
  }, 50);
  renkler = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
  renkleradam = ['#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d']
}
renkler = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
renkleradam = ['#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d', '#eead6d']

function imgManip(yukseklik) {
  document.getElementById('img').style.animation = ""
  var yuzde = parseInt(yukseklik * 100 / ekranYüksekligi)
  renkler = ['red', 'blue', 'green', 'yellow', 'black', "pink", "orange", "white", "gray", "aqua", "darkgoldenrod"];
  renkleradam = ["blue", "green", "red", "pink", "black", "white", "yellow"];
  var rakamarray = (Math.min(Math.max(parseInt(yuzde), 0), 100) - 50).toString().split("");
  if(rakamarray[0] == "-" && rakamarray.length > 2) {
    rakamarray.splice(-1, 0, ",")
    rakamarray = parseFloat(rakamarray.join(""))
  } else if(rakamarray[0] == "-") {
    rakamarray = parseFloat(rakamarray.join(""))
  } else {
    rakamarray = parseFloat(rakamarray.join(","))
  }
  pitchShift.pitch = rakamarray;
  document.getElementsByClassName('icerik')[0].style.backgroundImage = "url(sin.png)";
  document.getElementsByClassName('icerik')[0].style.backgroundSize = Math.min(Math.max(parseInt(yuzde), 15), 95) + "px";
  document.getElementById("img").style.height = Math.min(Math.max(parseInt(yuzde), 15), 95) + "%";
  document.getElementById("img").style.width = (50 - Math.min(Math.max(parseInt(yuzde), 10), 45)) + "%";
}
setInterval(patla, 10);

function patla() {
  document.getElementsByClassName('icerik')[0].style.transform = "translateX(-" + Date.now().toString().slice(-3) + "px)";
  document.getElementsByClassName('icerik')[0].style.backgroundColor = renkler[Date.now().toString().slice(-1)];
  document.getElementsByClassName('fotoKapsayici')[0].style.backgroundColor = renkleradam[Date.now().toString().slice(-2, -1)];
}