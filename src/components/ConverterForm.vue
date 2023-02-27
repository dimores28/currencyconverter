<template>
   <div class="converter-form converter">
      <div class="converter__row">
         <div class="converter__group">
            <label for="inputFiatMoney" class="converter__label"
               >Fiat money</label
            >
            <input
               type="text"
               class="converter__input converter__control"
               id="inputFiatMoney" />
         </div>
         <div class="converter__group">
            <label for="curensyTicker" class="converter__label">ticker</label>
            <select
               id="curensyTicker"
               class="converter__select converter__control">
               <option selected>USD</option>
               <option>EUR</option>
               <option>UAH</option>
            </select>
         </div>
      </div>

      <div class="converter__row">
         <div class="converter__group">
            <label for="inputFiatMoney" class="converter__label"
               >Fiat money</label
            >
            <input
               type="text"
               class="converter__input converter__control"
               id="inputFiatMoney" />
         </div>
         <div class="converter__group">
            <label for="curensyTicker" class="converter__label">ticker</label>
            <select
               id="curensyTicker"
               class="converter__select converter__control">
               <option selected>USD</option>
               <option>EUR</option>
               <option>UAH</option>
            </select>
         </div>
      </div>
   </div>
</template>

<script></script>

<style lang="less" scoped>
.converter {
   display: flex;

   &__row {
      display: flex;
      flex-wrap: wrap;
      margin-right: 50px;
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
      border-radius: 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   }

   &__select {
      margin-left: 20px;
      height: 52px;
      padding-right: 5px;
   }
}
</style>
