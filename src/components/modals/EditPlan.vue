<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Membership Modify</h3>
        <button class="close-btn" @click="$emit('close')">
          <img :src="closeIcon" alt="Close" />
        </button>
      </div>

      <form class="modal-body">
        <label>Change</label>
        <input type="text" placeholder="Plan 1" />

        <button type="submit" class="save-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import closeIcon from '@/assets/icons/close.svg'
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
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
    background-color: #22c55e;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
