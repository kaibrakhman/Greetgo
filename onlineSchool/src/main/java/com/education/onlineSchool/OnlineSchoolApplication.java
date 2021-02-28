package com.education.onlineSchool;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value = "com.education.onlineSchool.mapper")
@SpringBootApplication
public class OnlineSchoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineSchoolApplication.class, args);
	}

}
