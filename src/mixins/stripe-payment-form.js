// This mixin will automatically load a stripe token before
// submitting data to a server.
//
// It assumes that you are using vee-validate for field
// validation, and loading mixins from vue-message-helper

import Snackbar from 'vue-message-helper/src/mixins/snackbar'
import Status from 'vue-message-helper/src/mixins/status'
import Validation from 'vue-message-helper/src/mixins/laravel-validation'

import { getPaymentToken } from 'vue-stripe-element'


export default {

  mixins: [ Snackbar, Status, Validation ],

  data() {
    return {
      uri: '/',
      form: {
        stripe_token: null,
      },
    }
  },

  methods: {

    submit() {
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
          this.form.stripe_token = response.token
          resolve()
        })
        .catch((error) => {
          this.setSnackbar('error', error.message)
          this.setStatus('error')
        })
      })
    },

    postFormData() {
      this.setSnackbar('pending','Posting data to server')
      this.setStatus('pending','Posting data to server')

      var clone = JSON.parse(JSON.stringify(this.form))

      axios.post(this.uri, clone)
      .then((response) => {
        this.handleResponse(response)
      })
      .catch((errors) => {
        this.handleErrors(errors)
      })
    },

    handleResponse(response) {
      this.setStatus('success')
      this.setSnackbar('success', 'Your data has been sent')

      console.error('customize this method for your own application')
      console.error('response', response)
    },

    handleErrors(errors) {
      this.setSnackbar('error', 'There was an error processing your data')
      this.setServerValidationErrors(errors)
      this.setErrorStatus(errors)
    },
  }

}
