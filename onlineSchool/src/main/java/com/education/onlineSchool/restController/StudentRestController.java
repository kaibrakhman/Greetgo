package com.education.onlineSchool.restController;


import com.education.onlineSchool.entities.Student;
import com.education.onlineSchool.mapper.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/")
public class StudentRestController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping(value = "/students")
    public ResponseEntity<?> getAllUsers(){
        List<Student> students = studentRepository.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping(value = "/details/{id}")
    public ResponseEntity<?> getUser(@PathVariable(name = "id") String id){

        Long idka = null;

        try {
            idka = Long.parseLong(id);
        }catch (Exception e){
            System.out.println("Input invalid");
        }

        if (idka!= null) {
            Student student = studentRepository.findById(idka);
            if (student!=null) {
                return new ResponseEntity<>(student, HttpStatus.OK);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/saveStudent")
    public ResponseEntity<?> saveStudent(@RequestBody Student student){
        studentRepository.update(student);
        return ResponseEntity.ok(student);
    }

    @PostMapping(value = "/addStudent")
    public ResponseEntity<?> addStudent(@RequestBody Student student){
        studentRepository.insert(student);
        return ResponseEntity.ok(student);
    }

    @DeleteMapping(value = "/deleteStudent")
    public ResponseEntity<?> deleteStudent(@RequestBody Student student){
        Student checkStudent = studentRepository.findById(student.getId());
        if (checkStudent!= null) {
            studentRepository.deleteById(student.getId());
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.notFound().build();
    }

}
