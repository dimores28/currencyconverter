<template>
   <div class="container">
      <converter-form></converter-form>
   </div>
</template>

<script>
import ConverterForm from '@/components/ConverterForm';

export default {
   components: {
      ConverterForm
   }
};
</script>

<style lang="less">
.container {
   max-width: 1180px;
   margin: 0 auto;
   padding: 20px;
}
</style>
