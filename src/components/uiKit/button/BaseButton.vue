<template>
  <button
    :class="[
      'button',
      {
        'button--primery': type === 'primary',
        'button--second': type === 'secondary',
        'button--del': type === 'delete',
      },
    ]"
    :disabled="disabled"
    :type="buttonType"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "delete"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "button",
      validator: (value) => ["button", "submit", "reset"].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/baseButton/base-button.scss";
</style>
