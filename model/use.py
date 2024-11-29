import os
import pickle
from skimage.io import imread
from skimage.transform import resize
import numpy as np
import time

print("Initialazing neural network...")
time.sleep(2)

#сюди path
model = pickle.load(open('./classifier.p', 'rb'))
os.system("clear")
img_path = str(input("Введіть зображення: "))
#img_path = '/Users/ivan/Desktop/istockphoto-598794692-612x612.jpg'

time.sleep(1)
#підготовка зображення
img = imread(img_path)
img = resize(img, (15, 15))
print("Ресайзимо зображення до 15x15 \n")
img_flattened = img.flatten().reshape(1, -1)

time.sleep(1)
print("Розпочинаємо передбачення \n")
prediction = model.predict(img_flattened)

categories = ['brown-glass', 'copper', 'green-glass', 'plastic', 'white-glass']
predicted_category = categories[prediction[0]]

time.sleep(1.5)
print(f'Клас цього обʼєкту - {predicted_category}')

#категоризація
if predicted_category == 'brown-glass' or 'green-glass' or 'white-glass':
    print("Цей обʼєкт варто покласти до каегорії Скло")
elif predicted_category == 'copper':
    print("Цей обʼєкт варто покласти до каегорії Мідь")
elif predicted_category == 'plastic':
    print("Цей обʼєкт варто покласти до каегорії Пластик")