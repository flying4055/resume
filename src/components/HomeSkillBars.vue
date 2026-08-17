<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SkillGroup } from '../types/resume';

const props = defineProps<{ groups: SkillGroup[] }>();

const root = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  const el = root.value;
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(el);
});
</script>

<template>
  <div ref="root" class="grid gap-8 md:grid-cols-2">
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
