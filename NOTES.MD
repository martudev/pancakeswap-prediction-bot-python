# @NOTES

**Como saber si los mercados estan pausados**

Entrar en `https://pancakeswap.finance/prediction` y ejecutar lo siguiente:

```
var xpath = "//h2[text()='Markets Paused']";
var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
console.log(matchingElement) // Te devuelve el node element, si no lo encuentra el valor es 'undefined'
```
