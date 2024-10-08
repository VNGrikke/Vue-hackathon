<template>
  <div>
    <div class="header-manager-product">
      <h1>Manager Product</h1>
      <div>
        <button @click="addProduct">Add Product</button> <br />
        <input type="text" v-model="searchText" placeholder="Search..." />
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredProducts" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="item.image"
              alt="Product Image"
              width="100"
              height="100"
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ VND.format(item.price) }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <button @click="editItem(item)">Edit</button>
            <button @click="openDeleteModal(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddForm
      v-if="isModalOpen"
      :is-edit-mode="isEditMode"
      :current-product="currentProduct"
      :existing-products="Product"
      @save="saveProduct"
      @close="closeModal"
    />

    <DeleteModal
      v-if="isDeleteModalOpen"
      :product-id="productIdToDelete"
      @close="closeDeleteModal"
      @onDelete="deleteProduct"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AddForm from "../src/components/AddEditForm.vue";
import DeleteModal from "../src/components/DeleteModal.vue";

const Product = ref(JSON.parse(localStorage.getItem("products")) || []);
watch(Product);

const searchText = ref("");
const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentProduct = ref({
  id: null,
  name: "",
  image: "",
  price: 0,
  quantity: 0,
});
const isDeleteModalOpen = ref(false);
const productIdToDelete = ref(null);

const filteredProducts = computed(() =>
  Product.value.filter((item) =>
    item.name.toLowerCase().includes(searchText.value.toLowerCase())
  )
);

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const addProduct = () => {
  isModalOpen.value = true;
  isEditMode.value = false;
  currentProduct.value = {
    id: null,
    name: "",
    image: "",
    price: 0,
    quantity: 0,
  };
};

const editItem = (item) => {
  isModalOpen.value = true;
  isEditMode.value = true;
  currentProduct.value = { ...item };
};

const openDeleteModal = (id) => {
  productIdToDelete.value = id;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const deleteProduct = (id) => {
  Product.value = Product.value.filter((item) => item.id !== id);
  saveToLocalStorage();
  closeDeleteModal();
};

const saveProduct = (product) => {
  if (isEditMode.value) {
    const index = Product.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      Product.value[index] = { ...product };
    }
  } else {
    product.id = Math.floor(Math.random() * 99999999);
    Product.value.push({ ...product });
  }

  saveToLocalStorage();
  closeModal();
};

const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(Product.value));
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style>
.header-manager-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

table {
  width: 95%;
  margin: 20px auto;
  border-collapse: collapse;
}

table th,
table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

table td:first-child {
  text-align: center;
}

table th:nth-child(3) {
  text-align: left;
}

table td:nth-child(n + 4):nth-child(-n + 6) {
  text-align: center;
}

table img {
  display: block;
  margin: auto;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
