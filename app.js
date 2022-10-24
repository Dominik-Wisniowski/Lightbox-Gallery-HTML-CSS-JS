const THUMBNAIL = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT = document.querySelector(".popup__arrow--left");
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");
let currentImage

const showNextImg =()=>{
    if(currentImage===THUMBNAIL.length-1){
        currentImage = 0;
    }else{
        currentImage++;
    }
    POPUP_IMG.src = THUMBNAIL[currentImage].src;
};
const showPreviousImg = ()=>{
    if(currentImage===0){
        currentImage = THUMBNAIL.length -1;
    }else{
        currentImage--;
    }       
    POPUP_IMG.src = THUMBNAIL[currentImage].src;
};
const closePopupImg = ()=>{
    POPUP.classList.add("fade-out");
    setTimeout(()=>{
        POPUP.classList.toggle("hidden");
        POPUP.classList.remove("fade-out");
    },300)
    THUMBNAIL.forEach((elements)=>{
        elements.setAttribute("tabindex", 1);
    });
    
};

THUMBNAIL.forEach((thumbnail, index) =>{
    const showPopup = (e)=>{
        POPUP.classList.toggle("hidden");
        POPUP_IMG.src = e.target.src;
        currentImage = index;
            THUMBNAIL.forEach((elements)=>{
                elements.setAttribute("tabindex", -1);
            });
    };
    thumbnail.addEventListener("click", showPopup);
    thumbnail.addEventListener("keydown",(e)=>{
        if(e.code ==="Enter"){
            showPopup(e);
        }
    });
    
});

POPUP_CLOSE.addEventListener("click",closePopupImg);

ARROW_LEFT.addEventListener("click", showPreviousImg);

ARROW_RIGHT.addEventListener("click",showNextImg);


// Key down elements
document.addEventListener("keydown", (e)=>{
    if(!POPUP.classList.contains("hidden")){
        if(e.code ==="ArrowRight" || e.keyCode===39){
            showNextImg();
        }
        if(e.code === "ArrowLeft" || e.keyCode===37){
            showPreviousImg();
        }
        if(e.code === "Escape" || e.keyCode ===27){
            closePopupImg();
        }
    } 
});

POPUP.addEventListener("click", (e)=>{
    if(e.target === POPUP){
        closePopupImg();
    }
});