import{ selectors } from "../selectors/selectors"

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
