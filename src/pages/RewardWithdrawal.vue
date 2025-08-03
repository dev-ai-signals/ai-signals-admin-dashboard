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

      <div class="table-row" v-for="entry in filteredData" :key="entry.email + entry.date">
        <div class="cell email">{{ entry.email }}</div>
        <div class="cell date">{{ entry.date }}</div>
        <div class="cell amount">{{ entry.amount }}</div>
      </div>
    </div>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0">Prev</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages">Next</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import api from '@/shared/api/axios'

const search = ref('')
const activeTab = ref<'daily' | 'weekly' | 'monthly'>('daily')
const payouts = ref<any[]>([])
const currentPage = ref(0)
const pageSize = ref(10)
const totalPages = ref(0)

const periodMap = {
  daily: 'DAILY',
  weekly: 'WEEKLY',
  monthly: 'MONTHLY'
} as const

const fetchPayouts = async () => {
  try {
    const { data } = await api.get('/payouts/history', {
      params: {
        period: periodMap[activeTab.value],
        page: currentPage.value,
        size: pageSize.value
      }
    })

    payouts.value = data.content
    totalPages.value = data.totalPages
    currentPage.value = data.pageable.pageNumber
  } catch (e) {
    console.error('Failed to fetch payouts:', e)
  }
}

const filteredData = computed(() =>
  payouts.value
    .filter(entry => entry.email.toLowerCase().includes(search.value.toLowerCase()))
    .map(entry => {
      const rawAmount = entry.amount.replace(/USDC$/, '')
      const formattedAmount = (Number(rawAmount) / 1_000_000).toFixed(3) + ' USDC'
      return {
        ...entry,
        amount: formattedAmount
      }
    })
)

function goToPage(page: number) {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
    fetchPayouts()
  }
}

watch(activeTab, () => {
  currentPage.value = 0
  fetchPayouts()
})

onMounted(() => {
  fetchPayouts()
})
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;

  button {
    padding: 6px 12px;
    font-size: 14px;
    background: #1f2937;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 14px;
    color: #1f2937;
  }
}
</style>
