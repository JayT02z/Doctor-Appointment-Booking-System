package dabs.DABS.controller;

import dabs.DABS.model.Entity.Slug;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.model.request.SlugRequest;
import dabs.DABS.service.SlugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@RequestMapping("/api/slug")
public class SlugController {
    @Autowired
    private SlugService slugService;

    @PostMapping("/create")
    public ResponseEntity<ResponseData<Slug>> createMedicine(@RequestBody SlugRequest request) {
        return slugService.createRequest(request);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseData<List<Slug>>> listAllSlug() {
        return slugService.getAllSlug();
    }


}
