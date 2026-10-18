export interface SampleFruit {
  id: string;
  nameEn: string;
  nameBn: string;
  variety: string;
  descriptionEn: string;
  descriptionBn: string;
  imageUrl: string;
  expectedStatus: 'Good' | 'Suspicious' | 'Bad';
  chemicalTag: string;
  badgeColor: string;
}

export const SAMPLE_FRUITS: SampleFruit[] = [
  {
    id: 'sample-mango-carbide',
    nameEn: 'Himsagar Mango (Carbide Ripened)',
    nameBn: 'হিমসাগর আম (কার্বাইডে পাকানো)',
    variety: 'Mangifera indica',
    descriptionEn: 'Artificially ripened using Calcium Carbide. Note bright yellow peel with green stem.',
    descriptionBn: 'ক্যালসিয়াম কার্বাইড দিয়ে কৃত্রিমভাবে পাকানো। বোঁটা কাঁচা কিন্তু চামড়া উজ্জ্বল হলুদ।',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=700&auto=format&fit=crop&q=80',
    expectedStatus: 'Suspicious',
    chemicalTag: 'Calcium Carbide',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
  },
  {
    id: 'sample-apple-natural',
    nameEn: 'Honeycrisp Apple (Organic Fresh)',
    nameBn: 'হানিগ্রিস্প আপেল (তাজা ও প্রাকৃতিক)',
    variety: 'Malus domestica',
    descriptionEn: 'Tree-ripened organic apple. Natural bloom, crisp texture, completely chemical-free.',
    descriptionBn: 'গাছে পাকা প্রাকৃতিক আপেল। কোনো কৃত্রিম মোম বা ফরমালিন নেই।',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=700&auto=format&fit=crop&q=80',
    expectedStatus: 'Good',
    chemicalTag: 'Chemical Free',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
  },
  {
    id: 'sample-banana-formalin',
    nameEn: 'Sagor Banana (Formalin Treated)',
    nameBn: 'সাগর কলা (ফরমালিন স্প্রে করা)',
    variety: 'Musa acuminata',
    descriptionEn: 'Treated with Formalin solution for extended shelf-life. Hard stem, zero fruit flies.',
    descriptionBn: 'পচন রোধে ফরমালিন পানিতে ডুবানো। বোঁটা শক্ত কিন্তু দীর্ঘস্থায়ী।',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&auto=format&fit=crop&q=80',
    expectedStatus: 'Suspicious',
    chemicalTag: 'Formalin Dip',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10'
  },
  {
    id: 'sample-strawberry-fresh',
    nameEn: 'Alpine Strawberry (Field Picked)',
    nameBn: 'স্ট্রবেরি (সতেজ খেতের)',
    variety: 'Fragaria vesca',
    descriptionEn: 'Naturally harvested strawberries. Rich in antioxidants and vitamin C.',
    descriptionBn: 'প্রাকৃতিক মিষ্টি ও পুষ্টিগুণে ভরপুর তাজা স্ট্রবেরি।',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=700&auto=format&fit=crop&q=80',
    expectedStatus: 'Good',
    chemicalTag: 'Natural',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
  }
];
