package simplefactory.calculator;

public class Add extends Operation {
    public double getResult() {
        return this.getOpNumA() + this.getOpNumB();
    }
}
