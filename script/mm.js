function sh(){document.getElementById("fifi").style.display = "block";}
function shhh(){

  let iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/J1t-g2L-gGQ?autoplay=1&controls=0&mute=1';
  iframe.width = '324';
  iframe.height = '720';
  iframe.frameborder = '0';       
  iframe.allow="accelerometer; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowfullscreen="0";
  iframe.style = "background-color: #000000; border-color: black;";
  iframe.id = "bbbf";

  document.getElementById("VVOC").appendChild(iframe);}
function hiii(){document.getElementById("VVOC").removeChild(bbbf);}
function hi(){document.getElementById("fifi").style.display = "none";}

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  
  //const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];
  
  

  

  // textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
  //   .split("")
  //   .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };
  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".onepo", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".twopt", 0.4, {
      opacity: 0,
      y: 10
    })

    .to(
      ".onepo",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".twopt",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )

    .from(".flowers", 0.1, {
      onStart:sh,
    })
    .to(
      ".flowers",
      2,
      {
        opacity: 0,
       onComplete:hi,
      },
      "+=9"
    )

    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      1.8,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )

    
    .from(".four", 0.3, {
      opacity: 0,
      onStart:shhh
    })
    .to(
      ".four",
      0.8,
      {
        opacity: 0,
       onComplete:hiii
      },
      "+=32"
    )



    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(".idea-5 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    }, "+=0.5")

    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".main-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -50,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    );

//   tl.seek(".three");
   //tl.timeScale(12);



  // Restart Animation on click


  const replyBtn = document.getElementById("replay");
  const giftIMG1 =  document.getElementById("giftIMG1");
  const giftIMG2 =  document.getElementById("giftIMG2");
  const giftBtn1 = document.getElementById("gbox1");
  const giftBtn2 = document.getElementById("gbox2");
  const exitBtn = document.getElementById("exitBtn");

  giftBtn1.addEventListener("click", () => {
     console.log('gift btn');
     giftIMG1.style.display = "block";
     giftIMG1.style.opacity = 1;
     exitBtn.style.display = "block";
     exitBtn.style.opacity = 1;
  });

  giftBtn2.addEventListener("click", () => {
    console.log('gift btn');
    giftIMG2.style.display = "block";
    giftIMG2.style.opacity = 1;
    exitBtn.style.display = "block";
    exitBtn.style.opacity = 1;
 });

  replyBtn.addEventListener("click", () => {
    console.log('reply btn');
    giftIMG1.style.display = "none";
    giftIMG1.style.opacity = 0;    
    giftIMG2.style.display = "none";
    giftIMG2.style.opacity = 0;
    tl.restart();
  });
};

const str = () => {
    const audio = document.getElementsByClassName("song")[0];
    const playmsbtn = document.getElementById("str");
    playmsbtn.addEventListener("click", () => {
      console.log("lol");
      playmsbtn.style.visibility = 'hidden';
      audio.play();
      animationTimeline()
    });

};

function closepic(){
  const giftIMG1 =  document.getElementById("giftIMG1");
  const giftIMG2 =  document.getElementById("giftIMG2");
  const exitBtn = document.getElementById("exitBtn");
  console.log('exit btn');
  giftIMG1.style.display = "none";
  giftIMG1.style.opacity = 0;
  giftIMG2.style.display = "none";
  giftIMG2.style.opacity = 0;
  exitBtn.style.display = "none";
  exitBtn.style.opacity = 0;



}
str()

