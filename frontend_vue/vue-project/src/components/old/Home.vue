<template>

    <AllProducts />

    <!-- <router-view v-slot="{ Component }">
      <component :is="Component" title="My Title" />
    </router-view> -->

  </template>

<script>
 import AllProducts from '../AllProducts.vue';
    
    export default {
    name: 'Home',
    components: {
        AllProducts
      
    },
    
}
</script>

<style>
  
</style>