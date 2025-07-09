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
        <button class="create-btn" @click="showModal = true">+ Create New Subscription</button>
      </div>
    </div>

    <div class="table">
      <div class="table-header">
        <div class="cell plan">Plan</div>
        <div class="cell price">Current Price</div>
        <div class="cell edit">Edit / Delete Plan</div>
        <div class="cell links">Affiliate Link</div>
        <div class="cell user">Total Subscribed</div>
      </div>

      <div class="table-row" v-for="plan in plans" :key="plan.id">
        <div class="cell plan">{{ plan.name }}</div>
        <div class="cell price">${{ plan.priceUSD }}</div>
        <div class="cell edit">
          <img src="@/assets/icons/subscription/edit.svg" alt="Edit" class="icon"
               @click="selectedPlan = plan; showEdit = true" />
          <img src="@/assets/icons/subscription/delete.svg" alt="Delete" class="icon" />
        </div>
        <div class="cell links">https:aisignals/</div>
        <div class="cell user">{{ plan.users }}</div>
      </div>
    </div>
  </section>

  <CreatePlan
    v-if="showModal"
    @close="showModal = false"
    @created="fetchPlans"
  />
  <ExtendSubscription v-if="showExtend" @close="showExtend = false" />
  <EditPlan
    v-if="showEdit"
    :plan="selectedPlan"
    @close="showEdit = false"
    @saved="updatePlanPrice"
  />


</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import api from '@/shared/api/axios'
import CreatePlan from '@/components/modals/CreatePlan.vue'
import ExtendSubscription from '@/components/modals/ExtendSubscription.vue'
import EditPlan from '@/components/modals/EditPlan.vue'

const showEdit = ref(false)
const showExtend = ref(false)
const showModal = ref(false)
const search = ref('')
const users = ref<any[]>([])
const plans = ref<any[]>([])
const selectedPlan = ref<any>(null)

function updatePlanPrice({ id, priceUSD }: { id: string, priceUSD: number }) {
  const plan = plans.value.find(p => p.id === id)
  if (plan) plan.priceUSD = priceUSD
}

async function fetchPlans() {
  try {
    const [plansRes, statsRes] = await Promise.all([
      api.get('/admin/plans'),
      api.get('/admin/statistics/dashboard/subscription-statistics')
    ])

    const statsMap = new Map<string, number>()
    statsRes.data.forEach((planStat: any) => {
      statsMap.set(planStat.planName.toLowerCase(), planStat.usersSubscribed)
    })

    plans.value = plansRes.data.map((plan: any) => ({
      ...plan,
      users: statsMap.get(plan.name.toLowerCase()) || 0
    }))
  } catch (e) {
    console.error('Failed to load plans or statistics:', e)
  }
}

onMounted(fetchPlans)

/*async function deletePlan(planId: string) {
  if (!confirm('Are you sure you want to delete this plan?')) return
  try {
    await api.delete(`/admin/plans/${planId}`)
    plans.value = plans.value.filter(plan => plan.id !== planId)
  } catch (e) {
    console.error('Failed to delete plan:', e)
    alert('Failed to delete plan.')
  }
}*/

const filteredUsers = computed(() =>
  users.value.filter(user =>
    `${user.id} ${user.email}`.toLowerCase().includes(search.value.toLowerCase())
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

    &.price {
      flex: 1;
    }

    &.edit {
      flex: 1;
      gap: 10px;
    }

    &.links {
      flex: 1;
    }

    &.user {
      flex: 1;
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
