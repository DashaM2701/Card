
document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.querySelector(".main_cards-wrapper");
    const basketWrapper = document.querySelector(".basket_card-wrapper");
    const totalPrice = document.querySelector(".basket_order_total-price");
    const totalQuality = document.querySelector(".total_quality");
    const emptyCartMessage = document.querySelector(".basket_img");
    const carbon = document.querySelector(".carbon");
    const basketOrder = document.querySelector(".basket_order");
    const backetDesc = document.querySelector(".basket_desc");
    const basket = document.querySelector(".basket");
    const orderBtn = basket.querySelector(".order_btn");
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".basket_modal");
    const modalWrapper = modal.querySelector('.basket_wrapper-goods');
    const clearCartButton = modal.querySelector(".basket_wrapper-order-btn");
  
  
    let basketItems = [];
    
  
    async function getMenu() {
      try {
        const response = await fetch("https://dl.dropboxusercontent.com/scl/fi/89f3rxasuiybg8u3tkseu/data.json?rlkey=glogl53p7unnqi7672uli7jgq");
        const data = await response.json();
        
        
        renderMenu(data.menu);
        addEventListenersToButtons(data.menu);
        renderModalBasket();
      } catch (error) {
        console.error("Ошибка при получении меню:", error);
      }
    }
  
    orderBtn.addEventListener("click", () => {
      overlay.style.display = "block";
      modal.style.display = "block";
     
      document.body.style.overflow = "hidden";
    });
  
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  
    function renderMenu(data) {
      menuContainer.innerHTML = data
        .map(
          (item) => `
   <div class="card">
          <div class="card_img-wrapper">
            <img src="${selectImage(item.image)}" alt="${item.name}" class="card_img">
            <div data-card class="card_add-wraper">
              <img src="/assets/images/icon-add-to-cart.svg" alt="">
              <button data-card class="card_add">Add to Cart</button>
            </div>
            <div class="backet_card_switch" style="display: none;">
              <div class="quantity-control">
                <button class="btn-minus" data-action="minus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" 
                  viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
              </button>
                <span class="quantity" data-counter>1</span>
                    
                <button class="btn-plus" data-action="plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" 
                fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </button>
              </div>
            </div>
          </div>
          <div class="card_desc">
            <span class="card_desc_category">${item.category}</span>
            <h2 class="card_desc-title">${item.name}</h2>
            <span class="card_desc-price">$${item.price.toFixed(2)}</span>
          </div>
        </div>
          `
        )
        .join("");
    }
  
    function selectImage(images) {
      const screenWidth = window.innerWidth;
    
      if (screenWidth <= 480) {
      
  
        return images.mobile;
      } else if (screenWidth <= 768) {
        return images.tablet;
      } else {
        return images.desktop;
      }
    }
  
  
  
    getMenu();
    updateTotal();
    updateQuality();
  
   
    function renderMenuState() {
      const buyButtons = document.querySelectorAll(".card_add-wraper");
    
      buyButtons.forEach((button) => {
        const productName = button.closest(".card").querySelector(".card_desc-title").innerText;
        const itemInBasket = basketItems.find(item => item.name === productName);
    
        const addButton = button.querySelector(".card_add");
        const quantitySwitcher = button.querySelector(".backet_card_switch");
    
        if (addButton && quantitySwitcher) {
          if (itemInBasket) {
            addButton.style.display = "none"; // Скрываем кнопку "Add to Cart"
            quantitySwitcher.style.display = "block"; // Показываем переключатель количества
          } else {
            addButton.style.display = "flex"; // Показываем кнопку "Add to Cart"
            quantitySwitcher.style.display = "none"; // Скрываем переключатель
          }
        } 
      });
    }
    
    
    function updateBasket(name, price, quantityChange, image) {
      let itemInBasket = basketItems.find((item) => item.name === name);
    
      if (itemInBasket) {
        const newCounter = itemInBasket.quantity + quantityChange;
        if (newCounter > 0) {
          itemInBasket.quantity = newCounter;
        } else {
          basketItems = basketItems.filter((item) => item.name !== name);
        }
      } else if (quantityChange > 0) {
        basketItems.push({ name, price, quantity: quantityChange, image });
      }
      renderBasket();
      renderModalBasket();
      updateTotal();
      renderMenuState();
    }
    
    function addEventListenersToButtons(data) {
      const buyButtons = document.querySelectorAll(".card_add-wraper");
    
      buyButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
          const cardWrapper = e.target.closest(".card_img-wrapper");
          const changeButton = cardWrapper.querySelector(".backet_card_switch");
          const cardImg = cardWrapper.querySelector(".card_img");
    
          button.style.display = "none";
          changeButton.style.display = "block";
          cardImg.classList.add("card_img--active");
    
          button.setAttribute('data-in-cart', 'true');
  
          const productName = cardWrapper
            .closest(".card")
            .querySelector(".card_desc-title").innerText;
          const productPrice = parseFloat(
            cardWrapper
              .closest(".card")
              .querySelector(".card_desc-price")
              .innerText.replace("$", "")
          );
          const thumbnailImg = data[index].image.thumbnail;
          let counter = 1;
    
          updateBasket(productName, productPrice, counter, thumbnailImg);
          
             const plus = cardWrapper.querySelector(".btn-plus");
          const minus = cardWrapper.querySelector(".btn-minus");
          const counterDisplay = cardWrapper.querySelector(".quantity");
  
          // Удаление предыдущих слушателей событий
          plus.replaceWith(plus.cloneNode(true));
          minus.replaceWith(minus.cloneNode(true));
  
          const newPlus = cardWrapper.querySelector(".btn-plus");
          const newMinus = cardWrapper.querySelector(".btn-minus");
  
          newPlus.addEventListener("click", () => {
            counter++;
            counterDisplay.textContent = counter;
            updateBasket(productName, productPrice, 1);
            updateTotal();
            updateQuality();
          });
  
          newMinus.addEventListener("click", () => {
            if (counter > 1) {
              counter--;
              counterDisplay.textContent = counter;
              updateBasket(productName, productPrice, -1);
            } else if (counter === 1) {
              counter = 0;
              button.style.display = "flex";
              changeButton.style.display = "none";
              cardImg.classList.remove("card_img--active");
              updateBasket(productName, productPrice, -1);
              resetCardState(productName);
            }
            updateTotal();
            updateQuality();
          });
        
        });
      });
    }
    
    function renderModalBasket() {
      // Очищаем содержимое модального окна перед добавлением новых элементов
      const modalBasketItems = basketItems.map(item => ({
        name: item.name,
        
        price: item.price,
        quantity: item.quantity,
        image: item.image
        
      }));
  
  
      
      modalWrapper.innerHTML = "";
  
      let totalModalPrice = 0;
      modalBasketItems.forEach((item) => {
        
        const modalItemHtml = 
         ` 
         <div class="basket_wrapper-card">
         <div class="basket_wrapper-card-inner">
                <img class="basket_wrapper-card-img" src="${item.image}" alt="${item.name}">
                <div class="basket_wrapper-card-item">
                  <h4 class="basket_wrapper-title">${item.name}</h4>
                <div class="basket_wrapper-desc">
                  <div class="basket_wrapper-quality">${item.quantity}</div>
                  <div class="basket_wrapper-price">@ $${item.price.toFixed(
                    2
                  )}</div>
                </div>
                </div>
                </div>
                <span class="basket_wrapper-total-price">$${(
                  item.quantity * item.price
                ).toFixed(2)}</span>
                
              </div>
              <div class="separator"></div> 
             
  
              `
        ;
        modalWrapper.insertAdjacentHTML("beforeend", modalItemHtml);
  
        totalModalPrice += (item.quantity * item.price);
  
        const orderTotalElement = modal.querySelector('.basket_wrapper-order-price');
        orderTotalElement.innerText = `$${totalModalPrice.toFixed(2)}`; 
      });
    }
  
    
  
    function renderBasket() {
      basketWrapper.innerHTML = "";
      basketItems.forEach((item) => {
        const cardItemHtml = 
         ` <div class="basket_card">
          
            <h4 class="basket_card-title">${item.name}</h4>
            <div class="basket_row">
              <span class="basket_quantity">${item.quantity}</span>
              <span class="basket_price">&#64; $${item.price.toFixed(2)}</span>
              <span class="basket_total">$${(item.quantity * item.price).toFixed(
                2
              )}</span>
            </div>
            <button class="basket_close"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
            <div class="separator"></div>
          </div>`
        ;
  
        basketWrapper.insertAdjacentHTML("beforeend", cardItemHtml);
      });
  
      basketWrapper.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".basket_close");
        if (removeBtn) {
          const card = removeBtn.closest(".basket_card");
          const productName = card.querySelector(".basket_card-title").innerText;
  
          basketItems = basketItems.filter((item) => item.name !== productName);
          card.remove();
          renderBasket();
          resetCardState(productName);
          updateTotal();
          renderModalBasket()
        }
      });
    }
  
    function resetCardState(productName) {
      const card = [...document.querySelectorAll(".card")].find(
        (item) => item.querySelector(".card_desc-title").innerText === productName
      );
      if (card) {
        const addButtonWrapper = card.querySelector(".card_add-wraper");
        const quantitySwitcher = card.querySelector(".backet_card_switch");
        const cardImg = card.querySelector(".card_img");
  
        addButtonWrapper.style.display = "flex";
        quantitySwitcher.style.display = "none";
        cardImg.classList.remove("card_img--active");
        quantitySwitcher.querySelector(".quantity").innerText = 1;
      }
    }
  
    function updateTotal() {
      let total = 0;
      const items = basketWrapper.querySelectorAll(".basket_card");
  
      if (items.length === 0) {
        emptyCartMessage.style.display = "block";
        totalQuality.innerText = 0;
        orderBtn.style.display = "none";
        carbon.style.display = "none";
        basketOrder.style.display = "none";
        backetDesc.style.display = "block";
      } else {
        emptyCartMessage.style.display = "none";
        orderBtn.style.display = "block";
        carbon.style.display = "flex";
        basketOrder.style.display = "flex";
        backetDesc.style.display = "none";
      }
  
      items.forEach((item) => {
        const price = parseFloat(
          item.querySelector(".basket_price").innerText.replace(/[^0-9.]/g, "")
        );
        const quantity = parseInt(
          item.querySelector(".basket_quantity").innerText,
          10
        );
        if (!isNaN(price) && !isNaN(quantity)) {
          total += price * quantity;
        }
      });
  
      totalPrice.innerText =` $${total.toFixed(2)}`;
      updateQuality();
    }
  
    function updateQuality() {
      let totalItems = 0;
      const items = basketWrapper.querySelectorAll(".basket_card");
      items.forEach((item) => {
        const quantityText = item.querySelector(".basket_quantity").innerText;
        totalItems += parseInt(quantityText, 10);
      });
      totalQuality.innerText = totalItems;
    }
    
  });