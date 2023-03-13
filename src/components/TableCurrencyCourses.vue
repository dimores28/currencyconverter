<template>
   <div class="course-table">
      <div class="currency-interest">
         <select class="currency-select" id="currency" v-model="currency">
            <option
               v-for="ticker in currencyTickerList"
               :key="ticker"
               :value="ticker">
               {{ ticker }}
            </option>
         </select>
      </div>

      <div class="list-currencies">
         <table class="table">
            <tbody>
               <tr v-for="row in getTable" :key="row.ticker">
                  <td class="table__cell table__col">{{ row.ticker }}</td>
                  <td class="table__cell table__row">{{ row.price }}</td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>
import { getCyrency, getFiatCyrencys } from '../api/cryptocompareApi.js';
export default {
   name: 'TableCourses',
   data() {
      return {
         currency: 'USD',
         currencies: null
      };
   },
   computed: {
      currencyTickerList() {
         return getFiatCyrencys();
      },
      getTable() {
         let table = [];

         if (this.currencies) {
            let arr = Object.keys(this.currencies);

            arr.forEach((item) => {
               table.push({
                  ticker: item,
                  price: this.currencies[item][this.currency]
               });
            });
         }

         return table;
      }
   },
   methods: {},
   mounted() {
      getCyrency().then((response) => {
         this.currencies = response;
      });
   }
};
</script>

<style lang="less" scoped>
.course-table {
   margin-top: 30px;
}
.currency-select {
   display: block;
   height: calc(1.5em + 0.75rem + 2px);
   padding: 0.375rem 0.75rem;
   width: 300px;
   font-size: 1rem;
   font-weight: 400;
   line-height: 1.5;
   color: #495057;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid #ced4da;
   outline: none;
   border-radius: 0.75rem;
   margin: 0 auto;
}

.table {
   margin: 0 auto;
   margin-top: 20px;

   &__cell {
      border: 1px solid #ced4da;
      padding: 0.375rem 0.75rem;
   }

   &__row {
      min-width: 240px;
      text-align: right;
   }
}

@media (max-width: 380px) {
   .currency-select {
      width: 260px;
   }
   .table {
      overflow-x: scroll;

      &__row {
         min-width: unset;
      }
   }
}
</style>
