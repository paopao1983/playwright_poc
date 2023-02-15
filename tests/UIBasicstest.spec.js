// @ts-check 
const { test, expect } = require('@playwright/test');

test('Browser Context Playwrite Test', async ({browser})=>{
    //log all the chrome - plugins / cookies, automatically
    //open a new browser instance
    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameLocator = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles =  page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    //CSS/SPATH 
  
    await usernameLocator.type("rahulshetty");
    await page.locator("[type='password']").type("learning");
    await signInBtn.click();
    //wait until this locator shown up page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //type - fill
    await usernameLocator.fill(""); //clear a field
    await usernameLocator.fill("rahulshettyacademy"); 
    await signInBtn.click();

    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());

    /*await Promise.all(
        [
            page.waitForNavigation(),
            signInBtn.click(),
        ]
    );*/

    await page.waitForNavigation();
    const allTitles = await cardTitles.allTextContents(); 
    console.log(allTitles);


    
});

test("Register to Pratice Website", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const selectOccupation = page.locator("select.custom-select");
    const checkGender = page.locator("input[value='Female']");
    const checkboxAge = page.locator("[type='checkbox']");
    const emailData = "paopao19832@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("a.text-reset").click();
    await page.locator("#firstName").fill("Sandra");
    await page.locator("#lastName").fill("Castro");
    await page.locator("#userEmail").fill(emailData);
    await page.locator("#userMobile").fill("1234567890");
    await selectOccupation.selectOption('2: Student');
    await checkGender.check();
    await page.locator("#userPassword").fill("Ab$12345678");
    await page.locator("#confirmPassword").fill("Ab$12345678");
    await checkboxAge.check();
    await page.locator("#login").click(); 
});

test('Page Playwrite Test', async ({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await dropdown.selectOption("consult");
    const locatorRadioBtn = page.locator(".radiotextsty");
    await locatorRadioBtn.last().click(); 
    await page.locator("#okayBtn").click();
    await expect(locatorRadioBtn.last()).toBeChecked();
    console.log(" Chercked? " + await locatorRadioBtn.last().isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //page.locator("#terms")
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test('Child window handl', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const documentLink = page.locator("[href*='documents-request']");

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]); 
        
    const text = await newPage.locator(".red").textContent();
    console.log("TEXT: "+text);
});

test.skip('Auto Record', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
 
    await page.goto('https://sny.tv/');
    await page.getByRole('button', { name: 'Log in' }).click();
   
    //This doesn't work for Safari
    await page.getByPlaceholder('Enter your email address').click(); 
    await page.getByPlaceholder('Enter your email address').fill('sandra.castro@zemoga.com');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('Zemoga$1');
    await page.locator('amplify-form-section').getByRole('button', { name: 'Sign In' }).click();
}); 