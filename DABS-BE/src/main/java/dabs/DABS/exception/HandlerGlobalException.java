package dabs.DABS.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HandlerGlobalException {
    // Bắt lỗi NullPointerException
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
        return new ResponseEntity<>("Có lỗi Null xảy ra: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Bắt lỗi IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return new ResponseEntity<>("Tham số không hợp lệ: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // Bắt tất cả các lỗi còn lại
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("Lỗi không xác định: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
