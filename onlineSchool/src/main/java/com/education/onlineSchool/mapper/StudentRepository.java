package com.education.onlineSchool.mapper;

import com.education.onlineSchool.entities.Student;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudentRepository {

    @Select("SELECT * FROM Student")
    public List<Student> findAll();

    @Select("SELECT * FROM Student WHERE id = #{id}")
    public Student findById(Long id);

    @Delete("DELETE FROM Student WHERE id = #{id}")
    public int deleteById(Long id);

    @Insert("INSERT INTO Student (id, name, age) " +
            " VALUES (#{id}, #{name}, #{age})")
    public int insert(Student student);

    @Update("Update Student set name=#{name}, " +
            " age=#{age} where id=#{id}")
    public int update(Student student);

}
