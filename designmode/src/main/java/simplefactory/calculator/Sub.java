package simplefactory.calculator;

public class Sub extends Operation {
    public double getResult() {
        return this.getOpNumA() - this.getOpNumB();
    }
}
