package com.bookstore.service;

import com.bookstore.models.User;
import com.bookstore.repository.UserRepository;
import com.bookstore.security.services.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserRepository userRepository;

    @Transactional
    @Override
    public User createUser(User user) {
        User localUser = null;
        boolean userExists = userRepository.existsByUsername(user.getUsername());

        if(userExists){
            localUser = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new UsernameNotFoundException("not found"));
            logger.warn("User "+user.getUsername()+ " already exists" );
        }else{
            localUser = userRepository.save(user);
        }
        return localUser;
    }
}
