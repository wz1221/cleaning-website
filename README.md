# 〇〇專業清潔 官方形象網站

〇〇專業清潔的官方形象網站（單頁式首頁＋ 7 篇服務文章），介紹七項清潔服務、品牌理念與服務地區（台南、高雄、屏東），並引導訪客透過官方 LINE（@803szfqa）諮詢報價。

- 品牌形象：專業、透明、值得信賴
- 配色：品牌綠 `#23865B`、淺綠 `#EAF5EE`、純白 `#FFFFFF`、淺灰 `#F4F6F5`、深灰綠 `#26352D`

> 公司資訊的唯一來源是 [`SPEC.md`](SPEC.md)；AI 開發規範請見 [`AGENTS.md`](AGENTS.md)（`CLAUDE.md` 指向同一份規範）。修改網站前請先閱讀這兩份文件。

**這個專案的重點不只是做出網站，而是建立一套「資料來源 + 範本 + 規則 + 作業流程」，讓 AI 之後能依同一套方式持續新增頁面與內容。**

## 使用技術

| 類別 | 技術 |
|---|---|
| 結構 | HTML5（語意化標籤） |
| 樣式 | CSS3（CSS 變數、Grid、Flexbox、Mobile-first RWD） |
| 互動 | 原生 JavaScript（ES6，無框架、無外部套件） |
| 字體 | Google Fonts — Noto Sans TC |
| 圖示 / 插圖 | 自製 SVG |
| 部署 | GitHub Pages |

## 專案目錄結構

```
/
├── index.html                     # 首頁（單頁式）
├── templates/
│   └── service-article.html       # 服務文章範本（{{ }} 佔位，新增文章時複製）
├── services/                      # 服務文章頁（7 篇，版型一致）
│   ├── home-cleaning.html         # 01 居家清潔（網頁簡報）
│   ├── commercial-cleaning.html   # 02 商業清潔
│   ├── renovation-cleaning.html   # 03 裝潢細清
│   ├── floor-waxing.html          # 04 洗地打蠟
│   ├── stone-crystallization.html # 05 石材晶化
│   ├── nano-coating.html          # 06 奈米鍍膜
│   └── high-pressure-washing.html # 07 高壓水刀
├── css/
│   └── style.css                  # 全站樣式（顏色變數定義於 :root）
├── js/
│   └── main.js                    # 選單、導覽高亮、回到頂部、複製 LINE ID、簡報翻頁等互動
├── images/
│   ├── logo-mark.svg              # 臨時標誌（待正式 Logo 替換）
│   ├── favicon.svg                # 網站分頁圖示
│   ├── hero-illustration.svg      # 首頁主視覺插圖
│   └── og-image.png               # 社群分享縮圖（1200×630）
├── .nojekyll                      # 讓 GitHub Pages 直接提供靜態檔案
├── SPEC.md                        # 專案規格書（公司資訊唯一來源）
├── AGENTS.md                      # AI Agent / 開發者規範（含文章頁模板與 SOP）
├── CLAUDE.md                      # 指向 AGENTS.md，供 Claude 類工具自動讀取
└── README.md                      # 本文件
```

## 網站功能

**頁面區塊**

1. **首頁主視覺**：品牌標語、LINE 諮詢報價按鈕、查看服務按鈕、三項品牌重點
2. **七項服務**：居家清潔、商業清潔、裝潢細清、洗地打蠟、石材晶化、奈米鍍膜、高壓水刀，以及一張「Coming Soon」新服務佔位卡片
3. **關於我們**：品牌形象、品牌特色、產品理念、報價方式
4. **服務地區**：台南、高雄、屏東
5. **聯絡資訊**：官方 LINE 卡片、諮詢流程、其他聯絡方式

**服務文章頁**（`services/`，點選首頁服務卡片進入）

每篇文章的主體是一份**網頁簡報**，像 PPT 一樣逐張翻頁，七篇版型一致，共 8 張投影片：

1. 封面
2. 服務說明
3. 適合哪些情況
4. 情境故事（上）
5. 情境故事（下）——虛構情境示意，已標示非真實案例
6. 服務重點
7. 日常保養小提醒
8. 結尾（LINE 諮詢報價）

翻頁方式：左右按鈕、圓點、鍵盤方向鍵、手機左右滑動；也可按全螢幕鍵，像簡報一樣播放。

簡報下方接著是常見問題（可展開的問答）、LINE 諮詢按鈕、上一篇／下一篇，以及其他服務項目連結。

**互動功能**

- 固定式導覽列，捲動時顯示陰影
- 手機 / 平板漢堡選單（支援 Esc 關閉、點選外部關閉、點選連結後自動收合）
- 平滑捲動至各區塊，導覽列自動高亮目前所在區塊
- 一鍵複製 LINE ID，並顯示提示訊息
- 手機版右下角固定 LINE 按鈕
- 回到頂部按鈕
- 首頁服務卡片整張可點擊，進入對應文章頁
- 區塊捲動淡入動畫（支援「減少動態效果」系統設定）

**響應式設計**

| 裝置 | 寬度 | 服務卡片欄數 |
|---|---|---|
| 手機 | < 768px | 1 欄（≥ 480px 為 2 欄） |
| 平板 | 768px – 1023px | 2 欄 |
| 桌面 | ≥ 1024px | 4 欄 |

**標示為「待確認」的資訊**（請補充至 `SPEC.md` 後再更新網站）

- 電話、Email、營業時間
- 公司介紹全文
- 正式 Logo

## 規則如何讓 AI 繼續完成新內容

| 檔案 | 角色 |
|---|---|
| `SPEC.md` | **資料來源**：公司資訊唯一出處；AI 不可編造，缺資料就標「待確認」並詢問 |
| `AGENTS.md` 第 0 節 | **任務對照表**：使用者提出某類需求時，要讀哪一節、改哪些檔案 |
| `AGENTS.md` 第 4–6 節 | **風格與版型**：品牌色變數、斷點、8 張投影片結構、字數上限、寫作語氣 |
| `templates/service-article.html` | **範本**：所有段落都已排好，只要取代 `{{ }}` 佔位文字 |
| `AGENTS.md` 第 9 節 | **SOP**：新增文章、修改資料、新增頁面的逐步流程（含要同步更新的連結） |
| `AGENTS.md` 第 7 節 | **檢查清單**：完成後逐項驗證 |

### 給 AI 的指令範例

新增一項服務文章：

```
請先閱讀 AGENTS.md 與 SPEC.md。
新增一項服務「玻璃清潔」（已確認，請先寫入 SPEC.md），
依 AGENTS.md 第 9.1 節 SOP 建立文章頁，並完成首頁卡片與所有文章頁連結的更新。
完成後依第 0.4 節格式回報。
```

補上聯絡電話：

```
請依 AGENTS.md 第 9.3 節，把 SPEC.md 的市話更新為 06-xxx-xxxx，並同步更新網站上所有「待確認」的電話欄位。
```

## 本機執行方式

本專案為純靜態網站，不需安裝任何套件。

**方法一：直接開啟**

以瀏覽器開啟 `index.html` 即可。

**方法二：本機伺服器（建議，最接近正式環境）**

```bash
# 在專案根目錄執行（macOS 已內建 Python 3）
python3 -m http.server 8000
```

開啟瀏覽器前往 <http://localhost:8000>。

使用 VS Code 者，也可安裝 **Live Server** 擴充功能，在 `index.html` 上按右鍵選擇「Open with Live Server」。

## GitHub Pages 部署方式

1. **建立 GitHub 儲存庫**
   在 GitHub 新增一個 repository（例如 `cleaning-website`），設為 Public。

2. **上傳專案檔案**
   ```bash
   cd 專案資料夾路徑
   git init
   git add .
   git commit -m "初版：〇〇專業清潔官方形象網站"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/cleaning-website.git
   git push -u origin main
   ```
   也可以在 GitHub 網頁上用「Add file → Upload files」拖曳上傳。請確認 `index.html` 位於儲存庫**根目錄**，並包含 `.nojekyll`（隱藏檔，macOS Finder 可按 `Cmd + Shift + .` 顯示）。

3. **啟用 GitHub Pages**
   進入 repository → **Settings** → **Pages** →
   **Source** 選擇 `Deploy from a branch` →
   **Branch** 選擇 `main`、資料夾選 `/ (root)` → **Save**。

4. **開啟網站**
   等待約 1～3 分鐘，網址為：
   `https://<你的帳號>.github.io/cleaning-website/`

5. **（建議）更新社群分享圖網址**
   部署後，將 `index.html` 中的
   `<meta property="og:image" content="images/og-image.png">`
   改為完整網址，例如 `https://<你的帳號>.github.io/cleaning-website/images/og-image.png`，Facebook / LINE 分享時才能正確顯示縮圖。

> 本專案所有路徑皆為相對路徑，已驗證可在 GitHub Pages 子路徑（`/<repo>/`）下正常運作。

## 更新內容

1. 先修改 `SPEC.md`
2. 依 `AGENTS.md` 規範修改 `index.html` / `css/style.css` / `js/main.js`
3. 依 `AGENTS.md` 第 6 節檢查清單確認後再部署
