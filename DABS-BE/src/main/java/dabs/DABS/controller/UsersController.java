package dabs.DABS.controller;

import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
@RequestMapping("/api/v1/auth")
public class UsersController {
    @Autowired
    UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<ResponseData<UserDTO>> register(@RequestBody Users newUser) {
        return usersService.saveUser(newUser);
    }

    @PatchMapping("/Delete/{id}")
    public ResponseEntity<ResponseData<UserDTO>> updateStatus(@PathVariable int id) {
        return usersService.updateUser(id);
    }


}
