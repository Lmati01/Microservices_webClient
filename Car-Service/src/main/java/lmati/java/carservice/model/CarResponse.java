package lmati.java.carservice.model;

import lmati.java.carservice.entity.Client;

public class CarResponse {
    private Long id;
    private String brand;
    private String model;
    private String matricule;
    private Client client;

    // Private constructor - objects will be created through builder
    private CarResponse() {}

    // Getters
    public Long getId() { return id; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public String getMatricule() { return matricule; }
    public Client getClient() { return client; }

    public static CarResponseBuilder builder() {
        return new CarResponseBuilder();
    }

    // Static Builder class
    public static class CarResponseBuilder {
        private final CarResponse carResponse;

        public CarResponseBuilder() {
            carResponse = new CarResponse();
        }

        public CarResponseBuilder id(Long id) {
            carResponse.id = id;
            return this;
        }

        public CarResponseBuilder brand(String brand) {
            carResponse.brand = brand;
            return this;
        }

        public CarResponseBuilder model(String model) {
            carResponse.model = model;
            return this;
        }

        public CarResponseBuilder matricule(String matricule) {
            carResponse.matricule = matricule;
            return this;
        }

        public CarResponseBuilder client(Client client) {
            carResponse.client = client;
            return this;
        }

        public CarResponse build() {
            return carResponse;
        }
    }
}