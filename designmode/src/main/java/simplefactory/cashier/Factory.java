package simplefactory.cashier;

public class Factory {
    public static CashSuper createCashier(int mode) {
        CashSuper cashSuper = null;
        try {
            switch (mode) {
                case 0:
                    cashSuper = new CashNormal();
                    break;
                case 1:
                    cashSuper = new CashRebate(7);
                    break;
                case 2:
                    cashSuper = new CashReturn(100, 10);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cashSuper;
    }
}
