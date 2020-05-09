package simplefactory.calculator;

public class Client {
    public static void main(String[] args) {
        char operate = '/';
        Operation operation = Factory.createOperation(operate);
        // Todo 判 null
        operation.setBatch(3, 2);
        try {
            System.out.println(operation.getResult());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
