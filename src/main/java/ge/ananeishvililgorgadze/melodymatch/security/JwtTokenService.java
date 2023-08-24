package ge.ananeishvililgorgadze.melodymatch.security;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {

	private final JwtEncoder accessTokenEncoder;
	private final JwtEncoder refreshTokenEncoder;
	private final JwtDecoder refreshTokenDecoder;
	private final UserDetailsService service;

	private static final int accessTokenExpirationMinutes = 2;

	private static final int refreshTokenExpirationHours = 24;

	public JwtTokenService(JwtEncoder accessTokenEncoder,
						   @Qualifier("refreshTokenEncoder") JwtEncoder refreshTokenEncoder,
						   @Qualifier("refreshTokenDecoder") JwtDecoder refreshTokenDecoder,
						   UserDetailsService service) {
		this.accessTokenEncoder = accessTokenEncoder;
		this.refreshTokenEncoder = refreshTokenEncoder;
		this.refreshTokenDecoder = refreshTokenDecoder;
		this.service = service;
	}

	public String generateAccessToken(Authentication authentication) {
		Instant now = Instant.now();
		String scope =authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(" "));
		JwtClaimsSet claims = JwtClaimsSet.builder()
			.issuer("self")
			.issuedAt(now)
			.expiresAt(now.plus(accessTokenExpirationMinutes, ChronoUnit.MINUTES))
			.subject(authentication.getName())
			.claim("scope", scope)
			.build();
		return this.accessTokenEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}

	public String generateRefreshToken(Authentication authentication) {
		Instant now = Instant.now();
		JwtClaimsSet claims = JwtClaimsSet.builder()
			.issuer("self")
			.issuedAt(now)
			.expiresAt(now.plus(refreshTokenExpirationHours, ChronoUnit.HOURS))
			.subject(authentication.getName())
			.build();
		return this.refreshTokenEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}

	public String generateTokenFromRefreshToken(String refreshToken) throws JwtException, UsernameNotFoundException {
		Jwt decoded = this.refreshTokenDecoder.decode(refreshToken);
		String username = decoded.getSubject();
		UserDetails user = service.loadUserByUsername(username);
		if (user == null || !user.isEnabled()) {
			throw new UsernameNotFoundException("username not found");
		}
		String scope = service.loadUserByUsername(username).getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(" "));
		Instant now = Instant.now();
		JwtClaimsSet claims = JwtClaimsSet.builder()
			.issuer("self")
			.issuedAt(now)
			.expiresAt(now.plus(2, ChronoUnit.MINUTES))
			.subject(decoded.getSubject())
			.claim("scope", scope)
			.build();
		return this.accessTokenEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
}
