Vue Stripe Element
=====================
This package contains a &gt;stripe-element&lt; component for Vue projects. It works best with the vuetify library.


Installation
-------------
Enter this in dependencies in your package.json file:

    "vue-stripe-element": "jijoel/vue-stripe-element#master",


Usage
---------
Import script methods:

    import { getPaymentToken } from 'vue-stripe-element'

Require the component:

    Vue.component('stripe-element', require('vue-stripe-element/src/components/StripeElement.vue'));

Load the component on your page:

    <stripe-element
      stripe-key="pk_xxx"
      :error="handleError"
    ></stripe-element>

The component accepts these props:

    prop       | default         | description
    -----------|-----------------|-------------
    el         | stripe-element  | The element to be bound
    stripe-key | (required)      | your public stripe key
    options    | {}              | options to send to stripe. See the [official stripe documentation](https://stripe.com/docs/stripe.js#element-options) for more information

You can optionally include styles, for instance:

    .StripeElement {
      background-color: $yellow.lighten-4
      border: 3px dashed $yellow.lighten-1
      border-radius: 6px
      padding:10px
    }

You can load the stripe token from your main form, like this:

    methods: {

      submit() {
        // Run form validation with vee-validate:
        this.$validator.validateAll().then((result) => {
          if (! result)  { // Javascript validation failed
            this.setStatus('validation')
            return this.scrollToTop()
          }

          this.getPaymentToken()
          .then(() => this.postFormData())
        })
      },

      getPaymentToken() {
        this.setSnackbar('pending','Sending credit card data to stripe')
        this.setStatus('pending','Sending credit card data to stripe')

        return new Promise((resolve, reject) => {
          getPaymentToken()
          .then((response) => {
            this.form.token = response.token
            resolve()
          })
          .catch((error) => {
            this.setSnackbar('error', error.message)
            this.setStatus('error')
          })
        })
      },

