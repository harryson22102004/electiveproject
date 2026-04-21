## Project Report — ShopNexus (Multi-Vendor E-commerce)

### Q1. What was guided during the project-related sessions

During the sessions we were guided through the full development lifecycle for a full-stack web application using Spring Boot and React. Key topics included:

- Backend: building REST APIs with Spring Boot 4, layered architecture (Controller → Service → Repository), Spring Data JPA (Hibernate), input validation with Hibernate Validator, and exception handling.
- Security: Spring Security with JWT for authentication and role-based authorization.
- Database: designing relational schema in MySQL, mapping entities with JPA, and handling relationships (1–N, N–M).
- Frontend: React component model, routing with React Router, API integration via Axios/Fetch, client-side validation, and responsive UI design.
- Testing & Docs: unit tests with JUnit/Mockito, frontend tests with React Testing Library, and API documentation using Swagger/OpenAPI.

The live project used as a reference was an “Ecommerce Web Application” demonstrating these concepts end-to-end.

---

### Q2. Problem Statement

Design and develop a scalable, secure full-stack web application to manage product, vendor, and order workflows. The system should offer:

- Secure user flows (registration, login) and role-based access (ADMIN, VENDOR, CUSTOMER).
- Product management by vendors, product browsing and checkout by customers.
- CRUD operations across entities, data validation, and clear error reporting.
- A responsive React frontend integrated with Spring Boot REST APIs and MySQL persistence.

Non-functional requirements: maintainability, testability, secure authentication (JWT), and clear documentation.

---

### Q3. Steps / Process to Complete the Project

1. Requirement analysis and scope definition.
2. Database design (ER diagram) and entity modelling.
3. Backend scaffold: entities, repositories, services, controllers, DTOs, validation, and security (JWT).
4. API development and testing (Postman, integration tests).
5. Frontend scaffold: React structure, components (Navbar, ProductCard, Cart), routing, and API integration.
6. Integration and end-to-end flows (product browse → cart → checkout → order).
7. Testing: unit tests (backend), integration tests, and frontend component tests.
8. Documentation: README, API docs (Swagger), project report, and demo slides/video.
9. Deployment and GitHub submission.

---

### Q4. Sample project topics (selected)

- Multi-Vendor E-commerce Platform (chosen for this submission)
- Retail Billing System
- Online Food Delivery Application

---

### Architecture Summary

- Backend: Spring Boot 4.x, Spring Security + JWT, Spring Data JPA, MySQL, Maven.
- Frontend: React (Vite), React Router, Axios, Tailwind/Bootstrap.
- Layers: Controller → Service → Repository → Entity + DTOs.

---

### How this submission maps to grading criteria

- Functionality: Auth, roles, product CRUD, orders, validations (MVP).
- Code quality: layered design, DTOs, separation of concerns.
- Tests: unit + integration coverage of core flows.
- Docs & demo: README, project_report, slides, and demo video.

---

### Limitations & Future Scope

Current limitations:

- Security is partially demo-oriented; role-specific authorization can be tightened further per endpoint.
- Checkout currently uses a simplified flow (single-step order creation, no payment gateway integration).
- Product media relies on static/fallback images; no upload pipeline yet.
- No advanced observability stack (centralized metrics/tracing dashboards).

Future scope:

- Add full JWT request filter and stricter role-based endpoint policies (ADMIN/VENDOR/CUSTOMER).
- Integrate payment gateways (Razorpay/Stripe) with transaction status and refund workflow.
- Add vendor dashboard analytics (revenue, top products, inventory alerts).
- Implement image upload/storage via cloud object storage and CDN delivery.
- Add CI/CD pipeline, containerized deployment, and monitoring (Prometheus/Grafana).
