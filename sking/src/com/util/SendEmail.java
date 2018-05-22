package com.util;

import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;



class Password extends Authenticator{
	String name;
	String pwd;
	public Password(String name,String pwd){
		this.name=name;
		this.pwd=pwd;
	}
	 protected PasswordAuthentication getPasswordAuthentication() { 
	        return new PasswordAuthentication(name, pwd); 
	    } 
}
public class SendEmail {
	public static void sendMsg(String email,String message){
		Properties props=System.getProperties();
		props.setProperty("mail.smtp.host", "smtp.qq.com");
		props.setProperty("mail.smtp.port", "25");
		props.setProperty("mail.transport.protocol", "smtp");
		props.setProperty("mail.smtp.starttls.enable","true");
		props.setProperty("mail.smtp.auth", "true");
		Session session=Session.getDefaultInstance(props, new Password("787643649@qq.com", "yseygzfhjkadbfdg"));
		session.setDebug(true);
		Message msg=new MimeMessage(session);
		try {
			msg.setFrom(new InternetAddress("787643649@qq.com"));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email,false ));
			msg.setSubject("滑雪场订单信息");
			msg.setText(message);
			msg.setSentDate(new Date());
			msg.saveChanges();
			Transport.send(msg);
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}
