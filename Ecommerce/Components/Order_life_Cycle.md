# Keywords

1. Shipping :- Shipping is the process of physically moving the product from the seller’s location to the customer’s address. 

If Order = business contract,
then Shipping = real-world execution of that contract.




=====================================


how an order is created

how it connects to every other component

how it changes state

how user, seller, admin, payment, inventory all touch it

# WHAT IS AN ORDER

=> An Order is a contract that says:

```
“This user agreed to buy these products, at this price, with this delivery, and this payment.”
```
Once created, everything else must respect it.


An **Order** is a **snapshot + state machine**.

It captures:

* **Who** bought
* **What** was bought
* **At what price**
* **Where** it will be delivered
* **How** it will be paid
* **What state** it is in

Once created, the **core data never changes**.
Only the **status** evolves.

---

## Order Life Cycle

```ts

Browsing
  ↓
Cart
  ↓
Order Created
  ↓
Payment Processing
  ↓
Order Confirmed
  ↓
Fulfillment
  ↓
Delivery
  ↓
Completion / Return / Refund

```

Story 

1. No user , No Order, user must with authenticated with user_id and user_type (customer) , he will browse the order and create order,

2. User added product to cart, total amount calculated, coupone applied, quantity updated. But
❌ Inventory not deducted
❌ Payment not initiated

Cart can be abandoned.

3. Birth or order / order created (important moment)

- Checkout triggered (User clicked Place Order)
- Validation chain , validate address, validate product price,validate Inventory (if any validation fail , order not created)
- After validation Order Recordis created

```ts

Order
{
  order_id
  user_id
  seller_id(s)
  items[]
  price_snapshot
  address_snapshot
  status = CREATED
}

```
Note :- we will not give referance of user and address or seller, because once order is created it should be consistent , because products , address user can be changes or deleted later, but is should not affect the created orders.

- At last inventory is reserved after order is created.

Order = CREATED
Inventory = RESERVED


4. Payment Processing

- Payment Initiation =>


```ts

Payment
{
  payment_id
  order_id
  amount
  status = INITIATED
}

```

- Gateway Interaction => for payment it will redirect to payment gateway for payment
- Payment result => Bases on payment result we will update all

✅ Success

```ts
Payment = SUCCESS
Order = PAID

```
❌ Failure


```ts

Payment = FAILED
Order = PAYMENT_FAILED
Inventory = RELEASED // if payment fails we release the inventory product

```
- Idempotency Rule => if user retries same , order , no duplicate payment ctreated.

5. Order confirmed

- order markes confirment after payment success.
- Invoice is generated
- user notified => your order is confirmed
- Order = Confirment (order status changed)

### Seller Fulfillment

- Seller notify - NEW ORDER
- Packaging - Packs items - generates shipment - Order = PACKED
- Shipping Assigned - assign courier - generating - tracking ID - Order = SHIPPED

### Delivery 

```ts

IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED

```
User gets updates at each stage.

### ORDER COMPLETION

seller sellement - corder closed , seller payment scheduled.

```ts
Order = COMPLETED
```

### RETURNS & REFUNDS (Optional)


- Return Initiated :- Order = REURN_REQUESTED
- Return Approved :- Pickup scheduled , Inventory Updated
- Refund Processed (Payment Service)

```ts

Refund = SUCCESS
Order = REFUNDED

```
### ADMIN INTERVENTION (Any Time) 

admin can , cancel orders, override refunds, handle disputes. 


### Hoe connected with other components 

```ts

Order
│
├── User (who bought)
├── Product (what was bought)
├── Inventory (stock)
├── Address (delivery)
├── Payment (money)
├── Seller (who fulfills)
├── Shipping (delivery)
├── Notifications (communication)
└── Admin (control)

```















# 🧱 ORDER — HIGH LEVEL STRUCTURE

```
Order
│
├── Identity
├── User Snapshot
├── Seller Snapshot
├── Order Items
├── Pricing Snapshot
├── Address Snapshot
├── Payment Reference
├── Fulfillment Details
├── Order State
├── Audit Metadata
└── System Flags
```

Now let’s explain **each block like a story**.

---

## 1️⃣ Identity (Who is this order?)

```
order_id
order_number (human readable)
```

**Story**

* `order_id` = internal truth
* `order_number` = customer-facing reference

Why:

* IDs change system behavior
* Numbers help humans talk

---

## 2️⃣ User Snapshot (Who placed it?)

```
user_id
user_name
user_email
user_phone
```

**Story**

* Copied at order time
* User may update profile later — order must not change

Order must survive even if user account is deleted.

---

## 3️⃣ Seller Snapshot (Who fulfills it?)

```
seller_id
seller_name
seller_type
```

**Story**

* Marketplace orders may have multiple sellers
* Each seller fulfills their part

Why snapshot:

* Seller commission rules can change later

---

## 4️⃣ Order Items (What exactly was bought?)

```
items[]
  ├── order_item_id
  ├── product_id
  ├── product_name
  ├── product_sku
  ├── seller_id
  ├── quantity
  ├── unit_price
  ├── total_price
```

**Story**

* This is the legal record of purchase
* Product name, price are **copied**
* Product catalog changes don’t affect order

---

## 5️⃣ Pricing Snapshot (Money math)

```
pricing
  ├── subtotal
  ├── discount
  ├── tax
  ├── shipping_fee
  ├── total_amount
  ├── currency
```

**Story**

* Money must be reproducible
* No recalculation after order creation

Why:

* Audits
* Dispute resolution

---

## 6️⃣ Address Snapshot (Where to deliver?)

```
delivery_address
  ├── name
  ├── phone
  ├── address_line1
  ├── address_line2
  ├── city
  ├── state
  ├── pincode
  ├── country
```

**Story**

* Address book can change
* Order address must stay frozen

---

## 7️⃣ Payment Reference (How was it paid?)

```
payment
  ├── payment_id
  ├── payment_method
  ├── payment_status
  ├── paid_amount
```

**Story**

* Order does NOT store gateway secrets
* Only references payment entity

---

## 8️⃣ Fulfillment Details (How it moves?)

```
fulfillment
  ├── shipment_id
  ├── courier
  ├── tracking_number
  ├── expected_delivery
```

**Story**

* Added later
* Starts empty

---

## 9️⃣ Order State (What stage is it in?)

```
status
```

Examples:

```
CREATED
PAID
CONFIRMED
PACKED
SHIPPED
DELIVERED
CANCELLED
RETURNED
REFUNDED
```

**Story**

* Only this field mutates over time
* All logic depends on it

---

## 🔟 Audit Metadata (When & who changed it?)

```
created_at
updated_at
created_by
last_updated_by
```

**Story**

* Compliance
* Debugging
* Legal trace

---

## 1️⃣1️⃣ System Flags (Hidden but powerful)

```
flags
  ├── is_cod
  ├── is_gift
  ├── is_partial_shipment
  ├── is_fraud_suspected
```

**Story**

* Control behavior
* Not user-editable

---

# 📦 COMPLETE ORDER (JSON SHAPE)

Here’s how it **actually looks**:

```json
{
  "order_id": "ORD_987654",
  "order_number": "OD123456789",
  "user": {
    "user_id": "U123",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "phone": "98xxxxxx"
  },
  "items": [
    {
      "product_id": "P456",
      "product_name": "iPhone 15",
      "sku": "IPH15-BLK",
      "seller_id": "S789",
      "quantity": 1,
      "unit_price": 79999,
      "total_price": 79999
    }
  ],
  "pricing": {
    "subtotal": 79999,
    "discount": 5000,
    "tax": 3600,
    "shipping_fee": 0,
    "total_amount": 78599,
    "currency": "INR"
  },
  "delivery_address": {
    "name": "Rahul Sharma",
    "phone": "98xxxxxx",
    "city": "Bangalore",
    "pincode": "560001"
  },
  "payment": {
    "payment_id": "PAY123",
    "method": "UPI",
    "status": "SUCCESS",
    "paid_amount": 78599
  },
  "status": "PAID",
  "created_at": "2026-02-04T10:15:00Z"
}
```

---

# 🧠 GOLDEN PRINCIPLES (INTERVIEW GOLD)

1. **Order is immutable**
2. **Snapshots > references**
3. **Status drives behavior**
4. **Money fields never recalc**
5. **Everything else references order_id**








