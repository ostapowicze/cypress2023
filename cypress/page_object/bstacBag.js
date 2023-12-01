export class BstackCart {

    bagLocator = '[class ="bag bag--float-cart-closed"]'
    cartContainer = '[class*="content"] > [class*="container"]'
    cartQuantity = '[class="bag"] > [class = "bag__quantity"]'
    prodItem = '.shelf-item'
    addToCartButton = ".shelf-item__buy-btn"
    cartTitle = '.title'
    cartWindowLocator = '[class*="open"]'
    cartFooter = '.float-cart__footer'
    cartsSubtotal = 'SUBTOTAL'
    cartDeleteButton = '.shelf-item__del'
    regexForPrice = /[\d\.]+/
    emptyCartMessage = 'Add some products in the bag '

    getCartFooter() {
        return cy.get(this.cartFooter)
    }

    getCartWindow() {
        return cy.get(this.cartWindowLocator)
    }

    getOpenCart() {
        return cy.get(this.cartContainer)
    }

    getcartDeleteButton() {
        return cy.get(this.cartDeleteButton)
    }

    getCartQuantityValue() {
        return cy.get(this.cartQuantity)
    }

    getBagOpenLocator() {
        return cy.get(this.bagLocator)
    }

    getMunusQuantityButton(){
        return cy.get(this.cartContainer).contains('-')
    }

    getPlusQuantityButton(){
        return cy.get(this.cartContainer).contains('+')
    }

    getCartSubTotal() {
        return cy.contains(this.cartsSubtotal).next().find('p')
    }

    getItemInCart(prodName) {
        this.getOpenCart().find('p').contains(new RegExp("^" + prodName + "$", "g"))
    }
    //using index
    getItemName() {
        return cy.get(this.prodItem).find('p')
    }

    closeBagWindow() {
        this.getCartWindow().contains('X').click()
    }

    getProdPriceFromCart(prodName) {
        return this.getOpenCart().find('p').contains(new RegExp("^" + prodName + "$", "g")).then(($elem) => {
            cy.get($elem).parent().parent().contains('$')
        })
    }

    addProdToCart(prodName) {
        cy.get(this.prodItem)
            .contains(new RegExp("^" + prodName + "$", "g"))
            .parent()
            .find(this.addToCartButton).click({
                force: true
            })
    }

    changeQuantityOfProducts(prodName, clicksNum) {
        this.getOpenCart().find('p').contains(new RegExp("^" + prodName + "$", "g")).then(($elem) => {
            cy.get($elem).parent().parent().then(($element) => {
                for (let i = 0; i < Math.abs(clicksNum); i++) {
                    if (clicksNum > 0) {
                        cy.get($element).contains('+').click()
                    } else {
                        cy.get($element).contains('-').click()
                    }
                }
            })
        })
    }
bagCssChecks(){
    this.getCartWindow().contains('Bag')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'font-weight', '700')
    .should('have.css','font-size', '16.8px')
    .should('have.css', 'vertical-align', 'middle')
    .should('have.css', 'color', 'rgb(236, 236, 236)')
    .should('have.css', 'line-height','25.2px')
}
}