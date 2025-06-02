const products = [
  {
    id: 101,
    name: "Sony LED 40 inch",
    category: "Electronics",
    brand: "Sony",
    sku: "SONY-LED-40",
    description: "40 inch Full HD LED TV with smart features.",
    isActive: true,
    createdAt: "2021-01-15",
    updatedAt: "2022-10-22",
    tags: ["LED", "Smart TV", "HD"],
    supplier: {
      name: "ElectroHouse",
      contact: "support@electrohouse.com"
    },
    variations: [
      {
        id: 1,
        color: "Black",
        price: 50000,
        quantity: 5,
        warranty: "2 years",
        discount: 0,
        isAvailable: true
      },
      {
        id: 2,
        color: "Red",
        price: 50000,
        quantity: 1,
        warranty: "2 years",
        discount: 5,
        isAvailable: true
      },
      {
        id: 3,
        color: "Silver",
        price: 55000,
        quantity: 8,
        warranty: "3 years",
        discount: 10,
        isAvailable: false
      }
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "Ahmad",
          email: "ahmad@gmail.com",
          location: "Lahore"
        },
        rating: 4.0,
        title: "Good Product",
        comment: "Very good product for the price.",
        date: "2021-02-06",
        approved: true,
        likes: 2,
        verifiedPurchase: true
      },
      {
        id: 2,
        user: {
          name: "Zubair",
          email: "zubair@yahoo.com",
          location: "Karachi"
        },
        rating: 4.5,
        title: "Awesome",
        comment: "I’m impressed by the quality.",
        date: "2021-02-05",
        approved: false,
        likes: 5,
        verifiedPurchase: false
      }
    ]
  }
];

// 1. Product name with supplier information 
products.forEach(p => {
  console.log(`${p.name} - Supplier: ${p.supplier.name}, Contact: ${p.supplier.contact}`);
});

// 2. Available colors for active products
const availableColors = products
  .filter(p => p.isActive)
  .flatMap(p => p.variations.filter(v => v.isAvailable).map(v => v.color));
console.log(availableColors);

// 3. Total quantity of available variations
const totalQty = products.reduce((sum, p) => {
  return sum + p.variations.filter(v => v.isAvailable).reduce((s, v) => s + v.quantity, 0);
}, 0);
console.log(totalQty);

// 4. Products with discounted variations
const discountedProducts = products.filter(p => p.variations.some(v => v.discount > 0));
console.log(discountedProducts.map(p => p.name));

// 5. Effective price (after discount) for each variation
products.forEach(p => {
  p.variations.forEach(v => {
    const finalPrice = v.price * (1 - v.discount / 100);
    console.log(`${p.name} (${v.color}): Rs.${finalPrice}`);
  });
});

// 6. Variation with highest discount
let maxDiscountVar = null;
products.forEach(p => {
  p.variations.forEach(v => {
    if (!maxDiscountVar || v.discount > maxDiscountVar.discount) {
      maxDiscountVar = { ...v, productName: p.name };
    }
  });
});
console.log(maxDiscountVar);

// 7. Emails of users with approved reviews & more than 3 likes
const likedEmails = products.flatMap(p =>
  p.reviews.filter(r => r.approved && r.likes > 3).map(r => r.user.email)
);
console.log(likedEmails);

// 8. Count of verified purchase reviews
const verifiedReviewCount = products.reduce((count, p) =>
  count + p.reviews.filter(r => r.verifiedPurchase).length, 0
);
console.log(verifiedReviewCount);

// 9. Add new variation
products[0].variations.push({
  id: 4,
  color: "Blue",
  price: 52000,
  quantity: 4,
  warranty: "2 years",
  discount: 5,
  isAvailable: true
});
console.log(products[0].variations);

// 10. Add new review
products[0].reviews.push({
  id: 3,
  user: {
    name: "Sara",
    email: "sara@example.com",
    location: "Islamabad"
  },
  rating: 5,
  title: "Great TV",
  comment: "Loving the picture quality!",
  date: "2023-06-01",
  approved: true,
  likes: 6,
  verifiedPurchase: true
});
console.log(products[0].reviews);

// 11. Sort products by latest updatedAt
const sortedProducts = [...products].sort((a, b) =>
  new Date(b.updatedAt) - new Date(a.updatedAt)
);
console.log(sortedProducts.map(p => p.name));

// 12. Filter active products with stock
const filteredActive = products.filter(p =>
  p.isActive && p.variations.some(v => v.quantity > 0)
);
console.log(filteredActive.map(p => p.name));

// 13. Summary per product
const summaries = products.map(p => {
  const totalStock = p.variations.reduce((s, v) => s + v.quantity, 0);
  const avgRating = p.reviews.length
    ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
    : 0;
  return {
    name: p.name,
    totalStock,
    avgRating: avgRating.toFixed(2),
    supplierContact: p.supplier.contact
  };
});
console.log(summaries);

// 14. Supplier report function
function supplierReport(products) {
  const report = {};
  products.forEach(p => {
    const supplier = p.supplier.name;
    report[supplier] = (report[supplier] || 0) + 1;
  });
  return report;
}
console.log(supplierReport(products));

// 15. Products reviewed by users from 'Lahore'
const lahoreProducts = products.filter(p =>
  p.reviews.some(r => r.user.location === "Lahore")
);
console.log(lahoreProducts.map(p => p.name));

// 16. Top 3 products by avg rating (min 2 reviews)
const topRated = products
  .filter(p => p.reviews.length >= 2)
  .map(p => ({
    name: p.name,
    avgRating: p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
  }))
  .sort((a, b) => b.avgRating - a.avgRating)
  .slice(0, 3);
console.log(topRated);

// 17. Inconsistent variations: quantity 0 but isAvailable true
const inconsistent = products.filter(p =>
  p.variations.some(v => v.quantity === 0 && v.isAvailable)
);
console.log(inconsistent.map(p => p.name));

// 18. All unique tags across products
const uniqueTags = [...new Set(products.flatMap(p => p.tags))];
console.log(uniqueTags);
