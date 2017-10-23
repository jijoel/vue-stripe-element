import loadScript from 'simple-load-script'

var stripe = null
var card = null
var elements = null

const defaultOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      lineHeight: '36px',
      // fontWeight: 300,
      // fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '16px',

      '::placeholder': {
        color: '#8898AA',
      },
    },
    invalid: {
      iconColor: '#e85746',
      color: '#e85746',
    }
  },
  classes: {
    focus: 'is-focused',
    empty: 'is-empty',
  },
}


export function BuildStripeElement(context)
{
  return loadScript('https://js.stripe.com/v3/')
    .then(() => {
      return buildElement(context)
    })
    // catch is done by StripeElement, so that it can
    // correctly display and send the error status
}


// Actually create and mount all of the objects here
function buildElement(context) {
  stripe = Stripe(context.stripeKey)
  elements = stripe.elements();
  card = elements.create(
    'card',
    Object.assign(defaultOptions, context.options)
  );

  card.mount('#' + context.el);

  // Tell StripeElement that we're ready to accept data
  card.addEventListener('ready', (event) => {
      context.setReady()
  });

  // Add an event listener for changes to the input
  // (StripeElement will write errors, as needed)
  card.addEventListener('change', (event) => {
      context.setError(event.error
        ? event.error.message
        : null
      )
  })
}


export function getPaymentToken() {
  return new Promise((resolve, reject) => {
    stripe.createToken(card)
    .then(result => {
      if (result.error)
        return reject(result.error)

      resolve(result)
    })
    .catch(error => reject(error))
  })
}
