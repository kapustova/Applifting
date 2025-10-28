import{ selectors } from "../selectors/selectors"

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