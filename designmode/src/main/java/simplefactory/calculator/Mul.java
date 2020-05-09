package simplefactory.calculator;

public class Mul extends Operation {
    public double getResult() {
        return this.getOpNumA() * this.getOpNumB();
    }
}
