import { chromium } from "playwright";
import nodeFetch from "node-fetch";
import WebVTT from "webvtt-parser";
import xlsx from "xlsx";

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 로그인 페이지로 이동
    await page.goto("https://threejs-journey.com/");

    // 로그인 버튼 클릭
    await page.click(".is-desktop .login-button");

    // 로그인 정보 입력
    await page.fill("#form_email", "minzzang144@gmail.com");
    await page.fill("#form_password", "Shigatsu414!");

    await page.waitForTimeout(100);

    // 로그인
    await page.click(".submit");

    await page.waitForTimeout(1000);

    const trackElement = await page.$$("track");
    const vttUrl = await trackElement[0].getProperty("src");

    const response = await nodeFetch(vttUrl);
    const vttContent = await response.text();

    const parser = new WebVTT.WebVTTParser();
    const tree = parser.parse(vttContent, "metadata");

    const ogTitleContent = await page.$eval(
        'meta[property="og:title"]',
        (element) => element.content
    );

    // XLSX 파일 생성
    const data = []; // Initialize an empty array to hold our data
    for (let cue of tree.cues) {
        const row = [`${cue.startTime} --> ${cue.endTime}`, cue.text];
        data.push(row);
    }

    let worksheet = xlsx.utils.aoa_to_sheet(data);
    let workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Subtitles");

    xlsx.writeFile(workbook, `${ogTitleContent}.xlsx`);
})();

// NOTE: 파파고 API를 사용하려 했으나 무료로 사용할 수 있는 API가 없어서 사용하지 않음
// async function translate(text) {
//     const response = await fetch("https://openapi.naver.com/v1/papago/n2mt", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
//             "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
//         },
//         body: JSON.stringify({
//             source: "en",
//             target: "ko",
//             text: text,
//         }),
//     });

//     const data = await response.json();
//     return data.message?.result?.translatedText ?? text;
// }
