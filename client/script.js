document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;
  const statusMsg = document.getElementById('statusMsg');

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok) {
      statusMsg.textContent = data.message;
      statusMsg.style.color = "green";
      this.reset();
    } else {
      statusMsg.textContent = data.message || "Failed to send message.";
      statusMsg.style.color = "red";
    }
  } catch (err) {
    statusMsg.textContent = "Error sending message.";
    statusMsg.style.color = "red";
  }
});
