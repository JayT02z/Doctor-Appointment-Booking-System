package dabs.DABS.service;

import dabs.DABS.Enum.StatusApplication;
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

    public ResponseEntity<ResponseData<Users>> saveUser(Users user) {
        Users newuser = usersRepository.save(user);
        ResponseData<Users> response = ResponseData.<Users>builder()
                .StatusCode(StatusApplication.SUCCESS.getCode())
                .Message(StatusApplication.SUCCESS.getMessage())
                .data(null)
                .build();
        return ResponseEntity.ok(response);
    }

}
