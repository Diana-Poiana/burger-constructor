window.addEventListener('DOMContentLoaded', () => {

  const btnsContainer = document.querySelectorAll('.ingridients__qty-choice');
  const qtyInputs = document.querySelectorAll('.ingridients__qty');
  const btnMinusList = document.querySelectorAll('.ingridients__btn-minus');
  const btnPlusList = document.querySelectorAll('.ingridients__btn-plus');

  const burgerNewIngridientContainer = document.querySelector('.burger-constructor__content');
  const minutesToCook = document.querySelector('.burger-constructor__summary-min');
  const ingridientWeight = document.querySelector('.burger-constructor__summary-weight');
  const ingridientKcal = document.querySelector('.burger-constructor__summary-calories');

  let currentBottomValue = 40;
  let previousIngridient;
  let temporaryBottom;
  let tomatoCount = 0;
  let cucumberCount = 0;
  let onionCount = 0;
  let cutlet = 0;
  let mayo = 0;
  let onion = 0;
  let tomato = 0;
  let cucumber = 0;
  let cheese = 0;
  let salad = 0;
  let bun = 0;
  let totalHeight = 0;


  let totalCookingTime = 0;
  let totalWeight = 0;
  let totalKcal = 0;

  const ingredientsInfo = {
    cutlet: { cookingMin: 12, kcal: 276, weightGrams: 234 },
    mayo: { cookingMin: 1, kcal: 73, weightGrams: 56 },
    onion: { cookingMin: 3, kcal: 276, weightGrams: 54 },
    tomato: { cookingMin: 2, kcal: 58, weightGrams: 78 },
    cucumber: { cookingMin: 2, kcal: 24, weightGrams: 56 },
    cheese: { cookingMin: 3, kcal: 198, weightGrams: 95 },
    salad: { cookingMin: 2, kcal: 18, weightGrams: 25 },
    bun: { cookingMin: 5, kcal: 80, weightGrams: 35 },
    ketchup: { cookingMin: 1, kcal: 96, weightGrams: 20 }
  };

  function addSingleIngridientInfo(element) {
    let elemForUpdate = element.getAttribute('data-ingridient');
    let elemCookingTime = ingredientsInfo[elemForUpdate].cookingMin;
    let elemWeight = ingredientsInfo[elemForUpdate].weightGrams;
    let elemKcal = ingredientsInfo[elemForUpdate].kcal;

    if (!totalCookingTime) {
      totalCookingTime = elemCookingTime;
    } else {
      totalCookingTime = totalCookingTime + elemCookingTime;
    }

    if (!totalWeight) {
      totalWeight = elemWeight;
    } else {
      totalWeight = totalWeight + elemWeight;
    }

    if (!totalKcal) {
      totalKcal = elemKcal;
    } else {
      totalKcal = totalKcal + elemKcal;
    }

    minutesToCook.textContent = totalCookingTime;
    ingridientWeight.textContent = totalWeight;
    ingridientKcal.textContent = totalKcal;
  }

  function deleteSingleIngridientInfo(element) {
    let elemForUpdate = element;
    let elemCookingTime = ingredientsInfo[elemForUpdate].cookingMin;
    let elemWeight = ingredientsInfo[elemForUpdate].weightGrams;
    let elemKcal = ingredientsInfo[elemForUpdate].kcal;

    if (totalCookingTime === 0 || totalWeight === 0 || totalKcal === 0) {
      minutesToCook.textContent = totalCookingTime;
      ingridientWeight.textContent = totalWeight;
      ingridientKcal.textContent = totalKcal;
    } else {
      totalCookingTime = totalCookingTime - elemCookingTime;
      totalWeight = totalWeight - elemWeight;
      totalKcal = totalKcal - elemKcal;
    }

    minutesToCook.textContent = totalCookingTime;
    ingridientWeight.textContent = totalWeight;
    ingridientKcal.textContent = totalKcal;
  }

  // create ingridient
  function createNewIngridient(ingridient) {
    const newElem = document.createElement('img');
    newElem.src = `images/burger-constructor/${ingridient}.png`;
    newElem.setAttribute('data-ingridient', ingridient);
    return newElem;
  }

  // plus ingridient
  function plusIngridient(ingridient) {
    const newElem = createNewIngridient(ingridient);
    newElem.style.position = 'absolute';
    newElem.style.bottom = currentBottomValue + 'px';

    newElem.style.left = 55 + 'px';
    currentBottomValue += 10;
    // console.log(newElem.style.bottom);

    // if (ingridient === 'tomato') {
    //   plusTomato(newElem);
    //   tomato++;
    // } else if (ingridient === 'cucumber') {
    //   newElem.style.bottom = currentBottomValue + 40 + 'px';
    //   plusCucumber(newElem);
    //   cucumber++;
    // } else if (ingridient === 'cutlet') {
    //   plusCutlet(newElem);
    //   cutlet++;
    // } else if (ingridient === 'salad') {
    //   plusSalad(newElem);
    //   salad++;
    // } else if (ingridient === 'cheese') {
    //   newElem.style.bottom = currentBottomValue - 40 + 'px';
    //   plusCheese(newElem);
    //   cheese++;
    // } else if (ingridient === 'onion') {
    //   newElem.style.bottom = currentBottomValue + 20 + 'px';
    //   plusOnion(newElem);
    //   onion++;
    // } else if (ingridient === 'bun') {
    //   newElem.style.bottom = currentBottomValue + 40 + 'px';
    //   plusBun(newElem);
    //   bun++;
    // } else if (ingridient === 'mayo') {
    //   plusMayo(newElem);
    //   mayo++;
    // }

    // console.log(previousIngridient);
    // console.log(newElem.getAttribute('data-ingridient'));
    previousIngridient = ingridient;

    burgerNewIngridientContainer.appendChild(newElem);
    animation(newElem);
    addSingleIngridientInfo(newElem);
  }

  // delete ingridient
  function minusIngridient(ingridient) {
    const elementsToRemove = burgerNewIngridientContainer.querySelectorAll(`[data-ingridient="${ingridient}"]`);
    const lastElement = elementsToRemove[elementsToRemove.length - 1];

    if (lastElement) {
      lastElement.remove();

      const ingridientsLeft = Array.from(elementsToRemove);
      ingridientsLeft.pop();

      // console.log(ingridientsLeft);
      updateIngridientPositions();
      deleteSingleIngridientInfo(ingridient);
    } else {
      return;
    }
  }


  // update ingridient positions
  function updateIngridientPositions() {
    const elementsToUpdate = burgerNewIngridientContainer.querySelectorAll('[data-ingridient]');
    elementsToUpdate.forEach((elem, i) => {
      let ing = elem.getAttribute('data-ingridient');
      console.log(ing);
      elem.style.bottom = `${40 + (10 * i)}px`;
      // console.log(elem.style.bottom);
    });

    currentBottomValue = elementsToUpdate.length * 10 + 10;
    // console.log(currentBottomValue);
  }

  // function plusTomato(elem) {
  //   elem.style.left = 50 + 'px';
  //   tomatoCount++;
  //   if (tomatoCount % 2 === 0) {
  //     currentBottomValue += 10;
  //     elem.style.left = 216 + 'px';
  //   }
  // }

  // function plusCucumber(elem) {
  //   elem.style.left = 146 + 'px';
  //   cucumberCount++;
  //   if (cucumberCount % 2 === 0) {
  //     elem.style.left = 275 + 'px';
  //     currentBottomValue += 5;
  //   }
  // }

  // function plusMayo(elem) {
  //   elem.style.left = 55 + 'px';
  //   currentBottomValue += 5;
  // }

  // function plusBun(elem) {
  //   elem.style.left = 55 + 'px';
  //   currentBottomValue += 10;
  // }

  // function plusOnion(elem) {
  //   elem.style.left = 85 + 'px';
  //   onionCount++;
  //   if (onionCount % 2 === 0) {
  //     elem.style.left = 270 + 'px';
  //     currentBottomValue += 15;
  //   }
  // }

  // function plusCheese(elem) {
  //   elem.style.left = 55 + 'px';
  //   currentBottomValue += 10;
  // }

  // function plusCutlet(elem) {
  //   elem.style.left = 55 + 'px';
  //   currentBottomValue += 10;
  // }

  // function plusSalad(elem) {
  //   elem.style.left = 55 + 'px';
  //   currentBottomValue += 10;
  // }

  // adding ingridient animation
  function animation(element) {
    const animation = element.animate(
      [
        { transform: 'translate(0)' },
        { transform: 'translate(0, 630px)' }
      ],
      {
        duration: 500
      }
    );

    animation.addEventListener('finish', function () {
      element.style.transform = 'translate(0, 630px)';
    });
  }

  // update plusBtn value
  function updateInputPlus(btn) {
    const inputElement = btn.closest('.ingridients__qty-choice').querySelector('input');
    // console.log(inputElement);

    const currentValue = parseInt(inputElement.value);
    inputElement.value = isNaN(currentValue) ? 1 : currentValue + 1;
  }

  // update minusBtn value
  function updateInputMinus(btn) {
    const inputElement = btn.closest('.ingridients__qty-choice').querySelector('input');
    const currentValue = parseInt(inputElement.value);
    if (currentValue === 0) {
      inputElement.value = 0;
    } else {
      inputElement.value = isNaN(currentValue) ? 1 : currentValue - 1;
    }
  }

  // event listeners
  btnPlusList.forEach((btn) => {
    btn.addEventListener('click', () => {
      const ingredient = btn.getAttribute('data-ingridient');
      plusIngridient(ingredient);
      updateInputPlus(btn);
    });
  });

  btnMinusList.forEach((btn => {
    btn.addEventListener('click', () => {
      const ingredient = btn.getAttribute('data-ingridient');
      minusIngridient(ingredient);
      updateInputMinus(btn);
    });
  }));






});
