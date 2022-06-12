<template>
  <fieldset class="form__block">
    <legend class="form__legend">Размер</legend>
    <label class="form__label form__label--small form__label--select">
      <select
        v-model="selected"
        class="form__select"
        name="category"
        @change="onSelect"
      >
        <option
          v-for="(item, index) in dataList"
          :key="index"
          :selected="index === 0"
          :value="item"
        >
          {{ item.title }}
        </option>
      </select>
    </label>
  </fieldset>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: this.dataList[0] ?? null,
    };
  },
  methods: {
    onSelect() {
      this.$emit("select", this.selected);
    },
  },
};
</script>

<style scoped></style>
