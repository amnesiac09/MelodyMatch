package ge.ananeishvililgorgadze.melodymatch.controller;

import ge.ananeishvililgorgadze.melodymatch.security.JwtTokenService;
import ge.ananeishvililgorgadze.melodymatch.security.model.AuthenticationRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/")
@Tag(name = "Authentication", description = "endpoint for authentication")
public class AuthController {
	private final JwtTokenService tokenService;

	private final AuthenticationManager authenticationManager;

	private final int accessTokenExpirationMinutes = 2;

	private final int refreshTokenExpirationHours = 24;

	public AuthController(JwtTokenService tokenService, AuthenticationManager authenticationManager) {
		this.tokenService = tokenService;
		this.authenticationManager = authenticationManager;
	}

	@PostMapping(value = "jwt")
	public ResponseEntity<String> jwtToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws AuthenticationException {
		String token;
		String refreshToken;
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			token = tokenService.generateAccessToken(authentication);
			refreshToken = tokenService.generateRefreshToken(authentication);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		ResponseCookie cookie = ResponseCookie.from("Authorization", token)
				.httpOnly(true)
				.secure(false)
				.domain("localhost")
				.path("/")
				.maxAge(Duration.ofMinutes(accessTokenExpirationMinutes))
				.sameSite("Lax")
				.build();

		ResponseCookie refreshTokenCookie = ResponseCookie.from("Refresh", refreshToken)
				.httpOnly(true)
				.secure(false)
				.domain("localhost")
				.path("/")
				.maxAge(Duration.ofHours(refreshTokenExpirationHours))
				.sameSite("Lax")
				.build();

		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

		return new ResponseEntity<>(token, HttpStatus.OK);
	}

	@PostMapping(value = "jwt/refresh")
	public ResponseEntity<String> refresh(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		String token;
		try {
			Cookie[] cookies = request.getCookies();
			Optional<String> refreshToken = Arrays.stream(cookies)
					.filter(x -> x.getName().equals("Refresh"))
					.map(Cookie::getValue)
					.findFirst();
			if (refreshToken.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			token = tokenService.generateTokenFromRefreshToken(refreshToken.get());
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		ResponseCookie cookie = ResponseCookie.from("Authorization", token)
				.httpOnly(true)
				.secure(false)
				.domain("localhost")
				.path("/")
				.maxAge(Duration.ofMinutes(accessTokenExpirationMinutes))
				.sameSite("Lax")
				.build();

		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

		return new ResponseEntity<>(token, HttpStatus.OK);
	}
}
