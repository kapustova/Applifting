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
