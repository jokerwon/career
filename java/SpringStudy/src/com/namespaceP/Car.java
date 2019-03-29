package com.namespaceP;

public class Car {
    private String band;
    private String corp;
    private double price;
    private int maxSpeed;

    public Car(){}

    public Car(String band, String corp, double price, int maxSpeed) {
        this.band = band;
        this.corp = corp;
        this.price = price;
        this.maxSpeed = maxSpeed;
    }

    public String getBand() {
        return band;
    }

    public void setBand(String band) {
        this.band = band;
    }

    public String getCorp() {
        return corp;
    }

    public void setCorp(String corp) {
        this.corp = corp;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(int maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    @Override
    public String toString() {
        return "Car{" +
                "band='" + band + '\'' +
                ", corp='" + corp + '\'' +
                ", price=" + price +
                ", maxSpeed=" + maxSpeed +
                '}';
    }
}
