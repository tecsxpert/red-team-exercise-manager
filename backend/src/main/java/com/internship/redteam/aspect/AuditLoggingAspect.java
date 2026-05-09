package com.internship.redteam.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Arrays;

@Aspect
@Component
public class AuditLoggingAspect {

    // Log after any Create method
    @AfterReturning(
        pointcut = "execution(* com.internship.redteam.service.*.*create*(..))",
        returning = "result"
    )
    public void logCreate(JoinPoint joinPoint, Object result) {
        logAction("CREATE", joinPoint, result);
    }

    // Log after any Update method
    @AfterReturning(
        pointcut = "execution(* com.internship.redteam.service.*.*update*(..))",
        returning = "result"
    )
    public void logUpdate(JoinPoint joinPoint, Object result) {
        logAction("UPDATE", joinPoint, result);
    }

    // Log after any Delete method
    @AfterReturning(
        pointcut = "execution(* com.internship.redteam.service.*.*delete*(..))",
        returning = "result"
    )
    public void logDelete(JoinPoint joinPoint, Object result) {
        logAction("DELETE", joinPoint, result);
    }

    private void logAction(String action, JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String args = Arrays.toString(joinPoint.getArgs());
        
        System.out.println("=== AUDIT LOG ===");
        System.out.println("Action     : " + action);
        System.out.println("Class      : " + className);
        System.out.println("Method     : " + methodName);
        System.out.println("Arguments  : " + args);
        System.out.println("Result     : " + result);
        System.out.println("Timestamp  : " + LocalDateTime.now());
        System.out.println("=================");
    }
}