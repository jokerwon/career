package com.znv.enumerate;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 16:32
 * @Desciption 类的对象只有有限个，确定的，则该类成为枚举类
 * 当需要定义一组常量时，强烈建议使用枚举类
 * 如果枚举类中只有一个对象，则可以作为单例模式的实现方式
 *
 * 枚举类继承Enum
 */
public class SeasonTest {
    public static void main(String[] args) {
        Season spring = Season.SPRING;
        System.out.println(spring);

        System.out.println(Season1.AUTUMN);
        System.out.println(Season1.class.getSuperclass());
    }
}

//使用enum定义枚举类
enum Season1 {
    SPRING("春天", "春暖花开"),
    SUMMER("夏天", "夏日炎炎"),
    AUTUMN("秋天", "秋高气爽"),
    WINTER("冬天", "冰天雪地");

    private final String seasonName;
    private final String seasonDesc;

    //构造器私有化
    private Season1(String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }
}

//自定义枚举类
class Season {
    private final String seasonName;
    private final String seasonDesc;

    //构造器私有化
    private Season(String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }

    public static final Season SPRING = new Season("春天", "春暖花开");
    public static final Season SUMMER = new Season("夏天", "夏日炎炎");
    public static final Season AUTUMN = new Season("秋天", "秋高气爽");
    public static final Season WINTER = new Season("冬天", "冰天雪地");

    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                ", seasonDesc='" + seasonDesc + '\'' +
                '}';
    }
}