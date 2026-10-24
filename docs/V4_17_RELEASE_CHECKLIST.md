# V4.17 驗收清單

- [ ] `npm.cmd test` 原有測試 + 新增教練目錄測試全部通過。
- [ ] `SITE_URL=https://picklestart.tw` 建置成功；尚無教練時預計 25 個靜態頁：原 24 頁 + `/coaches/`。
- [ ] 在桌面及手機打開 `/coaches/`；選單「找教練」正確，表單未設定時不顯示失效按鈕。
- [ ] 教練尚未上架時，頁面不出現假教練、虛構價格；`<meta name="robots" content="noindex,follow">`。
- [ ] 官方 Tally 表單已建立、公開、測試可送出並將資料寫進私人 Google Sheets；管理用 Email 未公開。
- [ ] 表單有 IG、FB、**LINE** 欄位，刊登授權與第三方平台個資告知；設定 `set_coach_form.py` 後 CTA 開啟正確表單。
- [ ] 有核准教練才新增公開資料與個人頁，且不包含私人 Email、電話及同意表單紀錄。
- [ ] 社群連結打開對應教練，不經過 PickleStart 的聊天或預約服務。
- [ ] Git diff 確認沒有改動商品、配裝演算法、場地資料和 301 轉址。
- [ ] Cloudflare 正式站部署後再查 Sitemap / GSC 和 GoatCounter；未收到真實教練前不要宣稱收錄數量。
