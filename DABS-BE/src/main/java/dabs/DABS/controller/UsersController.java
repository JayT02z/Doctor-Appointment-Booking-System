package dabs.DABS.controller;

import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.LoginRequest;
import dabs.DABS.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<ResponseData<UserDTO>> register(@RequestBody Users newUser) {
        return usersService.saveUser(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseData<UserDTO>> login(@RequestBody LoginRequest loginRequest) {
        return usersService.loginUser(loginRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData<UserDTO>> getUserById(@PathVariable int id) {
        return usersService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData<UserDTO>> updateUser(@PathVariable int id, @RequestBody Users updatedUser) {
        return usersService.updateUserInfo(id, updatedUser);
    }

    @PatchMapping("/deactivate/{id}")
    public ResponseEntity<ResponseData<UserDTO>> updateStatus(@PathVariable int id) {
        return usersService.updateUser(id);
    }

}
