package com.model;

public class HotelInfo {
    private Integer hotelId;
    private String hotelName;
    private String hotelBrief;
    private String longitude;
    private String latitude;
    private String hotelAddress;
    private String hotelImage;

    public Integer getHotelId() {
        return hotelId;
    }

    public void setHotelId(Integer hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName == null ? null : hotelName.trim();
    }

    public String getHotelBrief() {
        return hotelBrief;
    }

    public void setHotelBrief(String hotelBrief) {
        this.hotelBrief = hotelBrief == null ? null : hotelBrief.trim();
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude == null ? null : longitude.trim();
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude == null ? null : latitude.trim();
    }

    public String getHotelAddress() {
        return hotelAddress;
    }

    public void setHotelAddress(String hotelAddress) {
        this.hotelAddress = hotelAddress == null ? null : hotelAddress.trim();
    }

    public String getHotelImage() {
        return hotelImage;
    }

    public void setHotelImage(String hotelImage) {
        this.hotelImage = hotelImage == null ? null : hotelImage.trim();
    }
}