const chooseGood = document.querySelectorAll(`.choose-good`);

chooseGood.forEach(chooseG => {
    const goodVariety = chooseG.querySelectorAll(`.good-variety`);
    const chosenGood = chooseG.querySelector('.good-variety--chosen');
    const goodInput = chooseG.querySelector('.hidden-input');
    for(gv=0;gv<goodVariety.length;gv++) {
        let goodV = goodVariety[gv];
    
        goodV.addEventListener(`click`, function(evt){
            goodInput.value = goodV.textContent;
            chosenGood.innerHTML = goodV.textContent;
        })
    }

    chooseG.addEventListener(`click`, function(evt){
        chooseG.classList.toggle(`goods-opened`)
    });
});


const modalInputs = document.querySelectorAll('.modal-required');
const ModalSubmit = document.querySelector('#modal-final-btn');

addListenerMulti(modalInputs, 'keyup change', function() {
  if (valid()) {
    ModalSubmit.removeAttribute('disabled');
  }
  else {
    ModalSubmit.setAttribute('disabled', 'disabled');
  }
});

function valid() {
  var valid = true;
  for (var i = 0; i < modalInputs.length; i++) {
    if (!modalInputs[i].validity.valid) {
      valid = false;
    }
  }
  return valid;
}

function addListenerMulti(el, s, fn) {
  var col = el.length ? el : [el];
  var evts = s.split(' ');

  for (var k = 0; k < col.length; k++) {
    for (var i = 0, iLen = evts.length; i < iLen; i++) {
      col[k].addEventListener(evts[i], fn, false);
    }   
  }  
}

const orderBanner = document.querySelector(`#orderBanner`);
const orderModal = document.querySelector(`.order-modal--container`);

orderBanner.addEventListener(`click`, function(evt) {
  orderModal.classList.remove(`dnone`)
})

document.addEventListener(`click`, function(evt) {
    if(evt.target === orderModal) {
      orderModal.classList.add(`dnone`)
    }
})

// 

let broadcastPlay = document.querySelectorAll(`.broadcast--play`);
let radioWave = new Audio('https://listen1.myradio24.com/2761');

for(br=0;br<broadcastPlay.length;br++) {
  let broadcastBtn = broadcastPlay[br];
  broadcastBtn.addEventListener(`click`, function(evt) {
    broadcastPlay.forEach(element => {
      element.classList.remove(`dnone`)
    });
    broadcastBtn.classList.add(`dnone`)
    if(broadcastPlay[0].classList.contains(`dnone`)) {
      radioWave.play();
    } else {
      radioWave.load()
    }
  })
}

const header = document.querySelector(`#header`);
const h1 = document.querySelectorAll(`.h1`);
const headerWoman = document.querySelectorAll(`.header__woman`);

const headerColors = [
  "linear-gradient(0deg, rgba(47,131,186,1) 0%, rgba(45,159,181,1) 100%)",
  "linear-gradient(0deg, rgb(47, 186, 56) 0%, rgb(50, 181, 45) 100%)"
]

let headerSlide = 0;

function headerSlider() {
  if(headerSlide > headerWoman.length - 1) {
    headerSlide = 0;
  } 
  h1.forEach(text => {
    text.classList.add(`dnone`)
  });
  h1[headerSlide].classList.remove(`dnone`)
  headerWoman.forEach(woman => {
    woman.classList.add(`opacity0`)
  });
  headerWoman[headerSlide].classList.remove(`opacity0`)
  let color = headerColors[headerSlide];
  header.style.backgroundImage = color;

  headerSlide++;

  setTimeout(headerSlider, 5000)
}

headerSlider();