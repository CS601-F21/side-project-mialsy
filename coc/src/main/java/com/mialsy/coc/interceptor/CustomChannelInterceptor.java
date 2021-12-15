package com.mialsy.coc.interceptor;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

/**
 * The Custom channel interceptor.
 *
 * @author Chuxi Wang
 */
public class CustomChannelInterceptor implements ChannelInterceptor {
    /**
     * Customized channel interceptor reads in headers
     * printout headers in log
     *
     * @param message message received from socket
     * @param channel the message channel
     * @return message
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("Channel Interceptor");

        MessageHeaders headers = message.getHeaders();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS, MultiValueMap.class);
        for (Map.Entry<String, List <String>> head : multiValueMap.entrySet()) {
            System.out.println(head.getKey() + "#" + head.getValue());
        }
        return message;
    }

}
