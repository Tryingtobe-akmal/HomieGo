# 🏡 HomieGo

### Full-Stack Property Listing & Booking Platform

<p align="center">
  <!-- Add the HomieGo logo image here after uploading it -->
</p>

<p align="center">
  <strong>Discover • List • Book • Review • Explore</strong>
</p>

<p align="center">
  A full-stack property marketplace built with Node.js, Express.js, MongoDB, Mongoose, EJS, Passport.js, Cloudinary and Mapbox.
</p>

<p align="center">
  <a href="https://homiego-xcb1.onrender.com/listings">🌐 Live Demo</a> •
  <a href="https://github.com/Tryingtobe-akmal/HomieGo">💻 GitHub Repository</a>
</p>

---

## 🚀 Live Application

### 👉 [Open HomieGo — Live Website](https://homiego-xcb1.onrender.com/listings)

> The application is deployed on Render and integrates with MongoDB, Cloudinary and Mapbox.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Why HomieGo?](#-why-homiego)
- [Core Features](#-core-features)
- [Architecture](#-architecture)
- [MVC Pattern](#-mvc-pattern)
- [Application Flow](#-application-flow)
- [Authentication](#-authentication)
- [Authorization](#-authorization)
- [Session Management](#-session-management)
- [Listing Management](#-listing-management)
- [Booking System](#-booking-system)
- [Preventing Overlapping Bookings](#-preventing-overlapping-bookings)
- [Wishlist](#-wishlist)
- [Review System](#-review-system)
- [Search and Filtering](#-search-and-filtering)
- [Cloudinary](#-cloudinary-image-storage)
- [Mapbox](#-mapbox-integration)
- [Validation](#-validation)
- [Error Handling](#-error-handling)
- [Flash Messages](#-flash-messages)
- [Responsive UI](#-responsive-user-interface)
- [Project Structure](#-project-structure)
- [Tech Stack](#-technology-stack)
- [Data Models](#-data-models)
- [Security](#-security)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [Deployment](#-deployment)
- [What I Learned](#-what-i-learned)
- [Future Improvements](#-future-improvements)
- [Project Highlights](#-project-highlights)
- [Author](#-author)

---

## 🌟 About the Project

**HomieGo** is a full-stack property listing and booking platform inspired by modern property marketplace applications.

The application allows users to:

- Discover properties
- Search and filter listings
- View property details
- Explore locations on an interactive map
- Create and manage their own listings
- Upload property images
- Save favourite properties
- Write and manage reviews
- Book properties for selected dates
- Maintain an authenticated session

The project was designed using a structured **MVC (Model–View–Controller) architecture**, with dedicated routes, middleware, controllers, models and views.

The goal was not only to build a functional website, but also to understand how the different layers of a real-world full-stack application communicate with one another.

---

## 🎯 Why HomieGo?

HomieGo combines several important backend and full-stack concepts in one application:

```text
Authentication
      +
Authorization
      +
Sessions
      +
MVC Architecture
      +
MongoDB
      +
Validation
      +
Cloud Storage
      +
Maps
      +
Bookings
      +
Reviews
      +
Search
      +
Responsive UI
      ↓
Complete Full-Stack Application
```

This makes HomieGo more than a simple CRUD application.

---

# ✨ Core Features

## 🏠 Property Listing Management

Authenticated users can create and manage property listings.

Each listing can contain:

- Title
- Description
- Price
- Location
- Country
- Category
- Image
- Geographic coordinates

Supported operations:

```text
Create
  ↓
Read
  ↓
Update
  ↓
Delete
```

Authorization ensures that users cannot modify listings that belong to someone else.

---

## 🔐 Authentication

HomieGo uses **Passport.js Local Strategy** for authentication.

Users can:

- Register
- Login
- Logout
- Maintain an authenticated session

Authentication flow:

```text
User
  ↓
Login Form
  ↓
Passport Local Strategy
  ↓
Find User
  ↓
Verify Credentials
  ↓
Serialize User
  ↓
Create/Update Session
  ↓
Authenticated Request
  ↓
req.user
```

---

## 🛡️ Authorization

Authentication answers:

> **Who are you?**

Authorization answers:

> **What are you allowed to do?**

HomieGo uses middleware to protect resources.

Examples include:

- `isLoggedIn`
- `isOwner`
- `isReviewAuthor`
- `ownBooking`

Example:

```text
User
 ↓
Authenticated?
 ↓
Is owner?
 ↓
Allowed
```

If the user does not have permission, the request is rejected.

---

## 👤 Session Management

Express Session is used to maintain authenticated users between requests.

Conceptually:

```text
Login
  ↓
Passport Authentication
  ↓
Session
  ↓
User ID
  ↓
Subsequent Requests
  ↓
req.user
```

Sessions are also used alongside flash messages and redirect flows.

---

# 🏗️ Architecture

HomieGo follows the **MVC (Model–View–Controller)** architecture.

```text
                         USER
                           │
                           ▼
                         ROUTE
                           │
                           ▼
                       MIDDLEWARE
                           │
                           ▼
                      CONTROLLER
                       /       \
                      /         \
                     ▼           ▼
                  MODEL         VIEW
                    │             │
                    ▼             ▼
                MongoDB          EJS
```

The application separates responsibilities so that database logic, business logic and presentation logic do not become tightly coupled.

---

# 🧩 MVC Pattern

> **Note:** The project follows the standard **MVC (Model–View–Controller)** architecture.

## 📦 Model

The **Model** layer represents application data and database interaction.

Main models:

```text
User
Listing
Review
Booking
```

Mongoose is used as the ODM between Node.js and MongoDB.

Responsibilities:

- Define schemas
- Define relationships/references
- Validate document structure
- Query MongoDB
- Create, update, and delete documents

---

## 🎮 Controller

The **Controller** layer contains the application's business logic.

```text
controller/
├── listing.js
├── user.js
├── review.js
└── booking.js
```

Controllers receive requests from routes, perform application logic, communicate with models and return responses.

Example flow:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Model
   ↓
MongoDB
   ↓
Controller
   ↓
EJS Response
```

---

## 🎨 View

The **View** layer is responsible for the user interface.

HomieGo uses:

- EJS
- EJS-Mate
- HTML
- CSS
- JavaScript
- Bootstrap

The views render server-side HTML using data provided by the controllers.

---

## 💡 Why MVC?

MVC provides separation of concerns:

| Layer | Responsibility |
|---|---|
| Model | Data and database operations |
| Controller | Business/application logic |
| View | User interface |
| Route | Maps URLs to application actions |
| Middleware | Authentication, authorization and request processing |

This makes the application:

- Easier to understand
- Easier to debug
- Easier to maintain
- Easier to extend
- Better suited for scaling

---

# 🔄 Application Request Flow

A typical HomieGo request follows this pipeline:

```text
Browser
   │
   ▼
Express Route
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Authorization
   └── Validation
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
   │
   ▼
Controller
   │
   ▼
EJS View
   │
   ▼
HTML Response
   │
   ▼
Browser
```

This layered flow is one of the core architectural concepts implemented in HomieGo.

---

# 📅 Booking System

HomieGo provides a property booking system.

Users can select:

- Check-in date
- Check-out date
- Number of guests

The booking contains:

```text
User
Listing
Check-in
Check-out
Guests
Total Price
```

Booking flow:

```text
Listing
   ↓
Book Now
   ↓
Select Dates
   ↓
Validate Request
   ↓
Check Existing Bookings
   ↓
Check Availability
   ↓
Calculate Total
   ↓
Create Booking
   ↓
Confirmation
```

---

# 🚫 Preventing Overlapping Bookings

One of the important backend features is preventing conflicting reservations.

Example:

```text
Existing Booking

20 Aug ───────────────── 25 Aug


New Booking

23 Aug ───────────────── 28 Aug
        ↑
     Conflict
```

The backend checks existing bookings before creating a new reservation.

If the requested date range overlaps with an existing reservation:

```text
Request
  ↓
Availability Check
  ↓
Overlap Detected
  ↓
❌ Booking Rejected
```

This server-side check is important because frontend date restrictions alone cannot guarantee booking integrity.

---

# ❤️ Wishlist

Authenticated users can save properties they are interested in.

```text
Listing
   ↓
❤️ Add to Wishlist
   ↓
User Wishlist
   ↓
MongoDB
```

Users can also remove properties from their wishlist.

Each user's saved listings are associated with their account.

---

# ⭐ Review System

Users can leave reviews on listings.

A review contains:

- Rating
- Comment
- Author
- Associated listing

Relationship:

```text
User
  │
  └──────► Review ◄────── Listing
```

Authorization prevents users from deleting reviews that belong to someone else.

---

# 🔎 Search and Filtering

HomieGo supports search using URL query parameters.

Example:

```text
/listings?search=Delhi
```

The backend reads search input using:

```javascript
req.query
```

Listings can also be filtered by category.

General flow:

```text
Search Input
     ↓
Query Parameter
     ↓
req.query
     ↓
Controller
     ↓
MongoDB Query
     ↓
Matching Listings
     ↓
EJS
```

---

# 🖼️ Cloudinary Image Storage

HomieGo uses **Multer** and **Cloudinary** for property image upload and management.

Upload flow:

```text
User
  ↓
Image Upload
  ↓
Multer
  ↓
Cloudinary
  ↓
Cloud Image URL
  ↓
Listing Document
  ↓
MongoDB
```

The application stores the image information/reference with the listing rather than relying on local server storage.

---

# 🗺️ Mapbox Integration

HomieGo integrates **Mapbox** to display property locations.

Property locations use the GeoJSON `Point` format:

```javascript
geometry: {
  type: "Point",
  coordinates: [longitude, latitude]
}
```

Important:

```text
GeoJSON Point
coordinates:
[longitude, latitude]
```

The coordinates are used to display interactive property markers on the map.

---

# ✅ Validation

HomieGo uses multiple validation layers.

## 🌐 Client-Side Validation

Provides immediate feedback before the request is submitted.

## 🛡️ Server-Side Joi Validation

Joi validates incoming request data before application logic processes it.

## 🗄️ Mongoose Validation

Mongoose schema validation provides an additional layer of protection before documents are persisted.

Overall:

```text
User Input
    ↓
Client Validation
    ↓
Joi Validation
    ↓
Controller
    ↓
Mongoose Validation
    ↓
MongoDB
```

> Client-side validation improves user experience, but server-side validation is essential because client-side checks can be bypassed.

---

# ⚠️ Error Handling

HomieGo uses centralized Express error handling.

A custom `ExpressError` utility is used to represent application errors.

```text
Controller
    ↓
Error
    ↓
next(error)
    ↓
Express Error Middleware
    ↓
ExpressError
    ↓
User-Friendly Error Response
```

This avoids duplicating error-handling logic throughout individual controllers.

---

# 🔄 Async Error Handling

Asynchronous controllers use a custom `wrapAsync` utility.

Instead of repeatedly writing:

```javascript
try {
  // async operation
} catch (err) {
  next(err);
}
```

controllers can be wrapped:

```javascript
wrapAsync(async (req, res, next) => {
  // controller logic
});
```

The utility forwards rejected promises to the centralized Express error middleware.

```text
Async Controller
      ↓
   wrapAsync
      ↓
  Promise Rejection
      ↓
   next(error)
      ↓
Error Middleware
```

---

# 💬 Flash Messages

HomieGo uses `connect-flash` for temporary user feedback.

Examples:

### Success

```text
✅ Listing created successfully
✅ Listing updated successfully
✅ Review added successfully
```

### Errors

```text
❌ You must be logged in
❌ Unauthorized action
❌ Booking unavailable
```

Flash messages are especially useful after redirects.

---

# 📱 Responsive User Interface

The frontend uses **Bootstrap** together with custom CSS and JavaScript.

The UI is designed to work across:

- 📱 Mobile
- 📲 Tablet
- 💻 Laptop
- 🖥️ Desktop

Bootstrap's responsive grid and utility classes are used throughout the interface.

---

# 📁 Project Structure

```text
HomieGo/
│
├── controller/
│   ├── listing.js
│   ├── user.js
│   ├── review.js
│   └── booking.js
│
├── models/
│   ├── listing.js
│   ├── user.js
│   ├── review.js
│   └── booking.js
│
├── routes/
│
├── views/
│
├── public/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── init/
│
├── middleware.js
├── schema.js
├── cloudConfig.js
├── app.js
├── package.json
└── package-lock.json
```

---

# 🧠 Data Models

HomieGo primarily works with four core entities.

```text
                 ┌──────────┐
                 │   User   │
                 └────┬─────┘
                      │
          ┌───────────┼────────────┐
          │           │            │
          ▼           ▼            ▼
       Listing      Review      Booking
          │                         │
          └────────────┬────────────┘
                       ▼
                    Booking
```

## 👤 User

Responsible for:

- Account information
- Authentication
- Session identity
- Wishlist
- User ownership

## 🏠 Listing

Responsible for:

- Property information
- Owner
- Price
- Location
- Category
- Image
- Geometry

## ⭐ Review

Responsible for:

- Rating
- Comment
- Author
- Associated listing

## 📅 Booking

Responsible for:

- User
- Listing
- Check-in
- Check-out
- Guests
- Total price

---

# 🛡️ Security and Access Control

HomieGo uses several mechanisms to protect application resources:

- Passport.js authentication
- Express sessions
- Authorization middleware
- Owner-level authorization
- Review author authorization
- Booking authorization
- Joi server-side validation
- Mongoose schema validation
- Environment variables for secrets
- Centralized error handling

Sensitive credentials should be stored in environment variables and never committed to Git.

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| 🟢 Node.js | Backend runtime |
| 🚂 Express.js | Web application framework |
| 🍃 MongoDB | Database |
| 🦫 Mongoose | MongoDB ODM |
| 🎨 EJS | Server-side templating |
| 🧩 EJS-Mate | EJS layouts |
| 🅱️ Bootstrap | Responsive UI |
| 🔐 Passport.js | Authentication |
| 👤 Express Session | Session management |
| ☁️ Cloudinary | Image storage |
| 📤 Multer | File upload handling |
| 🗺️ Mapbox | Interactive maps |
| ✅ Joi | Request validation |
| 💬 Connect-Flash | Flash messages |
| 🔧 Git/GitHub | Version control |
| 🚀 Render | Deployment |

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Tryingtobe-akmal/HomieGo.git
```

```bash
cd HomieGo
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment Variables

Create a `.env` file in the project root.

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

MAP_TOKEN=your_mapbox_token
```

> Never commit your real `.env` file to GitHub.

---

# ▶️ Running Locally

Start the application with:

```bash
node app.js
```

If you use Nodemon:

```bash
nodemon app.js
```

Then open:

```text
http://localhost:3000
```

Listings:

```text
http://localhost:3000/listings
```

---

# 🌐 Deployment

HomieGo is deployed using **Render**.

Production architecture:

```text
                    GitHub
                       │
                       ▼
                    Render
                       │
                       ▼
                 Node + Express
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       MongoDB     Cloudinary     Mapbox
```

Live application:

### 👉 https://homiego-xcb1.onrender.com/listings

---

# 📦 Environment Configuration

Production secrets should be configured through the deployment platform rather than committed to source control.

Required environment variables include:

```text
MONGODB_URI
SESSION_SECRET

CLOUDINARY_CLOUD_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET

MAP_TOKEN
```

---

# 🧪 Recommended Testing Checklist

Before production releases, important application flows should be tested:

```text
Authentication
├── Register
├── Login
├── Logout
└── Protected routes

Listings
├── Create
├── Read
├── Update
└── Delete

Authorization
├── Owner access
├── Review author access
└── Booking authorization

Bookings
├── Valid dates
├── Invalid dates
├── Existing booking
└── Overlapping booking

Reviews
├── Create
└── Delete own review

Wishlist
├── Add
└── Remove

Images
├── Upload
└── Cloudinary storage

Maps
└── Property marker/location
```

---

# 📚 What I Learned

Building HomieGo provided practical experience with:

### Backend Development

- Node.js
- Express.js
- RESTful routing
- Middleware
- MVC architecture
- Controllers
- Mongoose
- MongoDB

### Authentication & Authorization

- Passport.js
- Local Strategy
- Express Session
- User serialization
- Protected routes
- Resource-level authorization

### Database

- MongoDB
- Mongoose schemas
- References
- CRUD operations
- Validation
- Query parameters
- Date-range queries

### Full-Stack Integration

- EJS
- Bootstrap
- JavaScript
- Cloudinary
- Multer
- Mapbox
- GeoJSON

### Application Quality

- Joi validation
- Error handling
- `ExpressError`
- `wrapAsync`
- Flash messages
- Environment variables

### Deployment

- Git
- GitHub
- Render
- Production environment configuration

---

# 🚀 Future Improvements

HomieGo can be extended into a more production-oriented marketplace.

## 💳 Online Payments

Integrate a payment provider such as Razorpay or Stripe.

```text
Booking
  ↓
Payment
  ↓
Payment Verification
  ↓
Confirmed Booking
```

## 📧 Booking Emails

Send:

- Booking confirmation
- Cancellation emails
- Booking reminders
- Owner notifications

## 👨‍💼 Admin Dashboard

Add an administrative layer for:

- User management
- Listing moderation
- Review moderation
- Booking monitoring
- Platform analytics

## 🔔 Real-Time Notifications

Use WebSockets/Socket.IO for:

- Booking notifications
- Owner alerts
- User notifications

## 🤖 AI Property Recommendations

Use user preferences and listing information to recommend relevant properties.

```text
User Preferences
      +
Listing Data
      ↓
Recommendation Engine
      ↓
Personalized Properties
```

## 💬 AI Property Assistant

Allow users to ask natural-language questions such as:

> "Show me properties near Jamia under ₹20,000."

The assistant can convert the request into search filters and retrieve matching listings.

## 🔍 Advanced Search

Potential filters:

- Price range
- Location
- Category
- Rating
- Availability
- Number of guests
- Amenities

---

# 📈 Project Highlights

HomieGo demonstrates practical implementation of:

```text
✅ MVC Architecture
✅ RESTful Routing
✅ CRUD Operations
✅ Authentication
✅ Authorization
✅ Session Management
✅ MongoDB
✅ Mongoose
✅ Joi Validation
✅ Cloud Image Storage
✅ Map Integration
✅ GeoJSON
✅ Search
✅ Filtering
✅ Wishlist
✅ Reviews
✅ Booking System
✅ Availability Checking
✅ Overlap Prevention
✅ Error Handling
✅ Async Error Handling
✅ Flash Messages
✅ Responsive UI
✅ Git/GitHub
✅ Cloud Deployment
```

---

# 🧑‍💻 Author

## Md Akmal

**Full-Stack Web Developer**

Interested in:

- Full-Stack Development
- Backend Engineering
- Data Science
- AI/ML
- MERN Stack
- Cloud & DevOps

### Technologies

`HTML` `CSS` `JavaScript` `Node.js` `Express.js` `MongoDB` `Mongoose` `EJS` `Bootstrap` `Passport.js` `Git` `GitHub`

---

# ⭐ Support

If you found HomieGo interesting, consider giving the repository a ⭐ on GitHub.

### 🔗 Project Links

- 🌐 **Live Application:** https://homiego-xcb1.onrender.com/listings
- 💻 **GitHub:** https://github.com/Tryingtobe-akmal/HomieGo

---

<p align="center">
  <strong>🏡 HomieGo — Discover • List • Book • Review • Explore</strong>
</p>

<p align="center">
  Built with ❤️ using Node.js, Express.js, MongoDB and EJS.
</p>
