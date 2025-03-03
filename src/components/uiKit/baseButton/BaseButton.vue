<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="buttonType"
    class="base-button"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { BUTTON_TYPES, HTML_BUTTON_TYPES, BUTTON_MODIFIERS } from "./constants";

const props = defineProps({
  type: {
    type: String,
    default: BUTTON_TYPES.PRIMARY,
    validator: (value) => Object.values(BUTTON_TYPES).includes(value),
  },
  buttonType: {
    type: String,
    default: HTML_BUTTON_TYPES.BUTTON,
    validator: (value) => Object.values(HTML_BUTTON_TYPES).includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

defineEmits(["click"]);

const buttonClasses = computed(() => BUTTON_MODIFIERS[props.type]);
</script>

<style lang="scss" scoped>
@import "./styles/baseButton/base-button.scss";
</style>
