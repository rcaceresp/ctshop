const functions = require('firebase-functions');
const SparkPost = require('sparkpost');
const client = new SparkPost('14697761f06f690e2972b9bf681893efc90f94b9');
const formatMoney = (num) => Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

exports.sendConfEmail = functions.database.ref('/users/{userId}/orders/{orderId}').onCreate( (snap, ctx) => {
  const order = snap.val();

  order.products = order.products.map( prod => {
    const c = {...prod};
    c['formatted_price'] = `L ${formatMoney(prod.discountedPrice.discountedPrice)}`;

    return c;
  });

  order['formatted_orderTotal'] = `L ${formatMoney(order.orderTotal)}`;
  order['tipo_entrega'] = order.shipping === 0 ? 'Recoger en tienda' : 'A domicilio';
  order['formatted_shipping'] = `L ${formatMoney(order.shipping)}`;
  

  return client.transmissions.send({
    options: { sandbox: false },
    content: {
      from: 'info@mail.catrachosshop.com',
      subject: 'Gracias por tu compra!',
      template_id: 'ctshop-confirmation'
    },
    recipients: [{
      address: order.email,
      substitution_data: {
        order: order
      }
    }]
  })
  .then(data => {
    console.log(`Confirmation email sent to ${order.email}`);

    return `Confirmation email sent to ${order.email}`;
  })
  .catch(err => {
    console.log(`Whoops! Something went wrong sending confirmation email to ${order.email}`);
    console.log(err.message);

    return err.message;
  });
});