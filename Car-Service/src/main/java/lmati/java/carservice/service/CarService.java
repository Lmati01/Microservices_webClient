package lmati.java.carservice.service;

import lmati.java.carservice.repository.ClientServiceFeignClient;
import lmati.java.carservice.entity.Car;
import lmati.java.carservice.entity.Client;
import lmati.java.carservice.model.CarResponse;
import lmati.java.carservice.repository.CarRepository;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private WebClient webClient;

    @Autowired
    private ClientServiceFeignClient feignClient;


    private final String CLIENT_SERVICE_URL = "http://localhost:8888/api/client/";

    // WebClient implementation
    public List<CarResponse> findAllWithWebClient() {
        List<Car> cars = carRepository.findAll();
        return cars.stream()
                .map(car -> {
                    Client client = fetchClientWithWebClient(car.getClientId());
                    return buildCarResponse(car, client);
                })
                .collect(Collectors.toList());
    }

    private Client fetchClientWithWebClient(Long clientId) {
        if (clientId == null) return null;
        try {
            return webClient.get()
                    .uri("/api/client/{id}", clientId)
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError(), response ->
                            Mono.error(new RuntimeException("Client not found")))
                    .onStatus(status -> status.is5xxServerError(), response ->
                            Mono.error(new RuntimeException("Server error")))
                    .bodyToMono(Client.class)
                    .timeout(Duration.ofSeconds(200))
                    .block();
        } catch (Exception e) {
            System.out.println("Error fetching client with WebClient for ID {}: {}"+ clientId+ e.getMessage());
            return null;
        }
    }

    private CarResponse buildCarResponse(Car car, Client client) {
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .matricule(car.getMatricule())
                .client(client)
                .build();
    }

    public Car save(Car car) {
        return carRepository.save(car);
    }

    public void deleteById(Long id) {
        carRepository.deleteById(id);
    }

    // WebClient version
    public CarResponse findByIdWithWebClient(Long id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));
        Client client = fetchClientWithWebClient(car.getClientId());
        return buildCarResponse(car, client);
    }

}