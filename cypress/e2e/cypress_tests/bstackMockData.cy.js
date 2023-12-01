import {
    BstackDemo
} from "../../page_object/bstackHomepage"
import {
    BstackCart
} from "../../page_object/bstacBag"

let bstacDemo = new BstackDemo()
let bstacCart = new BstackCart()

describe('Add To Cart', {
    testIsolation: true
}, () => {
    beforeEach(() => {
        cy.on('uncaught:exception', err => {
            return false;
        });
        bstacDemo.mockProducts()
        bstacDemo.visitPhonesPage()
        bstacDemo.visit()
        bstacDemo.loadPhonesJson()
    })

    it('Verify items with given name displays', () => {
        cy.get('@myPhones').then((myPhones) => {
            for (var i = 0; i < myPhones.products.length; i++) {
                cy.get(bstacCart.prodItem).should('contain', myPhones.products[i].title)
            }
        })
    })

    it('Verify images display', () => {
        bstacDemo.verifyImageForProdItem()
    })

    it('Verify subtotal displays proper total price', () => {
        cy.get('@myPhones').then((myPhones) => {
            for (var i = 0; i < myPhones.products.length; i++) {
                bstacCart.addProdToCart(myPhones.products[i].title)
            }
        })
    })
})