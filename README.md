# Applifting - E2E testy (Cypress)

Testy jsou vytvořeny v Cypress.

## Struktura projektu
- `cypress/e2e/Applifting.js` – hlavní testy (TC1, TC9, TC10, TC15, TC14)  
- `cypress/fixtures/items.json` – testovací data (item1, item2, …)  
- `cypress/support/Selectors.js` – centrální selektory  
- `cypress/page-objects/` – page objecty (searchItem, itemView, checkCart, checkout, …)

## Testovací případy (TC)
1. **TC1** – Prochází celým nákupním procesem. Výsledek: objednávka dokončena (succeeded).  
2. **TC9** – Přidání dvou různých artiklů do košíku. Výsledek: v košíku jsou 2 artikly, quantity = 1.  
3. **TC10** – Přidání stejného artiklu dvakrát. Výsledek: v košíku jen jeden řádek artiklu, quantity = 2.  
4. **TC15** – Aktualizace košíku, odstranění jednoho artiklu. Výsledek: v košíku zůstane jeden artikl, součet odpovídá ceně jednoho artiklu.  
5. **TC14** – Odstranění posledního artiklu. Výsledek: zobrazeno „Cart is empty“ a artikl není v košíku.


<i> <img width="780" height="515" alt="image" src="https://github.com/user-attachments/assets/7bb28164-2703-45dd-84d6-10a5e24fe8f6" />
 </i>

Feature: E-shop Shopping Cart Functionality
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase products

  Background:
  -  Given I am on the homepage
  - Then I should see "Welcome to my shop!" as the header title

  Scenario Outline: TC1 - Complete purchase flow
  - When I search for item with id "<item_id>"
  - Then the item with id "<item_id>" should be visible
  - When I open the item details
  - Then I should see item name "<item_name>" and id "<item_id>"
  - When I add the item to cart
  - Then cart counter should show "<item_quantity>"
  - When I view the cart from add-to-cart
  - Then I should be on the "/cart" page
  - And the cart should contain item "<item_name>" with id "<item_id>", value "<item_value>", price "<item_price>" and quantity "<item_quantity>"
  - When I complete checkout with payment "<payment_method>"
  - Then I should see order confirmation

    Examples:
      | item_name     | item_id         | item_value | item_price | item_quantity | payment_method |
      | ArticleName1  | ArticleNumber1  | ArticleValue1      | ArtilcePrice       | 1             | CreditCart    |

  Scenario Outline: TC9 - Add two different items
    When I search for item with id "<item1_id>" and add it to cart
    And I search for item with id "<item2_id>" and add it to cart
    Then cart counter should show "<total_count>"
    And the cart should contain item "<item1_name>" with quantity "1"
    And the cart should contain item "<item2_name>" with quantity "1"

    Examples:
      | item1_name    | item1_id        | item2_name    | item2_id        | total_count |
      | ArticleName1  | ArticleNumber1  | ArticleName2  | ArticleNumber2  | 2           |

  Scenario Outline: TC10 - Add same item twice
    When I search for item with id "<item_id>" and add it to cart
    And I search for item with id "<item_id>" and add it to cart again
    Then cart counter should show "1"
    And the cart should contain item "<item_name>" with quantity "2"
    And there should be exactly one cart row for item "<item_name>"

    Examples:
      | item_name     | item_id         |
      | ArticleName1  | ArticleNumber1  |

  Scenario Outline: TC15 - Remove one of two items from cart
    When I add item "<item1_id>" and item "<item2_id>" to cart
    Then cart counter should show "2"
    When I remove item with id "<removed_id>" from cart
    Then the cart should contain only item with id "<remaining_id>" and quantity "<remaining_quantity>"
    And cart total should equal "<remaining_price>"

    Examples:
      | item1_id        | item2_id        | removed_id       | remaining_id     | remaining_quantity | remaining_price |
      | ArticleNumber1  | ArticleNumber2  | ArticleNumber1   | ArticleNumber2   | 1                  | 14.50           |

  Scenario Outline: TC14 - Remove last item from cart
    When I add item "<item_id>" to cart
    Then cart counter should show "<start_quantity>"
    When I remove item with id "<item_id>" from cart
    Then I should see "Your cart is empty" message
    And the cart should not contain item with id "<item_id>"

    Examples:
      | item_id         | start_quantity |
      | ArticleNumber1  | 1              |
