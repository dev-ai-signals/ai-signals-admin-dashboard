<template>
  <aside class="sidebar">
    <nav class="sidebar__menu">
      <RouterLink to="/dashboard" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="dashboardIcon" alt="Dashboard" class="sidebar__icon" />
          </div>
          <span>Dashboard</span>
        </div>
      </RouterLink>

      <RouterLink to="/user-management" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="userManagementIcon" alt="User Management" class="sidebar__icon" />
          </div>
          <span>User Management</span>
        </div>
      </RouterLink>

      <RouterLink to="/subscriptions" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="subscriptionsIcon" alt="Subscriptions" class="sidebar__icon" />
          </div>
          <span>Subscriptions</span>
        </div>
      </RouterLink>

      <RouterLink to="/affiliate-management" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="affiliateManagementIcon" alt="Affiliate Management" class="sidebar__icon" />
          </div>
          <span>Affiliate Management</span>
        </div>
      </RouterLink>

      <RouterLink to="/reward-withdrawal" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="withdrawalRequestIcon" alt="Withdrawal Request" class="sidebar__icon" />
          </div>
          <span>Reward Withdrawal Request</span>
        </div>
      </RouterLink>

      <RouterLink to="/notification" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="notificationsIcon" alt="Notification" class="sidebar__icon" />
          </div>
          <span>Notifications</span>
        </div>
      </RouterLink>

      <RouterLink to="/settings" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__item" :class="{ active: isActive }" @click="navigate">
          <div class="img-wrapper">
            <img :src="settingsIcon" alt="Settings" class="sidebar__icon" />
          </div>
          <span>Settings</span>
        </div>
      </RouterLink>
    </nav>

    <div class="sidebar__footer">
      <RouterLink to="/profile" custom v-slot="{ navigate, isActive }">
        <div class="sidebar__profile">
          <div class="img-wrapper">
            <img src="@/assets/icons/profile.svg" alt="Profile" />
          </div>
          <span>Profile</span>
        </div>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import dashboardIcon from '@/assets/icons/dashboard.svg'
import userManagementIcon from '@/assets/icons/user-management.svg'
import subscriptionsIcon from '@/assets/icons/subscriptions.svg'
import affiliateManagementIcon from '@/assets/icons/affiliate-management.svg'
import withdrawalRequestIcon from '@/assets/icons/reward-withdrawal.svg'
import notificationsIcon from '@/assets/icons/notification.svg'
import settingsIcon from '@/assets/icons/settings.svg'

</script>

<style scoped lang="scss">
.sidebar {
  width: 289px;
  height: calc(100vh - 88px);
  background-color: #1f2937;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding: 10px;

    border-radius: 4px;
    background-color: rgba(31, 41, 55, 1);
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
    height: 50px;

    &.active,
    &:hover {
      background-color: #101827;

      span {
        color: rgba(255, 255, 255, 1);
      }
    }

    .img-wrapper {
      width: 30px;
      height: 30px;

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(31, 41, 55, 1);
      border-radius: 4px;
      padding: 8px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    span {
      font-size: 15px;
      font-weight: 400;
      color: rgba(156, 163, 175, 1);
    }

  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  &__profile {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 12px;
    padding: 10px;
    border-radius: 4px;
    background-color: rgba(31, 41, 55, 1);
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
    height: 50px;

    &.active,
    &:hover {
      background-color: #101827;

      span {
        color: rgba(255, 255, 255, 1);
      }
    }

    .img-wrapper {
      width: 30px;
      height: 30px;

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(31, 41, 55, 1);
      border-radius: 4px;
      padding: 8px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    span {
      font-size: 15px;
      font-weight: 400;
      color: rgba(156, 163, 175, 1);
    }
  }
}
</style>
