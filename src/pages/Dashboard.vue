<template>
  <div class="dashboard">
    <div class="dashboard__content">
      <section class="dashboard__totals">
        <div class="heading">
          <h2>Total Dashboard</h2>
        </div>
        <div class="card-wrapper">
          <div class="dashboard__card">
            <div class="image-container">
              <img :src="paidIcon" alt="Paid Subscriptions" class="dashboard__icon" />
            </div>
            <div class="values-container">
              <div class="dashboard__value">{{ paidSubscriptions }}</div>
              <div class="dashboard__label">Paid Subscriptions</div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="image-container">
              <img :src="expiredIcon" alt="Expired Subscriptions" class="dashboard__icon" />
            </div>
            <div class="values-container">
              <div class="dashboard__value">{{ expiredSubscriptions }}</div>
              <div class="dashboard__label">Expired Subscriptions</div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="image-container">
              <img :src="tier1Icon" alt="Tier 1 Affiliates" class="dashboard__icon" />
            </div>
            <div class="values-container">
              <div class="dashboard__value">{{ tier1Affiliates }}</div>
              <div class="dashboard__label">Tier 1 Affiliates</div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="image-container">
              <img :src="tier2Icon" alt="Tier 2 Affiliates" class="dashboard__icon" />
            </div>
            <div class="values-container">
              <div class="dashboard__value">{{ tier2Affiliates }}</div>
              <div class="dashboard__label">Tier 2 Affiliates</div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="image-container">
              <img :src="totalSalesIcon" alt="Total Sales" class="dashboard__icon" />
            </div>
            <div class="values-container">
              <div class="dashboard__value">{{ totalSales }}</div>
              <div class="dashboard__label">Total Sales</div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="image-container">
              <img :src="monthlySalesIcon" alt="Monthly Sales" class="dashboard__icon" />
            </div>
            <div class="values-container">
              <div class="dashboard__value">{{ monthlySales }}</div>
              <div class="dashboard__label">Monthly Sales</div>
            </div>
          </div>
        </div>
      </section>

      <section class="dashboard__stats">
        <div class="dashboard__stats-title">
          <h2>Subscription Statistics</h2>
        </div>
        <div class="dashboard__table">
          <div class="dashboard__table-header">
            <span><strong>Plan Name</strong></span>
            <span class="green"><strong>Users Subscribed</strong></span>
          </div>
          <div class="dashboard__table-row" v-for="plan in plans" :key="plan.name">
            <span>{{ plan.name }}</span>
            <span class="green">{{ plan.users }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/shared/api/axios'

import paidIcon from '@/assets/icons/dashboard/paid-subscriptions.svg'
import expiredIcon from '@/assets/icons/dashboard/expired-subscriptions.svg'
import tier1Icon from '@/assets/icons/dashboard/tier-1.svg'
import tier2Icon from '@/assets/icons/dashboard/tier-2.svg'
import totalSalesIcon from '@/assets/icons/dashboard/total-sales.svg'
import monthlySalesIcon from '@/assets/icons/dashboard/monthly-sales.svg'

const paidSubscriptions = ref(0)
const expiredSubscriptions = ref(0)
const tier1Affiliates = ref(0)
const tier2Affiliates = ref(0)
const totalSales = ref(0)
const monthlySales = ref(0)

const plans = ref<any[]>([])

onMounted(async () => {
  try {
    const [summaryRes, plansSubsRes, plansRes] = await Promise.all([
      api.get('/admin/statistics/dashboard/summary'),
      api.get('/admin/statistics/dashboard/subscription-statistics'),
      api.get('/admin/plans')
    ])

    const data = summaryRes.data
    paidSubscriptions.value = data.paidSubscriptions
    expiredSubscriptions.value = data.expiredSubscriptions
    tier1Affiliates.value = data.tier1Affiliates
    tier2Affiliates.value = data.tier2Affiliates
    totalSales.value = data.totalSales
    monthlySales.value = data.monthlySales

    const statsMap = new Map<string, number>()
    plansSubsRes.data.forEach((planStat: any) => {
      statsMap.set(planStat.planName, planStat.usersSubscribed)
    })

    plans.value = plansRes.data.map((plan: any) => ({
      name: plan.name,
      users: statsMap.get(plan.name) || 0
    }))
  } catch (e) {
    console.error('Failed to load dashboard summary or plans:', e)
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  min-height: calc(100vh - 88px);
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  &__totals {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    width: 604px;

    .heading {
      width: 100%;

      h2 {
        text-align: left;
        font-weight: 700;
        font-size: 20px;
        color: rgba(31, 41, 55, 1);
      }
    }

    .card-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  }

  &__card {
    border-radius: 6px;
    padding: 10px;
    width: 292px;
    height: 147px;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__value {
    font-size: 44px;
    font-weight: 500;
    color: rgba(34, 197, 94, 1);
  }

  &__label {
    font-weight: 400;
    font-size: 14px;
    color: rgba(31, 41, 55, 1);
  }

  &__stats {
    flex: 1;
    width: 472px;
  }

  &__stats-title {
    margin-bottom: 16px;

    h2 {
      text-align: left;
      font-weight: 700;
      font-size: 20px;
      color: rgba(31, 41, 55, 1);
    }
  }

  &__table {
    display: flex;
    flex-direction: column;
    padding: 16px 12px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &__table-header,
  &__table-row {
    display: flex;
    justify-content: space-between;
  }

  &__table-header {
    font-weight: 500;
    color: rgba(31, 41, 55, 1);
    font-size: 14px;
    padding-bottom: 24px;

    .green {
      color: rgba(34, 197, 94, 1);
      font-size: 14px;
      font-weight: 500;
    }
  }

  &__table-row {
    color: rgba(31, 41, 55, 1);
    border-top: 1px solid #f0f0f0;
    padding: 24px 0;

    .green {
      color: rgba(34, 197, 94, 1);
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
