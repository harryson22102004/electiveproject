package com.shopnexus.service;

import com.shopnexus.model.dto.ProductDTO;
import com.shopnexus.model.entity.Product;
import com.shopnexus.model.entity.Role;
import com.shopnexus.model.entity.User;
import com.shopnexus.repository.ProductRepository;
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
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getAllProductsShouldMapEntityToDto() {
        User vendor = User.builder()
                .id(10L)
                .username("vendorTest")
                .email("vendor@test.com")
                .password("pass")
                .roles(Set.of(Role.ROLE_VENDOR))
                .build();

        Product product = Product.builder()
                .id(1L)
                .name("Phone")
                .description("Smart phone")
                .price(new BigDecimal("599.99"))
                .stock(15)
                .category("Electronics")
                .vendor(vendor)
                .build();

        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductDTO> result = productService.getAllProducts();

        assertEquals(1, result.size());
        assertEquals("Phone", result.get(0).getName());
        assertEquals("vendorTest", result.get(0).getVendorName());
    }

    @Test
    void createProductShouldPersistAndReturnDto() {
        ProductDTO request = ProductDTO.builder()
                .name("Keyboard")
                .description("Mechanical keyboard")
                .price(new BigDecimal("99.50"))
                .stock(20)
                .category("Accessories")
                .imageUrl("https://example.com/kb.png")
                .build();

        Product saved = Product.builder()
                .id(2L)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .build();

        when(productRepository.save(any(Product.class))).thenReturn(saved);

        ProductDTO result = productService.createProduct(request);

        assertNotNull(result.getId());
        assertEquals("Keyboard", result.getName());
        assertEquals(new BigDecimal("99.50"), result.getPrice());
    }
}
