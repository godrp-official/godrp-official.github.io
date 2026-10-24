const supportForm = document.getElementById('supportForm');
const formStatus = document.getElementById('formStatus');

if (supportForm && formStatus) {
  supportForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(supportForm);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Lütfen tüm alanları doldurunuz.';
      formStatus.className = 'formStatus error';
      return;
    }

    formStatus.textContent = 'Mesaj gönderiliyor...';
    formStatus.className = 'formStatus';

    const webhookUrl = 'https://discord.com/api/webhooks/1527728459802218706/VeKJlHzhzycsBDL7qp6mvdRdXWlX1kU7WLYSDUr-ggCVIcO-c7NMyGquyNORgFjStbwN';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `Yeni destek isteği!`,
          embeds: [
            {
              title: subject,
              color: 0x2ecc71,
              fields: [
                { name: 'İsim', value: name, inline: true },
                { name: 'E-posta', value: email, inline: true },
                { name: 'Mesaj', value: message }
              ],
              timestamp: new Date().toISOString()
            }
          ]
        })
      });

      if (response.ok) {
        formStatus.textContent = 'Mesaj başarıyla Discord kanalına gönderildi.';
        formStatus.className = 'formStatus success';
        supportForm.reset();
      } else {
        formStatus.textContent = 'Mesaj gönderilemedi. Webhook URL’sini kontrol edin.';
        formStatus.className = 'formStatus error';
      }
    } catch (error) {
      formStatus.textContent = 'Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.';
      formStatus.className = 'formStatus error';
    }
  });
}
