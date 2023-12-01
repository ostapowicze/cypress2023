import {
    BstackDemo
} from "../../page_object/bstackHomepage"
import {
    BstackCart
} from "../../page_object/bstacBag"

let bstacDemo = new BstackDemo()
let bstacCart = new BstackCart()

describe('Add To Cart', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', err => {
            return false;
        });
        bstacDemo.visitPhonesPage()
        bstacDemo.visit()
    })

    it('bag should have proper css atribiutes', () => {
        bstacCart.addProdToCart('iPhone 12')
        bstacCart.bagCssChecks()
    })

    it('cart should  be empty before any use', () => {
        bstacCart.getBagOpenLocator().click()
        bstacCart.getOpenCart()
            .should('not.have.class', bstacCart.prodItem)
            .find('p').should('contain', bstacCart.emptyCartMessage)
    })

    it('quanttity value should be 0 before any use', () => {
        bstacCart.getCartQuantityValue().should('have.text', '0')
    })


    it('names between homepage and cart should be equal', () => {
        for (let i = 0; i < 5; i++) {
            bstacCart.getItemName().eq(i).then(($elem) => {
                bstacCart.addProdToCart($elem.text())
                bstacCart.getOpenCart().children().find('.title').should('contain', $elem.text())
                bstacCart.getcartDeleteButton().click()
            })
        }
    })

    it('cart content should  be present after page refreshing', () => {
        let prod = 'iPhone 12'
        bstacCart.addProdToCart(prod)
        cy.reload()
        bstacCart.getBagOpenLocator().click()
        bstacCart.getItemInCart(prod)
    })

    it('- button should be disabled when quantity = 1', () => {
        let prod = 'iPhone 12'
        bstacCart.addProdToCart(prod)
        bstacCart.getMunusQuantityButton().should('be.disabled')

    })

    it('+ button should be enabled', () => {
        let prod = 'iPhone 12'
        bstacCart.addProdToCart(prod)
        bstacCart.getPlusQuantityButton().should('be.enabled')

    })

    it('x should close the cart', () => {
        bstacCart.getBagOpenLocator().click().then(() => {
            bstacCart.closeBagWindow()
        })
        bstacCart.getCartWindow().should('not.exist')
    })

    it('continue shopping should close the cart', () => {
        bstacCart.getBagOpenLocator().click()
        bstacCart.getCartFooter().contains('Continue Shopping').click()
        bstacCart.getCartWindow().should('not.exist')
    })

    it('product should be removed from the cart', () => {
        bstacCart.addProdToCart('iPhone 12')
        bstacCart.getcartDeleteButton().click()
        bstacCart.getOpenCart().should('not.have.class', 'shelf-item')

    })

    it('cont shopping displays for empty and checkout for not empty cart ', () => {
        bstacCart.getBagOpenLocator().click()
        bstacCart.getCartFooter().should('contain', 'Continue Shopping')
        bstacCart.addProdToCart('iPhone 12')
        bstacCart.getCartFooter().should('contain', 'Checkout')
    })


    it('quantity bag value should be 1 after product added', () => {
        bstacCart.addProdToCart('iPhone 12')
        bstacCart.getCartQuantityValue().should('have.text', '1')
    })

    it('quantity bag value should change after quantity changed', () => {
        bstacCart.addProdToCart('iPhone 12')
        bstacCart.changeQuantityOfProducts('iPhone 12', 1)
        bstacCart.getCartQuantityValue().should('have.text', '2')
    })

    it('subtotal should icrease/decrease when quantity changed', () => {
        let old_subtotal;
        let price;
        let quant = 1; //
        bstacCart.addProdToCart('iPhone 12')
        bstacCart.getCartSubTotal().then(($elem) => {
            old_subtotal = Number($elem.text().match(bstacCart.regexForPrice))
        }).then(() => {
            bstacCart.getProdPriceFromCart('iPhone 12').then(($item) => {
                    price = Number($item.text().match(bstacCart.regexForPrice))
                })
                .then(() => {
                    
                    bstacCart.changeQuantityOfProducts('iPhone 12', quant)
                    bstacCart.getCartSubTotal().should('contain', old_subtotal + (quant * price))
                })

        })

    })

})

















//test czy jesy jest jeden jako quanitity to -  jest disabled
//jak wywali na force true to pobrac celego htmla i usunac element ktory przykrywa, get body i remove po lokatorze co chce usuna / czeka az element bedzie klikalny i dopiero klika
//cypress cloud co to zapoznac się
//print screeny pobawic sie 
//porownywanie obrazow, wtyczka cypresss pozwala robic printscreeny,  


//github git



//jak wejsc 2 poziomy wyzej nie uzywajac dwa razy parent()