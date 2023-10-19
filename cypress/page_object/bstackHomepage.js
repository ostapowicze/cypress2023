export class BstackDemo{
    
    visitPageUrl = Cypress.config("baseUrlPhones")
    favouritesLoc = '[id = "favourites"]'
    ordersLoc = '[id = "orders"]'
    offersLoc = '[id = "offers"]'
    signinLoc = '[#signin]'
    prodFoundLoc = '.products-found span'
    prodItems = '.shelf-item'
    vendors = 'h4'
    addToCartButton = ".shelf-item__buy-btn"
    cartContainer = '[class*="content"] > [class*="container"]'
    sortSelect = 'select'
   
visit(){
    this.visitPhonesPage()
    cy.visit(this.visitPageUrl)
    return this
}

getVendorsTab(){
    return cy.get(this.vendors)
}

getFavouriteTab(){
    return cy.get(this.favouritesLoc)
}

getOrdersTab(){
    return cy.get(this.ordersLoc)
}

getOffersTab(){
    return cy.get(this.offersLoc)
}

getAllItems(){
   return cy.get(this.prodItems)
}

getProdFoundNum(){
    return cy.get(this.prodFoundLoc)
}
getSortSelect(){
    return cy.get(this.sortSelect)
}


verifyImageForProdItem(){
    this.getAllItems().each(($elem) => {
        cy.get($elem).find('img')
        .should("have.prop", "naturalWidth")
        .then(prop => {
            expect(prop).be.greaterThan(0)
        })
    })
}

addPricesToArray(){
    let pricesArray = [];
    this.getAllItems().each(($elem) => {
        cy.get($elem).find('b').eq(0).then((element) => {
            pricesArray.push(element.text())
        })
    })
    cy.log(pricesArray)
    //return pricesArray
}
//[800, 700, 600] 700 - 800 = -100
checkIfSorted(pricesArray){
            let second_index;
            for(let first_index = 0; first_index < pricesArray.length; first_index++){
                second_index = first_index + 1;
            if(pricesArray[second_index] < pricesArray[first_index]){}
}
}
checksIfProdDetailsCrossedOut(){
    cy.get('.shelf-item__del').trigger('mouseover')
    cy.get('.shelf-item__details').find('p').then((elem) => {
        expect(elem).to.have.css('text-decoration-line', 'line-through')
    })
    cy.get(this.cartContainer).children().contains('$').parent().should('have.css', 'text-decoration-line','line-through')
}

getPriceOfProd(itemId){
return cy.get(this.prodItems).eq(itemId).find('small').next()
// .then(($elem) => {
//     let prodPrice = $elem.text()
// })
}

totalPriceCheck(){
let prodPrice0;
let prodPrice1;
cy.get(this.prodItems).eq('4').find('small').next().then(($elem) => {
        prodPrice0 = $elem.text()
        })
cy.get(this.prodItems).eq('5').find('small').next().then(($elem) => {
            prodPrice1 = $elem.text()
            })
this.addingProdToBag('4')
this.addingProdToBag('5')
cy.contains('SUBTOTAL').next().find('p').should('contain', toString(Number(prodPrice0) + Number(prodPrice1)))
}

totalPriceUpdateRemoveCheck(){
let priceToRemove;
let totalOld;
this.addingProdToBag('4')
this.addingProdToBag('5')
cy.get(this.cartContainer).children().eq('0').contains('$').then(($elem) => {
    priceToRemove = parseFloat(($elem.text()).match(/[\d\.]+/))
})
cy.contains('SUBTOTAL').next().find('p').then(($elem) => {
    totalOld = parseFloat(($elem.text()).match(/[\d\.]+/))
})
cy.get(this.cartContainer).children().eq('0').children().eq('0').click()
cy.contains('SUBTOTAL').next().find('p').then(($elem) => {
    expect(parseFloat(($elem.text()).match(/[\d\.]+/))).to.be.eq(Number(totalOld) - Number(priceToRemove))
})
}

addToCartButtonColorsCheck(){
cy.get(this.prodItems).eq('24').then(($brick) => {
    let el = $brick.find(this.addToCartButton)
    expect(el).to.have.css('background-color', 'rgb(27, 26, 32)')
    }) 
    cy.get(this.prodItems).eq('24').realHover()
        .wait(1000) 
        .then(($brick) => {
        let el = $brick.find(this.addToCartButton)
        expect(el).to.have.css('background-color', 'rgb(234, 191, 0)')
        }) 
}
mockProducts(){
    return cy.intercept('GET', '/api/products', {fixture: 'phones.json'})
  }
loadPhonesJson(){
  return cy.fixture('phones.json').as('myPhones')
}

visitPhonesPage(){
    cy.intercept({
        method: 'GET',
        url: this.visitPageUrl
    }).as('waitForPhonesPage') 
}
}