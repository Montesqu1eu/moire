import BaseField from "@/components/uiKit/baseInput/BaseField";

export default {
  components: { BaseField },
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
