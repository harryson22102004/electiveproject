package com.shopnexus.service;

import com.shopnexus.model.dto.CreateOrderRequest;
import com.shopnexus.model.dto.OrderItemRequest;
import com.shopnexus.model.entity.Order;
import com.shopnexus.model.entity.Product;
import com.shopnexus.model.entity.Role;
import com.shopnexus.model.entity.User;
import com.shopnexus.repository.OrderRepository;
import com.shopnexus.repository.ProductRepository;
import com.shopnexus.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void createOrderShouldCalculateTotalAndPersist() {
        User user = User.builder()
                .id(1L)
                .username("customer")
                .email("customer@test.com")
                .password("pass")
                .roles(Set.of(Role.ROLE_USER))
                .build();

        Product product = Product.builder()
                .id(5L)
                .name("Mouse")
                .price(new BigDecimal("25.00"))
                .build();

        CreateOrderRequest request = CreateOrderRequest.builder()
                .userId(1L)
                .items(List.of(OrderItemRequest.builder().productId(5L).quantity(3).build()))
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(5L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.createOrder(request);

        assertNotNull(result);
        assertEquals(new BigDecimal("75.00"), result.getTotalAmount());
        assertEquals("PENDING", result.getStatus());
        assertEquals(1, result.getItems().size());
    }
}
