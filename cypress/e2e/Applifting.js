
import { finishShopping } from "../page-objects/CheckoutPage"
import { items } from "../fixtures/items.json"     
import { selectors } from "../selectors/selectors"
import { checkout } from "../page-objects/CheckoutPage"
import { searchItem } from "../page-objects/SearchPage"
import { itemView } from "../page-objects/ViewItemPage"
import { checkCart } from "../page-objects/CartPage"

describe('Second part of my work', () => {
  beforeEach('Open test aplication', () => {
    cy.openHomePage()

  })
    //TC1
    it('Happy path', () => {
        
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //ArticleNumber is searched on Search page
        searchItem.searchItem(items.item1.id)  
        cy.get(selectors.productId(items.item1.id)).should('exist')
        cy.get(selectors.productId(items.item1.id)).click()
        
        //Item name and id is shown on View Item page 
        itemView.itemView(items.item1.name, items.item1.id)

        //Cart counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  
        cy.get(selectors.cartViewFromAddCart).click()    
         
        //Article name, id, value, price and quantity are correct in the cart
        cy.url().should('include', '/cart')
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'1') 
        
        //Checkout is processed successfully
        checkout(items.person.name, items.person.address, items.person.email, 'Credit Card')
        finishShopping()
    }) 

    //TC9
    it ('Add to cart - two articles', () => {
        
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //ArticleNumber is searched on Search page
        searchItem.searchItem(items.item1.id)  
        cy.get(selectors.productId(items.item1.id)).should('exist')
        cy.get(selectors.productId(items.item1.id)).click()

         //Item name and id is shown on View Item page 
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Cart counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1') 

        //ArticleNumber2 is searched on Search page 
        searchItem.searchItem(items.item2.id)         
        cy.get(selectors.productId(items.item2.id)).should('exist')
        cy.get(selectors.productId(items.item2.id)).click()
        
        //Item name2 and id2 is shown on View Item page 
        itemView.itemView(items.item2.name, items.item2.id)
        
        //Cart counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '2')  

        //Two articles (name,id,value,price and quantity) are in the cart page
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'1')
        checkCart.checkCart(items.item2.name, items.item2.id, items.item2.value, items.item2.price,'1')     
        }) 

    //TC10
    it ('Add to cart - one article twice', () => {
        
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //ArticleNumber is searched on Search page
        searchItem.searchItem(items.item1.id)  
        cy.get(selectors.productId(items.item1.id)).should('exist')
        cy.get(selectors.productId(items.item1.id)).click()
        
        //Item name and id is shown on View Item page
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //ArticleNumber1 is searched again on Search page
        searchItem.searchItem(items.item1.id)  
        cy.get(selectors.productId(items.item1.id)).should('exist')
        cy.get(selectors.productId(items.item1.id)).click()
        
         //Item name and id is shown on View Item page
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Cart Counter is not changed after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //Only one article with quantity two is on the cart page
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'2')
         cy.get(selectors.cartItemName(items.item1.name)).should('have.length', 1)

    //TC15
     it ('Update cart - remove Item', () => {
        
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //ArticleNumber is searched on Search page+
        
        searchItem.searchItem(items.item1.id)  
        cy.get(selectors.productId(items.item1.id)).should('exist')
        cy.get(selectors.productId(items.item1.id)).click()
        
        //Item name and id is shown on View Item page
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Cart counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //ArticleNumber is searched on Search page
        searchItem.searchItem(items.item2.id)  
        cy.get(selectors.productId(items.item2.id)).should('exist')
        cy.get(selectors.productId(items.item2.id)).click()
        
        //Item2 name and id is shown on View Item page
        itemView.itemView(items.item2.name, items.item2.id)
        
        //Cart counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '2')  

        //Two articles (name,id,value,price and quantity) are in the cart page
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'1')
        checkCart.checkCart(items.item2.name, items.item2.id, items.item2.value, items.item2.price,'1')     
        
        //The Item1 is not in cart after update cart and summary price is updated
        cy.get(selectors.cartItemId(items.item1.id)).find(selectors.cartRemoveItemBtn).click()
        cy.get(selectors.cartItemId(items.item1.id)).should('not.exist')       
        cy.get(selectors.cartTotalPrice).should('have.text', items.item2.price)   
    }) 

    //TC14
    it ('Update shopping cart - remove last item', () => {
        
        cy.get(selectors.headerTitle).should('have.text', 'Welcome to my shop!')
       
        //ArticleNumber is searched on Search page
        searchItem.searchItem(items.item1.id)  
        cy.get(selectors.productId(items.item1.id)).should('exist')
        cy.get(selectors.productId(items.item1.id)).click()
        
        //Item name and id is shown on View Item page
        itemView.itemView(items.item1.name, items.item1.id)
        
        //Cart counter is increases after adding item to the cart
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.cartCounter).should('have.text', '1')  

        //Article name, id, value, price and quantity are correct in the cart
        checkCart.checkCart(items.item1.name, items.item1.id, items.item1.value, items.item1.price,'2')  
       
        //The cart is empty after removing the last item
        cy.get(selectors.cartItemId(items.item1.id)).find(selectors.cartRemoveItemBtn).click()
        cy.get(selectors.cartItemId(items.item1.id)).should('not.exist')    
        cy.get(selectors.emptyCartMessage).should('have.text', 'Your cart is empty.')   

        })   
 }) 
})