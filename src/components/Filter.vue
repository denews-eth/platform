<template>
<div class="filter">
  <h4 class="filter__title">Filters <button type="button">Clear all</button></h4>

  <div class="filter__group">
    <label class="filter__label">Keyword:</label>
    <input type="text" class="filter__input" placeholder="Keyword">
  </div>

  <div class="filter__group">
    <label for="sort" class="filter__label">Sort by:</label>

    <div class="filter__select-wrap">
      <select name="sort" id="sort" class="filter__select">
        <option value="0">Relevance</option>
        <option value="1">Newest</option>
        <option value="2">Oldest</option>
      </select>
    </div>
  </div>

  <div class="filter__group">
    <label class="filter__label">Category:</label>
    <ul class="filter__checkboxes">
      <li>
        <input id="type5" type="checkbox" name="type5" checked="">
        <label for="type5">Art</label>
      </li>
      <li>
        <input id="type6" type="checkbox" name="type6">
        <label for="type6">Photography</label>
      </li>
      <li>
        <input id="type7" type="checkbox" name="type7" checked="">
        <label for="type7">Games</label>
      </li>
      <li>
        <input id="type8" type="checkbox" name="type8" checked="">
        <label for="type8">Metaverses</label>
      </li>
      <li>
        <input id="type9" type="checkbox" name="type9">
        <label for="type9">Music</label>
      </li>
      <li>
        <input id="type10" type="checkbox" name="type10">
        <label for="type10">Domains</label>
      </li>
      <li>
        <input id="type11" type="checkbox" name="type11">
        <label for="type11">Memes</label>
      </li>
    </ul>
  </div>

  <div class="filter__group">
    <button class="filter__btn" type="button">APPLY FILTER</button>
  </div>
</div>
</template>

<script>
export default {
  name:"Filter"
}
</script>