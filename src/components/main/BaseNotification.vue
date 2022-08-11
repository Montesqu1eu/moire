<template>
  <Transition name="slide-fade">
    <div v-if="isActive" :class="['notification', notification.type]">
      <div class="notification__container">
        <button @click="hide" type="button" class="notification__close">
          x
        </button>
        <h3 class="notification__title notif-title">
          {{ notification.title }}
        </h3>
        <p class="notification__text">{{ notification.message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script>
import { types } from "@/enums/notification";

export default {
  name: "BaseNotification",
  props: {
    time: {
      // time to show
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      timerId: null,
    };
  },
  computed: {
    notification() {
      return this.$store.state.notification;
    },
    currentType() {
      return this.$store.state.notification.type || types.INFO;
    },
    isActive() {
      return this.$store.state.notification.isShow;
    },
  },
  methods: {
    hide() {
      clearTimeout(+this.timerId);
      this.$store.commit("hideNotification");
    },
  },
  watch: {
    isActive() {
      if (this.isActive) {
        this.timerId = setTimeout(() => this.hide(), this.time);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.notification {
  position: absolute;
  top: 70px;
  right: 20px;
  width: 100%;
  max-width: 300px;
  padding: 12px;
  background-color: #dedede;
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 20;

  &.info {
    .notif-title {
      color: blue;
    }
  }

  &.warn {
    .notif-title {
      color: #e02d71;
    }
  }

  &.error {
    .notif-title {
      color: red;
    }
  }

  &.success {
    .notif-title {
      color: green;
    }
  }

  &__title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }

  &__text {
    margin: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 10px;
    height: 10px;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
