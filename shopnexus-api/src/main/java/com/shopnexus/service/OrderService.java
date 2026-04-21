package com.shopnexus.service;

import com.shopnexus.model.dto.CreateOrderRequest;
import com.shopnexus.model.dto.OrderItemRequest;
import com.shopnexus.model.entity.Order;
import com.shopnexus.model.entity.OrderItem;
import com.shopnexus.model.entity.Product;
import com.shopnexus.model.entity.User;
import com.shopnexus.repository.OrderRepository;
import com.shopnexus.repository.ProductRepository;
import com.shopnexus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

        public Order createOrder(CreateOrderRequest request) {
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<OrderItem> items = request.getItems().stream()
            .map(this::mapToOrderItem)
            .toList();

        BigDecimal total = items.stream()
                .map(i -> i.getPriceAtOrder().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .customer(user)
                .items(items)
                .totalAmount(total)
                .status("PENDING")
                .build();

        // set order reference on items
        items.forEach(i -> i.setOrder(order));

        return orderRepository.save(order);
    }

        private OrderItem mapToOrderItem(OrderItemRequest request) {
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

        return OrderItem.builder()
            .product(product)
            .quantity(request.getQuantity())
            .priceAtOrder(product.getPrice())
            .build();
        }

    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow();
    }

    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByCustomerId(userId);
    }
}
