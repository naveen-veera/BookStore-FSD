package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.CartRepository;
import com.example.model.CartModel;
import com.example.model.ProductModel;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {
	
	@Autowired
	public CartRepository cartRepo;
	
	@GetMapping("/user/{id}/cartitems")
	public List<CartModel> getAllCartItemsFromUser(@PathVariable String id) {
		return cartRepo.findByUserId(id);
	}
	
	@PostMapping("/user/addcart")
	public CartModel addtoCart(@RequestBody CartModel cart) {
		return cartRepo.save(cart);
	}
	
//	@PutMapping("/user/editcart/{id}")
//	public boolean editCart(@PathVariable String id, @RequestBody CartModel cart) {
//   	 Optional<ProductModel> tempProduct = productRepo.findById(id);
//   	 if(tempProduct.isEmpty())
//   		 return false;
//   	 else {
//   		 ProductModel temp = tempProduct.get();
//   		 temp.setProductName(product.getProductName());
//   		 temp.setPrice(product.getPrice());
//   		 temp.setImageUrl(product.getImageUrl());
//   		 temp.setDescription(product.getDescription());
//   		 temp.setQuantity(product.getQuantity());
//   		 return productRepo.save(temp) != null;
//
//   	 }
	
	@DeleteMapping("/user/deleteCart/{id}")
	public void deleteCart(@PathVariable String id) {
		cartRepo.deleteById(id);
	}
	
	@DeleteMapping("/user/deleteallcartitems")
	public void deleteAll() {
		cartRepo.deleteAll();
	}
}
