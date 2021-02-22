package com.example.controller;

 

import java.util.List;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

 

import com.example.demo.repository.ProductsRepository;
import com.example.demo.service.ProductService;
import com.example.model.ProductModel;

 

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

 

    @Autowired
    ProductsRepository productRepo;
    
    @Autowired
    ProductService productService;
    
    @GetMapping("/admin")
    public List<ProductModel> getProduct(){
        return (List<ProductModel>)productRepo.findAll();
    }
    @GetMapping("/home")
    public List<ProductModel> getHomeProduct(){
        return (List<ProductModel>)productRepo.findAll();
    }
    
    @GetMapping("/admin/productEdit/{id}")
    public ProductModel test(@PathVariable String id) {
        System.out.println(id);
        System.out.println(productService.getproduct(id));
        return (ProductModel)productService.getproduct(id);
    }
    
    @PostMapping("/admin/addProduct")
    public void productSave(@RequestBody ProductModel data) {
        ProductModel product = new ProductModel();
        product.setProductName(data.getProductName());
        product.setPrice(data.getPrice());
        product.setImageUrl(data.getImageUrl());
        product.setQuantity(data.getQuantity());
        product.setDescription(data.getDescription());
        System.out.println(product);
        productService.saveproduct(product);
    }
}