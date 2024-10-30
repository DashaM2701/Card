document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".main_cards-wrapper"),t=document.querySelector(".basket_card-wrapper"),a=document.querySelector(".basket_order_total-price"),n=document.querySelector(".total_quality"),s=document.querySelector(".basket_img"),r=document.querySelector(".carbon"),c=document.querySelector(".basket_order"),l=document.querySelector(".basket_desc"),i=document.querySelector(".basket").querySelector(".order_btn"),d=document.querySelector(".overlay"),o=document.querySelector(".basket_modal"),y=o.querySelector(".basket_wrapper-goods");o.querySelector(".basket_wrapper-order-btn");let p=[];function u(e,t,a,n){let s=p.find((t=>t.name===e));if(s){const t=s.quantity+a;t>0?s.quantity=t:p=p.filter((t=>t.name!==e))}else a>0&&p.push({name:e,price:t,quantity:a,image:n});m(),b(),v(),document.querySelectorAll(".card_add-wraper").forEach((e=>{const t=e.closest(".card").querySelector(".card_desc-title").innerText,a=p.find((e=>e.name===t)),n=e.querySelector(".card_add"),s=e.querySelector(".backet_card_switch");n&&s&&(a?(n.style.display="none",s.style.display="block"):(n.style.display="flex",s.style.display="none"))}))}function b(){const e=p.map((e=>({name:e.name,price:e.price,quantity:e.quantity,image:e.image})));y.innerHTML="";let t=0;e.forEach((e=>{const a=` \n         <div class="basket_wrapper-card">\n         <div class="basket_wrapper-card-inner">\n                <img class="basket_wrapper-card-img" src="${e.image}" alt="${e.name}">\n                <div class="basket_wrapper-card-item">\n                  <h4 class="basket_wrapper-title">${e.name}</h4>\n                <div class="basket_wrapper-desc">\n                  <div class="basket_wrapper-quality">${e.quantity}</div>\n                  <div class="basket_wrapper-price">@ $${e.price.toFixed(2)}</div>\n                </div>\n                </div>\n                </div>\n                <span class="basket_wrapper-total-price">$${(e.quantity*e.price).toFixed(2)}</span>\n                \n              </div>\n              <div class="separator"></div> \n             \n  \n              `;y.insertAdjacentHTML("beforeend",a),t+=e.quantity*e.price,o.querySelector(".basket_wrapper-order-price").innerText=`$${t.toFixed(2)}`}))}function m(){t.innerHTML="",p.forEach((e=>{const a=` <div class="basket_card">\n          \n            <h4 class="basket_card-title">${e.name}</h4>\n            <div class="basket_row">\n              <span class="basket_quantity">${e.quantity}</span>\n              <span class="basket_price">&#64; $${e.price.toFixed(2)}</span>\n              <span class="basket_total">$${(e.quantity*e.price).toFixed(2)}</span>\n            </div>\n            <button class="basket_close"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>\n            <div class="separator"></div>\n          </div>`;t.insertAdjacentHTML("beforeend",a)})),t.addEventListener("click",(e=>{const t=e.target.closest(".basket_close");if(t){const e=t.closest(".basket_card"),a=e.querySelector(".basket_card-title").innerText;p=p.filter((e=>e.name!==a)),e.remove(),m(),_(a),v(),b()}}))}function _(e){const t=[...document.querySelectorAll(".card")].find((t=>t.querySelector(".card_desc-title").innerText===e));if(t){const e=t.querySelector(".card_add-wraper"),a=t.querySelector(".backet_card_switch"),n=t.querySelector(".card_img");e.style.display="flex",a.style.display="none",n.classList.remove("card_img--active"),a.querySelector(".quantity").innerText=1}}function v(){let e=0;const d=t.querySelectorAll(".basket_card");0===d.length?(s.style.display="block",n.innerText=0,i.style.display="none",r.style.display="none",c.style.display="none",l.style.display="block"):(s.style.display="none",i.style.display="block",r.style.display="flex",c.style.display="flex",l.style.display="none"),d.forEach((t=>{const a=parseFloat(t.querySelector(".basket_price").innerText.replace(/[^0-9.]/g,"")),n=parseInt(t.querySelector(".basket_quantity").innerText,10);isNaN(a)||isNaN(n)||(e+=a*n)})),a.innerText=` $${e.toFixed(2)}`,q()}function q(){let e=0;t.querySelectorAll(".basket_card").forEach((t=>{const a=t.querySelector(".basket_quantity").innerText;e+=parseInt(a,10)})),n.innerText=e}i.addEventListener("click",(()=>{d.style.display="block",o.style.display="block",document.body.style.overflow="hidden"})),d.addEventListener("click",(()=>{d.style.display="none",o.style.display="none",document.body.style.overflow=""})),async function(){try{const t=await fetch("https://dl.dropboxusercontent.com/scl/fi/89f3rxasuiybg8u3tkseu/data.json?rlkey=glogl53p7unnqi7672uli7jgq"),a=await t.json();!function(t){e.innerHTML=t.map((e=>`\n   <div class="card">\n          <div class="card_img-wrapper">\n            <img src="${function(e){const t=window.innerWidth;return t<=480?e.mobile:t<=768?e.tablet:e.desktop}(e.image)}" alt="${e.name}" class="card_img">\n            <div data-card class="card_add-wraper">\n              <img src="assets/images/icon-add-to-cart.svg" alt="">\n              <button data-card class="card_add">Add to Cart</button>\n            </div>\n            <div class="backet_card_switch" style="display: none;">\n              <div class="quantity-control">\n                <button class="btn-minus" data-action="minus">\n                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" \n                  viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>\n              </button>\n                <span class="quantity" data-counter>1</span>\n                    \n                <button class="btn-plus" data-action="plus">\n                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" \n                fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>\n              </button>\n              </div>\n            </div>\n          </div>\n          <div class="card_desc">\n            <span class="card_desc_category">${e.category}</span>\n            <h2 class="card_desc-title">${e.name}</h2>\n            <span class="card_desc-price">$${e.price.toFixed(2)}</span>\n          </div>\n        </div>\n          `)).join("")}(a.menu),function(e){document.querySelectorAll(".card_add-wraper").forEach(((t,a)=>{t.addEventListener("click",(n=>{const s=n.target.closest(".card_img-wrapper"),r=s.querySelector(".backet_card_switch"),c=s.querySelector(".card_img");t.style.display="none",r.style.display="block",c.classList.add("card_img--active"),t.setAttribute("data-in-cart","true");const l=s.closest(".card").querySelector(".card_desc-title").innerText,i=parseFloat(s.closest(".card").querySelector(".card_desc-price").innerText.replace("$","")),d=e[a].image.thumbnail;let o=1;u(l,i,o,d);const y=s.querySelector(".btn-plus"),p=s.querySelector(".btn-minus"),b=s.querySelector(".quantity");y.replaceWith(y.cloneNode(!0)),p.replaceWith(p.cloneNode(!0));const m=s.querySelector(".btn-plus"),k=s.querySelector(".btn-minus");m.addEventListener("click",(()=>{o++,b.textContent=o,u(l,i,1),v(),q()})),k.addEventListener("click",(()=>{o>1?(o--,b.textContent=o,u(l,i,-1)):1===o&&(o=0,t.style.display="flex",r.style.display="none",c.classList.remove("card_img--active"),u(l,i,-1),_(l)),v(),q()}))}))}))}(a.menu),b()}catch(e){console.error("Ошибка при получении меню:",e)}}(),v(),q()}));