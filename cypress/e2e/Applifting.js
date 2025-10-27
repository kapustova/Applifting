/// <reference types="cypress" />

import { finishShopping } from "../page-objects/finishShopping"
import { items } from "../fixtures/items.json"
import { checkCart, itemView, searchItem } from "../page-objects/GetMethods"     
import { selectors } from "../selectors/selectors"
import { checkout } from "../page-objects/GetMethods"
import { searchItem } from "../page-objects/GetMethods"
import { checkCart } from "../page-objects/GetMethods"
import { itemView } from "../page-objects/GetMethods"

describe('Second part of my work', () => {
  beforeEach('Open test aplication', () => {
    cy.openHomePage()

  })
    //TC1
    it('Happy path', () => {
        //check text header of first page
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //go to cart from add to cart button - not from icon cart
        cy.get(selectors.cartViewFromAddCart).click()        
        //check if the url contains /cart
        cy.url().should('include', '/cart')

        //check if the correct article is in the cart
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'1') 
        
        //go to checkout
        checkout(items.person.name, items.person.address, items.person.email, 'Credit Card')

        //finished shopping
        finishShopping()
    }) 

    //TC9
    it ('Add to cart - two articles', () => {
        //check text header of first page
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //search for ArticleNumber2
        searchItem.searchItem(items.item2.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item2.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item2.id)).click()
        
        //check item view
        itemView.itemView(items.item2.name, items.item2.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '2')  

        //go to cart and verify items in the cart
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'1')
        checkCart.checkCart(items.item2.name, items.item2.id, items.item2.value, items.item2.price,'1')     
        }) 

    //TC10
    it ('Add to cart - one article twice', () => {
        //check text header of first page
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //go to cart and verify items in the cart
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'2')
         cy.get(selectors.cartItemName(items.item1.name)).should('have.length', 1)  //exist only one item in the cart     
        }) 

    //TC14
     it ('Update cart - remove Item', () => {
        //check text header of first page
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //search for ArticleNumber2
        searchItem.searchItem(items.item2.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item2.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item2.id)).click()
        
        //check item view
        itemView.itemView(items.item2.name, items.item2.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '2')  

        //go to cart and verify items in the cart
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'1')
        checkCart.checkCart(items.item2.name, items.item2.id, items.item2.value, items.item2.price,'1')     
        
        //remove item1 from the cart
        cy.get(selectors.cartItemId(items.item1.id)).find(selectors.cartRemoveItemBtn).click()
        //verify item1 is removed
        cy.get(selectors.cartItemId(items.item1.id)).should('not.exist')
        //check summary price is updated        
        cy.get(selectors.cartSumaryPrice).should('have.text', items.item2.price)   
    }) 





        it ('Add to cart - one article twice', () => {
        //check text header of first page
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //search for ArticleNumber1
        searchItem.searchItem(items.item1.id)  
        
        //assertion article name is as expected
        cy.get(selectors.productId(items.item1.id)).should('exist')
        //click on ArticleName1
        cy.get(selectors.productId(items.item1.id)).click()
        
        //check item view
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Add to cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //go to cart and verify items in the cart
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'2')  
       
        })   
        
        




 })



  