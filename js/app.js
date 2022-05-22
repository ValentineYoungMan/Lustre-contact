function isWebp() {
    // Провірка підтримки webp
    function testWebP(callback) {

        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Додавання класу _webp або _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}    

isWebp();

function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

//----------------------------------------------

const iconMenu = document.querySelector('.menu-icon');
const headerNav = document.querySelector('.header-nav');

if (iconMenu) {
    
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        headerNav.classList.toggle('_active');
    });
}

//----------------------------------------------

function allowNumbersOnly(e) {
	var code = (e.which) ? e.which : e.keyCode;
	if (code > 31 && (code < 48 || code > 57)) {
			e.preventDefault();
	}
}

//------------------------------------

const stepperBtnUp = document.querySelectorAll('.buttonUp2');
const stepperBtnDown = document.querySelectorAll('.buttonDown2');
let stepperInput = document.querySelectorAll('.popupBasket-stepper-input');


stepperInput.forEach(el => {
	let count = el.value;

    // заміна 0 на 1
	 el.addEventListener('keyup', (e) => {
		let self = e.currentTarget;

		if (self.value == '0') {
			self.value = 1;
		}
        disabledButton2 (count, el)
	});

     // заборона вводити букви і символи
	 el.addEventListener('keypress', (e) => {
		allowNumbersOnly(e);
	});

    //зміна ' ' на 1
	el.addEventListener('change', (e) => {
		let self = e.currentTarget;
	
		if (!self.value) {
			self.value = 1;
		}
	
		count = el.value;

        disabledButton2 (count, el)
	}); 
    el.addEventListener('blur', (e) => {
		let self = e.currentTarget;

		count = el.value;

		disabledButton2 (count, el)

	});

    el.closest('.popupBasket-stepper').querySelector('.buttonUp2').addEventListener('click', (e) => {
		//e.preventDefault();
		 count = el.value;
		let self = e.currentTarget;
		count++;
		el.value = count;	
	
		disabledButton2 (count, el)
	});
    el.closest('.popupBasket-stepper').querySelector('.buttonDown2').addEventListener('click', (e) => {
		//e.preventDefault();
		 count = el.value;
		let self = e.currentTarget;
		count--;
		el.value = count;

		disabledButton2 (count, el)
	
	});

})

function disabledButton2 (count, el) {
    if (count == 1) {
        el.closest('.popupBasket-stepper').querySelector('.buttonDown2').classList.add('stepper-button-disabled2');
    } else {
        el.closest('.popupBasket-stepper').querySelector('.buttonDown2').classList.remove('stepper-button-disabled2');
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    stepperInput.forEach(el => {
        let count = el.value;

        disabledButton2 (count, el)
    })    
    
})

//---------------------------------------

let popupBasketStepperButton = document.querySelectorAll('.popupBasket-stepper-button');

popupBasketStepperButton.forEach(button => {
    button.addEventListener('click', (e) => {
        let item = e.target;

        let thisDataPrice = item.closest('.popupBasket-product').dataset.price;
        let thisTotalPriceContainer = item.closest('.popupBasket-product').querySelector('.popupBasket-info-price')
        let thisInputValue = item.closest('.popupBasket-product').querySelector('.popupBasket-stepper-input').value

        let newTotalPrice = (thisDataPrice * thisInputValue).toFixed(2);

        thisTotalPriceContainer.innerHTML = newTotalPrice  + " " + 'грн.';
        createTotalPrice()
    })
})

let popupBasketStepperInput = document.querySelectorAll('.popupBasket-stepper-input')

popupBasketStepperInput.forEach( input => {

    input.addEventListener('keyup', (e) => {

        let thisDataPrice = input.closest('.popupBasket-product').dataset.price;
        let thisTotalPriceContainer = input.closest('.popupBasket-product').querySelector('.popupBasket-info-price')
        let self = e.target;
        let newTotalPrice = (thisDataPrice * self.value).toFixed(2);
        thisTotalPriceContainer.innerHTML = newTotalPrice  + " " + 'грн.';
        createTotalPrice()
    })

    input.addEventListener('change', (e) => {

        let thisDataPrice = input.closest('.popupBasket-product').dataset.price;
        let thisTotalPriceContainer = input.closest('.popupBasket-product').querySelector('.popupBasket-info-price')
        let self = e.target;
        let newTotalPrice = (thisDataPrice * self.value).toFixed(2);
        thisTotalPriceContainer.innerHTML = newTotalPrice  + " " + 'грн.';
        createTotalPrice()
    })
})

//-------------------------------------

let popupBasketPrice = document.querySelector('.popupBasket-price')
let popupBasketInfoPrices = document.querySelectorAll('.popupBasket-info-price')

function createTotalPrice() {
    let calculateCount = 0;

    for(let i  = 0; i < popupBasketInfoPrices.length; i++) {
        let popupBasketInfoPrice = popupBasketInfoPrices[i].innerHTML
        popupBasketInfoPrice = Number(parseFloat(popupBasketInfoPrice))

        calculateCount += popupBasketInfoPrice
        
    }
    calculateCount = calculateCount.toFixed(2)
    popupBasketPrice.innerHTML =  calculateCount + ' ' + 'грн.'
}


//-----------------------

let headerBasket = document.querySelector('.header-basket')
let popupBasket = document.querySelector('.popupBasket')
let popupBasketContainer = document.querySelector('.popupBasket-container')
let popupBasketClose = document.querySelector('.popupBasket-close')

headerBasket.addEventListener('click', () =>{
    popupBasket.classList.add('_active');
    popupBasketContainer.classList.add('_active');
})

popupBasketClose.addEventListener('click', () => {
    popupBasketContainer.classList.remove('_active');
    popupBasket.classList.remove('_active');
})

popupBasket.addEventListener('click', (e) => {
    if (!e.target.closest('.popupBasket-container') && e.target.querySelector('.popupBasket-close')) {
        popupBasketContainer.classList.remove('_active');
        popupBasket.classList.remove('_active');
    }
})

//-------------------------------------

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let block4Button = document.querySelector('.block4-button');
let inputItems = document.querySelectorAll('.block4-input');
let inputEmail = document.querySelector('.input-email');


block4Button.addEventListener('click', (e) => {
    e.preventDefault()
    for (let i = 0; i < inputItems.length; i++){

        inputItems[i].classList.remove('error');

        if (!inputItems[i].value){
            inputItems[i].classList.add('error');
        }
    }
    
    if (emailTest(inputEmail)) {
        inputEmail.classList.add('error');
    }
   
})