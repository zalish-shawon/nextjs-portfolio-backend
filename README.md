# Portfolio Website - Backend API Documentation

This is the **Node.js + Express backend** for the portfolio website.  
It provides **RESTful APIs** for public content and owner-only operations (blogs, projects, dashboard).

---

## Base URL

- **Local Development:** `http://localhost:5000/api`
- **Production:** `https://nextjs-portfolio-backend-three.vercel.app` (replace with your deployed URL)

---

## Authentication

- Uses **JWT-based authentication**.
- Owner-only endpoints require a valid `Authorization` header:

