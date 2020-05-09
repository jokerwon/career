package simplefactory.cashier;

public class Client {
    public static void main(String[] args) {
        int mode = 2;
        CashSuper cashSuper = Factory.createCashier(mode);
        // TODO 判null
        System.out.println(cashSuper.receiveMoney(300));
    }
}
