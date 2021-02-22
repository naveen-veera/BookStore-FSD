package com.example.model;

public class TestModel {
	
	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public TestModel(String mess) {
		this.setMessage(mess);
	}
	
}
