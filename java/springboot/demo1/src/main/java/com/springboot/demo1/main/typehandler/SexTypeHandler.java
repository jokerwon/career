package com.springboot.demo1.main.typehandler;

import com.springboot.demo1.main.enumeration.SexEnum;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//声明 JdbcType 为整型
@MappedJdbcTypes(JdbcType.INTEGER)
//声明 JavaType 为SexEnum
@MappedTypes(value = SexEnum.class)
public class SexTypeHandler extends BaseTypeHandler<SexEnum> {
    //设置非空性别参数
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int index, SexEnum sexEnum, JdbcType jdbcType) throws SQLException {
        preparedStatement.setInt(index,sexEnum.getId());
    }

    //通过列名读取性别
    @Override
    public SexEnum getNullableResult(ResultSet resultSet, String col) throws SQLException {
        int index = resultSet.getInt(col);
        if (index !=1 && index !=2){
            return null;
        }
        return SexEnum.getEnumById(index);
    }

    //通过下标读取性别
    @Override
    public SexEnum getNullableResult(ResultSet resultSet, int idx) throws SQLException {
        int index = resultSet.getInt(idx);
        if (index !=1 && index !=2){
            return null;
        }
        return SexEnum.getEnumById(index);
    }

    //通过存储过程读取性别
    @Override
    public SexEnum getNullableResult(CallableStatement callableStatement, int idx) throws SQLException {
        int index = callableStatement.getInt(idx);
        if (index !=1 && index !=2){
            return null;
        }
        return SexEnum.getEnumById(index);
    }
}
