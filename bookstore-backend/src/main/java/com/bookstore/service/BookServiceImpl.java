package com.bookstore.service;

import com.bookstore.models.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        List<Book> bookList = bookRepository.findAll();
        List<Book> activeBookList = new ArrayList<>();
        for(Book book:bookList){
            activeBookList.add(book);
        }
        return activeBookList;
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findById(id).orElseThrow(()->new RuntimeException("Book Not Found"));
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> blurrySearch(String title) {
        List<Book> bookList = bookRepository.findByTitle(title).orElse(new ArrayList<>());
        List<Book> activeBookList = new ArrayList<>();
        for(Book book:bookList){
            activeBookList.add(book);
        }
        return activeBookList;
    }

    @Override
    public void remove(Long id) {
        bookRepository.deleteById(id);
    }
}
