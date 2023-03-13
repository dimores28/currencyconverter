<template>
   <div class="container">
      <converter-form></converter-form>
      <table-currency-courses></table-currency-courses>
   </div>
</template>

<script>
import ConverterForm from '@/components/ConverterForm';
import TableCurrencyCourses from './components/TableCurrencyCourses.vue';

export default {
   components: {
      ConverterForm,
      TableCurrencyCourses
   }
};
</script>

<style lang="less">
@import url('assets/less/_reset.less');
@import url('assets/less/_normalize.less');

.container {
   max-width: 1180px;
   margin: 0 auto;
   padding: 20px;
}
</style>
