# 🌐 E-COMMERCE SYSTEM

At Top Level we have 

```ts

E-Commerce Platform
│
├── User Facing App (Customer)
├── Seller Facing App (Merchant)
├── Admin Dashboard (Operations)
├── Shared Backend Services
└── External Integrations

```


## 🧍‍♂️ 1. USER FACING APP (Customer App)

```ts

User App
│
├── Authentication
├── Home & Discovery
├── Product Experience
├── Cart & Checkout
├── Orders
├── Payments
├── User Account
├── Notifications
└── Support

```

###  🔐 Authentication

```ts

Authentication
│
├── Login
│   ├── EmailLogin
│   ├── OTPLogin
│   └── SocialLogin
│
├── Signup
│   ├── EmailSignup
│   └── PhoneSignup
│
└── Session Management
    ├── TokenRefresh
    └── Logout

```

🧠 Leaf nodes: OTPInput, PasswordField, Captcha

### 🏠 Home & Discovery


```ts

Home
│
├── BannerCarousel
├── CategoryNavigation
│   ├── CategoryCard
│   └── SubCategoryList
│
├── RecommendationSection
│   ├── PersonalizedProducts
│   └── TrendingProducts
│
└── Search
    ├── SearchBar
    ├── SearchSuggestions
    └── RecentSearches

```

### 📦 Product Experience


```ts

Product
│
├── ProductList
│   ├── ProductCard
│   │   ├── ProductImage
│   │   ├── PriceLabel
│   │   └── RatingBadge
│   └── Pagination / InfiniteScroll
│
├── ProductDetail
│   ├── ImageGallery
│   ├── Description
│   ├── SpecificationTable
│   ├── Reviews
│   │   └── ReviewItem
│   └── QnA
│
└── Wishlist
    └── WishlistItem

```

🧠 Leaf: AddToWishlistButton, RatingStar

### 📦 Product Experience

```ts

Product
│
├── ProductList
│   ├── ProductCard
│   │   ├── ProductImage
│   │   ├── PriceLabel
│   │   └── RatingBadge
│   └── Pagination / InfiniteScroll
│
├── ProductDetail
│   ├── ImageGallery
│   ├── Description
│   ├── SpecificationTable
│   ├── Reviews
│   │   └── ReviewItem
│   └── QnA
│
└── Wishlist
    └── WishlistItem

```

🧠 Leaf: AddToWishlistButton, RatingStar


### 🛒 Cart & Checkout


```ts

Cart
│
├── CartItem
│   ├── QuantitySelector
│   ├── PriceBreakdown
│   └── RemoveItem
│
├── Coupon
│   ├── ApplyCoupon
│   └── CouponList
│
└── PriceSummary
    ├── Subtotal
    ├── Discount
    └── FinalAmount




Checkout
│
├── AddressSelection
│   ├── AddressCard
│   └── AddNewAddress
│
├── DeliveryOptions
│   └── DeliverySlot
│
├── PaymentSelection
│   ├── UPI
│   ├── Card
│   └── COD
│
└── OrderConfirmation


```

### 📦 Orders

```ts

Orders
│
├── OrderList
│   └── OrderCard
│
├── OrderDetail
│   ├── OrderItems
│   ├── ShipmentTracking
│   └── Invoice
│
└── Returns & Refunds
    ├── ReturnReason
    └── RefundStatus

```

### 👤 User Account


```ts

UserAccount
│
├── Profile
│   ├── PersonalInfo
│   └── Preferences
│
├── AddressBook
│   └── AddressForm
│
├── SavedPayments
│
└── Security
    ├── ChangePassword
    └── TwoFactorAuth

```












