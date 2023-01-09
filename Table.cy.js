describe("Handle Tables",()=>{

    beforeEach("Login",()=>{

        cy.visit("https://demo.opencart.com/admin/");
       
        cy.get("#input-username").type("demo"); // Username

        cy.get("#input-password").type("demo"); // Password
        
        cy.get("button[type='submit']").click(); // Submit button

        cy.get(".btn-close").click();

        // Customers
        cy.get("#menu-customer>a").click(); // Customers Main menu

        cy.get("#menu-customer>ul>li:first-child").click(); // Customers su/child item

    })

    
    it("Number of rows & columns",()=>{

        cy.get("table[class='table table-bordered table-hover']>tbody>tr").should("have.length","10"); // Number of rows

        cy.get("table[class='table table-bordered table-hover']>thead>tr>td").should("have.length","7"); // Number of columns

    })

    it("Check cell data from specific row & column",()=>{

        cy.get("table[class='table table-bordered table-hover']>tbody>tr:nth-child(4)>td:nth-child(3)")
        .contains("gorankrezic90@gmail.com");

    })

    it("Read all the rows & columns data in the first page",()=>{

        cy.get("table[class='table table-bordered table-hover']>tbody>tr")
            .each(  ($row,index,$rows)=>{
                cy.wrap($row).within(   ()=>{

                    cy.get("td").each(($col,index,$cols)=>{
                        cy.log($col.text());
                    })

                })

            })
        
    })


    it.only("Pagination",()=>{

        // Find total number of pages
        let totalPages;
        cy.get(".col-sm-6.text-end").then((e)=>{
            let mytext = e.text();
            totalPages=mytext.substring(mytext.indexOf("(")+1, mytext.indexOf("Pages")-1);
            cy.log("Total number of pages========>"+totalPages);

        })
    
        let total_pages=5;
        for(let p=1;p<=total_pages;p++)
        {
            if(total_pages>1)
            {
                cy.log("Active page is======"+p);

                cy.get("ul[class='pagination']>li:nth-child("+p+")").click();
                cy.wait(3000)

                cy.get("table[class='table table-bordered table-hover']>tbody>tr")
                .each(  ($row,index,$rows)=>{
                    cy.wrap($row).within(()=>{
                        cy.get("td:nth-child(3)").then((e)=>{
                            cy.log(e.text());
                        })
                    })

                })
            }
        }

    
    })


})