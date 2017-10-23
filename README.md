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

      getPaymentToken() {
        return new Promise((resolve, reject) => {
          getPaymentToken()
          .then((response) => {
            this.form.token = response.token
            resolve()
          })
          .catch((error) => {
            // do error things
          })
        })
      },


stripe-payment-form mixin
---------------------------

If you would like, and you are using the vue-message-helper package and vee-validate, you can also include a stripe-payment-form mixin which will automatically validate your form with vee-validate, post the credit data to Stripe, and then serialize and post your form data to your server (to the specified uri). To do this:

    import StripeForm from 'vue-stripe-element/src/mixins/stripe-payment-form'

    mixins: [ StripeForm ],

    data() {
      return {
        uri: '/path/to/post',
      }
    },

In your template, the submit button will look something like this:

    <v-btn color="primary"
      @click="submit"
      :loading="loading"
      :disabled="loading || errors.any()"
    >
      Submit
    </v-btn>

If there are problems, an error message will be shown. Otherwise, you can handle the response:

    handleResponse(response) {
      this.setStatus('success')
      this.setSnackbar('success', 'Your data has been sent')

      console.log('response', response)
    },

