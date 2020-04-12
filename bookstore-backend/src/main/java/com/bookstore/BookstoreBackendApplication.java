package com.bookstore;

import com.bookstore.models.Role;
import com.bookstore.models.User;
import com.bookstore.models.UserRole;
import com.bookstore.repository.RoleRepository;
import com.bookstore.security.config.WebSecurityConfig;
import com.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BookstoreBackendApplication implements CommandLineRunner {

    @Autowired
    UserService userService;


	public static void main(String[] args) {
		SpringApplication.run(BookstoreBackendApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
            User user1 = new User();
            user1.setUsername("Nikhil");
            user1.setEmail("nikhil@gmail.com");
            user1.setFirstname("Nikhil");
            user1.setLastname("Zurunge");
            user1.setPassword(WebSecurityConfig.passwordEncoder().encode("p"));
            Role role1 = new Role();
            role1.setRoleId(1L);
            role1.setName("ROLE_USER");
            Set<UserRole> userRoles = new HashSet<>();
            userRoles.add(new UserRole(user1,role1));
            //user1.setUserRoles(userRoles);
            user1.getUserRoles().addAll(userRoles);
            userService.createUser(user1);

        userRoles.clear();

        User user2 = new User();
        user2.setUsername("abc");
        user2.setEmail("abc@gmail.com");
        user2.setFirstname("abc");
        user2.setLastname("xyz");
        user2.setPassword(WebSecurityConfig.passwordEncoder().encode("p"));
        Role role2 = new Role();
        role2.setRoleId(0L);
        role2.setName("ROLE_ADMIN");

        userRoles.add(new UserRole(user2,role2));
        //user2.setUserRoles(userRoles);
        user2.getUserRoles().addAll(userRoles);
        userService.createUser(user2);

    }
}
