import BaseFormField from "@/components/text/BaseFormField";

export default {
  components: { BaseFormField },
  props: {
    title: null,
    error: null,
    placeholder: null,
    modelValue: "",
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
