package com.springconfig;

public class Car {
    private String band;
    private String corp;
    private double price;
    private int maxSpeed;

    public Car(String band, String corp, double price) {
        this.band = band;
        this.corp = corp;
        this.price = price;
    }

    public Car(String band, String corp, int maxSpeed) {
        this.band = band;
        this.corp = corp;
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

    public int getMaxSpeed() {
        return maxSpeed;
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

    public void setMaxSpeed(int maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
