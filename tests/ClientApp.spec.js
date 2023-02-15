const { test, expect } = require('@playwright/test');

test("Login to Pratice Website", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const emailData = "paopao19832@gmail.com";
    const products = page.locator(".card-body");
    const productsName = "adidas original";

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(emailData);
    await page.locator("#userPassword").fill("Ab$12345678");
    await page.locator("#login").click(); 

    //get the product's titles
    await page.waitForLoadState('networkidle');
    const productText = await products.allTextContents(); 
    console.log(productText);  

    const countP = await products.count(); 

    for(let i=0; i<countP; i++){
       if(await products.nth(i).locator("b").textContent()===productsName){
            //add to cart
            //await products.nth(i).locator(".w-10").click();
            await products.nth(i).locator("text= Add To Cart").click();
            break;
            
       }

    }
   // await page.pause();
   await page.locator("[routerlink*='cart']").click();
   //await page.waitForSelector('.cart li');
   await page.locator('div li').first().waitFor();
   const bool = await page.locator(`h3:has-text('${productsName}')`).isVisible();
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();

   await page.getByPlaceholder('Select Country').type('Col', {delay:100});
   const countriesDD = page.locator(".ta-results");
   await countriesDD.waitFor();
   const countriesResults = await countriesDD.locator('button').count();
   let text='';

   for(let i = 0; i<countriesResults; i++){
        text = await countriesDD.locator("button").nth(i).textContent();
        if(text.includes('Col')){
            await countriesDD.locator('button').nth(i).click();
            break;
        }
   }

   await expect(page.locator(".user__name>>label")).toHaveText(emailData); 
   //await page.pause();
   await page.locator(".user__name>>label").click();
   await page.locator(".actions a").click();
   //await page.getByText(/Place Order/).blur(); 
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

 //  await page.getByRole('button', {name: 'ORDERS'}).click(); //click on Orders button
   await page.locator("button[routerLink*='myorders']").click(); //click on Orders button
   //in this part the Orders list takes some seconds to be loaded.  
   await page.locator("tbody").waitFor();
   const orders = page.locator("tbody tr");

   for(let i=0; i<await orders.count(); i++){
    let OrderFilter = await orders.nth(i).locator("th").textContent();
    if(orderId.includes(OrderFilter)){
        console.log("OrderFilter "+ OrderFilter);
        //await orders.nth(i).locator(".btn-primary").click();//click on View
        await orders.nth(i).locator("button").first().click(); //click on View
        
        break;
    }
    const finalOrderId = await page.locator("div.col-text").textContent();
    expect(orderId.includes(finalOrderId)).toBeTruthy();
    //expect(await page.locator("div.col-text").textContent()).includes(orderId);

   };

});