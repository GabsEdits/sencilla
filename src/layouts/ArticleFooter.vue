<template>
  <section id="article-footer">
    <hr />
    <p v-if="frontmatter.message || theme.articles.message">
      {{ frontmatter.message || theme.articles.message }}
    </p>
    <template v-if="frontmatter.comments">
      <h2>Comments</h2>
      <p>
        If you have any questions or comments about this post, please feel free
        to leave a comment
        <span
          v-if="frontmatter.comments === 'giscus'"
          style="display: inline-block"
          >below</span
        ><span
          v-if="frontmatter.comments === 'activitypub'"
          style="display: inline-block"
          >on
          <a :href="frontmatter.post" style="display: inline-block"
            >this post</a
          ></span
        >.
      </p>

      <p
        v-if="frontmatter.comments === 'activitypub'"
        style="text-align: center"
      >
        <small
          >Due to some issues with the ActivityPub comments, they are currently
          disabled. Sorry for the inconvenience.</small
        >
      </p>

      <noscript
        ><small
          >Heads Up! You <i>need</i> JavaScript to view/write comments or to
          react to the post. So you can't do anything unless you turn on
          JavaScript.</small
        ></noscript
      >
      <!-- <MastodonComments
      v-if="frontmatter.comments === 'activitypub'"
    ></MastodonComments> -->
      <Giscus v-if="frontmatter.comments === 'giscus'" />
      <br />
      <hr />
    </template>
    <div v-if="frontmatter.prev || frontmatter.next" class="dialog-buttons">
      <a
        v-if="frontmatter.prev"
        class="article-nav"
        :href="`${frontmatter.prev.toLowerCase().replace(/\s+/g, '-')}.html`"
        target="_self"
      >
        <span><small>← Previous</small></span>
        <br /><span>{{ frontmatter.prev }}</span>
      </a>
      <a
        v-if="frontmatter.next"
        class="article-nav"
        :href="`${frontmatter.next.toLowerCase().replace(/\s+/g, '-')}.html`"
        target="_self"
      >
        <span><small>Next →</small></span>
        <br /><span>{{ frontmatter.next }}</span>
      </a>
    </div>
    <Helpful />
  </section>
</template>

<script setup lang="ts">
import { useData } from "vitepress";

import Giscus from "../components/GiscusComments.vue";
import Helpful from "./Helpful.vue";
/* import MastodonComments from "./MastodonComments.vue"; */

const { frontmatter, theme } = useData();
</script>

<style lang="scss">
#article-footer {
  margin-top: 50px;

  .article-nav {
    display: block;
    transition: all 0.3s ease;
    margin: 0 0.2rem;
    background-color: transparent;
    padding: 20px;
    color: var(--color-accent);
    text-align: center;
    text-decoration: none;

    &:first-child {
      border-radius: 10px;
      text-align: left;
    }

    &:last-child {
      border-radius: 10px;
      text-align: right;
    }

    &:hover {
      transform: translateY(-5px);
    }

    &:active {
      transform: scale(0.95);
    }

    span {
      margin-bottom: 0 !important;
      font-size: 1em;
    }
  }
}
</style>
