<template>
  <div class="form__counter">
    <button aria-label="Убрать один товар" @click.prevent="countMinus">
      <svg
        fill="none"
        height="37"
        viewBox="0 0 37 37"
        width="37"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="36" rx="18" stroke="#E2E2E2" width="36" x="0.5" y="0.5" />
        <path d="M22.287 19.574H14.7V17.765H22.287V19.574Z" fill="#9D9D9D" />
      </svg>
    </button>

    <input :value="counter" type="text" @input="onInput" />

    <button aria-label="Добавить один товар" @click.prevent="countPlus">
      <svg
        fill="none"
        height="37"
        viewBox="0 0 37 37"
        width="37"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="36" rx="18" stroke="#E2E2E2" width="36" x="0.5" y="0.5" />
        <path
          d="M19.524 23.086H18.094V18.576H13.54V17.102H18.094V12.57H19.524V17.102H24.078V18.576H19.524V23.086Z"
          fill="#9D9D9D"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseCounter",
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 99,
    },
    defaultNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      counter: this.defaultNum,
    };
  },
  methods: {
    countPlus() {
      if (this.counter < this.max) this.counter++;
      this.$emit("update", this.counter);
    },
    countMinus() {
      if (this.counter > this.min) this.counter--;
      this.$emit("update", this.counter);
    },
    onInput(event) {
      this.$emit("update", +event.target.value);
    },
  },
};
</script>

<style scoped></style>
