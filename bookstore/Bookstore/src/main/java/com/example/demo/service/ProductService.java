package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.ProductsRepository;
import com.example.model.ProductModel;

@Service
public class ProductService {
	
	@Autowired
	public ProductsRepository productRepo;
	
//	Get all the products
	public List<ProductModel> getAllproducts() {	
		List<ProductModel> products = null;
		try {
			products = productRepo.findAll();
			if(products.isEmpty()) {
				System.out.println("product not found in product repo");
				return new ArrayList<>();
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return products;
	}
	
//	Get the product by id
	public ProductModel getproduct(String productId) {	
		Optional<ProductModel> product = null;
		try {
			product = productRepo.findById(productId);
			if(product.isEmpty()) {
				System.out.println("product not found in product repo");
			}	
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return product.get();
	}
	
//	Save the product
	public boolean saveproduct(ProductModel product) {
		try {
			productRepo.save(product);
			return true;
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return false;
	}
	
	public boolean updateproduct(ProductModel product) {
		try {
			productRepo.save(product);
			return true;
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return false;
	}
	
//	delete the product
	public boolean deleteproduct(ProductModel product) {
		try {
			productRepo.delete(product);
			return true;
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return false;
	}
	
	
//	Delete the product by id
	public boolean deleteproductById(String productId) {
		try {
			productRepo.deleteById(productId);
			return true;
		} catch(Exception e) {
			System.out.println("Error\n" + e.getMessage());
		}
		return false;
	}	
	
}
