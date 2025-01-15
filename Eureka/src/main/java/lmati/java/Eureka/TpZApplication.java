package lmati.java.Eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class TpZApplication {

    public static void main(String[] args) {
        SpringApplication.run(TpZApplication.class, args);
    }

}
