<template>
  <baseCounterField :error="error" :title="title">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      class="form__input form__input--area"
    ></textarea>
  </baseCounterField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  name: "baseCounterTextarea",
  mixins: [formFieldMixin],
};
</script>

<style scoped></style>
