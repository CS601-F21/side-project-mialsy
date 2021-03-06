package com.mialsy.coc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The Coc application Runner
 *
 * @author Chuxi Wang
 */
@SpringBootApplication
public class CocApplication {
    /**
     * The entry point of application.
     *
     * @param args the input arguments
     */
    public static void main(String[] args) {
		SpringApplication.run(CocApplication.class, args);
	}

    /**
     * Cors configure, allows cors from front end
     *
     * @return the web mvc configurer
     */
    @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowCredentials(true).allowedMethods("*");
			}
		};
	}
}
