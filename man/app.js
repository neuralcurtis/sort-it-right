document.addEventListener('DOMContentLoaded', function() {
  // Елементи AI-помічника
  const aiButton = document.getElementById('ai-helper');
  const closeAiButton = document.getElementById('close-ai');
  const aiPopup = document.getElementById('ai-popup');
  const sendImageButton = document.getElementById('send-image');
  const resultText = document.getElementById('ai-result');
  const fileInput = document.getElementById('upload-image');

  // Інші попапи
  const textPopup = document.getElementById('text-popup');
  const popupTitle = document.getElementById('popup-title');
  const popupContent = document.getElementById('popup-content');
  const closeTextButton = document.getElementById('close-text');

  // Відкриття AI-попапу
  aiButton.addEventListener('click', function() {
      aiPopup.classList.remove('hidden');
  });

  // Закриття AI-попапу
  closeAiButton.addEventListener('click', function() {
      aiPopup.classList.add('hidden');
  });

  // Обробка завантаження та надсилання зображення
  sendImageButton.addEventListener('click', function() {
      const file = fileInput.files[0];
      if (!file) {
          alert("Будь ласка, оберіть зображення");
          return;
      }

      const formData = new FormData();
      formData.append('image', file);

      fetch('http://localhost:5000/classify', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              alert(data.error);
          } else {
              resultText.innerText = `Клас: ${data.category}`;
          }
      })
      .catch(error => {
          console.error('Помилка:', error);
      });
  });

  // Відкриття інших попапів (наприклад, "Як користуватися програмою?")
  document.querySelectorAll('.menu-button').forEach(button => {
      button.addEventListener('click', function() {
          const buttonId = this.id;
          switch (buttonId) {
              case 'how-to-sort':
                  popupTitle.innerText = 'Як користуватися програмою?';
                  popupContent.innerText = 'Ось як можна користуватися цією програмою...';
                  textPopup.classList.remove('hidden');
                  break;
              case 'where-to-find':
                  popupTitle.innerText = 'Місця що потребують сортування';
                  popupContent.innerText = 'Ось список місць...';
                  textPopup.classList.remove('hidden');
                  break;
              case 'notes':
                  popupTitle.innerText = 'Примітки';
                  popupContent.innerText = 'Ось ваші примітки...';
                  textPopup.classList.remove('hidden');
                  break;
              default:
                  break;
          }
      });
  });

  // Закриття текстового попапу
  closeTextButton.addEventListener('click', function() {
      textPopup.classList.add('hidden');
  });
});
