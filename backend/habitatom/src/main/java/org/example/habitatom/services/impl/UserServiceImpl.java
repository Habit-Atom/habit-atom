package org.example.habitatom.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.habitatom.models.AppUser;
import org.example.habitatom.repository.UserRepository;
import org.example.habitatom.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    public AppUser save(AppUser newUser) {
        return userRepository.save(newUser);
    }

}
