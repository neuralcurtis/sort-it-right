// Відображення або приховування AI-помічника
document.getElementById('ai-helper').addEventListener('click', () => {
  document.getElementById('ai-popup').classList.remove('hidden');
});

document.getElementById('close-ai').addEventListener('click', () => {
  document.getElementById('ai-popup').classList.add('hidden');
});

// Відображення або приховування текстових вікон
document.getElementById('how-to-sort').addEventListener('click', () => {
  openTextPopup('Як сортувати сміття', 'Тут буде текст про те, як правильно сортувати сміття.');
});

document.getElementById('where-to-find').addEventListener('click', () => {
  openTextPopup('Де знайти сміття для сортування', 'Тут буде текст про місця збору сміття.');
});

document.getElementById('notes').addEventListener('click', () => {
  openTextPopup('Примітки', 'Тут будуть ваші примітки.');
});

document.getElementById('close-text').addEventListener('click', () => {
  document.getElementById('text-popup').classList.add('hidden');
});

// Функція для відкриття текстового вікна
function openTextPopup(title, content) {
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-content').textContent = content;
  document.getElementById('text-popup').classList.remove('hidden');
}

//load
document.getElementById("send-image").addEventListener("click", function () {
  const fileInput = document.getElementById("upload-image");
  const file = fileInput.files[0];

  if (!file) {
    alert("Будь ласка, виберіть файл.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  fetch("upload.php", {
    method: "POST",
    body: formData,
  })
    .then(response => response.text()) // Спочатку отримуємо відповідь як текст
    .then(rawData => {
      try {
        const data = JSON.parse(rawData); // Пробуємо розпарсити JSON
        if (data.status === "success") {
          document.getElementById("ai-result").textContent = data.message;
        } else {
          document.getElementById("ai-result").textContent = "Помилка: " + data.message;
        }
      } catch (e) {
        document.getElementById("ai-result").textContent = "Сервер надіслав некоректну відповідь: " + rawData;
      }
    })
    .catch(error => {
      document.getElementById("ai-result").textContent = "Сталася помилка: " + error;
    });
});


// launch:
// npx http-server -a 10.7.78.72 -p 8080