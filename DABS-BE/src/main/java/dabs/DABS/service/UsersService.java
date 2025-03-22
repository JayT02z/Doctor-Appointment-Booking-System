package dabs.DABS.service;

import dabs.DABS.Enum.Status;
import dabs.DABS.Enum.StatusApplication;
import dabs.DABS.model.DTO.UserDTO;
import dabs.DABS.model.Entity.Users;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public ResponseEntity<ResponseData<UserDTO>> saveUser(Users user) {
        Users newuser = new Users();

        newuser.setName(user.getName());
        newuser.setPassword(user.getPassword());
        newuser.setEmail(user.getEmail());
        newuser.setPassword(user.getPassword());
        newuser.setPhone(user.getPhone());
        newuser.setCreatedAt(user.getCreatedAt());
        newuser.setStatus(Status.ACTIVE);

        UserDTO userDTO = UserDTO.fromEntity(newuser);


        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }


    public ResponseEntity<ResponseData<UserDTO>> updateUser(int id) {
        Users finduser = usersRepository.findById(id);
        finduser.setStatus(Status.INACTIVE);
        UserDTO userDTO = UserDTO.fromEntity(finduser);
        ResponseData<UserDTO> response = ResponseData.<UserDTO>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(userDTO)
                .build();
        return ResponseEntity.ok(response);
    }



}
