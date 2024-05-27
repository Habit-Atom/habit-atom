package org.example.habitatom.web;

import lombok.RequiredArgsConstructor;
import org.example.habitatom.dto.JwtAuthenticationResponse;
import org.example.habitatom.dto.SignInRequest;
import org.example.habitatom.dto.SignUpRequest;
import org.example.habitatom.services.AuthenticationService;
import org.example.habitatom.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest request) {
        try {
            JwtAuthenticationResponse response = authenticationService.signup(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest request) {
        try {
            JwtAuthenticationResponse response = authenticationService.signin(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<JwtAuthenticationResponse> refreshToken(@RequestBody JwtAuthenticationResponse jwtAuthenticationResponse) {
        try {
            String token = jwtAuthenticationResponse.getToken();
            String refreshedToken = jwtService.refreshToken(token);
            JwtAuthenticationResponse response = new JwtAuthenticationResponse(refreshedToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}