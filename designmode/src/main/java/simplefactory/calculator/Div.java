package simplefactory.calculator;

public class Div extends Operation {
    private static final double Number_ZERO = 0;

    public double getResult() throws Exception {
        if (this.getOpNumB() == Number_ZERO) throw new Exception("The divisor must not be 0!");
        return this.getOpNumA() / this.getOpNumB();
    }
}
