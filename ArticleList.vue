<template>
  <div class="article-list">
    <noscript>
      <small>To use the filter you need JavaScript to be enabled.</small>
    </noscript>
    <div class="filter-tags">
      <button @click="filterPosts('')" id="all-tags">All</button>
      <button v-for="tag in uniqueTags" :key="tag" @click="filterPosts(tag)">
        <span class="hashtag">#</span>{{ tag }}
      </button>
    </div>
    <div class="post-container">
      <article
        v-for="post in filteredPosts"
        :key="post.title"
        class="post"
        :class="post.type"
        :style="post.banner ? `background-image: url(${post.banner})` : ''"
      >
        <h3>
          <a
            :href="`posts/${post.title
              .toLowerCase()
              .replace(/\s+/g, '-')}.html`"
            >{{ post.title }}</a
          >
        </h3>
        <p v-if="post.description">{{ post.description }}</p>
        <div class="tags" v-if="post.tags">
          <span v-if="typeof post.tags === 'string'" :key="post.tags"
            >#{{ post.tags }}</span
          >
          <span v-else v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
          <template v-if="post.type">
            <span :class="post.type"
              >{{ post.type.charAt(0).toUpperCase() + post.type.slice(1)
              }}<template v-if="post.type === 'archive'">d</template>
            </span>
          </template>
        </div>
        <p class="date">
          {{ post.date }}
          <span v-if="post.author">
            &middot;
            {{ post.author.length > 1 ? "Authors:" : "Author:" }}
            <template v-for="(author, index) in post.author" :key="index">
              {{ author
              }}<span v-if="index !== post.author.length - 1">, </span>
            </template>
          </span>
        </p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from "/.vitepress/theme/posts.data";
import { computed, ref } from "vue";

const selectedTag = ref(null);

const allTags = computed(() => {
  return posts.reduce((tags, post) => {
    return tags.concat(Array.isArray(post.tags) ? post.tags : [post.tags]);
  }, []);
});

const uniqueTags = computed(() => {
  const tags = [...new Set(allTags.value)];
  return tags.filter((tag) => tag !== "");
});

const filteredPosts = computed(() => {
  return selectedTag.value === null
    ? posts
    : posts.filter((post) =>
        Array.isArray(post.tags)
          ? post.tags.includes(selectedTag.value)
          : post.tags === selectedTag.value,
      );
});

function filterPosts(tag: string) {
  selectedTag.value = tag === "" ? null : tag;
}
</script>

<style lang="scss">
.article-list {
  margin: 0 auto;
}

.post-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  margin: 0 2.5rem;
  gap: 15px;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  article {
    transition: transform 0.3s ease;
    border-radius: 1.3rem;
    padding: 12.5rem 2.5rem 2rem 2.5rem;
    background-color: var(--color-background-second);
    color: white !important;
    background-size: cover;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 85%;
      border-radius: 0 0 1.3rem 1.3rem;
      background: linear-gradient(transparent, rgba(29, 27, 27, 0.7));
      pointer-events: none;
    }

    h3,
    p,
    .date {
      position: relative;
    }

    &:first-child {
      background-color: var(--color-background-mute);
    }

    h3 {
      margin: 0;
      font-size: 24px;
      margin-bottom: 0.625rem;
      color: white;

      a {
        font-weight: 700;
        letter-spacing: normal;
        text-decoration: none;
        color: white;

        &::after {
          font-size: large;
        }
      }

      .tags span {
        background-color: #5b4f001d;

        @media (prefers-color-scheme: dark) {
          background-color: #ffff001c;
        }
      }
    }

    p {
      margin: 0;
      color: white;
      font-weight: 400;
      text-decoration: none;
    }

    .date {
      font-feature-settings: "zero", "tnum", "cv03", "cv02";
      margin: 5px 0;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: right;
    }

    .tags {
      margin-top: 10px;
      top: 1rem;
      right: 2rem;
      text-align: right;
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      gap: 0.3125rem;

      span {
        margin-bottom: 5px;
        border-radius: 20px;
        background-color: var(--color-background-second);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding: 0.15rem 0.45rem;
        color: var(--color-accent);
        font-weight: 500;
        box-shadow: var(--base-shadow);
        border: 1px solid var(--color-accent);
        font-size: 12px;
      }

      .archive {
        background-color: #e1cadf;
        border: 0;
        color: #6a0dad;

        @media (prefers-color-scheme: dark) {
          background-color: #6a0dad;
          color: #e1cadf;
        }
      }

      .draft {
        background-color: #f0e68c;
        border: 0;
        color: #8b7500;

        @media (prefers-color-scheme: dark) {
          background-color: #8b7500;
          color: #f0e68c;
        }
      }

      .featured {
        background-color: #ffcccb;
        border: 0;
        color: #8b0000;

        @media (prefers-color-scheme: dark) {
          background-color: #8b0000;
          color: #ffcccb;
        }
      }
    }
  }
}

.filter-tags {
  margin-bottom: 20px;

  #all-tags {
    background-color: var(--color-accent-alpha);
    color: var(--color-accent);
  }

  button {
    transition: all 0.3s ease;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 3px;
    border-radius: 20px;
    background-color: var(--color-background-second);
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;

    &:hover {
      background-color: var(--color-accent-alpha);
      color: var(--color-accent);
    }

    &:active {
      transform: scale(0.8);
    }
  }
}
</style>
