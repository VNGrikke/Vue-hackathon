<template>
  <div>
    <header>HEADER</header>
    <main>
      <nav>
        <router-link exact-active-class="active" to="/admin"
          >Dashboard</router-link
        >
        <router-link active-class="active" to="/admin/manager-category"
          >Manager Category</router-link
        >
        <router-link active-class="active" to="/admin/manager-product"
          >Manager Product</router-link
        >
      </nav>
      <div class="router-view">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
</script>

<style>
header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}

main {
  display: flex;
}

nav {
  width: 270px;
  background-color: #111;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 94.7vh;
  top: 0;
  left: 0;
  gap: 20px;
}

nav a {
  text-decoration: none;
  color: #fff;
  padding: 10px ;
  border-radius: 8px;
}

nav a:hover{
  background-color: #222;
}

.active {
  color: rgb(255, 255, 255);
  background-color: #222;
}

.default-active {
  color: rgb(255, 255, 255);
  background-color: #111;
}

.router-view {
  width: 100%;
}
</style>