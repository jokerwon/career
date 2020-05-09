package simplefactory.calculator;

public class Factory {

    public static Operation createOperation(char operate) {
        Operation operation = null;
        switch (operate) {
            case '+':
                operation = new Add();
                break;
            case '-':
                operation = new Sub();
                break;
            case '*':
                operation = new Mul();
                break;
            case '/':
                operation = new Div();
                break;
        }
        return operation;
    }
}
