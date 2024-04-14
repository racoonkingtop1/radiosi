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