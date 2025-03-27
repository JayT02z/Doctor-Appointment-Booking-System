package dabs.DABS.controller;

import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.RegistrationRequest;
import dabs.DABS.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseData<UserDTO>> register(@RequestBody RegistrationRequest regRequest) {
        return usersService.saveUser(regRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<UserDTO>> getUserById(@PathVariable Long id) {
        return usersService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<UserDTO>> updateUser(@PathVariable Long id, @RequestBody Users updatedUser) {
        return usersService.updateUserInfo(id, updatedUser);
    }

    @PatchMapping("/deactivate/{id}")
    public ResponseEntity<ResponseData<UserDTO>> updateStatus(@PathVariable Long id) {
        return usersService.updateUser(id);
    }
}
