package com.mialsy.coc.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ErrorUtils {
    public static ResponseStatusException getObjectNotFoundException(String className, Long id) {
        String msg = "Cannot find %s with id = %d".formatted(className, id);
        return new ResponseStatusException(HttpStatus.NOT_FOUND, msg);
    }
}
