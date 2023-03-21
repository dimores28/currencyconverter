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

      <div class="group-btn">
         <button class="btn btn-outline-primary" @click="add">Add</button>
         <button
            class="btn btn-outline-primary"
            :class="isUpdate ? 'disabled' : ''"
            @click="update"
            :disabled="isUpdate">
            Update ({{ timeToUpdate }})
         </button>
      </div>
      <transition name="modal">
         <modal v-if="showModal" @close="closeModal"></modal>
      </transition>
   </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { getCyrency, getFiatCyrencys } from '../api/cryptocompareApi.js';
export default {
   name: 'TableCourses',
   components: {
      Modal
   },
   data() {
      return {
         currency: 'USD',
         currencies: null,
         isUpdate: false,
         timeToUpdate: 5,
         timerId: null,
         showModal: false
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
   methods: {
      add() {
         this.showModal = true;
      },
      closeModal() {
         this.showModal = false;
      },
      update() {
         getCyrency().then((response) => {
            this.currencies = response;
         });

         this.isUpdate = true;
         this.timeToUpdate = 5;
         this.timerId = setInterval(() => {
            this.timeToUpdate--;
         }, 1000);
      }
   },
   mounted() {
      getCyrency().then((response) => {
         this.currencies = response;
      });
   },
   watch: {
      timeToUpdate() {
         if (!this.timeToUpdate) {
            clearInterval(this.timerId);
            this.isUpdate = false;
         }
      }
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

.group-btn {
   text-align: center;
   margin-top: 20px;
}

.btn {
   display: inline-block;
   font-weight: 400;
   color: #212529;
   text-align: center;
   vertical-align: middle;
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
   background-color: transparent;
   border: 1px solid transparent;
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   line-height: 1.5;
   border-radius: 0.25rem;
   margin: 0 10px;
   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn:not(:disabled):not(.disabled) {
   cursor: pointer;
}

.btn-outline-primary {
   color: #007bff;
   border-color: #007bff;
}

.btn-outline-primary:hover {
   color: #fff;
   background-color: #007bff;
   border-color: #007bff;
}

.btn-outline-primary:not(:disabled):not(.disabled).active:focus,
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-primary.dropdown-toggle:focus {
   box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-outline-primary:not(:disabled):not(.disabled).active,
.btn-outline-primary:not(:disabled):not(.disabled):active,
.show > .btn-outline-primary.dropdown-toggle {
   color: #fff;
   background-color: #007bff;
   border-color: #007bff;
}

[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled),
button:not(:disabled) {
   cursor: pointer;
}

.disabled {
   cursor: unset;
   opacity: 0.7;
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

.modal-enter-from,
.modal-leave-to {
   opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
   -webkit-transform: scale(1.1);
   transform: scale(1.1);
}
</style>
