<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(!!localStorage.getItem('token'));

    watchEffect(() => {
      isAuthenticated.value = !!localStorage.getItem('token');
    });

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };

    return { isAuthenticated, logout };
  }
};
</script>

<style>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: blue;
  font-weight: bold;
}

button {
  border: none;
  background: red;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
