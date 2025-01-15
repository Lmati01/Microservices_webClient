package lmati.java.clients.controller;

import lmati.java.clients.model.Client;
import lmati.java.clients.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    private List<Client> findAll(){
        return clientService.getAll();
    }

    @GetMapping("/{id}")
    private Client findById(@PathVariable Long id){
        return clientService.getById(id);
    }


    @PostMapping
    public ResponseEntity<Client> save(@RequestBody Client client) {
        if (client.getNom() == null || client.getAge() == null) {
            return ResponseEntity.badRequest().build();
        }
        clientService.addClient(client);
        return ResponseEntity.ok(client);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client client) {
        client.setId(id);
        return ResponseEntity.ok(clientService.save(client));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
