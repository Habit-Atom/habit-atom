package org.example.habitatom.services;

import org.example.habitatom.models.AppUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    public UserDetailsService userDetailsService();
    public AppUser save(AppUser newUser);
}
