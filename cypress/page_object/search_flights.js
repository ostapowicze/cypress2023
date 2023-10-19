
export class SearchFlights{
//Flying from locators
    flyingFromLoc = '[id="select2--container"]'
    flyingFromInputLoc = 'input[role="searchbox"]'
    selectFromCityLoc = '[data-select2-id]'
//Flying to locators
    flyingToLoc = '[id="select2--container"]'
    flyingToInputLoc = 'input[role="searchbox"]'
    selectToCityLoc = '[data-select2-id]'
//Date locators
    dateLocator = '[id="departure"]'
//Search button Locator
    searchButton = '[id="flights-search"]'
//
    flightsList = '[id="flight--list-targets"]'
//
    paginationList = '[class="pagination--listjs"]'
    nextPageButton = 'button[class="pag--nav next--pag waves-effect"]'

getFlightsInterceptor(){
    cy.intercept({
        method: 'GET',
        url: 'https://phptravels.net/api//traffic?country=*'
      }).as('waitForResults') 
    }
 
//Find flying from field, type city name and select
selectStartingCity(cityName, airportShort){
    cy.get(this.flyingFromLoc).eq(0).click({force:true})
    cy.get(this.flyingFromInputLoc).type(cityName)
    cy.get(this.selectFromCityLoc).contains(airportShort).click({force:true})
} 
//Find flying to field, type city name and select
selectDestinationCity(cityName,airportShort){
    cy.get(this.flyingToLoc).eq(1).click({force:true})
    cy.get(this.flyingToInputLoc).type(cityName)
    cy.get(this.selectToCityLoc).contains(airportShort).click({force:true})//these two methods can be combined into one (?)
}
// Find date field, type and select
selectDate(selectedDate){
    cy.get(this.dateLocator).eq(0).click({force:true}).clear().type(selectedDate)
}
clickSearchButton(){
    return cy.get(this.searchButton).eq(1).click({force:true})
}
//Get number of pages from pagination
getNumberOfResultPages(){
    return cy.get(this.paginationList)
    .children()
    .last()
    .children()
    .invoke('attr', 'data-i').then((element) => {
        Cypress.env('lastPageNum', Number(element))
    })
}

verifyFlightTime($el){
    cy.wrap($el)
            .find('h6').then((element)=> {
                let text_value = element.text()
                if((text_value.includes('am') || text_value.includes('pm'))){
                    expect(true).to.be.true
                }
        })
}
verifyFlightTripDuration(){
    cy.contains('Trip Duration').parent().parent().find('p').should('contain', 'Hours')
}

verifyButtons($el){
    cy.wrap($el)
            .find('button').then((element)=> {
            let text_value = element.text()
            expect(text_value).to.contain('More Details')
            expect(text_value).to.contain('Select Flight')
            expect(element).not.to.be.disabled

        })
}
verifyFlightPrice(){
    cy.get('strong').contains('From').parent().should('contain', 'USD')
}
verifyResultPages(){
            cy.get(this.flightsList).children().each(($el) => {
                //this.verifyFlightPrice()
                //this.verifyFlightTripDuration()
            }
    )}
}


