<template>
  <BaseField :error="error" :title="title">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      class="form__input form__input--area"
    ></textarea>
  </BaseField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";
import BaseField from "@/components/uiKit/baseInput/BaseField";
export default {
  name: "BaseFormTextarea",
  components: {
    BaseField,
  },
  mixins: [formFieldMixin],
};
</script>

<style scoped></style>
