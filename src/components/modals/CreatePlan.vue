<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Create Subscription</h3>
        <button class="close-btn" @click="$emit('close')">
          <img :src="closeIcon" alt="Close" />
        </button>
      </div>

      <form class="modal-body" @submit.prevent="savePlan">
        <label>Name</label>
        <input type="text" v-model="name" placeholder="Enter plan name" />

        <label>Price</label>
        <input type="text" v-model="priceUSD" placeholder="Enter price" />

        <label>Free Trial Duration(days)</label>
        <input type="number" v-model="freeTrialDuration" placeholder="Enter number of days" />

        <label>Duration (days)</label>
        <input
          type="number"
          v-model="durationDays"
          placeholder="Enter subscription duration"
        />

        <label>Tier 1 Commission</label>
        <input type="text" v-model="tier1comission" placeholder="Enter amount" />

        <label>Tier 2 Commission</label>
        <input type="text" v-model="tier2comission" placeholder="Enter amount" />

        <label>Master Commission</label>
        <input type="text" v-model="masterCommission" placeholder="Enter amount" />

        <button type="submit" class="save-btn">Save</button>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/shared/api/axios'
import closeIcon from '@/assets/icons/close.svg'

const emit = defineEmits(['close', 'created'])

const name = ref('')
const priceUSD = ref('')
const freeTrialDuration = ref('')
const tier1comission = ref('')
const tier2comission = ref('')
const durationDays = ref('')
const masterCommission = ref('')

async function savePlan() {
  try {
    const payload = {
      name: name.value,
      priceUSD: parseFloat(priceUSD.value),
      trialDays: parseInt(freeTrialDuration.value) || 0,
      durationDays: parseInt(durationDays.value) || 0,
      tier1CommissionPercent: parseInt(tier1comission.value) || 0,
      tier2CommissionPercent: parseInt(tier2comission.value) || 0,
      masterCommissionPercent: parseInt(masterCommission.value) || 0
    }

    await api.post('/admin/plans', payload)

    emit('close')
    emit('created')

    durationDays.value = ''
    name.value = ''
    priceUSD.value = ''
    freeTrialDuration.value = ''
    tier1comission.value = ''
    tier2comission.value = ''
    masterCommission.value = ''
  } catch (e) {
    console.error('Failed to create plan:', e)
    alert('Failed to create plan')
  }
}

</script>


<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  border-radius: 12px;
  width: 344px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: rgba(243, 245, 252, 1);
  padding: 16px;
  border-radius: 12px 12px 0 0;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: rgba(31, 41, 55, 1);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    color: #111827;
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;

  label {
    font-size: 14px;
    color: #111827;
    font-weight: 500;
  }

  input {
    height: 40px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: #22c55e;
    }
  }

  .save-btn {
    margin-top: 8px;
    height: 40px;
    background: #22c55e;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
