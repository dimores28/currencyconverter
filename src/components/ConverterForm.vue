<template>
   <div class="">
      <div class="converter-form converter" :class="reverse ? 'reverse' : ''">
         <div class="converter__row">
            <div class="converter__group">
               <label for="inputFiatMoney" class="converter__label"
                  >Fiat money</label
               >
               <input
                  type="text"
                  class="converter__input converter__control"
                  id="inputFiatMoney"
                  v-model="inputFiatMoney" />
            </div>
            <div class="converter__group">
               <label for="curensyTicker" class="converter__label"
                  >ticker</label
               >
               <select
                  id="curensyTicker"
                  class="converter__select converter__control"
                  v-model="currensyTicker"
                  @change="updete">
                  <option
                     v-for="ticker in currensyTickerList"
                     :key="ticker"
                     :value="ticker">
                     {{ ticker }}
                  </option>
               </select>
            </div>
         </div>

         <button class="converter-swap" @click="swap">
            <svg
               width="24px"
               height="24px"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M19.75 16C19.75 16.41 19.41 16.75 19 16.75H6.81L8.03 17.97C8.32 18.26 8.32 18.74 8.03 19.03C7.88 19.18 7.69 19.25 7.5 19.25C7.31 19.25 7.12 19.18 6.97 19.03L4.47 16.53C4.4 16.46 4.35 16.38 4.31 16.29C4.23 16.11 4.23 15.9 4.31 15.72C4.35 15.63 4.4 15.55 4.47 15.48L6.97 12.98C7.26 12.69 7.74 12.69 8.03 12.98C8.32 13.27 8.32 13.75 8.03 14.04L6.81 15.26H19C19.41 15.26 19.75 15.6 19.75 16.01V16ZM5 8.75001H17.19L15.97 9.97001C15.68 10.26 15.68 10.74 15.97 11.03C16.12 11.18 16.31 11.25 16.5 11.25C16.69 11.25 16.88 11.18 17.03 11.03L19.53 8.53001C19.6 8.46001 19.65 8.38001 19.69 8.29001C19.77 8.11001 19.77 7.90001 19.69 7.72001C19.65 7.63001 19.6 7.55001 19.53 7.48001L17.03 4.98001C16.74 4.69001 16.26 4.69001 15.97 4.98001C15.68 5.27001 15.68 5.75001 15.97 6.04001L17.19 7.26001H5C4.59 7.26001 4.25 7.60001 4.25 8.01001C4.25 8.42001 4.59 8.76001 5 8.76001V8.75001Z"
                  fill="#000000" />
            </svg>
         </button>

         <div class="converter__row">
            <div class="converter__group">
               <label for="inputCryptoMoney" class="converter__label"
                  >Crypto money</label
               >
               <input
                  type="text"
                  class="converter__input converter__control"
                  id="inputCryptoMoney"
                  v-model="inputCryptoMoney" />
            </div>
            <div class="converter__group">
               <label for="cryptoTicker" class="converter__label">ticker</label>
               <select
                  id="cryptoTicker"
                  class="converter__select converter__control"
                  v-model="cryptoTicker"
                  @change="updete">
                  <option
                     v-for="ticker in cryptoTickerList"
                     :key="ticker"
                     :value="ticker">
                     {{ ticker }}
                  </option>
               </select>
            </div>
         </div>
      </div>
      <div v-if="exceededLimit" class="alert-danger">
         <p>Limit is exceeded!</p>
      </div>
   </div>
</template>

<script>
import { getCyrency } from '../api/cryptocompareApi.js';

export default {
   name: 'converter-form',
   data() {
      return {
         inputFiatMoney: 1,
         inputCryptoMoney: 0,
         currensyTicker: 'USD',
         cryptoTicker: 'BTC',
         currencies: null,
         reverse: false,
         exceededLimit: false
      };
   },
   computed: {
      cryptoTickerList() {
         if (this.currencies) {
            let arr = Object.keys(this.currencies);
            return arr;
         } else {
            return [];
         }
      },
      currensyTickerList() {
         if (this.currencies) {
            let currenciesArr = Object.entries(this.currencies);
            let arr = Object.keys(currenciesArr[0][1]);

            return arr;
         } else {
            return [];
         }
      }
   },
   methods: {
      updete() {
         this.exceededLimit = this.amountLimit(10000, 'USD');
         // if (this.exceededLimit) return;

         if (this.currencies) {
            if (this.reverse) {
               this.inputFiatMoney =
                  this.inputCryptoMoney *
                  this.currencies[this.cryptoTicker][this.currensyTicker];
            } else {
               this.inputCryptoMoney = parseFloat(
                  this.inputFiatMoney /
                     this.currencies[this.cryptoTicker][this.currensyTicker]
               ).toFixed(17);
            }
         }
      },
      swap() {
         this.reverse = !this.reverse;
      },
      amountLimit(limit, currency) {
         let currentSum =
            this.inputCryptoMoney *
            this.currencies[this.cryptoTicker][currency];

         return currentSum > limit;
      }
   },
   watch: {
      inputFiatMoney() {
         if (isNaN(this.inputFiatMoney)) {
            this.inputFiatMoney = '';
         }
         this.updete();
      },
      inputCryptoMoney() {
         if (isNaN(this.inputCryptoMoney)) {
            this.inputCryptoMoney = '';
         }

         this.updete();
      },
      reverse() {
         if (this.reverse) {
            this.inputCryptoMoney = 1;
         } else {
            this.inputFiatMoney = 1;
         }

         this.updete();
      }
   },
   mounted() {
      getCyrency().then((response) => {
         this.currencies = response;
         this.updete();
      });
   }
};
</script>

<style lang="less" scoped>
.converter {
   display: flex;
   justify-content: center;
   align-items: center;

   &__row {
      display: flex;
      // flex-wrap: wrap;
   }

   &__group {
      margin-bottom: 1rem;
   }

   &__label {
      font-size: 0;
   }

   &__control {
      display: block;
      height: calc(1.5em + 0.75rem + 2px);
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      outline: none;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   }

   &__control:active,
   &__control:focus {
      box-shadow: #9ec6fa42 0px 1px 4px, #9ec6fa 0px 0px 0px 3px;
   }

   &__input {
      width: 100%;
      border-right: none;
      border-top-left-radius: 0.75rem;
      border-bottom-left-radius: 0.75rem;
   }

   &__select {
      padding-right: 36px;
      border-top-right-radius: 0.75rem;
      border-bottom-right-radius: 0.75rem;
      -moz-appearance: none; /* Firefox */
      -webkit-appearance: none; /* Safari and Chrome */
      appearance: none;
      background-image: url('../assets/images/angle.svg');
      background-repeat: no-repeat;
      background-position: 85% center;
   }
}
.converter-swap {
   margin: 0 14px;
   display: block;
   border: none;
   padding: 0.375rem 0.75rem;
   background: transparent;
   cursor: pointer;

   &:active,
   &:focus {
      box-shadow: #9ec6fa42 0px 1px 4px, #9ec6fa 0px 0px 0px 3px;
   }
}

.reverse {
   flex-direction: row-reverse;
}

@media screen and (max-width: 720px) {
   .converter {
      flex-direction: column;
   }

   .converter-swap {
      max-width: 60px;
   }

   .reverse {
      flex-direction: column-reverse;
   }
}

@media screen and (max-width: 360px) {
   .converter {
      transform: scale(90%);
   }
}

.alert-danger {
   margin-top: 20px;
   margin-bottom: 1rem;
   padding: 1rem;
   background-color: #f8d7da;
   color: #b02a37;
   border-radius: 0.4rem;
   border: 1px solid #f1aeb5;
}
</style>
