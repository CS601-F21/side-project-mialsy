package com.mialsy.coc.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * The Error utils.
 *
 * @author Chuxi Wang
 */
public class ErrorUtils {
    /**
     * Gets object not found exception.
     *
     * @param className the class name
     * @param id        the id
     * @return the object not found exception
     */
    public static ResponseStatusException getObjectNotFoundException(String className, Long id) {
        String msg = "Cannot find %s with id = %d".formatted(className, id);
        return new ResponseStatusException(HttpStatus.NOT_FOUND, msg);
    }
}
