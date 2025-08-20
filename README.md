# 🌾 AgroXpert – Smart Farming Solution

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Django](https://img.shields.io/badge/Django-4.2-green?logo=django)
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-RandomForest-orange?logo=scikit-learn)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)


AgroXpert is an **AI-powered agriculture platform** connecting **Farmers**, **Labs**, and **Agronomists** in one ecosystem.  
It uses **Machine Learning** for crop, fertilizer, and yield prediction, integrates **real-time weather data**, and provides tools for soil testing, plant disease detection, and expert consultations.

---

## 🚀 Features

### 👨‍🌾 Farmers
- Role-based dashboard.
- Request soil analysis & view lab reports.
- AI-powered crop, fertilizer, and yield predictions.
- Real-time weather updates & plant disease detection.
- Q&A forum for asking experts.
- Book expert consultations.

### 🧪 Labs
- Manage soil test requests from farmers.
- Upload results & notify farmers.

### 🌱 Agronomists
- Answer farmer questions in the forum.
- Accept or reject consultation requests.

---

## 🛠️ Tech Stack

**Frontend:** React.js, Axios, Tailwind CSS  
**Backend:** Django REST Framework, MongoEngine  
**Database:** MongoDB  
**Authentication:** JWT  
**Machine Learning:** scikit-learn, Pandas, NumPy, RandomForest Classifier  
**External APIs:**  
- [PlantNet API](https://plantnet.org) – Plant disease detection  
- Weather API – Real-time forecasts  

---

## 📂 Project Structure
AgroXpert/
│── backend/
│ ├── backend/
│ │ ├── init.py
│ │ ├── asgi.py
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── core/ # Main Django app (models, views, serializers)
│ ├── ml/ # ML models & scripts
│ ├── db.sqlite3 # Local SQLite DB (for development)
│ ├── manage.py
│
│── env/ # Python virtual environment (ignored in GitHub)
│
│── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/ # React components & pages
│ ├── package.json
│ ├── package-lock.json
│ └── .gitignore
│
│── README.md
│── .gitignore
