<template>
  <BaseFormField :error="error" :title="title">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      @input="updateValue"
      class="form__input"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";
import BaseFormField from "@/components/text/BaseFormField";

export default {
  name: "BaseFormInput",
  components: {
    BaseFormField,
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style scoped></style>
