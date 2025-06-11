package dabs.DABS.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginFailureService {
    private final Map<String, Integer> failCountByIp = new ConcurrentHashMap<>();

    public void recordFailure(String ip) {
        failCountByIp.put(ip, failCountByIp.getOrDefault(ip, 0) + 1);
    }

    public void resetFailures(String ip) {
        failCountByIp.remove(ip);
    }

    public int getFailCountByIp(String ip) {
        return failCountByIp.getOrDefault(ip, 0);
    }
}
