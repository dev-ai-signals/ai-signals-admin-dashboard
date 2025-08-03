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
        <div class="cell user">Email</div>
        <div class="cell status">Affiliate Status</div>
        <div class="cell master">Set MASTER Affiliate Users</div>
        <div class="cell commission">Commission%</div>
        <div class="cell commission-tier2">Tier 2 Commission%</div>
        <div class="cell apply">Apply</div>
        <div v-if="activeTier === 'T2'" class="cell referred">Total Referred</div>
        <div class="cell sold">Total Sold</div>
      </div>

      <div class="table-row" v-for="user in filteredUsers" :key="user.userId">
        <div class="cell user">{{ user.email }}</div>
        <div class="cell status">
          <span :class="user.active ? 'status-active' : 'status-inactive'">
            {{ user.active ? 'Active' : 'Inactive' }}
          </span>
        </div>
        <div class="cell master">
          <button
            :class="['btn', user.masterAffiliate ? 'deactivate' : 'master-on']"
            @click="toggleMasterAffiliate(user)"
          >
            {{ user.masterAffiliate ? 'DEACTIVATE' : 'MASTER ON' }}
          </button>
        </div>
        <div class="cell commission">
          <input type="number" v-model.number="user.commissionPercent" class="input" />
        </div>
        <div class="cell commission-tier2">
          <input type="number" v-model.number="user.commissionPercentTier2" class="input" />
        </div>
        <div class="cell apply">
          <button
            class="btn apply-btn"
            :disabled="!hasChanges(user)"
            @click="updateCommission(user)"
          >
            APPLY
          </button>
        </div>
        <div v-if="activeTier === 'T2'" class="cell referred">{{ user.totalInvitedAffiliates ?? 0 }}</div>
        <div class="cell sold">{{ user.totalReferredCustomers ?? 0 }}</div>
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
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/shared/api/axios'

const search = ref('')
const activeTier = ref<'T1' | 'T2'>('T1')
const users = ref<any[]>([])
const currentPage = ref(0)
const pageSize = ref(10)
const totalPages = ref(0)

async function fetchUsers(tier: number, page = 0) {
  try {
    const { data } = await api.get('/affiliate/admin/all', {
      params: {
        tier,
        page,
        size: pageSize.value
      }
    })

    totalPages.value = data.totalPages
    currentPage.value = data.pageable.pageNumber

    users.value = data.content.map((u: any) => ({
      ...u,
      commissionPercent: u.commissionPercent ?? 0,
      commissionPercentTier2: u.commissionPercentTier2 ?? 0,
      initialCommissionPercent: u.commissionPercent ?? 0,
      initialCommissionPercentTier2: u.commissionPercentTier2 ?? 0,
    }))
  } catch (e) {
    console.error('Failed to fetch affiliates:', e)
  }
}

function goToPage(page: number) {
  if (page >= 0 && page < totalPages.value) {
    fetchUsers(activeTier.value === 'T1' ? 1 : 2, page)
  }
}

function hasChanges(user: any) {
  return (
    user.commissionPercent !== user.initialCommissionPercent ||
    user.commissionPercentTier2 !== user.initialCommissionPercentTier2
  )
}

onMounted(() => fetchUsers(1))

watch(activeTier, (newTier) => {
  fetchUsers(newTier === 'T1' ? 1 : 2)
})

async function toggleMasterAffiliate(user: any) {
  try {
    await api.post('/affiliate/admin/update', {
      userId: user.userId,
      masterAffiliate: !user.masterAffiliate
    })
    await fetchUsers(activeTier.value === 'T1' ? 1 : 2)
  } catch (e) {
    console.error('Failed to toggle masterAffiliate:', e)
    alert('Failed to update user.')
  }
}

async function updateCommission(user: any) {
  try {
    await api.post('/affiliate/admin/update', {
      userId: user.userId,
      commissionPercent: user.commissionPercent,
      overrideCommissionPercent: user.commissionPercentTier2
    })
    await fetchUsers(activeTier.value === 'T1' ? 1 : 2)
  } catch (e) {
    console.error('Failed to update commission:', e)
    alert('Failed to update commission for this user.')
  }
}

const filteredUsers = computed(() =>
  users.value.filter(user =>
    `${user.userId} ${user.email}`.toLowerCase().includes(search.value.toLowerCase())
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

      &.apply {
        flex: 1;
      }

      &.referred {
        flex: 1;
        justify-content: center;
      }

      &.sold {
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

        &.apply-btn:disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
          color: #9ca3af;
        }
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
