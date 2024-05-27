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
    public JwtAuthenticationResponse signup(@RequestBody SignUpRequest request) {
        return authenticationService.signup(request);
    }

    @PostMapping("/signin")
    public JwtAuthenticationResponse signin(@RequestBody SignInRequest request) {
        return authenticationService.signin(request);
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