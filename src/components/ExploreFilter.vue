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
                <input id="type1" type="checkbox" name="type1" @change="updateFilter">
                <label for="type1">All News</label>
              </li>
              <li>
                <input id="Business" type="checkbox" name="Business" @change="updateFilter">
                <label for="Business">Business</label>
              </li>
              <li>
                <input id="type3" type="checkbox" name="type3" @change="updateFilter">
                <label for="type3">Technology</label>
              </li>
              <li>
                <input id="type4" type="checkbox" name="type4" @change="updateFilter">
                <label for="type4">Coin</label>
              </li>
              <li>
                <input id="type5" type="checkbox" name="type5" @change="updateFilter">
                <label for="type5">Bitcoin</label>
              </li>
              <li>
                <input id="type6" type="checkbox" name="type6" @change="updateFilter">
                <label for="type6">Ethereum</label>
              </li>
              <li>
                <input id="type7" type="checkbox" name="type7" @change="updateFilter">
                <label for="type7">NFTs</label>
              </li>
              <li>
                <input id="type8" type="checkbox" name="type8" @change="updateFilter">
                <label for="type8">Market</label>
              </li>
              <li>
                <input id="People" type="checkbox" name="People" @change="updateFilter">
                <label for="People">People</label>
              </li>
              <li>
                <input id="type10" type="checkbox" name="type10" @change="updateFilter">
                <label for="type10">Community</label>
              </li>
              <li>
                <input id="type11" type="checkbox" name="type11" @change="updateFilter">
                <label for="type11">Policy & Regulation</label>
              </li>
            </ul>
          </li>
          <li style="margin-top: 15px;">
            <label class="filter__label" style="text-transform:uppercase">Blockchain</label>
            <ul class="filter__checkboxes" style="margin-left:15px">
              <li>
                <input id="type12" type="checkbox" name="type12" @change="updateFilter">
                <label for="type12">Bitcoin</label>
              </li>
              <li>
                <input id="type13" type="checkbox" name="type13" @change="updateFilter">
                <label for="type13">Ethereum</label>
              </li>
              <li>
                <input id="type14" type="checkbox" name="type14" @change="updateFilter">
                <label for="type14">Polygon</label>
              </li>
            </ul>
          </li>
          <li style="margin-top: 15px;">
            <label class="filter__label" style="text-transform:uppercase">Law</label>
            <ul class="filter__checkboxes" style="margin-left:15px">
              <li>
                <input id="type15" type="checkbox" name="type15" @change="updateCategories(this)">
                <label for="type15">...</label>
              </li>
            </ul>
          </li>
        </ul>

      </div>


      <div class="filter__group">
        <button class="filter__btn" type="button" @click="$emit('updateSearch')">APPLY FILTER</button>
      </div>
    </div>
    <!-- end filter -->
  </div>
</div>
</template>


<script>
export default {
  name:"ExploreFilter",
  methods: {
    updateFilter(value) {
      if(value.target.checked) {
        //Push in the list
        this.$emit('pushCategory', value.target.name)
      }
      else {
        //Remove
        this.$emit('removeCategory', value.target.name)
      }
    }
  }
}
</script>