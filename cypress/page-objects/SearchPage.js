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