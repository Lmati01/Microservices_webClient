package lmati.java.clients.service;

import lmati.java.clients.model.Client;
import lmati.java.clients.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;


    public List<Client> getAll(){
        return clientRepository.findAll();
    }

    public Client getById(Long id){
        return clientRepository.findById(id).orElse(null);
    }

    public void addClient(Client client) {
        if (client == null) {
            throw new IllegalArgumentException("Client cannot be null");
        }
        System.out.println("service:" + client.getNom());
        clientRepository.save(client);
    }

    public Client save(Client client) {
        if (client == null) {
            throw new IllegalArgumentException("Client cannot be null");
        }else
            return clientRepository.save(client);
    }

    public void deleteById(Long id){
        clientRepository.deleteById(id);
    }
}
