# Backend — shopnexus-api

This directory contains the Spring Boot backend for ShopNexus.

Run (development):

```bash
cd shopnexus-api
mvn clean package
mvn spring-boot:run
```

Useful tips
- Configure `src/main/resources/application.properties` for your MySQL datasource.
- To run tests: `mvn test`.
- If Swagger/OpenAPI is not enabled, add `springdoc-openapi` dependency and enable via property.
