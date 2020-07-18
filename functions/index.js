const functions = require('firebase-functions');
const SparkPost = require('sparkpost');
const client = new SparkPost('14697761f06f690e2972b9bf681893efc90f94b9');
const formatMoney = (num) => Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
const admin = require('firebase-admin');
const serviceAccount = require('./cert.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://proyectogra-54925.firebaseio.com'
});


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

exports.updateOrder = functions.database.ref('/orders/{userId}/{orderId}').onUpdate( change => {
  const after = change.after.val();
  const db = admin.database().ref(`/users/${after._userid}/orders/${after.orderId}`);
  let data = null;

  if (after.status === 'completado') {
    return db.once('value').then( snap => {
      data = snap.val();

      after.products.forEach( prd => {
        const prd_id = prd.product._id;
        
        data.products = data.products.map( prod => {
          prod.shipped = prod.product._id === prd_id ? true : prod.shipped;
  
          return prod;
        });
      });

      data.status = data.products.filter( product => product.shipped === false).length ? 'pendiente' : 'completado';
  
      return db.update(data);
    });
  }

  return null;
});

// exports.checkOrderCompleted = functions.database.ref(`/users/{userId}/orders/{orderId}`).onUpdate( change => {
//   const after = change.after.val();
//   const before = change.before.val();

//   if (after.status === 'completado') {
//     console.log(`La orden ${after.orderId} ya ha sido completada`);

//     return null;
//   }

//   let allProductsShipped = after.products.filter( product => product.shipped === false).length ? false : true;

//   if (allProductsShipped && after.status !== before.status) {
    
//     return change.after.ref.update({ status: 'completado' });
//   }

//   return null;
// });