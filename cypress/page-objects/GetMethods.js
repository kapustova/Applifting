import{ selectors } from "../selectors/selectors"

class SearchItem {
    /**
     * 
     * @param {string} item - article name or article ID
     */
    searchItem(item) {
        cy.get(selectors.searchItem).type(item)
        cy.get(selectors.searchSubmitBtn).click()
        cy.get(selectors.searchResultGrid).should('contains.text', item)
    }
}
export const searchItem = new SearchItem();

class ItemView {
    /**
     * 
     * @param {string} id - item ID
     * @param {string} item - item name
    */
    itemView(item, id) {
        cy.url().should('include', id)
        //check if the product title is correct
        cy.get(selectors.productTitle).should('have.text', item)
}
}
export const itemView = new ItemView();

class CheckCart {
    /**
     * 
     * @param {string} item - article name
     * @param {string} id - item ID
     * @param {string} value - item value
     * @param {string} price - item price
     */

    checkCart(item, id,value,price,quantity){
        //check if the correct article is in the cart
        cy.get(selectors.cartItemId(id)).should('exist')
        cy.get(selectors.cartItemName(item)).should('exist')
        cy.get(selectors.cartItemValue(value)).should('exist')
        cy.get(selectors.cartItemPrice(price)).should('exist')
        cy.get(selectors.cartItemId(id).find(selectors.cartItemQuantity(quantity))).should('exist')
    }
}
export const checkCart = new CheckCart();

class Checkout {
 
    /**
     * 
     * @param {string} personName 
     * @param {string} personAddress 
     * @param {string} PersonEmail 
     * @param {string} paymentMethod 
     */
    checkout(personName, personAddress, PersonEmail, paymentMethod) {
        //go to checkout
        cy.get(selectors.checkoutBtn).click()
        cy.url().should('include', '/checkout')
        //fill in the checkout form
        cy.get(selectors.checkoutName).type(personName)
        cy.get(selectors.checkoutAdress).type(personAddress)
        cy.get(selectors.checkoutEmail).type(PersonEmail)
        //check checkbox of payment method
        cy.get(selectors.checkoutCheckBoxPaymentMethod).check(paymentMethod)
        //submit the order
        cy.get(selectors.submitOrderBtn).click()   
    }    

}
export const checkout = new Checkout();

class FinishShopping {
   
    finishShopping() {
        cy.get(selectors.orderConfirmationMessage).should('have.text', 'Payement successful!') 
        //check if url contains /order-confirmation
        cy.url().should('include', '/order-confirmation')
        //check thank you message
        cy.get(selectors.thankYouMessage).should('have.text', 'Thank you for') 
        //check if cart is empty
        cy.get(selectors.cartCounter).should('have.text', '0')       
    }
}
export const finishShopping = new FinishShopping();

