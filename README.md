<div align="center">

<br />

<img src="https://img.shields.io/badge/-%F0%9F%9A%97%20WheelConnect-1a1a2e?style=for-the-badge&logoColor=white" height="60" alt="WheelConnect" />

<br />
<br />

**The open-source garage discovery, booking & roadside SOS platform.**  
Built with Spring Boot · JWT · MySQL · Firebase

<br />

[![Java](https://img.shields.io/badge/Java_25-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_4.0.3-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL_9.6-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-black?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

<br />

[**Live Demo**](https://wheelconnect.demo) · [**Documentation**](https://wheelconnect.docs) · [**Report a Bug**](https://github.com/yourusername/garage-map/issues) · [**Request Feature**](https://github.com/yourusername/garage-map/issues)

<br />

</div>

---

## What is WheelConnect?

WheelConnect is a **production-ready REST API** backend powering a full-stack automotive services platform. It connects vehicle owners with verified garages — enabling real-time slot bookings, GPS-based emergency SOS dispatch, subscription plans, and trust-scored garage profiles.

> Think of it as the **Uber for car servicing** — with emergency roadside support built in.

```
User opens app → finds nearby garages on map → books a service slot
              ↘ or sends SOS → nearest garage accepts → help en route
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **JWT Auth** | Stateless HTTP-only cookie auth with role-based access (`USER`, `GARAGE_OWNER`, `ADMIN`) |
| 📍 **Garage Discovery** | Geocoded listings with lat/lng, ratings, trust scores, and service history |
| 📅 **Smart Booking** | Full appointment flow — issue description, price estimates, status tracking |
| 🚨 **Emergency SOS** | Real-time distress dispatch matched by GPS coordinates to nearby garages |
| 💳 **Subscription Tiers** | `FREE` · `PREMIUM` · `PRO` — unlock benefits and premium partner listings |
| ✅ **Trust Verification** | Business license upload + admin review drives garage **Trust Score** |
| 🔔 **Push Notifications** | Firebase Cloud Messaging (FCM) token integration for live alerts |
| 🛡️ **Secure by Default** | Spring Security with CORS, CSRF protection, and encrypted credentials |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│              Mobile App  /  Web App  /  Admin Panel          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS REST
┌──────────────────────────▼──────────────────────────────────┐
│                      SPRING BOOT API                         │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │   Auth &    │  │   Garage &   │  │  Emergency SOS &   │  │
│  │  User Mgmt  │  │  Bookings    │  │  Notifications     │  │
│  └──────┬──────┘  └──────┬───────┘  └─────────┬──────────┘  │
│         │                │                     │             │
│  ┌──────▼────────────────▼─────────────────────▼──────────┐  │
│  │            Spring Security + JWT Filter Chain           │  │
│  └──────────────────────────┬──────────────────────────── ┘  │
│                             │                                 │
│  ┌──────────────────────────▼──────────────────────────────┐  │
│  │              Spring Data JPA / Hibernate ORM             │  │
│  └──────────────────────────┬──────────────────────────────┘  │
└──────────────────────────── │ ────────────────────────────────┘
                              │
             ┌────────────────▼────────────────┐
             │           MySQL 9.6             │
             │  users · garages · bookings     │
             │  emergency_requests · ...        │
             └─────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Java 25+
- Maven 3.x
- MySQL 9.6+

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/garage-map.git
cd garage-map
```

### 2. Configure the database

```bash
mysql -u root -p
CREATE DATABASE wheelconnect;
```

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wheelconnect
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your_super_secret_key_here
jwt.expiration=86400000

# Firebase (optional, for push notifications)
firebase.config.path=firebase-service-account.json
```

### 3. Build & run

```bash
mvn clean install
mvn spring-boot:run
```

API will be live at **`http://localhost:8080`**

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/users` | Register a new user | Public |
| `POST` | `/auth/login` | Login — returns JWT via cookie | Public |
| `GET` | `/auth/users/me` | Get current user from token | 🔒 Required |
| `PUT` | `/auth/users/{id}` | Update profile, subscription, etc. | 🔒 Required |

### Garages

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/garages` | Register a garage | 🔒 GARAGE_OWNER |
| `GET` | `/api/garages` | List all garages | Public |
| `GET` | `/api/garages/{id}` | Get single garage profile | Public |

### Bookings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/bookings` | Create a new booking | 🔒 USER |
| `GET` | `/bookings/user/{userId}` | Get user's booking history | 🔒 Required |
| `PUT` | `/bookings/{id}/status` | Update booking status | 🔒 OWNER/ADMIN |

### Emergency SOS

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/emergency` | Dispatch an SOS request with GPS coords | 🔒 USER |
| `GET` | `/emergency/user/{userId}` | Get user's emergency history | 🔒 Required |

<details>
<summary><strong>📋 Sample Request / Response</strong></summary>

**POST** `/auth/login`

```json
// Request
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response — JWT set in HTTP-only cookie
{
  "message": "Login successful",
  "userId": "uuid-here",
  "role": "USER",
  "subscription": "PREMIUM"
}
```

**POST** `/emergency`

```json
// Request
{
  "userId": "uuid-here",
  "locationLat": 11.6643,
  "locationLng": 78.1460,
  "description": "Flat tyre on NH-44, need help urgently"
}

// Response
{
  "id": "emergency-uuid",
  "status": "DISPATCHED",
  "assignedGarage": "Salem AutoCare",
  "estimatedArrival": "12 minutes"
}
```

</details>

---

## 🗂️ Project Structure

```
src/
└── main/
    └── java/
        └── com/wheelconnect/
            ├── controller/           # REST controllers
            │   ├── AuthController.java
            │   ├── UserController.java
            │   ├── GarageController.java
            │   ├── BookingController.java
            │   └── EmergencyRequestController.java
            ├── entity/               # JPA entities
            │   ├── UserEntity.java
            │   ├── GarageEntity.java
            │   ├── Booking.java
            │   └── EmergencyRequest.java
            ├── repositories/         # Spring Data repos
            ├── dto/                  # Request/Response DTOs
            ├── Security/             # JWT filter, config
            └── Exception/            # Global error handling
    └── resources/
        └── application.properties
```

---

## 🛡️ Security Model

```
Request → JwtAuthFilter → extract token from cookie
                        → validate & parse claims
                        → set SecurityContext
                        → route to controller
```

- Passwords hashed with **BCrypt**
- JWT stored in **HTTP-only** cookies (XSS-safe)
- Role hierarchy: `ADMIN > GARAGE_OWNER > USER`
- All sensitive endpoints protected via `@PreAuthorize`

---

## 🗺️ Roadmap

- [ ] **v1.1** — Garage search by radius (Haversine / PostGIS)
- [ ] **v1.2** — Real-time SOS tracking via WebSockets
- [ ] **v1.3** — Razorpay / Stripe payment integration
- [ ] **v1.4** — Admin dashboard API
- [ ] **v2.0** — Microservices split (Booking · Emergency · Notification services)

---

## 🤝 Contributing

Contributions are what make the open-source community great. Any contribution you make is **greatly appreciated**.

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our code of conduct and PR process.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author

**Your Name**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](www.linkedin.com/in/sanjay-k-12003130b)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/SAN-CODER-1)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat-square&logo=google-chrome&logoColor=white)](https://sanjay-dev-tan.vercel.app/)

---

<div align="center">

If WheelConnect helped you, consider giving it a ⭐ — it means a lot!

</div>
