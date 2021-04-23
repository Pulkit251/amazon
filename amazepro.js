const pup = require('puppeteer');
let id = "il55si1ywj@greencafe24.com";
let pass = "amazon@com";
let tab;
let search = ["apple airpods","apple watch","apple ipad"];
let urls = ["/Apple-AirPods-Wireless-Charging-Latest/dp/B07PYLT6DN/ref=sr_1_1_sspa?dchild=1&keywords=apple+airpods&qid=1618762447&refresh=1&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzRDFaUVFNSlFKN0pEJmVuY3J5cHRlZElkPUEwNjE4NzMwMlE0WDlPRFlUVFVGRyZlbmNyeXB0ZWRBZElkPUEwMzA4NjE3SjlWQlNVRzBFMjE2JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==","/Apple-Watch-GPS-42mm-Silver-Aluminium/dp/B07K3HG6T9/ref=sr_1_1_sspa?dchild=1&keywords=apple+watch&qid=1618763999&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExMko5MEVGNjJUOTMwJmVuY3J5cHRlZElkPUEwOTAzMjIwMkVRNEFXSjlFWlFSUiZlbmNyeXB0ZWRBZElkPUEwMTI3NzUyMjRNQU9FMlNKMDY4TiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=","/Apple-iPad-10-2-inch-Wi-Fi-128GB/dp/B08J61NFNR/ref=sr_1_1_sspa?dchild=1&keywords=apple+ipad&qid=1618764975&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFXUURBVUxIN1g1WlUmZW5jcnlwdGVkSWQ9QTAxNjY2MzUxOTRXTDJKNzJCUTFKJmVuY3J5cHRlZEFkSWQ9QTA0MTU1MjczUTJXTDNTTDVHWFhYJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ=="];
async function main(){
    let browser = await pup.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    })

    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://www.amazon.com/");
    await tab.waitForSelector("#nav-link-accountList-nav-line-1",{visible: true});
    await tab.click(".nav-line-2.nav-long-width");
    await tab.waitForSelector("#ap_email", {visible: true});
    await tab.type("#ap_email",id);
    await tab.click(".a-button-input");
    await tab.waitForSelector("#ap_password",{visible: true});
    await tab.type("#ap_password",pass);
    await tab.click("#signInSubmit");
    await tab.waitForSelector("#twotabsearchtextbox",{visible: true});
    await tab.click("#twotabsearchtextbox");
    for(let i = 0;i < search.length;i++){        
        await tab.type("#twotabsearchtextbox",search[i]);
        await tab.click("#nav-search-submit-button",{delay: 200});
        await item("https://www.amazon.com/" + urls[i],i);
    }
    await tab.waitForSelector(".nav-cart-icon.nav-sprite",{visible: true});
    await tab.click(".nav-cart-icon.nav-sprite");
    await tab.waitForSelector("input[name='proceedToRetailCheckout']",{visible: true});
    await tab.click("input[name='proceedToRetailCheckout']",{delay: 1000});
}

async function item(url,j){
    await tab.goto(url);
    await tab.waitForSelector("#imgTagWrapperId",{visible: true});
    await tab.click("#imgTagWrapperId");
    await tab.waitForSelector("#ivStage",{visible: true});
    await tab.screenshot({
        path: `./screenshot/apple_${j}.png`
      }),{delay:500};  
    await tab.click(".a-button-close.a-declarative.a-button-top-right");    
    await tab.waitForSelector(".a-button-input.attach-dss-atc",{visible: true});
    await tab.click(".a-button-input.attach-dss-atc");
    await tab.waitForSelector("#add-to-cart-button",{visible: true});
    await tab.click("#add-to-cart-button");
    await tab.waitForSelector("#attachWarrantyButtonBox",{visible: true});
    await tab.keyboard.press("Escape");
    await tab.waitForSelector("#attach-sidesheet-view-cart-button-announce",{visible: true});
    await tab.click("#attach-close_sideSheet-link");
    await tab.click("#twotabsearchtextbox");
    await tab.keyboard.down("Control");
    await tab.keyboard.press("A");
    await tab.keyboard.up("Control");
    await tab.keyboard.press("Backspace");
}

main();