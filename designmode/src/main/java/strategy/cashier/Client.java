package strategy.cashier;

public class Client {
    public static void main(String[] args) {
        int mode = 2;
        Context context = null;
        try {
            switch (mode) {
                case 0:
                    context = new Context(new CashNormal());
                    break;
                case 1:
                    context = new Context(new CashRebate(0.7));
                    break;
                case 2:
                    context = new Context(new CashReturn(100, 20));
                    break;
            }
            // TODO 判null
            System.out.println(context.receiveMoney(300));
        } catch (Exception e) {
            e.printStackTrace();
        }
        FactoryContext factoryContext = new FactoryContext(1);
        System.out.println(factoryContext.receiveMoney(200));
    }
}
