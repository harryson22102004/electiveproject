## ShopNexus Architecture and ER Diagram

### High-Level Architecture

Frontend (React + Vite) communicates with Backend (Spring Boot REST API) using JSON over HTTP.
Backend uses Spring Data JPA (Hibernate) to persist data in MySQL/H2.

### Backend Layers

- Controller Layer: request/response handling.
- Service Layer: business logic and validations.
- Repository Layer: database operations.
- Entity Layer: JPA mapped models.
- DTO Layer: input/output contracts.

### ER Diagram (Mermaid)

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    USERS ||--o{ PRODUCTS : "vendors"
    USERS ||--o{ ORDERS : places
    ORDERS ||--o{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : appears_in

    USERS {
        bigint id PK
        string username UK
        string email UK
        string password
    }

    USER_ROLES {
        bigint user_id FK
        enum roles
    }

    PRODUCTS {
        bigint id PK
        string name
        string category
        decimal price
        int stock
        bigint vendor_id FK
    }

    ORDERS {
        bigint id PK
        bigint customer_id FK
        datetime order_date
        decimal total_amount
        string status
    }

    ORDER_ITEMS {
        bigint id PK
        bigint order_id FK
        bigint product_id FK
        int quantity
        decimal price_at_order
    }
```
