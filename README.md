# 🚀 Red Team Exercise Manager (Backend)

## 📌 Overview

This is a Spring Boot backend application developed as part of the Java Developer Internship.
It provides secure user management with authentication, role-based access, email notifications, scheduling, testing, and Docker configuration.

---

## 🏗️ Architecture

Controller → Service → Repository → Database
↓
Security (JWT)
↓
Email + Scheduler

---

## 📁 Project Structure

```
red-team-exercise-manager/
│
├── backend/
│   ├── src/main/java/com/internship/redteam/
│   │   ├── config/            # Security, Cache, Audit configs
│   │   ├── controller/        # REST Controllers
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── entity/            # JPA Entities
│   │   ├── exception/         # Global Exception Handling
│   │   ├── repository/        # JPA Repositories
│   │   ├── scheduler/         # Scheduled tasks + DataSeeder
│   │   ├── security/          # JWT + Filters
│   │   ├── service/           # Business logic
│   │   └── RedteamApplication.java
│   │
│   ├── src/main/resources/
│   │   ├── templates/         # Email templates
│   │   └── application.yml
│   │
│   ├── Dockerfile
│   └── pom.xml
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Tech Stack

* Java 17
* Spring Boot
* Spring Security (JWT)
* Spring Data JPA (H2 / MySQL)
* JavaMailSender (Email)
* Thymeleaf (Email Templates)
* JUnit 5 & Mockito
* Docker (Configuration)

---

## 🔐 Features

* User Registration & Login
* JWT Authentication
* Role-Based Access Control (ADMIN / USER)
* Global Exception Handling
* Email Notification System
* Scheduled Tasks
* Pagination Support
* Unit Testing
* Docker Multi-Service Setup
* Data Seeder (30 users)

---

## 🧪 API Endpoints

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | /auth/register | Register user           |
| POST   | /auth/login    | Login and get JWT       |
| GET    | /users         | Get all users (secured) |
| GET    | /users/{id}    | Get user by ID          |
| GET    | /email/test    | Send test email         |

---

## 🔑 Authentication

Use JWT token:

Authorization: Bearer <token>

---

## 🗄️ Database (H2)

* URL: http://localhost:8080/h2-console
* JDBC URL: jdbc:h2:mem:testdb
* Username: sa
* Password: (empty)

---

## 🚀 Setup & Run

### 1. Clone project

```
git clone <repo-url>
```

### 2. Navigate to backend

```
cd backend
```

### 3. Run application

```
mvnw.cmd spring-boot:run
```

---

## 🧪 Run Tests

```
mvnw.cmd test
```

---

## 🐳 Docker (Configuration)

* Dockerfile created for Spring Boot app
* docker-compose.yml includes:

  * App
  * MySQL
  * Redis
  * Nginx
  * Adminer
* Healthchecks added

Note: Not executed due to system limitations.

---

## 📊 Data Seeder

* Automatically inserts 30 users on startup
* First user → ADMIN
* Remaining users → USER

---

## 🌍 Environment Configuration

| Property                   | Description  |
| -------------------------- | ------------ |
| spring.datasource.url      | Database URL |
| spring.datasource.username | DB username  |
| spring.datasource.password | DB password  |
| spring.mail.username       | Email        |
| spring.mail.password       | App password |

---

## 🎯 Project Status

✔ Security (JWT + RBAC)
✔ Email + Scheduler
✔ Exception Handling
✔ Testing (JUnit + Mockito)
✔ Docker Configuration
✔ Integration Testing
✔ Data Seeder
✔ README

---

## 🎓 Conclusion

This project demonstrates a complete backend system with security, automation, testing, and deployment-ready configuration.

---

## 👤 Author

Santosh Mahadev Chougule
