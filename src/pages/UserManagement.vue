<template>
  <section class="user-management">
    <div class="heading-container">
      <div class="title-container">
        <h2>User Management</h2>
      </div>
      <div class="heading-right">
        <div class="search-wrapper">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="search-input"
          />
        </div>
      </div>
    </div>

    <div class="table">
      <div class="table-header">
        <div class="cell id">User ID / TG Nickname / Email</div>
        <div class="cell date">Registration Date</div>
        <div class="cell access">Grant Access / Revoke Access</div>
        <div class="cell status">Payout Status</div>
      </div>

      <div class="table-row"  v-for="user in filteredUsers" :key="user.id">
        <div class="cell id">{{ user.display }}</div>
        <div class="cell date">{{ user.date }}</div>
        <div class="cell access">
          <button class="btn on">ON</button>
          <button class="btn off">OFF</button>
        </div>
        <div class="cell status subscribed">Subscribed</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const search = ref('')
const users = [
  { id: 1, display: '1 / @ggwpuser / user@gmail.com', date: '05/16/2025' },
  { id: 2, display: '2 / @michaelthegreat / user@gmail.com', date: '05/16/2025' },
  { id: 3, display: '3 / @shaunboss2025 / user@gmail.com', date: '05/16/2025' },
  { id: 4, display: '4 / @alextheback / user@gmail.com', date: '05/16/2025' },
  { id: 5, display: '5 / @romangol / user@gmail.com', date: '05/16/2025' },
  { id: 6, display: '6 / @blueblackred / user@gmail.com', date: '05/16/2025' },
  { id: 7, display: '7 / @gameofthrones / user@gmail.com', date: '05/16/2025' },
]

const filteredUsers = computed(() =>
  users.filter((user) =>
    user.display.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style scoped lang="scss">
.user-management {
  background-color: transparent;
  border-radius: 8px;

  .heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title-container {
      h2 {
        font-weight: 700;
        font-size: 20px;
        color: rgba(31, 41, 55, 1);
      }
    }

    .heading-right {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .search-wrapper {

      .search-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;

        &:focus {
          border-color: #22c55e;
        }
      }
    }

    .filters {
      display: flex;
      justify-content: flex-end;
      gap: 12px;

      .search-input,
      .filter-select {
        height: 36px;
        padding: 0 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        color: #1f2937;
        background-color: white;
      }

      .search-input {
        width: 200px;
      }

      .filter-select {
        width: 120px;
      }

      .search-input:focus,
      .filter-select:focus {
        outline: none;
        border-color: #22c55e;
      }
    }
  }

  .table {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: #ffffff;
  }

  .table-header,
  .table-row {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
  }

  .table-header {
    font-weight: 600;
    color: #1f2937;
    background-color: #f9fafb;
  }

  .table-row {
    background-color: #fff;
    color: #374151;
    padding: 26px 16px 26px 16px;
  }


  .cell {
    flex: 1;

    &.id {
      flex: 2;
    }

    &.date {
      flex: 1;
    }

    &.access {
      flex: 1.5;
      display: flex;
      gap: 8px;
    }

    &.status {
      flex: 1;
    }
  }

  .btn {
    padding: 4px 12px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    min-width: 50px;
    text-align: center;
    color: #fff;

    &.on {
      background-color: #22c55e;
    }

    &.off {
      background-color: #ef4444;
    }
  }

  .subscribed {
    color: #22c55e;
    font-weight: 500;
  }
}
</style>
