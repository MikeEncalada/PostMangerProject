package com.technicall.challenge.Services;

import com.technicall.challenge.Entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    @Value("${application.securitykey}")
    private String secretKey;

    @Value("${token.expiration}")
    private long jwtExpiration;

    @Value("${refresh.token.expiration}")
    private long refreshExpiration;

    public String generateToken(final UserEntity user) {
        return buildToken(user, jwtExpiration);
    }

    public String generateRefreshToken(final UserEntity user) {
        return buildToken(user, refreshExpiration);
    }

    private String buildToken(final UserEntity user, final long expiration) {

        return Jwts.builder()
                .id(user.getId().toString())
                .claims(Map.of("name", user.getUsername(), "role", user.getRole()))
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }

    private SecretKey getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(final String token) {
        final Claims claims = Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public boolean isTokenValid(String refreshToken, UserEntity user) {
        final String username = extractUsername(refreshToken);
        return (username.equals(user.getEmail())) && !isTokenExpired(refreshToken);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {

        final Claims jwtToken = Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return jwtToken.getExpiration();
    }
}

