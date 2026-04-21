## Demo Script (3-5 minutes)

1. Introduction (20 sec)
- Present project: ShopNexus Multi-Vendor E-commerce.
- Mention stack: Spring Boot, React, MySQL/H2, JWT.

2. Architecture (30 sec)
- Show high-level flow: React -> REST API -> Database.
- Mention layered backend and DTO-based contracts.

3. Authentication Demo (45 sec)
- Register a new user using API (or UI form if added).
- Login and show JWT token in response.

4. Product Browsing and Cart (60 sec)
- Open home page and show fetched products.
- Add products to cart and show cart count update.
- Go to cart page, change quantities, remove item.

5. Checkout and Order (60 sec)
- Open checkout page and place order.
- Show success message and backend order endpoint response.

6. Testing and Quality (30 sec)
- Run `mvn test` and highlight auth integration test.
- Run `npm run build` to show frontend production build.

7. Conclusion (20 sec)
- Summarize completed modules and future enhancements.
