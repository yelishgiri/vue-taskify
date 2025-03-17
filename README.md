# Vue-Taskify 📋✅

[![Vue.js](https://img.shields.io/badge/Vue.js-3.3-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern task management system with secure authentication and role-based access control.

![Task Manager Preview](/screenshot.png) <!-- Add actual screenshot path -->

## ✨ Features

- 🔐 JWT-based user authentication
- 🎯 Create/Update/Delete tasks
- ✅ Task completion tracking
- 👥 Role-based permissions (User/Admin)
- 🔍 Task filtering and search
- 📱 Responsive Vue.js interface

## 🛠 Tech Stack

- **Frontend**: Vue 3 + Vue Router + Pinia
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Authentication**: JWT
- **Styling**: Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x+
- MySQL 8.0+
- npm 9.x+

### Installation




### Clone the Repository  
```bash
git clone https://github.com/yelishgiri/task-manager.git
cd task-manager
```


### Setting Up The Front End
```bash
cd frontend
npm install
npm run dev
```

The frontend should be live at this point and in the sign up through vue router view


### Setting Up The Back End
```bash
cd backend
npm install

```
### Create MySQL Database
Create MySQL Schema Database
```bash
mysql -u [username] -p < schema.sql
```

### Set Up Env Variable
Configure environment variables
Create .env in /backend:
env

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_manager
JWT_SECRET=your_jwt_secret
PORT=3000
```
### Run The Server
```bash
node server.js
```


