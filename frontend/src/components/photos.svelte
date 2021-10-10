<script lang="ts">
  import Photo from './photo.svelte';

  let photos: string[] = [];

  async function loadListOfPhotos(): Promise<void> {
    const response = await fetch(`http://localhost:3001/photos`);
    photos = await response.json();
  }
</script>

<ul>
  <button on:click={loadListOfPhotos}>Load folder</button>

  <div class="photo-grid">
    {#each photos as photo}
      <Photo path={photo} />
    {/each}
  </div>
</ul>

<style>
  .photo-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>