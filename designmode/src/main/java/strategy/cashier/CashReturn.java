package strategy.cashier;

public class CashReturn extends CashSuper {
    private double condition = 0;
    private double returnMoney = 0;

    public CashReturn(double condition, double returnMoney) throws Exception {
        if (condition == 0) throw new Exception("The condition must not be 0!");
        this.condition = condition;
        this.returnMoney = returnMoney;
    }

    public double receiveMoney(double money) {
        if (money >= this.condition) {
            return money - Math.floor(money / condition) * returnMoney;
        } else return money;
    }
}
