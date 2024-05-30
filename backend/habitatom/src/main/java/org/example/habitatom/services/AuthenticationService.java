package org.example.habitatom.services;

import org.example.habitatom.dto.JwtAuthenticationResponse;
import org.example.habitatom.dto.SignInRequest;
import org.example.habitatom.dto.SignUpRequest;

public interface AuthenticationService {

    JwtAuthenticationResponse signup(SignUpRequest request);
    JwtAuthenticationResponse signin(SignInRequest request);
}
