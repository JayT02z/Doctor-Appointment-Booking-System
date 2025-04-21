package dabs.DABS.service;

import dabs.DABS.model.Entity.Medicine;
import dabs.DABS.repository.SlugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dabs.DABS.model.Entity.Slug;
import dabs.DABS.model.request.SlugRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import dabs.DABS.model.Response.ResponseData;
import dabs.DABS.Enum.StatusApplication;

import java.util.List;

@Service
public class SlugService {
    @Autowired
    private SlugRepository slugRepository;

    public ResponseEntity<ResponseData<Slug>> createRequest(SlugRequest request) {
        Slug slug = new Slug();

        slug.setId(request.getId());
        slug.setSlugValue(request.getSlugValue());

        Slug savedSlug = slugRepository.save(slug);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
            StatusApplication.SUCCESS.getCode(),
            StatusApplication.SUCCESS.getMessage(),
            savedSlug
        ));
    }

    public ResponseEntity<ResponseData<List<Slug>>> getAllSlug() {
        List<Slug> slug = slugRepository.findAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseData<>(
                StatusApplication.SUCCESS.getCode(),
                StatusApplication.SUCCESS.getMessage(),
                slug
        ));
    }}
