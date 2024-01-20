const { chromium } = require("playwright");

(async () => {
    const FIRST_PAGE = {
        지점_번호: 0,
        예약_날짜: {
            행: 3,
            열: 1,
        },
        테마_번호: 1,
        시간_번호: 3,
    };
    const SECOND_PAGE = {
        예약자: "이민찬",
        연락처: ["010", "4499", "5173"],
        인원: 4,
    };
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://www.signescape.com/sub/sub03_1.html");

    // 첫 번째 페이지

    await page.waitForSelector(".sub_4_tab");
    const 지점_리스트 = await page.$$(".sub_4_tab .taboff");
    const 예약_지점 = 지점_리스트[FIRST_PAGE.지점_번호];
    await 예약_지점.click();

    // await page.waitForTimeout(100);

    // // 캘린더 다음 달 넘어가기
    // await page.waitForSelector(".next");
    // const 다음 = await page.$(".next");
    // await 다음.click();

    await page.waitForSelector(
        `.cat_list tbody tr:nth-child(${
            FIRST_PAGE.예약_날짜.행 + 2
        }) td:nth-child(${FIRST_PAGE.예약_날짜.열}) a`
    );
    const 예약_날짜 = await page.$(
        `.cat_list tbody tr:nth-child(${
            FIRST_PAGE.예약_날짜.행 + 2
        }) td:nth-child(${FIRST_PAGE.예약_날짜.열}) a`
    );
    await 예약_날짜.click();

    await page.waitForSelector("#reser2 ul a");
    const 테마_리스트 = await page.$$("#reser2 ul a");
    const 예약_테마 = 테마_리스트[FIRST_PAGE.테마_번호 - 1];
    await 예약_테마.click();

    await page.waitForSelector("#reser4 .list li");
    const 시간_리스트 = await page.$$("#reser4 .list li");
    const 예약_시간 = 시간_리스트[FIRST_PAGE.시간_번호 - 1];
    await 예약_시간.click();

    await page.waitForTimeout(100);

    // // 두 번째 페이지
    await page.waitForSelector(".input_list [name='INWON']");
    const 인원 = await page.$$(".input_list [name='INWON'] option");
    await 인원[SECOND_PAGE.인원 - 2].evaluate(
        (option) => (option.selected = true)
    );

    await page.waitForSelector(".input_list [name='name']");
    const 예약자 = await page.$(".input_list [name='name']");
    await 예약자.type(SECOND_PAGE.예약자);

    const 연락처1 = await page.$(".input_list [name='HP1']");
    const 연락처2 = await page.$(".input_list [name='HP2']");
    const 연락처3 = await page.$(".input_list [name='HP3']");
    await 연락처1.type(SECOND_PAGE.연락처[0]);
    await 연락처2.type(SECOND_PAGE.연락처[1]);
    await 연락처3.type(SECOND_PAGE.연락처[1]);

    await page.waitForSelector("#id_chkAgree1");
    const 동의 = await page.$("#id_chkAgree1");
    await 동의.evaluate((radio) => (radio.checked = true));

    // Close the browser
    //   await browser.close();
})();
