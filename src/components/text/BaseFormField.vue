<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: "BaseFormField",
  props: {
    title: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
