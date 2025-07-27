<template>
  <section class="withdrawal-request">
    <div class="header-actions">
      <h2 class="title">Sweeping History</h2>
      <div class="tabs">
        <button
          :class="['tab-btn', activeTab === 'daily' && 'active']"
          @click="activeTab = 'daily'"
        >Daily</button>
        <button
          :class="['tab-btn', activeTab === 'weekly' && 'active']"
          @click="activeTab = 'weekly'"
        >Weekly</button>
        <button
          :class="['tab-btn', activeTab === 'monthly' && 'active']"
          @click="activeTab = 'monthly'"
        >Monthly</button>
      </div>
      <input v-model="search" type="text" placeholder="Search" class="search-input" />
    </div>

    <div class="table">
      <div class="table-header">
        <div class="cell email">Affiliates: emails</div>
        <div class="cell date">Date</div>
        <div class="cell amount">Paid Amount</div>
      </div>

      <div class="table-row" v-for="entry in filteredData" :key="entry.id">
        <div class="cell email">{{ entry.email }}</div>
        <div class="cell date">{{ entry.date }}</div>
        <div class="cell amount">{{ entry.amount }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const activeTab = ref<'daily' | 'weekly' | 'monthly'>('daily')

const data = ref([
  { id: 1, email: 'customer1@aisignals.com', date: '7/3/2025', amount: '1000$' },
  { id: 2, email: 'customer2@aisignals.com', date: '7/4/2025', amount: '1000$' },
  { id: 3, email: 'vg@mail.com', date: '7/5/2025', amount: '1000$' },
  { id: 4, email: 'aisignals.aws@gmail.com', date: '7/1/2025', amount: '1000$' }
])

const filteredData = computed(() =>
  data.value
    .filter(entry => entry.email.toLowerCase().includes(search.value.toLowerCase()))
    .filter(entry => {
      if (activeTab.value === 'daily') return true
      if (activeTab.value === 'weekly') return entry.id !== 1
      if (activeTab.value === 'monthly') return entry.id === 4
    })
)
</script>

<style scoped lang="scss">
.withdrawal-request {
  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .title {
      font-weight: 700;
      font-size: 20px;
      color: #1f2937;
    }

    .search-input {
      height: 36px;
      width: 200px;
      padding: 0 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      background: #fff;

      &:focus {
        outline: none;
        border-color: #22c55e;
      }
    }

    .tabs {
      display: flex;
      gap: 8px;

      .tab-btn {
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 500;
        border: none;
        border-radius: 4px;
        background-color: #e5e7eb;
        color: #1f2937;
        cursor: pointer;

        &.active {
          background-color: #22c55e;
          color: #fff;
        }
      }
    }
  }

  .table {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: #ffffff;

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
    }

    .cell {
      flex: 1;
      display: flex;
      align-items: center;

      &.email {
        flex: 2;
      }

      &.date,
      &.amount {
        flex: 1.2;
        justify-content: center;
      }
    }
  }
}

</style>
