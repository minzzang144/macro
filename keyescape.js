const { chromium } = require("playwright");
// const { execSync } = require("child_process");

(async () => {
    // const FIRST_PAGE = {
    //     지점_번호: 5,
    //     예약_날짜: {
    //         행: 6,
    //         열: 6,
    //     },
    //     테마_번호: 0,
    //     시간_번호: 0,
    // };
    // const SECOND_PAGE = {
    //     예약자: "이민찬",
    //     연락처: ["4499", "5173"],
    //     인원: 3,
    // };
    const FIRST_PAGE = {
        지점_번호: 3,
        예약_날짜: {
            행: 4,
            열: 3,
        },
        테마_번호: 2,
        시간_번호: 7,
    };
    const SECOND_PAGE = {
        예약자: "오세준",
        연락처: ["5019", "2513"],
        인원: 1,
    };
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.keyescape.co.kr/web/home.php?go=rev.make");

    // 첫 번째 페이지

    await page.waitForSelector("#zizum_data a");
    const 지점_리스트 = await page.$$("#zizum_data a");
    const 예약_지점 = 지점_리스트[FIRST_PAGE.지점_번호];
    await 예약_지점.click();

    await page.waitForTimeout(100);

    // 캘린더 다음 달 넘어가기
    // await page.waitForSelector(".next");
    // const 다음 = await page.$(".next");
    // await 다음.click();

    await page.waitForSelector(
        `#calendar_data table tbody tr:nth-child(${FIRST_PAGE.예약_날짜.행}) td:nth-child(${FIRST_PAGE.예약_날짜.열}) a`
    );
    const 예약_날짜 = await page.$(
        `#calendar_data table tbody tr:nth-child(${FIRST_PAGE.예약_날짜.행}) td:nth-child(${FIRST_PAGE.예약_날짜.열}) a`
    );
    await 예약_날짜.click();

    await page.waitForTimeout(100);

    await page.waitForSelector("#theme_data a");
    const 테마_리스트 = await page.$$("#theme_data a");
    const 예약_테마 = 테마_리스트[FIRST_PAGE.테마_번호];
    await 예약_테마.click();

    await page.waitForTimeout(100);

    await page.waitForSelector("#theme_time_data");
    const 시간_리스트 = await page.$$(
        "#theme_time_data > li, #theme_time_data > a"
    );
    const 예약_시간 = 시간_리스트[FIRST_PAGE.시간_번호];
    await 예약_시간.click();

    await page.waitForTimeout(100);

    await page.evaluate(() => {
        fun_submit();
    });

    await page.waitForTimeout(100);

    // 두 번째 페이지
    await page.waitForSelector(".hybrid_TableWrite");
    const 예약자 = await page.$(
        ".hybrid_TableWrite tbody tr:nth-child(6) td input"
    );
    await 예약자.type(SECOND_PAGE.예약자);

    await page.waitForTimeout(100);

    await page.waitForSelector(".hybrid_TableWrite");
    const 연락처 = await page.$$(
        ".hybrid_TableWrite tbody tr:nth-child(7) td input"
    );
    await 연락처[0].type(SECOND_PAGE.연락처[0]);
    await 연락처[1].type(SECOND_PAGE.연락처[1]);

    await page.waitForTimeout(100);

    await page.waitForSelector(".hybrid_TableWrite");
    const 인원 = await page.$$(
        ".hybrid_TableWrite tbody tr:nth-child(8) td select option"
    );
    await 인원[SECOND_PAGE.인원].evaluate((option) => (option.selected = true));

    await page.waitForTimeout(100);

    //     await page.waitForSelector("#captcha_img");
    //     const 자동등록방지 = await page.$("#captcha_img");
    //     const 자동등록방지_BASE64 = (await 자동등록방지.screenshot()).toString(
    //         "base64"
    //     );

    //     const pythonScript = `
    // import pytesseract
    // import base64

    // image_base64 = '${자동등록방지_BASE64}'
    // image_data = base64.b64decode(image_base64)

    // # 이미지를 임시 파일로 저장
    // with open('temp.png', 'wb') as f:
    //     f.write(image_data)

    // # pytesseract로 이미지에서 숫자 추출
    // result = pytesseract.image_to_string('temp.png', lang='eng+osd')

    // # 추출된 숫자 출력
    // print(result)
    //   `;

    //     execSync('python -c "' + pythonScript + '"', { stdio: "inherit" });

    //     await page.waitForTimeout(100);

    await page.waitForSelector("#rev_agree");
    const 동의 = await page.$$("#rev_agree input");
    await 동의[0].evaluate((radio) => (radio.checked = true));

    // Close the browser
    //   await browser.close();
})();
