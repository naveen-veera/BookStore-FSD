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
import com.example.service.ProductService;
import com.example.tempmodel.TmpCartModel;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {
	
	@Autowired
	public CartRepository cartRepo;
	
	@Autowired
	public ProductService productService;
	
	@GetMapping("/user/{id}/cartitems")
	public List<CartModel> getAllCartItemsFromUser(@PathVariable String id) {
		// return cartRepo.findByUserId(id);
	}
	
	@PostMapping("/user/addcart")
	public String addtoCart(@RequestBody CartModel cart) {
		// ProductModel product = productService.getProduct(cart.getCartId());
		// int productQuantity = Integer.parseInt(product.getQuantity());
		// if(productQuantity > 0 ) {
		// 	product.setQuantity(String.valueOf(productQuantity - 1));
		// 	productService.addProduct(product);
			
		// 	Optional<CartModel> checkedCartIfExisted = cartRepo.findById(cart.getCartId());
			
		// 	if(checkedCartIfExisted.isEmpty()) {
		// 		cartRepo.save(cart);
		// 	} else if(checkedCartIfExisted.isPresent()) {
		// 		CartModel tmpCart = checkedCartIfExisted.get();
		// 		int tempQuantity = Integer.parseInt(tmpCart.getQuantity()) + 1;
		// 		tmpCart.setQuantity(String.valueOf(tempQuantity));
		// 		cartRepo.save(tmpCart);
		// 	}
		// 	return "success";
		// } else {
		// 	return "insufficient stock";
		// }
	}
	
	@DeleteMapping("/user/deleteCart/{id}")
	public void deleteCart(@PathVariable String id) {
		
		// ProductModel product = productService.getProduct(id);
		// Optional<CartModel> cart = cartRepo.findById(id);
		// CartModel tempCart = cart.get();
		
		// int originalQuantity = Integer.parseInt(product.getQuantity());
		// int cartQuantity = Integer.parseInt(tempCart.getQuantity());
		
		// product.setQuantity(String.valueOf(originalQuantity + cartQuantity));
		// productService.addProduct(product);
		
		// cartRepo.deleteById(id);
	}
	
	@DeleteMapping("/user/deleteallcartitems")
	public void deleteAll() {
		// cartRepo.deleteAll();
	}
}
