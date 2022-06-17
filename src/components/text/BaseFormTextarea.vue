<template>
  <BaseFormField :error="error" :title="title">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      class="form__input form__input--area"
    ></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  name: "BaseFormTextarea",
  mixins: [formFieldMixin],
};
</script>

<style scoped></style>
