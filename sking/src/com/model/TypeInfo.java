package com.model;

public class TypeInfo {
    private Integer typeId;
    private String typeName;
    private String typeBrief;

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName == null ? null : typeName.trim();
    }

    public String getTypeBrief() {
        return typeBrief;
    }

    public void setTypeBrief(String typeBrief) {
        this.typeBrief = typeBrief == null ? null : typeBrief.trim();
    }
}