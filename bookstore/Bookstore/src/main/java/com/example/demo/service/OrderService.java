package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.OrderRepository;
import com.example.model.OrderModel;

@Service
public class OrderService {
	
	@Autowired
	public OrderRepository orderRepo;
	
//	Get all the orders
	public List<OrderModel> getAllorders() {	
		List<OrderModel> orders = null;
		try {
			orders = orderRepo.findAll();
			if(orders.isEmpty()) {
				System.out.println("order not found in order repo");
				return new ArrayList<>();
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return orders;
	}
	
//	Get the order by id
	public OrderModel getorder(String orderId) {	
		Optional<OrderModel> order = null;
		try {
			order = orderRepo.findById(orderId);
			if(order.isEmpty()) {
				System.out.println("order not found in order repo");
			}	
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return order.get();
	}
	
//	Save the order
	public String saveorder(OrderModel order) {
		try {
			orderRepo.save(order);
			return "success";
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return "failure";
	}
	
	public String updateorder(OrderModel order) {
		try {
			orderRepo.save(order);
			return "success";
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return "failure";
	}
	
//	delete the order
	public String deleteorder(OrderModel order) {
		try {
			orderRepo.delete(order);
			return "success";
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return "failure";
	}
	
	
//	Delete the order by id
	public String deleteorderById(String orderId) {
		try {
			orderRepo.deleteById(orderId);
			return "success";
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return "failure";
	}	
	
}
