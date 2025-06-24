<template>
  <section class="withdrawal-request">
    <div class="header-actions">
      <h2 class="title">Reward Withdrawal Request</h2>
      <input v-model="search" type="text" placeholder="Search" class="search-input" />
    </div>

    <div class="table">
      <div class="table-header">
        <div class="cell user">User ID / TG Nickname / Email</div>
        <div class="cell block">Block</div>
        <div class="cell amount">Amount</div>
        <div class="cell date">Transaction Date</div>
        <div class="cell network">Network</div>
        <div class="cell address">Wallet Address</div>
        <div class="cell status">Status</div>
        <div class="cell txid">TXID</div>
      </div>

      <div class="table-row" v-for="item in filteredData" :key="item.id">
        <div class="cell user">{{ item.user }}</div>
        <div class="cell block">
          <button class="btn block-btn">BLOCK</button>
        </div>
        <div class="cell amount">{{ item.amount }}</div>
        <div class="cell date">{{ item.date }}</div>
        <div class="cell network">{{ item.network }}</div>
        <div class="cell address">
          <span>{{ item.address }}</span>
          <img
            src="@/assets/icons/copy.svg"
            alt="Copy"
            class="copy-icon"
            @click="copyToClipboard(item.address)"
          />
        </div>
        <div class="cell status">
          <span :class="['badge', item.status.toLowerCase()]">{{ item.status }}</span>
        </div>
        <div class="cell txid">{{ item.txid }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const data = ref([
  {
    id: 1,
    user: '1 / @ggwpuser / user@gmail.com',
    amount: '400USDC',
    date: '17/05/2025',
    network: 'OPTIMISM',
    address: 'ASDHV2301271286',
    status: 'PAID',
    txid: '17/05/2025'
  },
  {
    id: 2,
    user: '1 / @ggwpuser / user@gmail.com',
    amount: '400USDC',
    date: '17/05/2025',
    network: 'OPTIMISM',
    address: 'ASDHV2301271286',
    status: 'PENDING',
    txid: '17/05/2025'
  },
  {
    id: 3,
    user: '1 / @ggwpuser / user@gmail.com',
    amount: '400USDC',
    date: '17/05/2025',
    network: 'OPTIMISM',
    address: 'ASDHV2301271286',
    status: 'PAID',
    txid: '17/05/2025'
  }
])

const filteredData = computed(() =>
  data.value.filter(item =>
    item.user.toLowerCase().includes(search.value.toLowerCase())
  )
)

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log(`Copied: ${text}`)
  }).catch((err) => {
    console.error('Failed to copy:', err)
  })
}
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
      padding: 26px 16px 26px 16px;
    }

    .cell {
      flex: 1;
      display: flex;
      align-items: center;

      &.user {
        flex: 2;
      }

      &.block,
      &.amount,
      &.date,
      &.network,
      &.address,
      &.status,
      &.txid {
        flex: 1.2;
        justify-content: center;
      }

      &.address {
        gap: 8px;

        .copy-icon {
          width: 16px;
          height: 16px;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 1;
          }
        }
      }


      .btn.block-btn {
        padding: 4px 10px;
        font-size: 13px;
        font-weight: 500;
        border-radius: 4px;
        border: 1px solid #9ca3af;
        background-color: #f3f4f6;
        color: #1f2937;
        cursor: pointer;
      }

      .badge {
        padding: 4px 12px;
        font-size: 13px;
        width: 88px;
        height: 30px;
        font-weight: 500;
        border-radius: 4px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;

        &.paid {
          background-color: #22c55e;
          color: #fff;
        }

        &.pending {
          background-color: #f97316;
          color: #fff;
        }
      }
    }
  }
}
</style>
