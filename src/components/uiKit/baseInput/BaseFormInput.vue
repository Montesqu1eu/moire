<template>
  <BaseField :error="error" :title="title">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      @input="updateValue"
      class="form__input"
    />
  </BaseField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";
import BaseField from "@/components/uiKit/baseInput/BaseField";

export default {
  name: "BaseFormInput",
  components: {
    BaseField,
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
