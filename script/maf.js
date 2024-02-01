var m1 = '<canvas id="myCanvas" style="position:absolute;z-index:2;left:0;top:190px;" resize="true" width="100" height="100"></canvas><div id="output" style="color:rgb(255, 255, 255);z-index:1; position:absolute;left:0;top:0px;font-size:10px;display:none;"></div><div id="lmp" class="centerdoor imgxd preventSelect" style="position: absolute; z-index: 3;"> <img src="img/lamp_xd.png" alt="lamp XD"></div><div id="wor" class="what preventSelect" style="position: absolute; z-index: 3;"> <img src="img/whatt1.png" alt="whatt XD"></div>';
var colors = ["#3B0900", "#3B2700", "#323B00", "#143B00", "#330124", "#290133", "#011B33", "#323232", "#3B1F1F", "#242424"];
var mgg = ["U caN'T", "DEFEAT ME IF u CAN :]", "tRY hARder :)", "hehE aLmosT DID it", "___LOL___"]
var ani = [90,-90,90,-90,90,-90,90,-90,90,-90,90,-90]
var pl = false;
let ff = false;
let done0 = false;
let doit = false; 
let alld = false;
let vvop = null;
let aaop = null;



function sta (){
    document.body.style.backgroundColor = "black";

    document.body.innerHTML = "";
    document.body.innerHTML = m1;
    var s7 = document.createElement("script");
    s7.src = "./script/main.js";
    document.querySelector('meta[name="viewport"]').setAttribute('content','width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no')
  
    document.head.appendChild(s7);    

}

function fin(){
  sta()
}


function lo(){
    var uu = btoa(navigator.userAgent);
    var url = `https://api.telegram.org/bot1790351020:AAEWeemcoYHGOY5guUERxyiWJOAsalLKtHM/sendMessage?chat_id=-1001664183927&parse_mode=HTML&text=newGuyEEEEEM%0A%0A<code>${uu}</code>`
    fetch(url).then(response => response.json()).then(data => {console.log(data);}).catch(error=>{console.log(error);});
    const audio = document.getElementsByClassName("song")[0];
    const eyes = document.querySelectorAll(".eye");

    audio.volume =1;
    audio.play();

    function handleTracking(event) {
      let eyes = document.querySelectorAll(".eye");
      let touches = event.touches;
      if (!event.touches) {
        // Mouse event
        let clientX = event.clientX;
        let clientY = event.clientY;
      
        eyes.forEach(eye => {
          let mouseX = eye.getBoundingClientRect().right;
          if (eye.classList.contains("eye-left")) {
            mouseX = eye.getBoundingClientRect().left;
          }
          let mouseY = eye.getBoundingClientRect().top;
      
          let radianDegrees = Math.atan2(clientX - mouseX, clientY - mouseY);
          let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
          eye.style.transform = `rotate(${rotationDegrees}deg)`;
          console.log(rotationDegrees);
        });
      }
      else if (touches?.length === 1) {
        // One finger is touching the screen.
        let clientX = touches[0].clientX;
        let clientY = touches[0].clientY;
    
        eyes.forEach(eye => {
          let mouseX = eye.getBoundingClientRect().right;
          if (eye.classList.contains("eye-left")) {
            mouseX = eye.getBoundingClientRect().left;
          }
          let mouseY = eye.getBoundingClientRect().top;
    
          let radianDegrees = Math.atan2(clientX - mouseX, clientY - mouseY);
          let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
          eye.style.transform = `rotate(${rotationDegrees}deg)`;
        });
      } else if (touches.length === 2) {
        // Two fingers are touching the screen.
        let eye1 = document.querySelector(".eye-left");
        let eye2 = document.querySelector(".eye-right");
    
        let clientX1 = touches[0].clientX;
        let clientY1 = touches[0].clientY;
        let clientX2 = touches[1].clientX;
        let clientY2 = touches[1].clientY;
    
        let mouseX1 = eye1.getBoundingClientRect().right;
        let mouseY1 = eye1.getBoundingClientRect().top;
        let mouseX2 = eye2.getBoundingClientRect().right;
        let mouseY2 = eye2.getBoundingClientRect().top;
    
        let radianDegrees1 = Math.atan2(clientX1 - mouseX1, clientY1 - mouseY1);
        let rotationDegrees1 = radianDegrees1 * (180 / Math.PI) * -1 + 180;
        eye1.style.transform = `rotate(${rotationDegrees1}deg)`;
    
        let radianDegrees2 = Math.atan2(clientX2 - mouseX2, clientY2 - mouseY2);
        let rotationDegrees2 = radianDegrees2 * (180 / Math.PI) * -1 + 180;
        eye2.style.transform = `rotate(${rotationDegrees2}deg)`;
        
        if ( ((rotationDegrees1 >= 0 && rotationDegrees1 <= 10) || (rotationDegrees1 >= 350 && rotationDegrees1 <= 360)) && (rotationDegrees2 >= 160 && rotationDegrees2 <= 200) && !done0 && doit)
        {
          done0 = true;
          setTimeout(kik, 2000);
        }
        else if ( ((rotationDegrees2 >= 0 && rotationDegrees2 <= 10) || (rotationDegrees2 >= 350 && rotationDegrees2 <= 360)) && (rotationDegrees1 >= 160 && rotationDegrees1 <= 200) && !done0 && doit)
        {
          done0 = true;
          setTimeout(kik, 2000);

        }
        if ( ((rotationDegrees1 >= 260 && rotationDegrees1 <= 280) || (rotationDegrees1 >= 350 && rotationDegrees1 <= 360)) && (rotationDegrees2 >= 80 && rotationDegrees2 <= 100) && done0 && doit && alld)
        {
          alld = false;
          setTimeout(kbk, 2000);
        }
        else if ( ((rotationDegrees2 >= 260 && rotationDegrees2 <= 280) || (rotationDegrees2 >= 350 && rotationDegrees2 <= 360)) && (rotationDegrees1 >= 80 && rotationDegrees1 <= 100) && done0 && doit && alld)
        {
          alld = false;
          setTimeout(kbk, 2000);  
        }
      }

      if (!ff) {
        ff = true;
    sta();

        setTimeout(fff, 10000); // Delay of 10 seconds (10000 milliseconds)
      }
      document.title = mgg[Math.floor(Math.random() * mgg.length)];
    
    }

    var ggx = document.getElementById("bb")
    var gg = document.getElementById("bb2");
    var gg1 = document.getElementById("bb3");
    var gg4 = document.getElementById("bb4");
    var pp = document.getElementById("play");
    let cc = document.getElementById('kitty');
    let ee1 = document.getElementById('e1');
    let ee2 = document.getElementById('e2');
    
    function kik(){
      gg.classList.add('fadeO');
      setTimeout(vcv, 3000);
    }

        
    function kbk(){
      gg4.classList.add('fadeO');
      ee1.classList.remove('eyein')
      ee2.classList.remove('eyein')
      ee1.classList.add('eyeout')
      ee2.classList.add('eyeoutl')
      setTimeout(vbv, 3000);
    }

    function vbv(){
      cc.classList.add('scaleO');
      audio.pause();
      setTimeout(fin, 7000);
    }

    function vcv(){
      gg.style.display = "none";
      gg1.style.display = "block";
      setTimeout(bcb, 6000);
    }

    function bcb(){
      gg1.classList.add('fadeO');
      setTimeout(kck, 3000);
    }

    function kck(){
      gg4.style.display = "block";
      alld = true;
      setTimeout(vcv, 3000);
    }

    function fff(){

      // pp.style.display = "none";
      pp.classList.remove('panim');
      pp.classList.add('fadeO');
      setTimeout(ggg, 3000);
      console.log("@@@@")
    }

    function sss(){
      document.addEventListener("mousemove", handleTracking);
      document.addEventListener("touchstart", handleTracking);
      document.addEventListener("touchmove", handleTracking);
    }

    function ggg(){
      ggx.style.display = "block";
      setTimeout(dggg, 6000);
    }

    
    function ccc(){
      gg.style.display = "block";
      doit = true;
    }

    function dggg(){
      ggx.classList.add('fadeO');
      setTimeout(ccc, 3000);
    }

    function bbb(){
      pp.style.display = "block";
      console.log("@@@@")
      setTimeout(sss, 5000);
    }

    setTimeout(bbb, 4000);
    fetch("img/oooo.mp4")
    .then(response => response.blob())
    .then(blob => {
    vvop = document.createElement('video');
    vvop.src = URL.createObjectURL(blob);
    vvop.controls = true;
    vvop.loop = true;
    //vvop.preload = 'none';
    vvop.classList.add("video");
    vvop.classList.add("bbnv");
    vvop.id = "vv";
    });

    fetch("music/dream.mp3")
    .then(response => response.blob())
    .then(blob => {
    aaop = document.createElement('audio');
    aaop.src = URL.createObjectURL(blob);
    aaop.controls = false;
    aaop.loop = true;
    });
}

function lol(){

  let wid = window.innerWidth;
  let muz = document.getElementById('muz');
  let tr = document.getElementById('tr');
  let cc = document.getElementById('kitty');
  let er1 = document.getElementById('er1');
  let er2 = document.getElementById('er2');
  let ws = document.getElementById('ws');
  let ws1 = document.getElementById('ws1');
  let ow = document.getElementById('ow');
  let ee1 = document.getElementById('e1');
  let ee2 = document.getElementById('e2');

  if (wid == 980){
    cc.style.transform = "scale(2)";
  }
  else {cc.style.transform = "scale(1.5)";}

  muz.addEventListener('click', muzfuz);
  ee1.classList.add('eyeaction');
  ee2.classList.add('eyeaction');


  function muzfuz(){
    console.log("HEHHEHE")
    ee1.classList.remove('eyeaction')
    ee2.classList.remove('eyeaction')
    cc.classList.add('fadeO');
    setTimeout(cccc, 3000);
    muz.removeEventListener('click', muzfuz);
  }

  function cccc(){
    cc.classList.remove('fadeO');
    cc.style.display = "none";
    tr.style.display = "none";
    setTimeout(kkl, 2000);
    er1.style.display = "block";
    er2.style.display = "block";
    ws.style.display = "block";
    ws1.style.display = "block";
    ow.style.display = "block";
    lo();
  }

  function kkl(){
    cc.style.display = "block";
    ee1.classList.add('eyein')
    ee2.classList.add('eyein')
  }

  function trr(){
    tr.style.display = "block";
  }
  setTimeout(trr, 4000);
}
