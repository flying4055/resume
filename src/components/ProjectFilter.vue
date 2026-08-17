<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Project } from '../types/resume';

const props = defineProps<{ projects: Project[] }>();

const active = ref('全部');
const tags = computed(() => ['全部', ...new Set(props.projects.flatMap((p) => p.techStack ?? []))]);
const filtered = computed(() =>
  active.value === '全部'
    ? props.projects
    : props.projects.filter((p) => (p.techStack ?? []).includes(active.value)),
);
</script>

<template>
  <div>
    <!-- 标签筛选 -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
        :class="
          active === tag
            ? 'bg-primary-600 text-white shadow-sm'
            : 'bg-white text-ink-600 ring-1 ring-ink-400/20 hover:ring-primary-400 hover:text-primary-600'
        "
        @click="active = tag"
      >
        {{ tag }}
      </button>
    </div>

    <!-- 项目卡片 -->
    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <article
        v-for="project in filtered"
        :id="project.id"
        :key="project.id"
        class="flex scroll-mt-20 flex-col rounded-2xl border border-ink-400/15 bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <!-- 封面占位 -->
        <div
          class="mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 via-white to-secondary-100"
        >
          <span class="text-4xl font-bold text-primary-500/60">{{ project.name.charAt(0) }}</span>
        </div>

        <div class="flex items-baseline justify-between gap-4">
          <h2 class="text-base font-bold text-ink-900">{{ project.name }}</h2>
          <span class="shrink-0 text-xs text-ink-400">{{ project.start }} - {{ project.end }}</span>
        </div>
        <p class="mt-1 text-xs font-medium text-primary-600">担任角色：{{ project.role }}</p>
        <p class="mt-2 text-sm leading-relaxed text-ink-600">{{ project.description }}</p>

        <ul class="mt-3 flex-1 space-y-1.5">
          <li
            v-for="highlight in project.highlights"
            :key="highlight"
            class="flex gap-2 text-sm leading-relaxed text-ink-600"
          >
            <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary-400"></span>
            {{ highlight }}
          </li>
        </ul>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <span
            v-for="tech in project.techStack ?? []"
            :key="tech"
            class="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs text-primary-700"
          >
            {{ tech }}
          </span>
        </div>

        <div v-if="project.links?.demo || project.links?.github" class="mt-4 flex gap-3 border-t border-ink-400/10 pt-4">
          <a
            v-if="project.links?.demo"
            :href="project.links?.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            在线演示 →
          </a>
          <a
            v-if="project.links?.github"
            :href="project.links?.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            GitHub →
          </a>
        </div>
      </article>
    </div>

    <p v-if="filtered.length === 0" class="mt-12 text-center text-sm text-ink-400">
      没有找到包含该技术的项目
    </p>
  </div>
</template>
