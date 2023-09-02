package ge.ananeishvililgorgadze.melodymatch.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "MelodyMatch API", version = "v1"),
		servers = {@Server(url = "/", description = "Default Server URL")})
public class SwaggerConfiguration {
}
