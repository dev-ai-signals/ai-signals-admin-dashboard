<template>
  <section class="subscription-management">
    <div class="heading-container">
      <div class="title-container">
        <h2>Subscription Management</h2>
      </div>
      <div class="heading-right">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="search-input"
        />
        <button class="create-btn" @click="showModal = true">+ Create New Plan</button>
      </div>
    </div>

    <div class="table">
      <div class="table-header">
        <div class="cell plan">Plan</div>
        <div class="cell edit">Edit / Delete Plans</div>
        <div class="cell user">User ID / TG Nickname</div>
        <div class="cell reg">Registration Date</div>
        <div class="cell actions">Subscription Actions</div>
        <div class="cell status">Subscription Status</div>
      </div>

      <div class="table-row" v-for="user in filteredUsers" :key="user.id">
        <div class="cell plan">{{ user.plan }}</div>
        <div class="cell edit">
          <img
            src="@/assets/icons/subscription/edit.svg"
            alt="Edit"
            class="icon"
            @click="showEdit = true"
          />
          <img src="@/assets/icons/subscription/delete.svg" alt="Delete" class="icon" />
        </div>
        <div class="cell user">{{ user.display }}</div>
        <div class="cell reg">{{ user.date }}</div>
        <div class="cell actions">
          <button class="btn on" @click="showExtend = true">EXTEND</button>
          <button class="btn off">FORCE EXPIRE</button>
        </div>
        <div
          class="cell status"
          :class="{ expired: user.status === 'Expired', active: user.status === 'Active' }"
        >
          {{ user.status }}
        </div>
      </div>
    </div>
  </section>

  <CreatePlan v-if="showModal" @close="showModal = false" />
  <ExtendSubscription v-if="showExtend" @close="showExtend = false" />
  <EditPlan v-if="showEdit" @close="showEdit = false" />

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CreatePlan from '@/components/modals/CreatePlan.vue'
import ExtendSubscription from '@/components/modals/ExtendSubscription.vue'
import EditPlan from '@/components/modals/EditPlan.vue'

const showEdit = ref(false)
const showExtend = ref(false)
const showModal = ref(false)
const search = ref('')

const users = [
  { id: 1, plan: 'Plan 1', display: '1 / @ggwpuser', date: '05/16/2025', status: 'Expired' },
  { id: 2, plan: 'Plan 2', display: '1 / @michaelthegreat', date: '05/16/2025', status: 'Active' },
  { id: 3, plan: 'Plan 3', display: '1 / @shaunboss2025', date: '05/16/2025', status: 'Active' },
  { id: 4, plan: 'Plan 4', display: '1 / @alextheback', date: '05/16/2025', status: 'Expired' },
  { id: 5, plan: 'Plan 5', display: '1 / @romangol', date: '05/16/2025', status: 'Expired' },
  { id: 6, plan: 'Plan 6', display: '1 / @blueblackred', date: '05/16/2025', status: 'Expired' },
  { id: 7, plan: 'Plan 7', display: '1 / @gameofthrones', date: '05/16/2025', status: 'Active' },
]

const filteredUsers = computed(() =>
  users.filter((user) =>
    user.display.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style scoped lang="scss">
.subscription-management {
  background-color: transparent;
  border-radius: 8px;

  .heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title-container h2 {
      font-weight: 700;
      font-size: 20px;
      color: #1f2937;
    }

    .heading-right {
      display: flex;
      align-items: center;
      gap: 12px;

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

      .create-btn {
        height: 36px;
        background-color: #22c55e;
        color: #fff;
        font-weight: 500;
        padding: 0 16px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
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
    display: flex;
    align-items: center;

    &.plan {
      flex: 1;
    }

    &.edit {
      flex: 1.2;
      gap: 10px;
    }

    &.user {
      flex: 2;
    }

    &.reg {
      flex: 1.2;
    }

    &.actions {
      flex: 1.8;
      gap: 8px;
    }

    &.status {
      flex: 1.2;
    }
  }

  .btn {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    min-width: 90px;
    text-align: center;
    color: #fff;

    &.on {
      background-color: #22c55e;
    }

    &.off {
      background-color: #ef4444;
    }
  }

  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .status {
    &.active {
      color: #22c55e;
      font-weight: 500;
    }

    &.expired {
      color: #ef4444;
      font-weight: 500;
    }
  }
}
</style>
