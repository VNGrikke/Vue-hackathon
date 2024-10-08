<template>
  <div class="modal">
    <div>
      <h2>{{ isEditMode ? "Edit Product" : "Add New Product" }}</h2>

      <input
        type="text"
        v-model="localProduct.name"
        placeholder="Product Name"
      />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
      <br />

      <input
        type="text"
        v-model="localProduct.image"
        placeholder="Product Image URL"
      />
      <span v-if="errors.image" class="error">{{ errors.image }}</span>
      <br />

      <input
        type="number"
        v-model="localProduct.price"
        placeholder="Product Price"
      />
      <span v-if="errors.price" class="error">{{ errors.price }}</span>
      <br />

      <input
        type="number"
        v-model="localProduct.quantity"
        placeholder="Product Quantity"
      />
      <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
      <br />

      <button @click="save">
        {{ isEditMode ? "Save Changes" : "Add Product" }}
      </button>
      <button @click="$emit('close')">Cancel</button>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isEditMode: Boolean,
  currentProduct: Object,
  existingProducts: Array,
});

const emit = defineEmits(["save", "close"]);

const localProduct = ref({ ...props.currentProduct });
const errors = ref({});

watch(
  () => props.currentProduct,
  (newProduct) => {
    localProduct.value = { ...newProduct };
    errors.value = {};
  }
);

const validateProduct = () => {
  errors.value = {};

  if (!localProduct.value.name) {
    errors.value.name = "Khong duoc de trong.";
  } else if (
    props.existingProducts.some(
      (item) =>
        item.name === localProduct.value.name &&
        item.id !== localProduct.value.id
    )
  ) {
    errors.value.name = "Ten da duoc su dung.";
  }

  if (!localProduct.value.image) {
    errors.value.image = "Khong duoc de trong.";
  }

  if (localProduct.value.price < 10000) {
    errors.value.price = "Gia khong duoc nho hon 10,000.";
  }

  if (localProduct.value.quantity < 1 || localProduct.value.quantity > 100) {
    errors.value.quantity = "So luong nam trong khoang 1-100.";
  }

  return Object.keys(errors.value).length === 0;
};

const save = () => {
  if (validateProduct()) {
    emit("save", { ...localProduct.value });
  }
};
</script>
  
  <style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Làm mờ nền phía sau */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal div {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
  text-align: center; 
  animation: fadeIn 0.3s ease-in-out; 
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 15px;
  margin-top: 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; 
}

button:last-child {
  background-color: #6c757d; 
}

button:last-child:hover {
  background-color: #5a6268;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: -8px;
  display: block;
  text-align: left;
}

</style>
  