package com.shopnexus;

import com.shopnexus.model.entity.Product;
import com.shopnexus.model.entity.Role;
import com.shopnexus.model.entity.User;
import com.shopnexus.repository.ProductRepository;
import com.shopnexus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@shopnexus.com")
                    .password(passwordEncoder.encode("admin123"))
                    .roles(Set.of(Role.ROLE_ADMIN, Role.ROLE_VENDOR))
                    .build();
            userRepository.save(admin);

            User vendor = User.builder()
                    .username("vendor1")
                    .email("vendor1@shopnexus.com")
                    .password(passwordEncoder.encode("vendor123"))
                    .roles(Set.of(Role.ROLE_VENDOR))
                    .build();
            userRepository.save(vendor);

            productRepository.save(Product.builder()
                    .name("Premium Wireless Headphones")
                    .description("High-quality wireless headphones with noise-canceling feature.")
                    .price(new BigDecimal("199.99"))
                    .stock(50)
                    .category("Electronics")
                    .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000")
                    .vendor(vendor)
                    .build());

            productRepository.save(Product.builder()
                    .name("Modern Smartwatch")
                    .description("Track your fitness and stay connected with this sleek smartwatch.")
                    .price(new BigDecimal("249.50"))
                    .stock(30)
                    .category("Wearables")
                    .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000")
                    .vendor(vendor)
                    .build());

            productRepository.save(Product.builder()
                    .name("Classic Leather Backpack")
                    .description("Durable and stylish leather backpack for everyday use.")
                    .price(new BigDecimal("89.00"))
                    .stock(100)
                    .category("Accessories")
                    .imageUrl("https://images.unsplash.com/photo-1548036696-91629a7bb3e8?auto=format&fit=crop&q=80&w=1000")
                    .vendor(admin)
                    .build());
            
            System.out.println("Sample data initialized!");
        }
    }
}
