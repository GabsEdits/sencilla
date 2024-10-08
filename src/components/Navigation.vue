<template>
  <header v-if="theme.nav.show !== false">
    <a href="#content-main" class="skip-to-content">Skip to main content</a>
    <nav>
      <ul>
        <li v-for="link in theme.nav.links" :key="link.url || link.link">
          <a
            :href="link.url || link.link"
            :class="{ active: isActive(link.url || link.link) }"
            @click="setActive(link.url || link.link)"
          >
            {{ link.text }}
          </a>
        </li>
        <li v-if="theme.nav.rss">
          <a
            target="_blank"
            :href="theme.nav.rss"
            aria-label="Link to the RSS Feed"
            title="Link to the RSS Feed"
            downlåoad
          >
            <RSSFeed />
          </a>
        </li>
        <li v-if="theme.nav.git">
          <a
            target="_blank"
            :href="theme.nav.git"
            aria-label="Link to the source code of the website"
            title="Link to the source code of the website"
          >
            <SourceCode />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
@mixin blurredBackground {
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
}

header {
  .skip-to-content {
    clip: rect(1px, 1px, 1px, 1px);
    word-wrap: normal !important;
    -webkit-clip-path: inset(50%);
    position: absolute;
    z-index: 999;
    clip-path: inset(50%);
    margin: -1px;
    border: 0;
    padding: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;

    &:focus {
      clip: auto !important;
      -webkit-clip-path: none;
      position: static;
      clip-path: none;
      margin: 0;
      width: auto;
      height: auto;
      overflow: visible;
    }
  }

  nav {
    @include blurredBackground;
    position: absolute;
    top: 3rem;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border-radius: 2.5rem;
    background-color: none;
    background-color: var(--color-header);
    padding: 0.0625rem 1.5625rem;
    overflow: hidden;
    text-align: center;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 0;
      min-height: 40px;
      overflow: hidden;
      list-style-type: none;

      li {
        display: inline-block;

        a {
          display: block;
          transform: scale(1);
          transition:
            color 0.7s ease,
            transform 100ms ease;
          margin: 0 0.3125rem;
          color: var(--color-text-secondary);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: -0.015rem;
          text-align: center;
          text-decoration: none;

          &:hover {
            color: var(--color-accent);
          }

          &:active {
            transform: scale(0.9);
            color: var(--color-accent);
          }

          &.active {
            color: var(--color-accent);
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useData } from "vitepress";
import SourceCode from ".././icons/SourceCode.vue";
import RSSFeed from ".././icons/RSSFeed.vue";

const { site, theme } = useData();

const currentPath = ref("/");
const isActive = (route: string) => currentPath.value === route;
const setActive = (route: string) => {
  currentPath.value = route;
};

onMounted(() => {
  if (typeof window !== "undefined") {
    currentPath.value = window.location.pathname;
  }
});
</script>
