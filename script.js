/* Choco Delight storefront. Set GAS_URL to the deployed Apps Script web app URL. */
const GAS_URL = 'https://script.google.com/macros/s/AKfycbx1C9VDvmY3R4xyuvjkBlp4OkY1pyLBAl16B2ILXWgU2OVGzWWX7XJG7UkOOWS-bZ8J/exec';
const DEMO_PRODUCTS = [
 {SKU:'CH-01',Product_Name:'Dark Chocolate 70%',Price:89,Stock:50,Image_URL:'',Description:'ดาร์กช็อกโกแลตเข้มข้น หอมโกโก้และรสชาติสมดุล',Category:'Dark Chocolate',Status:'Active'},
 {SKU:'CH-02',Product_Name:'Milk Chocolate',Price:79,Stock:50,Image_URL:'',Description:'มิลค์ช็อกโกแลตเนื้อนุ่ม หวานละมุน',Category:'Milk Chocolate',Status:'Active'},
 {SKU:'CH-03',Product_Name:'Almond Chocolate',Price:99,Stock:30,Image_URL:'',Description:'ช็อกโกแลตผสมอัลมอนด์ กรุบกรอบทุกคำ',Category:'Nut Chocolate',Status:'Active'}
];
let products=[],cart=[];
const $=s=>document.querySelector(s); const money=n=>'฿'+Number(n||0).toLocaleString('th-TH');

async function loadProducts() {
  try {
    const response = await fetch(`${GAS_URL}?action=products`);

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    const data = await response.json();

    console.log('Google Sheets API:', data);

    let list = data.products || data;

    if (!Array.isArray(list)) {
      throw new Error('API ไม่ได้ส่งข้อมูลสินค้าในรูปแบบ Array');
    }

    products = list.map(p => ({
      SKU: String(p.SKU || '').trim(),
      Product_Name: p.Product_Name || '',
      Price: Number(p.Price || 0),
      Stock: Number(p.Stock || 0),
      Image_URL: p.Image_URL || '',
      Description: p.Description || '',
      Category: p.Category || 'Chocolate',
      Status: String(p.Status || 'Active').trim()
    }));

    renderProducts();

  } catch (error) {
    console.error('Load products error:', error);
    products = DEMO_PRODUCTS;
    renderProducts();
  }
}
