package com.shopnexus.service;

import com.shopnexus.model.dto.AuthResponse;
import com.shopnexus.model.dto.LoginRequest;
import com.shopnexus.model.dto.RegisterRequest;
import com.shopnexus.model.entity.Role;
import com.shopnexus.model.entity.User;
import com.shopnexus.repository.UserRepository;
import com.shopnexus.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ShopUserDetailsService userDetailsService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(request.getRoles() != null ?
                       request.getRoles().stream().map(Role::valueOf).collect(Collectors.toSet()) :
                       Set.of(Role.ROLE_USER))
                .build();

        userRepository.save(user);

        var userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        var token = jwtService.generateToken(userDetails);

        return AuthResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(Enum::name).collect(Collectors.toSet()))
                .token(token)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // authenticate
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        var userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        var token = jwtService.generateToken(userDetails);

        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        return AuthResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(Enum::name).collect(Collectors.toSet()))
                .token(token)
                .build();
    }
}
