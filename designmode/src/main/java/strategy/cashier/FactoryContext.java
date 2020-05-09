package strategy.cashier;

/*
* 简单工厂和策略模式结合
* */
public class FactoryContext {
    private CashSuper cashSuper;

    public FactoryContext(int mode) {
        try {
            switch (mode) {
                case 0:
                    cashSuper = new CashNormal();
                    break;
                case 1:
                    cashSuper = new CashRebate(.7);
                    break;
                case 2:
                    cashSuper = new CashReturn(100, 30);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public double receiveMoney(double money) {
        return cashSuper.receiveMoney(money);
    }
}
