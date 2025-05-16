const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails(
  'mailto:you@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

console.log('VAPID Public Key:', vapidKeys.publicKey);
console.log('VAPID Private Key:', vapidKeys.privateKey);

app.post('/sendNotification', (req, res) => {
  const subscription = req.body.subscription;
  const payload = JSON.stringify({ title: 'Olá!', body: 'Você recebeu uma notificação!' });

  webpush.sendNotification(subscription, payload).then(() => {
    res.sendStatus(201);
  }).catch(err => {
    console.error('Erro ao enviar notificação:', err);
    res.sendStatus(500);
  });
});

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));