# 🧠 CodeRevise AI

> An AI-powered DSA Revision Platform that simulates human memory, predicts forgetting, and intelligently schedules revisions using a scientifically inspired memory engine.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Live-success)

---

## 🌐 Live Demo

**Frontend**

https://code-revise-ai.vercel.app

**Backend API**

https://coderevise-ai.onrender.com

---

# 📖 Overview

CodeRevise AI is an intelligent revision platform designed for competitive programmers and software engineers preparing for coding interviews.

Unlike traditional DSA trackers, CodeRevise AI continuously evaluates how well a user remembers each problem and predicts future memory decay using an adaptive memory engine.

Instead of simply marking problems as solved, the platform tracks learning quality, revision history, recall performance, confidence, speed, mastery progression, and memory stability to recommend the optimal revision schedule.

The objective is to maximize long-term retention while minimizing unnecessary revisions.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Secure Login & Registration
- Refresh Token Support
- Protected Routes
- Cookie-based Authentication

---

## 📚 Problem Management

- Add Problems
- Edit Problems
- Delete Problems
- Search Problems
- Filter by Platform
- Filter by Difficulty
- Tags Support
- Notes
- Revision History

---

## 🧠 Intelligent Memory Engine

Unlike traditional spaced repetition systems, CodeRevise AI evaluates multiple cognitive parameters.

Tracks

- Memory Strength
- Forgetting Curve
- Learning Velocity
- Learning Gain
- Retrieval Quality
- Stability Multiplier
- Mastery Score
- Speed Score
- Confidence Score
- Revision Efficiency

The engine continuously updates these metrics after every revision session.

---

## 📈 Analytics Dashboard

Interactive dashboard containing

- Learning Progress
- Weekly Activity
- Revision Queue
- Platform Distribution
- Difficulty Distribution
- Retention Curve
- Streak Tracking
- Solved Problems
- Upcoming Revisions

---

## 🤖 AI Learning Insights

Generate personalized learning reports based on

- Weak Topics
- Strong Topics
- Revision Consistency
- Memory Decay
- Confidence Trends
- Learning DNA
- AI Coach Suggestions

---

## ⚔ Memory Simulator

Simulates future memory retention.

Predicts

- Memory Decay
- Forget Date
- Future Recall Probability
- Recommended Revision Date

---

## 📊 Problem Analytics

Every solved problem stores

- Total Revisions
- Best Recall
- Worst Recall
- Learning Curve
- Average Speed
- Confidence Trend
- Mastery Progress
- Memory Timeline

---

# 🏗 Architecture

```
                React + Vite
                     │
                     │ REST API
                     ▼
              Express.js Server
                     │
         ┌───────────┴────────────┐
         │                        │
 Memory Engine              Authentication
         │                        │
 Revision Engine          JWT + Cookies
         │                        │
 Analytics Layer        User Management
         │                        │
         └───────────┬────────────┘
                     │
                MongoDB Atlas
```

---

# 🧮 Memory Engine

The platform includes a custom memory engine inspired by cognitive science principles.

The engine calculates

- Memory Score
- Forgetting Curve
- Stability
- Learning Velocity
- Retrieval Quality
- Revision Priority

using multiple independent scoring services.

```
Memory Score

        ↓

Learning Gain

        ↓

Memory Stability

        ↓

Revision Recommendation

        ↓

Next Revision Schedule
```

---

# 📁 Project Structure

```
CodeRevise-AI

client/
    src/
        components/
        pages/
        routes/
        services/
        layouts/

server/
    src/
        controllers/
        middleware/
        models/
        routes/
        services/
            memory/
                analytics/
                engine/
                scoring/
                simulation/
                state/
        validation/
        docs/
```

---

# ⚙ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Helmet
- CORS

---

## Database

MongoDB Atlas

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/790aryan/CodeRevise-AI.git
```

Move into project

```bash
cd CodeRevise-AI
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Environment Variables

Backend

```env
PORT=5000

NODE_ENV=development

CLIENT_URL=http://localhost:5173

MONGODB_URI=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=
```

Frontend

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

# 📷 Screenshots

> Add screenshots here

- Landing Page

- Dashboard

- Analytics

- Memory Simulator

- Problem Analytics

- Learning DNA

---

# 🔮 Future Improvements

- AI Revision Planner
- LeetCode API Integration
- Codeforces API Integration
- Contest Tracker
- Topic Heatmaps
- Performance Forecasting
- Mobile App
- Dark Mode Enhancements
- Social Learning

---

# 📊 Project Statistics

- 130+ Source Files
- 10,000+ Lines of Code
- MERN Stack
- Modular Architecture
- Production Ready
- Fully Responsive

---

# 📚 Documentation

Detailed documentation included inside

```
server/src/docs/
```

Contains

- Architecture
- Mathematical Model
- Benchmarks
- Memory Engine Design

---

# 👨‍💻 Author

**Aryan Gupta**

GitHub

https://github.com/790aryan

LinkedIn

(Add LinkedIn Here)

---

# ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.

It motivates further development.