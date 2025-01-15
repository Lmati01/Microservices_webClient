package lmati.java.carservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;
    private String model;
    private String matricule;
    private Long clientId;

    public String getBrand() {
        return brand;
    }

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public String getMatricule() {
        return matricule;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }
}
