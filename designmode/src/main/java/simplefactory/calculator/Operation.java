package simplefactory.calculator;

/*
* 操作父类
* */
public abstract class Operation {
    private double opNumA = 0;
    private double opNumB = 0;

    public abstract double getResult() throws Exception;

    public void setBatch(double opNumA, double opNumB) {
        this.opNumA = opNumA;
        this.opNumB = opNumB;
    }

    public double getOpNumA() {
        return opNumA;
    }

    public void setOpNumA(double opNumA) {
        this.opNumA = opNumA;
    }

    public double getOpNumB() {
        return opNumB;
    }

    public void setOpNumB(double opNumB) {
        this.opNumB = opNumB;
    }
}
