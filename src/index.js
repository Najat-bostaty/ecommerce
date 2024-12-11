window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import '@fortawesome/fontawesome-free/js/all.min';

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

document.querySelectorAll('.add-to-card-btn').forEach(item => {
   item.addEventListener("click", () =>{
      alert("أضيف المنتج إلى عربة الشراء")
   })   
})
 
document.querySelectorAll('.size-option input[type="radio"]').forEach(item =>{
   item.addEventListener('change', () => {
      document.querySelectorAll('.size-option').forEach(i => {
         i.classList.remove('active')
      })
      item.parentNode.parentNode.classList.add('active')
   })
})

document.querySelectorAll('.color-option input[type="radio"]').forEach(item =>{
   item.addEventListener('change', () => {
      document.querySelectorAll('.color-option').forEach(i => {
         i.classList.remove('active')
      })
      item.parentNode.parentNode.classList.add('active')
   })
})

//  حساب سعر إجمالي المنتج        

document.querySelectorAll('[data-product-quantity]').forEach(item => {
   item.addEventListener('change' , () => {
      const newquantity = item.value;
      const parent = item.closest('[data-product-info]');
      const PricePerUnit = parent.getAttribute('data-product-price');
      const totalPriceforProduct = newquantity * PricePerUnit
      parent.querySelector('.total-price-for-product').innerHTML = totalPriceforProduct + "$";
      
      CalculateTotalPrice()
   })
})

document.querySelectorAll('[data-remove-from-card]').forEach(item => {
    item.addEventListener('click' , () => {
        item.closest('[data-product-info]').remove()

        CalculateTotalPrice()
    })
})
function CalculateTotalPrice() {
   let totalPriceforAllProduct = 0;
   document.querySelectorAll('[data-product-info]').forEach(product => {
   const PricePerUnite = product.getAttribute('data-product-price');
   const quantity = product.querySelector('[data-product-quantity]').value;
   const totalPriceforProduct = PricePerUnite * quantity
   totalPriceforAllProduct = totalPriceforAllProduct + totalPriceforProduct;
   })
   document.getElementById('total-price-for-all-product').innerHTML = totalPriceforAllProduct + "$";
}

const   citiesByCountries = {
   sy: ['دمشق', 'حمص', 'حلب', 'حماة'],
   eg: ['القاهرة','الاسكندرية'],
   jo: ['عمان','الزرقاء'],
   so: ['جدة','الرياض'] 
}

document.querySelectorAll('select[name="country"]').forEach(item => {
   item.addEventListener('change', () => {
      const country = item.value

      const cities = citiesByCountries[country]

      document.querySelectorAll('#payment-cities option').forEach(option => option.remove())

      const firstoption = document.createElement('option')
      const optiontext = document.createTextNode('اختر المدينة')
      firstoption.appendChild(optiontext)
      firstoption.setAttribute('value','')
      firstoption.setAttribute('disabled','true')
      firstoption.setAttribute('selected','true')

      const city_option = document.getElementById('payment-cities')
      city_option.appendChild(firstoption)

      cities.forEach(city => {
         const newoption = document.createElement('option')
         const optiontext = document.createTextNode(city)
         newoption.appendChild(optiontext)
         newoption.setAttribute('value','city')

         city_option.appendChild(newoption)
      })
   })
})

// إخفاء و اظهار حقول إدخال البطاقة الإئتمانية  

document.querySelectorAll('#form-checkout input[name="payment-method"]').forEach(item => {
   document.addEventListener('change', () => {
     const paymentMethod = item.value;

     const creditCardInputs = document.querySelectorAll('#credit-card-info input');

     if(paymentMethod === 'on-delivery'){
         creditCardInputs.forEach(input => {
            input.style.display = 'none'
         })
     } else {
      creditCardInputs.forEach(input => {
         input.style.display ='block'
      })
     }
   })
})

document.getElementById("copyright").innerHTML = " جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear();