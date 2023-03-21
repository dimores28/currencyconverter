<template>
   <div class="modal">
      <div class="modal__overlay" @click="close">
         <div class="modal__body" @click.stop>
            <div class="modal__header">
               <slot name="header"> default header </slot>
            </div>
            <div class="modal__main">
               <slot> default body </slot>
            </div>
            <div class="modal__footer">
               <slot name="footer">
                  <button @click="close">OK</button>
               </slot>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'modal',
   emits: {
      close: null
   },
   methods: {
      close() {
         this.$emit('close');
      }
   }
};
</script>

<style lang="less" scoped>
.modal {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;

   &__overlay {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #000000af;
      padding: 20px;
      display: flex;
      align-items: center;
   }

   &__body {
      background: #fefefe;
      max-width: 600px;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #888;
      margin-left: auto;
      margin-right: auto;
      flex: 1 1 auto;
   }

   &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
   }
}
</style>
