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
const modalContent = document.querySelector(`.order-modal`);

orderBanner.addEventListener(`click`, function(evt) {
  orderModal.classList.remove(`dnone`)
  setTimeout(function() {
    modalContent.classList.add(`modal-show`)
  }, 100)
})

document.addEventListener(`click`, function(evt) {
    if(evt.target === orderModal || evt.target.classList.contains(`modalCross`)) {
      modalContent.classList.remove(`modal-show`)
      setTimeout(function() {
        orderModal.classList.add(`dnone`)
      }, 100)
    }
})

// 

const header = document.querySelector(`#header`);
const h1 = document.querySelectorAll(`.h1`);
const headerWoman = document.querySelectorAll(`.header__woman`);

const headerColors = [
  "linear-gradient(0deg,rgb(0, 126, 210),rgb(0, 194, 215))",
  "linear-gradient(0deg, rgb(139, 0, 255),rgb(45, 177, 210))",
  "linear-gradient(180deg, rgb(225, 0, 255),rgb(0, 149, 255))",
  "linear-gradient(0deg,rgb(0, 126, 210),rgb(0, 194, 215))",
  "linear-gradient(0deg, rgb(139, 0, 255),rgb(45, 177, 210))",
  "linear-gradient(180deg, rgb(225, 0, 255),rgb(0, 149, 255))"
  // "linear-gradient(0deg, rgb(139, 0, 255),rgb(45, 177, 210))"
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

// 

const rangeInputs = document.querySelector('.volumvalue')
const volumeIcon = document.querySelector(`.volumeicon`);
const noVolumeIcon = document.querySelector(`.novolumeicon`);
let isRTL = document.documentElement.dir === 'rtl'

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  let percentage = (val - min) * 100 / (max - min)
  if (isRTL) {
    percentage = (max - val) 
  }
  
  target.style.backgroundSize = percentage + '% 100%'
  radioWave.volume = percentage/100;
}

rangeInputs.addEventListener('input', handleInputChange);

// Handle element change, check for dir attribute value change
function callback(mutationList, observer) {  mutationList.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
      isRTL = mutation.target.dir === 'rtl'
    }
  })
}

// Listen for body element change
const observer = new MutationObserver(callback)
observer.observe(document.documentElement, {attributes: true})

let prevVolume = rangeInputs.value;

document.addEventListener(`click`, function(evt) {
  if(evt.target === volumeIcon) {
    prevVolume = rangeInputs.value;
    rangeInputs.style.backgroundSize = 0 + '% 100%'
    rangeInputs.value = 0;
    radioWave.volume = 0;
    volumeIcon.classList.add(`dnone`)
    noVolumeIcon.classList.remove(`dnone`)
  } else if (evt.target === noVolumeIcon) {
    rangeInputs.style.backgroundSize = prevVolume + '% 100%'
    rangeInputs.value = prevVolume;
    radioWave.volume = prevVolume/100;
    volumeIcon.classList.remove(`dnone`)
    noVolumeIcon.classList.add(`dnone`)
  }
}) 
