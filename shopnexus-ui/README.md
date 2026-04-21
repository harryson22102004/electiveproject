# ShopNexus UI

React frontend for ShopNexus Multi-Vendor E-commerce.

## Features

- Product listing from backend API.
- Cart management (add, quantity update, remove).
- Checkout flow with order placement.
- Route-based navigation: `/`, `/cart`, `/checkout`.

## Run locally

```bash
cd shopnexus-ui
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Backend dependency

The app expects backend API at `http://localhost:8080/api`.
Start backend before checkout/order operations.
