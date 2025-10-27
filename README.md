Testy jsou vytvořeny v  cypress </br>
TC jsou v souboru: e2e/Applifting </br>
<li>TC1 - prochází celým procesem a celý proces končí succeeded</br>
<li>TC9 - testuje Add to cart dvou různých artiklů. Výsledkem testu: v cart jsou dva artikly s questity = 1;</br>
<li>TC10 - testuje Add to cart stejného artiklu dvakrát. Výsledkem testu: v cart je pouze jeden artikl a quantity = 2;</br>
<li>TC15 - testuje Update cart, remove article. V cart jsou dva artikly a jeden z nich je odstraněn. Výsledek testu: Cart obsahuje jen jeden artikl, Suma price zobrazuje cenu jednoho artiklu.</br>
<li>TC14 - testuje update cart, remove jediného artiklu v cart. Výsledek testu: zobrazí se message "Cart is empty" a artikl není v košíku.</br>
