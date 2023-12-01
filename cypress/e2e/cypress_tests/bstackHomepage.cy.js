/// <reference types="cypress" />

import {
    BstackDemo
} from "../../page_object/bstackHomepage"

let bstacDemo = new BstackDemo()


describe('basic page test ', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', err => {
            return false;
        });
        bstacDemo.visit()
    })

    it('Vendor tabs have href attribute ', () => {
        bstacDemo.getFavouriteTab().should('have.attr', 'href')
        bstacDemo.getOrdersTab().should('have.attr', 'href')
        bstacDemo.getOffersTab().should('have.attr', 'href')
    })

    it('Vendor tabs have proper titles ', () => {
        bstacDemo.getFavouriteTab().should('have.text', 'Favourites')
        bstacDemo.getOrdersTab().should('have.text', 'Orders')
        bstacDemo.getOffersTab().should('have.text', 'Offers')
    })

    it('Products found field should be equal real products number on the page ', () => {
        let item_length;
        bstacDemo.getAllItems().then(($value) => {
            item_length = $value.length
            bstacDemo.getProdFoundNum().then(($elem) => {
                expect($elem.text()).includes(item_length)
            })
        })
    })

    it('All products contain proper classes', () => {
        bstacDemo.getAllItems().each(($elem) => {
            cy.get($elem).children()
                .should("have.class", "shelf-item__title")
                .should("have.class", "shelf-stopper")
                .should("have.class", "shelf-item__thumb")
                .should("have.class", "shelf-item__price")
                .should("have.class", "shelf-item__buy-btn")
        })
    })

    it('All products should have image displayed', () => {
        bstacDemo.verifyImageForProdItem()
    })

    it('prices should be sorted from low to high', () => {
        let array;
        bstacDemo.getSortSelect().select('lowestprice').then(() => {
            cy.wait(2000)
            array = bstacDemo.addPricesToArray()
            cy.then(() => {
                bstacDemo.checkIfSorted(array)
            })
        })
    })


})