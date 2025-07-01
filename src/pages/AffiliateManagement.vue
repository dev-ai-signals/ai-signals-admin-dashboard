<template>
  <section class="affiliate-management">
    <div class="header-actions">
      <div class="search-wrapper">
        <h2 class="title">Affiliate Management</h2>
        <input v-model="search" type="text" placeholder="Search" class="search-input" />
      </div>
      <div class="button-group">
        <div class="button-group">
          <button
            class="btn tier"
            :class="{ active: activeTier === 'T1' }"
            @click="activeTier = 'T1'"
          >
            TIER 1
          </button>
          <button
            class="btn tier"
            :class="{ active: activeTier === 'T2' }"
            @click="activeTier = 'T2'"
          >
            TIER 2
          </button>
        </div>
      </div>
    </div>

    <div class="table">
      <div class="table-header">
        <div class="cell user">User ID / TG Nickname / Email</div>
        <div class="cell status">Affiliate Status</div>
        <div class="cell master">Set MASTER Affiliate Users</div>
        <div class="cell commission">Commission%</div>
        <div class="cell discount">Discount Price</div>
        <div class="cell apply">Apply</div>
        <div class="cell referred">Total Referred</div>
      </div>

      <div class="table-row" v-for="user in filteredUsers" :key="user.id">
        <div class="cell user">{{ user.display }}</div>
        <div class="cell status">
          <span class="status-inactive">Inactive</span>
        </div>
        <div class="cell master">
          <button :class="['btn', user.master ? 'master-on' : 'deactivate']">
            {{ user.master ? 'MASTER ON' : 'DEACTIVATE' }}
          </button>
        </div>
        <div class="cell commission">
          <input type="text" v-model="user.commission" class="input" />
        </div>
        <div class="cell discount">
          <input type="text" v-model="user.discount" class="input" />
        </div>
        <div class="cell apply">
          <button class="btn apply-btn">APPLY</button>
        </div>
        <div class="cell referred">{{ user.referred }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const activeTier = ref<'T1' | 'T2'>('T1')

const users = ref([
  { id: 1, display: '1 / @ggwpuser / user@gmail.com', tier: 'T1', master: true, commission: '60%', discount: '480', referred: '10' },
  { id: 2, display: '1 / @ggwpuser / user@gmail.com', tier: 'T2', master: false, commission: '60%', discount: '480', referred: '01' },
  { id: 3, display: '1 / @ggwpuser / user@gmail.com', tier: 'T2', master: false, commission: '60%', discount: '480', referred: '05' },
  { id: 4, display: '1 / @ggwpuser / user@gmail.com', tier: 'T1', master: true, commission: '60%', discount: '480', referred: '10' },
  { id: 5, display: '1 / @ggwpuser / user@gmail.com', tier: 'T2', master: true, commission: '60%', discount: '480', referred: '00' },
  { id: 6, display: '1 / @ggwpuser / user@gmail.com', tier: 'T1', master: true, commission: '60%', discount: '480', referred: '01' }
])

const filteredUsers = computed(() =>
  users.value.filter(
    user =>
      user.tier === activeTier.value &&
      user.display.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style scoped lang="scss">
.affiliate-management {
  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;

      .title {
        font-weight: 700;
        font-size: 20px;
        color: rgba(31, 41, 55, 1);
      }

      .search-input {
        height: 36px;
        width: 200px;
        padding: 0 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        background-color: #FFFFFF;

        &:focus {
          outline: none;
          border-color: #22c55e;
        }
      }
    }

    .button-group {
      display: flex;
      gap: 10px;

      .btn {
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 500;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &.global {
          background-color: #22c55e;
          color: #fff;
        }

        &.tier {
          background-color: #e5e7eb;
          color: #1f2937;

          &.active {
            background-color: #ef4444;
            color: #fff;
          }
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
      padding: 26px 16px 26px 16px;
    }

    .cell {
      flex: 1;
      display: flex;
      align-items: center;

      &.user {
        flex: 2;
      }

      &.status {
        flex: 1;
        .status-inactive {
          color: #ef4444;
          font-weight: 500;
        }
      }

      &.master {
        flex: 1.2;
      }

      &.commission {
        flex: 1;
      }

      &.discount {
        flex: 1;
      }

      &.apply {
        flex: 1;
      }

      &.referred {
        flex: 1;
        justify-content: center;
      }

      .input {
        width: 80px;
        padding: 4px 6px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 13px;
        text-align: center;

        &:focus {
          outline: none;
          border-color: #22c55e;
        }
      }

      .btn {
        padding: 4px 10px;
        font-size: 13px;
        font-weight: 500;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        min-width: 90px;
        text-align: center;
        color: #fff;

        &.master-on {
          background-color: #22c55e;
        }

        &.deactivate {
          background-color: #ef4444;
        }

        &.apply-btn {
          background-color: #22c55e;
        }
      }
    }
  }
}
</style>
