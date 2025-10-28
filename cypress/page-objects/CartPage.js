import{ selectors } from "../selectors/selectors"

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