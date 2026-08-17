<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SkillGroup } from '../types/resume';

const props = defineProps<{ groups: SkillGroup[] }>();

const visible = ref(false);

// client:visible 已保证挂载时元素在视口内，挂载后直接翻转触发过渡
onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true;
  });
});
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2">
    <div v-for="group in props.groups" :key="group.group" class="space-y-3">
      <h3 class="text-sm font-semibold text-primary-700">{{ group.group }}</h3>
      <div v-for="item in group.items" :key="item.name">
        <div class="mb-1 flex items-center justify-between text-sm">
          <span class="text-ink-600">{{ item.name }}</span>
          <span class="text-xs text-ink-400">{{ item.level }}%</span>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-primary-100">
          <div
            class="h-full rounded-full bg-gradient-to-r from-primary-400 to-secondary-500 transition-all duration-1000 ease-out"
            :style="{ width: visible ? `${item.level}%` : '0%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
