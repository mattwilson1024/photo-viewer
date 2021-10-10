<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer";

  export let path: string;

  let containerElement;
  let isCurrentlyVisible;
  let hasEverBeenVisible = false;

  $: url = `http://localhost:3001/photos/thumbnail?path=${path}`;

  function onObserve(e: CustomEvent<IntersectionObserverEntry>): void {
    isCurrentlyVisible = e.detail.isIntersecting;
    if (isCurrentlyVisible) {
      hasEverBeenVisible = true;
    }
  }
</script>

<IntersectionObserver element={containerElement} on:observe={onObserve}>
  <div class="photo-container" bind:this={containerElement}>
    {#if isCurrentlyVisible || hasEverBeenVisible}
      <img src={url} alt="">
    {/if}
  </div>
</IntersectionObserver>

<style>
  .photo-container {
    width: 200px;
    height: 200px;
    margin: 5px;
    background-color: grey;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
</style>