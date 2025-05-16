if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    console.log('Service Worker registrado:', reg);
  });
}

document.getElementById('subscribe').addEventListener('click', async () => {
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BJKdaqgy-UDTdvortoiffXFrrrTv2L-IK2iiERBxdipENFokkOk3PYFu9mKU91MBhECdyEerOu9CU9fpH2ADteQ'
  });
  console.log('Inscrito para notificações:', JSON.stringify(sub));
});