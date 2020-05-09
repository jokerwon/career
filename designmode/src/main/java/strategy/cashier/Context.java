package strategy.cashier;

/*
* 策略模式
* 算法在上下文中调用
* */
public class Context {
    private CashSuper cashSuper;

    public Context(CashSuper cashSuper) {
        this.cashSuper = cashSuper;
    }

    public double receiveMoney(double money) {
        return cashSuper.receiveMoney(money);
    }
}
