<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ links: { href: string; label: string; active: boolean }[] }>();

const open = ref(false);
</script>

<template>
  <div class="md:hidden print:hidden">
    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-400/10"
      aria-label="打开菜单"
      @click="open = !open"
    >
      <svg
        v-if="!open"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      <svg
        v-else
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="absolute inset-x-4 top-16 z-50 rounded-2xl border border-ink-400/15 bg-surface p-2 shadow-lg"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="block rounded-xl px-4 py-3 text-sm font-medium transition-colors"
          :class="link.active ? 'bg-primary-50 text-primary-600' : 'text-ink-600 hover:bg-ink-400/5'"
          @click="open = false"
        >
          {{ link.label }}
        </a>
      </div>
    </Transition>
  </div>
</template>
