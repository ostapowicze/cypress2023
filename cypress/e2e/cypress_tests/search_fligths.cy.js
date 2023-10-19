/// <reference types="cypress" />

import { SearchFlights } from '../../page_object/search_flights';
import { VisitPage } from '../../page_object/visit_page';

let visitPage = new VisitPage()
let searchFlights = new SearchFlights()

describe('Search Flights Elements', () => { 
    
    before(() => {
        cy.on('uncaught:exception', err => {
            return false;
          });
        visitPage.visitInterceptor()
        searchFlights.getFlightsInterceptor()
        visitPage.visit()
    }) 

    it('Get Flights From List', () => {
        searchFlights.selectStartingCity('Ber','BER')
        searchFlights.selectDestinationCity('New York',"NYC")
        searchFlights.selectDate('05-10-2023')
        searchFlights.clickSearchButton()
        cy.wait(['@waitForResults']).its('response.statusCode').should('eq', 200) //troche mi sie to tutaj nie podoba, troche tak z dupy w tym mijescu 
        //searchFlights.getNumberOfResultPages()
        // searchFlights.getNumberOfResultPages().then((element) => {
        //     lastPageNum = Number(element)
        // })
    }) 

for(let i = 1; i <= 8; i++){
    it('Verifing results on page:' + " " + i, () => {
        searchFlights.verifyResultPages()
        cy.log(Cypress.env('lastPageNum'))
        cy.get(searchFlights.nextPageButton).click({force:true})
    })
}
})