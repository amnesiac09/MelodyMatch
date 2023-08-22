package ge.ananeishvililgorgadze.melodymatch.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import ge.ananeishvililgorgadze.melodymatch.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

	private RSAKey accessTokenKey;
	private RSAKey refreshTokenKey;
	private final UserRepository repository;

	public SecurityConfiguration(UserRepository repository) {
		this.repository = repository;
	}

	@Bean
	public AuthenticationManager authManager(UserDetailsService userDetailsService) {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(encoder());
		return new ProviderManager(authProvider);
	}

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return username -> (UserDetails) repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public String tokenExtractor(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}
		return Arrays.stream(cookies)
			.filter(x -> x.getName().equals(name))
			.map(Cookie::getValue)
			.findFirst()
			.orElse(null);

	}


	@Bean
	@Primary
	JwtEncoder accessTokenEncoder() {
		accessTokenKey = Jwks.generateRsa();
		JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(accessTokenKey));
		return new NimbusJwtEncoder(jwkSource);
	}

	@Bean
	@Primary
	JwtDecoder accessTokenDecoder() throws JOSEException {
		return NimbusJwtDecoder.withPublicKey(accessTokenKey.toRSAPublicKey()).build();
	}

	@Bean
	@Qualifier("refreshTokenDecoder")
	JwtEncoder refreshTokenEncoder() {
		refreshTokenKey = Jwks.generateRsa();
		JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(refreshTokenKey));
		return new NimbusJwtEncoder(jwkSource);
	}

	@Bean
	@Qualifier("refreshTokenDecoder")
	JwtDecoder refreshTokenDecoder() throws JOSEException {
		return NimbusJwtDecoder.withPublicKey(refreshTokenKey.toRSAPublicKey()).build();
	}
}