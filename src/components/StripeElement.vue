<template>

  <div>
    <div class="StripeElement" v-if="!ready">
      <div v-if="!criticalError">
        <v-progress-circular
          indeterminate
          :size="30"
          color="amber"
        ></v-progress-circular>
        <span class="px-4 body-1">
          Loading Stripe . . .
        </span>
      </div>
      <div v-else>
        <span class="px-4 body-1">
          Unable to process credit cards at this time
        </span>
      </div>
    </div>

    <div :id="el" v-show="ready"></div>
    <div class="red--text">
      {{ error }}
    </div>
  </div>

</template>


<script>
import { BuildStripeElement } from 'vue-stripe-element'

export default {

  props: {
    el: {
      accept: String,
      default: 'stripe-element'
    },
    stripeKey: {
      required: true,
      accept: String,
    },
    options: {
      accept: Object,
      default: () => {},
    }
  },

  data() {
    return {
      error: null,
      ready: false,
      criticalError: false,
    }
  },

  mounted() {
    BuildStripeElement(this)
    .catch((error) => {
      this.criticalError = true
      this.$emit('error', 'Unable to load Stripe for credit card processing. Please re-load the form and try again.')
    })
  },

  methods: {
    setError(error) {
      this.error = error
    },

    setReady() {
      this.ready = true
    },
  },

}

</script>

