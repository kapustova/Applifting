declare namespace Cypress{
    interface Chainable{
        /**
         * Command to open the home page of application
         */
        openHomePage(): Chainable<void>;
    }
}