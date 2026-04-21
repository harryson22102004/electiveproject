## ShopNexus Requirements and Acceptance Criteria

### Functional Requirements

1. User Authentication and Roles
- FR1: Users can register and login with username/password.
- FR2: JWT token is returned on successful register/login.
- FR3: Roles supported: `ROLE_ADMIN`, `ROLE_VENDOR`, `ROLE_USER`.

2. Product Management
- FR4: System exposes APIs to list products and fetch product by id.
- FR5: Product creation endpoint exists for adding new products.

3. Cart and Checkout
- FR6: Users can add products to cart, change quantity, and remove items.
- FR7: Users can proceed to checkout and place order.

4. Order Management
- FR8: Order creation API accepts a user id and product items.
- FR9: Users can view order by id and list orders by user id.

5. Validation and Error Handling
- FR10: Register and order payloads are validated.
- FR11: API returns meaningful validation/error responses.

### Non-Functional Requirements

- NFR1: Layered backend architecture (controller/service/repository/entity).
- NFR2: Responsive React frontend with route-based navigation.
- NFR3: Build and tests should run from command line.
- NFR4: API documentation availability via Swagger/OpenAPI.

### Acceptance Criteria

- AC1: `POST /api/auth/register` with valid body returns `200` and token.
- AC2: `POST /api/auth/login` with registered user returns `200` and token.
- AC3: `GET /api/products` returns list of products.
- AC4: From frontend home page, adding products updates cart count.
- AC5: Cart page supports quantity increment/decrement and remove.
- AC6: Checkout posts order to backend and shows success/failure message.
- AC7: `mvn test` passes including auth integration test.
- AC8: `npm run build` succeeds for frontend.
