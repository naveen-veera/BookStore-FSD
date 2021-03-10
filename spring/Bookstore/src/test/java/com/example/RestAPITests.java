package com.example;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import com.example.model.UserModel;
import com.example.model.UserTempModel;

//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class RestAPITests {
	
	@LocalServerPort
	int port;
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	@Test
	public void signupRestPoint() {
		
//		UserTempModel tempModel = new UserModel("test@gmail.com", "test", "1234567890", "ADMIN", "123");
		
//		assertThat(this.restTemplate.postForObject("/signup", , responseType))
	}
	
}