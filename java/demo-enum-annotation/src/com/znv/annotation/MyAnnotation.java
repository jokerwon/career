package com.znv.annotation;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 17:05
 * @Desciption
 * 元注解：
 * Retention
 * Target
 * Document
 * Inherite
 */
public @interface MyAnnotation {
    String value() default "hello";
}

@MyAnnotation()
class Test {

}
