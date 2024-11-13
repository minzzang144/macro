const { chromium } = require("playwright");

(async () => {
  const FIRST_PAGE = {
    예약_날짜: {
      행: 4,
      열: 2,
      시간: 2,
    },
  };
  const THIRD_PAGE = {
    이름: "박원재",
    연락처: "010337298499",
    인원: 1,
  };
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://dpsnnn-s.imweb.me/reserve_ss");

  // 첫 번째 페이지

  await page.waitForSelector(
    `table tbody tr:nth-child(${FIRST_PAGE.예약_날짜.행}) td:nth-child(${FIRST_PAGE.예약_날짜.열}) .booking_list:nth-child(${FIRST_PAGE.예약_날짜.시간}) a`
  );
  const 시간 = await page.$(
    `table tbody tr:nth-child(${FIRST_PAGE.예약_날짜.행}) td:nth-child(${FIRST_PAGE.예약_날짜.열}) .booking_list:nth-child(${FIRST_PAGE.예약_날짜.시간}) a`
  );
  await 시간.click();

  await page.waitForTimeout(100);

  // 두 번째 페이지

  await page.waitForSelector(".btn.buy.bg-brand");
  const 예약하기_버튼 = await page.$(".btn.buy.bg-brand");
  await 예약하기_버튼.click();

  await page.waitForSelector(".btn.non_btn._guest_payment");
  const 비회원_예약_버튼 = await page.$(".btn.non_btn._guest_payment");
  await 비회원_예약_버튼.click();

  // 세 번째 페이지
  await page.waitForSelector("input[name='orderer_name']");
  const 이름 = await page.$("input[name='orderer_name']");
  await 이름.type(THIRD_PAGE.이름);

  await page.waitForSelector("input[name='orderer_call']");
  const 연락처 = await page.$("input[name='orderer_call']");
  await 연락처.type(THIRD_PAGE.연락처);

  await page.waitForSelector(".margin-bottom-xxxl");
  const 인원 = await page.$(
    `.margin-bottom-xxxl div:nth-child(${THIRD_PAGE.인원 + 2})`
  );
  await 인원.click();

  await page.waitForSelector(".tip-off .checkbox");
  const 취소동의 = await page.$(".tip-off .checkbox");
  await 취소동의.click();

  await page.waitForSelector(
    ".tip-off._agree_wrap .checkbox-group._checkbox_group .checkbox.checkbox-styled:nth-child(1)"
  );
  const 전체동의 = await page.$(
    ".tip-off._agree_wrap .checkbox-group._checkbox_group .checkbox.checkbox-styled:nth-child(1)"
  );
  await 전체동의.click();

  await page.waitForSelector(".btn_start_payment");
  const 결제하기_버튼 = await page.$(".btn_start_payment");
  await 결제하기_버튼.click();

  // Close the browser
  //   await browser.close();
})();
