<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Xac nhan</h2>
      <p>Ban co chac chan muon xoa san pham nay ?????</p>
      <div>
        <button @click="confirmDelete">Yes</button>
        <button @click="$emit('close')">No</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { defineProps } from "vue";

const props = defineProps({
  productId: Number,
  onDelete: Function,
});

const confirmDelete = () => {
  props.onDelete(props.productId);
  $emit("close");
};
</script>
  
  <style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

button {
  margin: 5px;
  padding: 10px 20px;
}

</style>
  