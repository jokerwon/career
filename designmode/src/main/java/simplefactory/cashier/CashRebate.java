package simplefactory.cashier;

public class CashRebate extends CashSuper {
    private double debate = 1;

    public CashRebate(double debate) throws Exception {
        if (debate >= 1 || debate < 0) throw new Exception("The debate is illegal!");
        this.debate = debate;
    }

    public double receiveMoney(double money) {
        return money * debate;
    }
}
