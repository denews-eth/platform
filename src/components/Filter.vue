<template>
<div class="filter-wrap">
  <button class="filter-wrap__btn" type="button" data-toggle="collapse" data-target="#collapseFilter"
    aria-expanded="true" aria-controls="collapseFilter">Open filter</button>

  <div class="filter-wrap__content collapse show" id="collapseFilter" style="">
    <!-- filter -->
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
        <label class="filter__label" style="margin-bottom:0">Category:</label>
        <ul>
          <li style="margin-top: 15px;">
            <label class="filter__label" style="text-transform:uppercase">Crypto</label>
            <ul class="filter__checkboxes" style="margin-left:15px">
              <li>
                <input id="type5" type="checkbox" name="type5" checked="">
                <label for="type5">All News</label>
              </li>
              <li>
                <input id="type6" type="checkbox" name="type6">
                <label for="type6">Business</label>
              </li>
              <li>
                <input id="type7" type="checkbox" name="type7" checked="">
                <label for="type7">Technology</label>
              </li>
              <li>
                <input id="type8" type="checkbox" name="type8" checked="">
                <label for="type8">Coin</label>
              </li>
              <li>
                <input id="type9" type="checkbox" name="type9">
                <label for="type9">Bitcoin</label>
              </li>
              <li>
                <input id="type10" type="checkbox" name="type10">
                <label for="type10">Ethereum</label>
              </li>
              <li>
                <input id="type11" type="checkbox" name="type11">
                <label for="type11">NFTs</label>
              </li>
              <li>
                <input id="type11" type="checkbox" name="type11">
                <label for="type11">Market</label>
              </li>
              <li>
                <input id="type11" type="checkbox" name="type11">
                <label for="type11">People</label>
              </li>
              <li>
                <input id="type11" type="checkbox" name="type11">
                <label for="type11">Community</label>
              </li>
              <li>
                <input id="type11" type="checkbox" name="type11">
                <label for="type11">Policy & Regulation</label>
              </li>
            </ul>
          </li>
          <li style="margin-top: 15px;">
            <label class="filter__label" style="text-transform:uppercase">Blockchain</label>
            <ul class="filter__checkboxes" style="margin-left:15px">
              <li>
                <input id="type5" type="checkbox" name="type5" checked="">
                <label for="type5">Bitcoin</label>
              </li>
              <li>
                <input id="type6" type="checkbox" name="type6">
                <label for="type6">Ethereum</label>
              </li>
              <li>
                <input id="type7" type="checkbox" name="type7" checked="">
                <label for="type7">Polygon</label>
              </li>
            </ul>
          </li>
          <li style="margin-top: 15px;">
            <label class="filter__label" style="text-transform:uppercase">Law</label>
            <ul class="filter__checkboxes" style="margin-left:15px">
              <li>
                <input id="type5" type="checkbox" name="type5" checked="">
                <label for="type5">...</label>
              </li>
            </ul>
          </li>
        </ul>

      </div>


      <div class="filter__group">
        <button class="filter__btn" type="button">APPLY FILTER</button>
      </div>
    </div>
    <!-- end filter -->
  </div>
</div>
</template>


<script>
export default {
  name:"Filter"
}
</script>