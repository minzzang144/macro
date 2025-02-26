const { chromium } = require("playwright");

(async () => {
  const FIRST_PAGE = {
    지점_번호: 4,
    테마_번호: 3,
  };
  const SECOND_PAGE = {
    예약_날짜: "2025-03-04",
    예약_시간: 2,
  };
  const THIRD_PAGE = {
    인원: 2,
    예약자: "아무개",
    연락처: ["1234", "4321"],
  };

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://web.keyescape.com/reservation.php");

  // 첫 번째 페이지
  await page.selectOption('select[name="zizum"]', {
    index: FIRST_PAGE.지점_번호,
  });
  await page.selectOption('select[name="theme"]', {
    index: FIRST_PAGE.테마_번호,
  });

  // 두 번째 페이지

  const 예약_날짜 = await page.$(`td[data-date="${SECOND_PAGE.예약_날짜}"]`);
  if (!예약_날짜) {
    await page.waitForSelector(".next-month");
    const 다음달_버튼 = await page.$(".next-month");
    await 다음달_버튼.click();
    await page.waitForSelector(`td[data-date="${SECOND_PAGE.예약_날짜}"]`);
    const 예약_날짜 = await page.$(`td[data-date="${SECOND_PAGE.예약_날짜}"]`);
    await 예약_날짜.click();
  } else {
    await 예약_날짜.click();
  }

  await page.waitForSelector("ul.timeList");
  const 예약_시간 = await page.$$("ul.timeList li");
  await 예약_시간[SECOND_PAGE.예약_시간 - 1].click();

  await page.waitForSelector("button.btn_next_step");
  const 다음_버튼 = await page.$("button.btn_next_step");
  await 다음_버튼.click();

  // 세 번째 페이지
  await page.selectOption('select[name="person"]', {
    index: THIRD_PAGE.인원,
  });
  const 예약자 = await page.$('input[name="name"]');
  await 예약자.type(THIRD_PAGE.예약자);

  const 연락처1 = await page.$$('input[name="mobile2"]');
  await 연락처1[0].type(THIRD_PAGE.연락처[0]);

  const 연락처2 = await page.$$('input[name="mobile3"]');
  await 연락처2[0].type(THIRD_PAGE.연락처[1]);

  const 동의1 = await page.$("input[name='agree_1']");
  await 동의1.evaluate((input) => (input.checked = true));

  const 동의2 = await page.$("input[name='agree_2']");
  await 동의2.evaluate((input) => (input.checked = true));

  /**
   * 이전 버전
   */
  //   await page.click('select[name="zizum"]');
  //   const 지점_선택 = await page.$$('select[name="zizum"] option');
  //   await 지점_선택[2].click();
  //   const 테마_선택 = await page.click('select[name="theme"]');

  //   await page.waitForSelector("#zizum_data a");
  //   const 지점_리스트 = await page.$$("#zizum_data a");
  //   const 예약_지점 = 지점_리스트[FIRST_PAGE.지점_번호];
  //   await 예약_지점.click();

  //   await page.waitForTimeout(100);

  //   // 캘린더 다음 달 넘어가기
  //   // await page.waitForSelector(".next");
  //   // const 다음 = await page.$(".next");
  //   // await 다음.click();

  //   await page.waitForSelector(
  //     `#calendar_data table tbody tr:nth-child(${FIRST_PAGE.예약_날짜.행}) td:nth-child(${FIRST_PAGE.예약_날짜.열}) a`
  //   );
  //   const 예약_날짜 = await page.$(
  //     `#calendar_data table tbody tr:nth-child(${FIRST_PAGE.예약_날짜.행}) td:nth-child(${FIRST_PAGE.예약_날짜.열}) a`
  //   );
  //   await 예약_날짜.click();

  //   await page.waitForTimeout(100);

  //   await page.waitForSelector("#theme_data a");
  //   const 테마_리스트 = await page.$$("#theme_data a");
  //   const 예약_테마 = 테마_리스트[FIRST_PAGE.테마_번호];
  //   await 예약_테마.click();

  //   await page.waitForTimeout(100);

  //   await page.waitForSelector("#theme_time_data");
  //   const 시간_리스트 = await page.$$(
  //     "#theme_time_data > li, #theme_time_data > a"
  //   );
  //   const 예약_시간 = 시간_리스트[FIRST_PAGE.시간_번호];
  //   await 예약_시간.click();

  //   await page.waitForTimeout(100);

  //   await page.evaluate(() => {
  //     fun_submit();
  //   });

  //   await page.waitForTimeout(100);

  //   // 두 번째 페이지
  //   await page.waitForSelector(".hybrid_TableWrite");
  //   const 예약자 = await page.$(
  //     ".hybrid_TableWrite tbody tr:nth-child(6) td input"
  //   );
  //   await 예약자.type(SECOND_PAGE.예약자);

  //   await page.waitForTimeout(100);

  //   await page.waitForSelector(".hybrid_TableWrite");
  //   const 연락처 = await page.$$(
  //     ".hybrid_TableWrite tbody tr:nth-child(7) td input"
  //   );
  //   await 연락처[0].type(SECOND_PAGE.연락처[0]);
  //   await 연락처[1].type(SECOND_PAGE.연락처[1]);

  //   await page.waitForTimeout(100);

  //   await page.waitForSelector(".hybrid_TableWrite");
  //   const 인원 = await page.$$(
  //     ".hybrid_TableWrite tbody tr:nth-child(8) td select option"
  //   );
  //   await 인원[SECOND_PAGE.인원].evaluate((option) => (option.selected = true));

  //   await page.waitForTimeout(100);

  //   await page.waitForSelector("#rev_agree");
  //   const 동의 = await page.$$("#rev_agree input");
  //   await 동의[0].evaluate((radio) => (radio.checked = true));

  // Close the browser
  //   await browser.close();
})();
