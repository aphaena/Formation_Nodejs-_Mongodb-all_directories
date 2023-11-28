

<template>

    <Menu />
    <main>
    <router-view />         
  </main>


</template>

<script >
    import Menu from '../Menu.vue';
    import Home from './Home.vue';
    
    export default {
    name: 'Content',
    components: {
      Menu, // Enregistrement du composant Login
      Home
      
    }
}
</script>


