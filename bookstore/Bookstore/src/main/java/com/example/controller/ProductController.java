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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.ProductRepository;
import com.example.model.ProductModel;


 

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
    public ProductRepository productRepo;
        
     @GetMapping("/products")
     public List<ProductModel> getAllProducts() {
    	 return productRepo.findAll();
     }
        
     @PostMapping("admin/addproduct")
     public boolean addProduct(@RequestBody ProductModel product) {
    	 return productRepo.save(product) != null;
     }
     
     @PutMapping("/admin/editproduct/{id}")
     public boolean editProduct(@PathVariable String id, @RequestBody ProductModel product) {
    	 Optional<ProductModel> tempProduct = productRepo.findById(id);
    	 if(tempProduct.isEmpty())
    		 return false;
    	 else {
    		 ProductModel temp = tempProduct.get();
    		 temp.setProductName(product.getProductName());
    		 temp.setPrice(product.getPrice());
    		 temp.setImageUrl(product.getImageUrl());
    		 temp.setDescription(product.getDescription());
    		 temp.setQuantity(product.getQuantity());
    		 return productRepo.save(temp) != null;

    	 }
     }
     
     @DeleteMapping("/admin/deleteProduct/{id}")
     public void deleteProduct(@PathVariable String id) {
    	 productRepo.deleteById(id);
     }
     
     
    
}