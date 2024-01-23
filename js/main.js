window.addEventListener('DOMContentLoaded', () => {
  // header navigation links
  const profileMenuBtn = document.querySelector('.header__profile-menu');
  const profileMenu = document.querySelector('.header__drop-menu');

  // to show and hide different sections
  const makeBurgerBtn = document.querySelector('.hero__make-burger-btn');
  const makeBurgerHeaderBtn = document.querySelector('.header__make-burger');
  const headerLink = document.querySelector('.header__discover-page');
  const heroSection = document.querySelector('.hero');
  const burgerConstructorSection = document.querySelector('.burger-constructor');
  const checkoutModalWindow = document.querySelector('.checkout');
  const checkoutBtn = document.querySelector('.burger-constructor__checkout');

  const ketchupBtn = document.getElementById('ketchup');
  const ketchupIngridient = document.querySelector('.burger-constructor__ketchup');

  // ingridients section
  const btnsContainer = document.querySelectorAll('.ingridients__qty-choice');
  const qtyInputs = document.querySelectorAll('.ingridients__qty');
  const btnMinusList = document.querySelectorAll('.ingridients__btn-minus');
  const btnPlusList = document.querySelectorAll('.ingridients__btn-plus');

  const burgerNewIngridientContainer = document.querySelector('.burger-constructor__content');

  const warningMessage = document.querySelector('.burger-constructor__warning');

  const burgerPrice = document.querySelector('.burger-constructor__price');
  const minutesToCook = document.querySelector('.burger-constructor__summary-min');
  const ingridientWeight = document.querySelector('.burger-constructor__summary-weight');
  const ingridientKcal = document.querySelector('.burger-constructor__summary-calories');

  // checkout section
  const modalCloseBtn = document.querySelectorAll('.cancel');
  const finishBtn = document.querySelector('.checkout__proceed');
  const modalWindowContent = document.querySelector('.checkout__content');
  const modalWindowConfirmation = document.querySelector('.checkout__finished');

  // drop menu
  const dropMenuDesktop = document.getElementById('desktop-drop-menu');
  const dropMenuMobile = document.getElementById('mobile-drop-menu');
  const dropMenuDesktopBtn = document.getElementById('desktop-menu-btn');
  const dropMenuMobileBtn = document.getElementById('mobile-menu-btn');

  // const burgerMenuBtn = document.querySelector('.mobile-menu__burger-btn');
  // const mobileMenu = document.querySelector('.mobile-menu__list');

  const imgsContainer = document.querySelector('.burger-constructor__imgs-container');

  const imgsContainerHeight = imgsContainer.clientHeight;
  console.log(imgsContainerHeight);
  let currentBottomValue = 5;
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


  let totalPrice = 0;
  let totalCookingTime = 0;
  let totalWeight = 0;
  let totalKcal = 0;

  const ingredientsInfo = {
    cutlet: { cookingMin: 7, kcal: 276, weightGrams: 234, price: 1.2 },
    mayo: { cookingMin: 1, kcal: 43, weightGrams: 56, price: 0.3 },
    onion: { cookingMin: 2, kcal: 16, weightGrams: 54, price: 0.3 },
    tomato: { cookingMin: 1, kcal: 18, weightGrams: 78, price: 0.3 },
    cucumber: { cookingMin: 1, kcal: 24, weightGrams: 56, price: 0.3 },
    cheese: { cookingMin: 1, kcal: 88, weightGrams: 95, price: 0.8 },
    salad: { cookingMin: 2, kcal: 18, weightGrams: 25, price: 0.3 },
    bun: { cookingMin: 2, kcal: 40, weightGrams: 35, price: 0.5 },
    ketchup: { cookingMin: 1, kcal: 36, weightGrams: 20, price: 1 },
    topbun: { cookingMin: 1, kcal: 56, weightGrams: 20, price: 0 }
  };

  function showBurgerConstructor() {
    heroSection.style.display = 'none';
    burgerConstructorSection.style.display = 'block';
  }

  function showMainPage() {
    heroSection.style.display = 'flex';
    burgerConstructorSection.style.display = 'none';
  }

  // create ingridient
  function createNewIngridient(ingridient) {
    const newElem = document.createElement('img');
    newElem.src = `images/burger-constructor/${ingridient}.png`;
    newElem.setAttribute('data-ingridient', ingridient);
    newElem.classList.add(ingridient);
    return newElem;
  }


  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  console.log("Ширина экрана: " + screenWidth + " пикселей");


  // plus ingridient
  function plusIngridient(ingridient) {

    const newElem = createNewIngridient(ingridient);
    newElem.style.position = 'absolute';
    // FOR SMALL SCREENS
    if (screenWidth < 626) {
      newElem.style.width = '80%';
      if (ingridient === 'cutlet') {
        newElem.style.left = 38 + 'px';
        newElem.style.bottom = currentBottomValue + 'px';
      }

      else if (ingridient === 'mayo') {
        newElem.style.left = 35 + 'px';
        newElem.style.bottom = currentBottomValue - 20 + 'px';
      }

      else if (ingridient === 'onion') {
        newElem.style.width = '40%';
        onionCount++;
        if (onionCount === 1) {
          newElem.style.left = 40 + 'px';
          newElem.style.bottom = currentBottomValue + 10 + 'px';
        } else if (onionCount % 2 === 0) {
          newElem.style.left = 158 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        } else if (onionCount % 2 === 1) {
          newElem.style.left = 40 + 'px';
          newElem.style.bottom = currentBottomValue + 10 + 'px';
        }
      }

      else if (ingridient === 'tomato') {
        newElem.style.width = '40%';
        tomatoCount++;
        newElem.style.left = 32 + 'px';
        if (tomatoCount === 1) {
          newElem.style.bottom = currentBottomValue + 'px';
        } else if (tomatoCount % 2 === 0) {
          newElem.style.left = 162 + 'px';
          newElem.style.bottom = currentBottomValue - 10 + 'px';
        } else if (tomatoCount % 2 === 1) {
          newElem.style.left = 32 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        }
      }

      else if (ingridient === 'cucumber') {
        newElem.style.width = '30%';
        cucumberCount++;
        if (cucumberCount === 1) {
          console.log(cucumberCount);
          newElem.style.left = 47 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        } else if (cucumberCount % 2 === 0) {
          console.log(cucumberCount);
          newElem.style.left = 177 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        } else if (cucumberCount % 2 === 1) {
          console.log(cucumberCount);
          newElem.style.left = 47 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        }
      }

      else if (ingridient === 'cheese') {
        newElem.style.left = 35 + 'px';
        newElem.style.bottom = currentBottomValue - 30 + 'px';
      }

      else if (ingridient === 'salad') {
        newElem.style.left = 33 + 'px';
        newElem.style.bottom = currentBottomValue + 'px';
      }

      else if (ingridient === 'bun') {
        newElem.style.left = 30 + 'px';
        newElem.style.bottom = currentBottomValue + 30 + 'px';
      }
    } else {
      // FOR BIG SCREENS
      if (ingridient === 'mayo') {
        newElem.style.left = 40 + 'px';
        newElem.style.bottom = currentBottomValue - 30 + 'px';
      }

      else if (ingridient === 'onion') {
        onionCount++;
        if (onionCount === 1) {
          newElem.style.left = 85 + 'px';
          newElem.style.bottom = currentBottomValue + 10 + 'px';
        }
        else if (onionCount % 2 === 0) {
          newElem.style.left = 265 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        }
        else if (onionCount % 2 === 1) {
          newElem.style.left = 85 + 'px';
          newElem.style.bottom = currentBottomValue + 10 + 'px';
        }
      }

      else if (ingridient === 'tomato') {
        tomatoCount++;
        newElem.style.left = 55 + 'px';
        if (tomatoCount === 1) {
          newElem.style.bottom = currentBottomValue + 'px';
        }
        else if (tomatoCount % 2 === 0) {
          newElem.style.left = 200 + 'px';
          newElem.style.bottom = currentBottomValue - 10 + 'px';
        }
        else if (tomatoCount % 2 === 1) {
          newElem.style.left = 55 + 'px';
          newElem.style.bottom = currentBottomValue + 'px';
        }
      }

      else if (ingridient === 'cucumber') {
        cucumberCount++;
        if (cucumberCount === 1) {
          console.log(cucumberCount);
          newElem.style.left = 120 + 'px';
          newElem.style.bottom = currentBottomValue + 30 + 'px';
        }
        else if (cucumberCount % 2 === 0) {
          console.log(cucumberCount);
          newElem.style.left = 280 + 'px';
          newElem.style.bottom = currentBottomValue + 20 + 'px';
        }
        else if (cucumberCount % 2 === 1) {
          console.log(cucumberCount);
          newElem.style.left = 120 + 'px';
          newElem.style.bottom = currentBottomValue + 30 + 'px';
        }
      }

      else if (ingridient === 'cheese') {
        newElem.style.left = 55 + 'px';
        newElem.style.bottom = currentBottomValue - 30 + 'px';
      }

      else if (ingridient === 'bun') {
        newElem.style.left = 50 + 'px';
        newElem.style.bottom = currentBottomValue + 30 + 'px';
      }

      else if (ingridient === 'salad') {
        newElem.style.left = 40 + 'px';
        newElem.style.bottom = currentBottomValue + 'px';
      }

      else if (ingridient === 'topbun') {
        newElem.style.left = 52 + 'px';
        newElem.style.bottom = currentBottomValue + 40 + 'px';
      }

      else {
        newElem.style.left = 55 + 'px';
        newElem.style.bottom = currentBottomValue + 'px';
      }
    }

    currentBottomValue += 10;
    burgerNewIngridientContainer.appendChild(newElem);
    animation(newElem);
    addSingleIngridientInfo(newElem);
    checkIfNotTooBigBurger();
  }

  // delete ingridient
  function minusIngridient(ingridient) {
    const elementsToRemove = burgerNewIngridientContainer.querySelectorAll(`[data-ingridient="${ingridient}"]`);
    const lastElement = elementsToRemove[elementsToRemove.length - 1];
    console.log(lastElement);
    if (lastElement) {
      lastElement.remove();
      updateIngridientPositions();
      deleteSingleIngridientInfo(ingridient);
    } else {
      return;
    }
    checkIfNotTooBigBurger();
  }

  // update ingridient positions
  function updateIngridientPositions() {
    // FOR SMALL SCREENS
    if (screenWidth < 626) {
      const elementsToUpdate = burgerNewIngridientContainer.querySelectorAll('[data-ingridient]');
      elementsToUpdate.forEach((elem, i) => {
        let ing = elem.getAttribute('data-ingridient');

        if (ing === 'mayo' || ing === 'cheese') {
          elem.style.bottom = `${(10 * i) - 15}px`;
        } else if (ing === 'onion') {
          elem.style.bottom = `${15 + (10 * i)}px`;
        } else if (ing === 'cucumber') {
          elem.style.bottom = `${5 + (10 * i)}px`;
        } else if (ing === 'bun') {
          elem.style.bottom = `${35 + (10 * i)}px`;
        }
        else {
          elem.style.bottom = `${5 + (10 * i)}px`;
        }
      });
      currentBottomValue = elementsToUpdate.length * 10 + 5;
    }
    //FOR BIG SCREENS
    else {
      const elementsToUpdate = burgerNewIngridientContainer.querySelectorAll('[data-ingridient]');
      elementsToUpdate.forEach((elem, i) => {
        let ing = elem.getAttribute('data-ingridient');

        if (ing === 'mayo' || ing === 'cheese') {
          elem.style.bottom = `${(10 * i) - 25}px`;
        } else if (ing === 'onion') {
          elem.style.bottom = `${15 + (10 * i)}px`;
        } else if (ing === 'cucumber') {
          elem.style.bottom = `${35 + (10 * i)}px`;
        } else if (ing === 'bun') {
          elem.style.bottom = `${35 + (10 * i)}px`;
        } else {
          elem.style.bottom = `${5 + (10 * i)}px`;
        }
      });
      currentBottomValue = elementsToUpdate.length * 10 + 5;
    }
  }

  function checkIfNotTooBigBurger() {
    const elementsToCheck = burgerNewIngridientContainer.querySelectorAll('[data-ingridient]');
    const elementsArray = Array.from(elementsToCheck);
    console.log(elementsArray.length);
    if (elementsArray.length > 30) {
      warningMessage.style.display = 'flex';
      warningMessage.style.animation = 'showwarning 1s';
    } else if (elementsArray.length <= 30) {
      warningMessage.style.display = 'none';
      warningMessage.style.animation = 'hidewarning 1s';
    }
  }



  // adding ingridient animation
  function animation(element) {

    if (imgsContainerHeight >= 627) {
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
    } else if (imgsContainerHeight < 627) {

      let difference = imgsContainerHeight - 740;
      console.log(difference);
      let translateY = 630 + difference;
      const animation = element.animate(
        [
          { transform: 'translate(0)' },
          { transform: `translate(0, ${translateY}px)` }
        ],
        {
          duration: 500
        }
      );

      animation.addEventListener('finish', function () {
        element.style.transform = `translate(0, ${translateY}px)`;
      });
    }

  }


  // update plusBtn value
  function updateInputPlus(btn) {
    const inputElement = btn.closest('.ingridients__qty-choice').querySelector('input');
    const currentValue = parseInt(inputElement.value);
    inputElement.value = isNaN(currentValue) ? 1 : currentValue + 1;
    console.log(currentValue);
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

  // add single ingridient info to summary block
  function addSingleIngridientInfo(element) {
    let elemForUpdate = element.getAttribute('data-ingridient');
    let elemCookingTime = ingredientsInfo[elemForUpdate].cookingMin;
    let elemWeight = ingredientsInfo[elemForUpdate].weightGrams;
    let elemKcal = ingredientsInfo[elemForUpdate].kcal;
    let elemPrice = ingredientsInfo[elemForUpdate].price;

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

    if (!totalPrice) {
      totalPrice = elemPrice;
    } else {
      totalPrice = totalPrice + elemPrice;
    }

    minutesToCook.textContent = totalCookingTime;
    ingridientWeight.textContent = totalWeight;
    ingridientKcal.textContent = totalKcal;
    burgerPrice.textContent = totalPrice.toFixed(2);
  }

  // delete single ingridient info from summary block
  function deleteSingleIngridientInfo(element) {
    let elemForUpdate = element;
    let elemCookingTime = ingredientsInfo[elemForUpdate].cookingMin;
    let elemWeight = ingredientsInfo[elemForUpdate].weightGrams;
    let elemKcal = ingredientsInfo[elemForUpdate].kcal;
    let elemPrice = ingredientsInfo[elemForUpdate].price;

    if (totalCookingTime === 0 || totalWeight === 0 || totalKcal === 0) {
      minutesToCook.textContent = totalCookingTime;
      ingridientWeight.textContent = totalWeight;
      ingridientKcal.textContent = totalKcal;
      totalPrice.textContent = (Math.abs(totalPrice)).toFixed(2);
    } else {
      totalCookingTime = totalCookingTime - elemCookingTime;
      totalWeight = totalWeight - elemWeight;
      totalKcal = totalKcal - elemKcal;
      totalPrice = totalPrice - elemPrice;
    }

    minutesToCook.textContent = totalCookingTime;
    ingridientWeight.textContent = totalWeight;
    ingridientKcal.textContent = totalKcal;
    burgerPrice.textContent = (Math.abs(totalPrice)).toFixed(2);
  }





  // toggle modal window
  let finish;
  function showModalWindow() {
    createNewIngridient('topbun');
    plusIngridient('topbun');
    finish = setInterval(() => {
      burgerConstructorSection.style.filter = 'blur(5px)';
      checkoutModalWindow.style.display = 'block';
    }, 1400);
  }

  function closeModalWindow() {
    burgerConstructorSection.style.filter = 'none';
    checkoutModalWindow.style.display = 'none';
    clearInterval(finish);
  }

  function toggleMenu(menu, btn) {
    menu.classList.toggle('active');
    btn.classList.toggle('active');
  }

  // event listeners

  dropMenuDesktopBtn.addEventListener('click', () => {
    toggleMenu(dropMenuDesktop, dropMenuDesktopBtn);
  });

  dropMenuMobileBtn.addEventListener('click', () => {
    toggleMenu(dropMenuMobile, dropMenuMobileBtn);
  });

  makeBurgerBtn.addEventListener('click', showBurgerConstructor);
  makeBurgerHeaderBtn.addEventListener('click', showBurgerConstructor);
  headerLink.addEventListener('click', showMainPage);

  ketchupBtn.addEventListener('click', () => {
    addSingleIngridientInfo(ketchupIngridient);
    const ketchupAddedNotification = document.getElementById('ketchup-added');
    ketchupAddedNotification.style.animation = 'fadeInFromNone 2s';
    ketchupBtn.disabled = true;

    setTimeout(function () {
      ketchupAddedNotification.style.animation = 'none';
      ketchupBtn.disabled = false;
    }, 2000);
  });

  checkoutBtn.addEventListener('click', showModalWindow);
  finishBtn.addEventListener('click', () => {
    modalWindowContent.style.display = 'none';
    modalWindowConfirmation.style.display = 'block';
    setInterval(() => {
      closeModalWindow();
    }, 3000);
    checkoutBtn.disabled = true;
  });

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

  modalCloseBtn.forEach((btn) => {
    btn.addEventListener('click', closeModalWindow);
  });

  // burgerMenuBtn.addEventListener('click', toggleMobileMenu);

});
