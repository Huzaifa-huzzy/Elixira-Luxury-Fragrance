const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const menNames = [
  'Midnight Oud', 'Saffron Oud', 'Desert Oud', 'Azure Oud', 'Smoky Oud', 
  'Golden Oud', 'Imperial Oud', 'Velvet Oud', 'Cedar Oud', 'Arctic Oud',
  'Royal Patchouli', 'Urban Edge', 'Night Storm', 'Savage Rose', 'Silent Shadow',
  'Mystic Forest', 'Oceanic Blue', 'Pure Platinum', 'Black Diamond', 'Crimson Tide',
  'Silver Mist', 'Solar Flare', 'Lunar Dust', 'Titanium Strength', 'Obsidian Soul',
  'Granite Rock', 'Ivory Tower', 'Copper Canyon', 'Bronze Warrior', 'Iron Will',
  'Steel Heart', 'Cobalt Sky', 'Indigo Night', 'Onyx Ember', 'Marble Palace',
  'Quartz Crystal', 'Sapphire Depths', 'Emerald Isle', 'Ruby Fire', 'Topaz Glow'
];

const womenNames = [
  'Floral Bliss', 'Sweet Jasmine', 'Rose Garden', 'Lavender Dream', 'Vanilla Sky',
  'Peony Petals', 'Cherry Blossom', 'Orchid Mist', 'Golden Sun', 'Moonlight Serenade',
  'Velvet Petal', 'Silken Touch', 'Ethereal Glow', 'Radiant Lily', 'Divine Aura',
  'Sparkling Dew', 'Graceful Swan', 'Mystic Rose', 'Midnight Bloom', 'Enchanted Lily',
  'Sweet Harmony', 'Floral Whisper', 'Celestial Star', 'Pearl Essence', 'Diamond Dust',
  'Ruby Rose', 'Sapphire Sky', 'Emerald Green', 'Topaz Sun', 'Amber Glow',
  'Crystal Clear', 'Silver Lining', 'Golden Hour', 'Ivory Lace', 'Satin Silk',
  'Velvet Ribbon', 'Chiffon Breeze', 'Organza Mist', 'Tulle Dream', 'Lace Veil'
];

const products = [];

// Distribution Helper
const getAttribute = (index, total, counts, values) => {
  let cumulative = 0;
  for (let i = 0; i < counts.length; i++) {
    cumulative += counts[i];
    if (index < (cumulative / total) * total) {
      return values[i];
    }
  }
  return values[values.length - 1];
};

const allImages = [
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://media.istockphoto.com/id/1399637806/photo/bottom-view-of-one-spray-bottle-of-perfume-stands-on-a-glass-table.webp?s=2048x2048&w=is&k=20&c=iPp1uhgvOGUgA64AS0kqxkJoTQSzTFgLbUDWnfjG0oI=',
  'https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1705338670422-01133208eab9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1599342166997-58552e91d9f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1514348871858-1d3c20902571?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1615108395437-df128ad79e80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1667662655276-b3751fbbe107?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?q=80&w=679&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=853&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1605619082574-e92eee603b95?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1608434292452-0f1ba857d274?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1732828912683-57104a2d1b4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1739831741835-39e5d6c49daf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1587304791151-8e8b7cfe0771?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1620000062565-1fd024d85738?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1600427328336-ae43dd1f16ef?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1593886564059-13d6b735987b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1606391485277-8bcca550391c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1734778692604-2364dce37ec6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1704900165490-1e02ec72809c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1604494088672-47c7b1db7685?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1604494319451-5fca07e3bdf2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1647009822729-0076c73fe6f0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1634944119598-837431c4900a?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1771762013405-ad64577dfc55?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1641390322824-46593f96c416?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1611255680915-114e3414c085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1683401100709-b0d74d75e74b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1624798956425-ef88fc12b540?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1680503504111-1bbc7fc2103e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1769038937200-723ce34d83d8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1716978499366-d5a84bf1fe70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1673823666203-81c0a2ea0cb4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1622978147823-33d5e241e976?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1613742454955-889ff20becda?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1734779754989-b38186c26ab5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1635796342460-368cf1927238?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1654897025179-a4890859ad35?q=80&w=751&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1617943422341-6ae140cc1c85?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1690790427878-ecf29d8b686b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1617777704017-bd413c7be892?q=80&w=696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1681935703733-5e9df028a318?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1672060761081-821ddc80299a?q=80&w=1117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1661625079424-dc3870671f24?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1733582140110-331d170bd055?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1615160460524-432433ba1b8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

// Special Categories for Header
const specialCategories = ['Gift Box', 'Tester', 'Attar', 'Loyalty', 'Master Class'];

const giftBoxNames = [
  'Oud Celebration Gift Box', 'Luminous Bouquet Gift Set', 'Midnight Elegance Gift Bundle', 'Golden Reserve Gift Set',
  'Arabian Nights Gift Chest', 'Silk & Spice Gift Collection', 'Royal Fusion Gift Pack', 'Velvet Dream Gift Box',
  'Mystic Aura Gift Case', 'Imperial Essence Gift Box', 'Celestial Garden Gift Set', 'Noir Velvet Gift Bundle',
  'Amber Luxe Gift Box', 'Starlight Oud Gift Collection', 'Twilight Blossom Gift Pack', 'Sapphire Rose Gift Box',
  'Regal Cedar Gift Set', 'Serene Garden Gift Bundle', 'Moonlit Jasmine Gift Box', 'Opulent Amber Gift Case'
];

const under1500Names = [
  'Velvet Musk', 'Citrus Whisper', 'Amber Dawn', 'Silken Vanilla', 'Moonlit Petal', 'Morning Dew', 'Powdered Cashmere',
  'Whispering Rose', 'Ocean Mist', 'Misty Lavender', 'Sunlit Spice', 'Soft Sandalwood', 'Blushing Peony', 'Ocean Amber',
  'Gentle Gardenia', 'Quiet Forest', 'Warm Saffron', 'Sweet Iris', 'Golden Cedar', 'Soft Oud Breeze'
];

const oudNames = [
  'Royal Oud Heritage', 'Oud Velvet Noir', 'Imperial Oud Majesty', 'Oud Amber Mystique', 'Midnight Oud Muse',
  'Oud Silk Intense', 'Golden Oud Reverie', 'Oud Noir Elixir', 'Oud Rose Enchantment', 'Pure Oud Legacy',
  'Oud Noir Whisper', 'Oud Saffron Dream', 'Oud Eternal Flame', 'Oud Opulence', 'Oud Essence Royale',
  'Oud Midnight Symphony', 'Oud Desert Bloom', 'Oud Velvet Eclipse', 'Oud Luxe Voyage', 'Oud Celestial Ember'
];

// 40 Men
menNames.forEach((name, i) => {
  // Distribute first 25 men products into special categories (5 each)
  let category = 'Men';
  if (i < 25) {
    category = specialCategories[Math.floor(i / 5)];
  }

  products.push({
    name,
    gender: 'Men',
    category: category,
    price: 1000 + i * 100,
    description: `A unique fragrance for men: ${name}. Crafted for strength and elegance.`,
    images: [allImages[i % allImages.length]],
    range: getAttribute(i, 40, [10, 15, 15], ['Sensory', 'Executive', 'Poetic']),
    genre: getAttribute(i, 40, [25, 15], ['Arabic', 'French']),
    type: getAttribute(i, 40, [10, 5, 12, 13], ['Fruity', 'Green', 'Oriental', 'Woody']),
    season: getAttribute(i, 40, [10, 10, 10, 10], ['Summer', 'Winter', 'Autumn', 'Spring']),
    sillage: getAttribute(i, 40, [20, 20], ['Strong', 'Medium']),
    lasting: getAttribute(i, 40, [12, 15, 13], ['Upto 7 hrs', 'Upto 12 hrs', 'Upto 24 hrs']),
    fragranceType: 'EDP',
    stock: 20
  });
});

// 40 Women
womenNames.forEach((name, i) => {
  // Distribute first 25 women products into special categories (5 each)
  let category = 'Women';
  if (i < 25) {
    category = specialCategories[Math.floor(i / 5)];
  }

  products.push({
    name,
    gender: 'Women',
    category: category,
    price: 1000 + i * 100,
    description: `A beautiful fragrance for women: ${name}. Elegant and long-lasting floral notes.`,
    images: [allImages[(i + 40) % allImages.length]],
    range: getAttribute(i, 40, [10, 15, 15], ['Sensory', 'Executive', 'Poetic']),
    genre: getAttribute(i, 40, [25, 15], ['Arabic', 'French']),
    type: getAttribute(i, 40, [10, 5, 13, 12], ['Fruity', 'Green', 'Oriental', 'Woody']),
    season: getAttribute(i, 40, [10, 10, 10, 10], ['Summer', 'Winter', 'Autumn', 'Spring']),
    sillage: getAttribute(i, 40, [20, 20], ['Strong', 'Medium']),
    lasting: getAttribute(i, 40, [13, 15, 12], ['Upto 7 hrs', 'Upto 12 hrs', 'Upto 24 hrs']),
    fragranceType: 'EDP',
    stock: 20
  });
});

// Add 20 Gift Box products
giftBoxNames.forEach((name, i) => {
  products.push({
    name,
    gender: i % 2 === 0 ? 'Men' : 'Women',
    category: 'Gift Box',
    price: 2200 + i * 80,
    description: `A deluxe gift box set featuring ${name}. Perfect for celebrations and special moments.`,
    images: [allImages[(i + 10) % allImages.length]],
    range: 'Poetic',
    genre: 'Arabic',
    type: 'Oriental',
    season: 'Winter',
    sillage: 'Strong',
    lasting: 'Upto 24 hrs',
    fragranceType: 'EDP',
    stock: 25
  });
});

// Add 20 Under 1500 products
const under1500Prices = [900, 950, 990, 1050, 1100, 1150, 1180, 1200, 1250, 1290, 1320, 1350, 1380, 1400, 1420, 1450, 1470, 1480, 1490, 1499];
under1500Names.forEach((name, i) => {
  products.push({
    name,
    gender: i % 2 === 0 ? 'Women' : 'Men',
    category: 'Under 1500',
    price: under1500Prices[i],
    description: `Affordable luxury with ${name}. Crafted to deliver premium scent at a value price.`,
    images: [allImages[(i + 20) % allImages.length]],
    range: 'Sensory',
    genre: 'French',
    type: 'Fresh',
    season: 'Spring',
    sillage: 'Medium',
    lasting: 'Upto 12 hrs',
    fragranceType: 'EDP',
    stock: 30
  });
});

// Add 20 Oud products
oudNames.forEach((name, i) => {
  products.push({
    name,
    gender: i % 2 === 0 ? 'Men' : 'Women',
    category: 'Oud',
    price: 1800 + i * 90,
    description: `An exquisite oud fragrance named ${name}. Rich, smoky, and deeply luxurious.`,
    images: [allImages[(i + 30) % allImages.length]],
    range: 'Executive',
    genre: 'Arabic',
    type: 'Woody',
    season: 'Autumn',
    sillage: 'Strong',
    lasting: 'Upto 24 hrs',
    fragranceType: 'EDP',
    stock: 20
  });
});

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@elixira.com',
      password: 'adminpassword123',
      role: 'admin',
    });

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
