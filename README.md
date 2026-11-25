# Choco Delight 🍫

A responsive chocolate shop demo with a storefront, cart, Google Sheets order storage, order-management dashboard, packing statuses, and printable shipping-label layout.

## Project files
- `index.html`, `style.css`, `script.js`: customer storefront
- `admin.html`: order dashboard, item list, status updates, printable recipient label
- `apps-script/Code.gs`: Google Sheets backend
- `images/`: place product photos here (commit images to GitHub)

## 1. Prepare Google Sheets
1. Open your spreadsheet and rename the product tab to **Products** (or create one named Products).
2. Keep row 1 exactly as: `SKU | Product_Name | Price | Stock | Image_URL | Description | Category | Status`.
3. Enter product rows. Price and Stock should be numeric; set Status to `Active`.

## 2. Install Apps Script backend
1. In the spreadsheet, open **Extensions → Apps Script**.
2. Paste the contents of `apps-script/Code.gs` into the editor (replace existing code).
3. Save, then select and run `setup()` once. Authorize the script.
4. In Apps Script, open **Project Settings → Script Properties**. `setup()` stores `SPREADSHEET_ID` and creates an `ADMIN_KEY`.
5. Copy the `ADMIN_KEY` value and keep it private.
6. Deploy → New deployment → Type **Web app**. Execute as **Me**; access **Anyone**. Deploy and copy the Web App URL.

> Keep the admin key private. Anyone with the web-app URL can submit customer orders, but order viewing and status changes require the key. For a production store, add stronger access control and abuse protection before taking real orders.

## 3. Connect the storefront
1. Open `script.js`.
2. Replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your Web App URL.
3. Commit the change. The shop reads active products and submits orders to Sheets. If no URL is configured, the site uses demo products and checkout won't submit live orders.

## 4. Add images
Upload images into `images/` and use GitHub raw URLs in the `Image_URL` column, e.g. `https://raw.githubusercontent.com/YOUR-USER/choco-delight/main/images/dark-chocolate.jpg`.

## 5. GitHub
Create a public repository named `choco-delight`, upload all project files and the `images/` directory. Do not upload secrets or your admin key.

## 6. Deploy on Vercel
1. Sign in to Vercel and import the GitHub repository.
2. Framework preset: **Other**; build command and output directory can be left blank/default for a static site.
3. Deploy. Vercel will host `index.html` at the root.
4. Admin dashboard is at `/admin.html`. Enter the Apps Script URL and admin key each session. (This demo keeps them in the page inputs only.)

## Admin workflow
- Load orders with the Web App URL and admin key.
- Review order lines, update order status to Pending / Picking / Packed / Shipped / Cancelled.
- Click a shipping label button to generate a simple printable recipient-label layout and use browser print.

## Data sheets created by `setup()`
- `Products` (existing product table)
- `Orders`: order header, customer/recipient, total and status
- `Order_Items`: individual SKU and quantity lines

This is a class/demo project, not a full payment or carrier-label integration. Shipping labels are printable address layouts; carrier booking, tracking IDs, payments, tax, and authentication hardening are not included.
