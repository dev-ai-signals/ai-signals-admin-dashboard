<template>
  <div class="login">
    <h1>Admin Login</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/shared/stores/user'
import api from '@/shared/api/axios'

const email = ref('')
const password = ref('')
const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()

async function handleSubmit() {
  loading.value = true
  try {
    const { data } = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    userStore.login(data)
    router.push('/dashboard')
  } catch (e) {
    alert('Login failed, please check credentials')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 200px;
  background: #f9fafb;
  font-family: sans-serif;

  h1 {
    margin-bottom: 24px;
    font-size: 28px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 300px;

    input {
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      height: 50px;
      padding: 10px;

      font-size: 15px;
      font-weight: 400;
      color: rgba(156, 163, 175, 1);

      background-color: rgba(31, 41, 55, 1);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        background-color: #101827;
        color: rgba(255, 255, 255, 1);
      }

      &:disabled {
        background-color: rgba(31, 41, 55, 0.5);
        cursor: not-allowed;
        color: rgba(156, 163, 175, 0.6);
      }
    }
  }
}
</style>
