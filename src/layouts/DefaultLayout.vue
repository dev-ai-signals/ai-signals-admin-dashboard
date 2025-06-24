<template>
  <div class="layout">
    <Header />
    <div class="layout__body">
      <aside class="sidebar-wrapper">
        <Sidebar />
      </aside>
      <main class="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__body {
    display: flex;
    flex-grow: 1;
    background-color: #f5f5f5;
    padding: 24px 20px 20px 20px;
    overflow-y: auto;
  }
}

.sidebar-wrapper {
  border-radius: 5px;
  overflow: hidden;
}
.main {
  flex: 1;
  padding-left: 20px;
}
</style>