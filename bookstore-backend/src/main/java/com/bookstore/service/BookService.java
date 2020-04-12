package com.bookstore.service;

import com.bookstore.models.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {

    List<Book> findAll();
    Book findById(Long Id);
    Book save(Book book);
    List<Book> blurrySearch(String title);
    void remove(Long id);

}
