/*************************************************************
 * STRATEGY PATTERN - PAYMENT SYSTEM (SINGLE FILE)
 *************************************************************/

/***********************
 * 1️⃣ Abstract Strategy
 ***********************/
class PaymentStrategy {
  pay(amount) {
    throw new Error("Method not implemented");
  }
}

/***********************
 * 2️⃣ Concrete Strategies
 ***********************/

// 💳 Credit Card Payment
class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber, holderName) {
    super();
    this.cardNumber = cardNumber;
    this.holderName = holderName;
  }

  pay(amount) {
    console.log("Processing Credit Card Payment...");
    console.log(
      `💳 Charging ₹${amount} to card ${this.cardNumber} (Holder: ${this.holderName})`
    );
    console.log("✅ Credit Card Payment Successful\n");
  }
}

// 📱 UPI Payment
class UpiPayment extends PaymentStrategy {
  constructor(upiId) {
    super();
    this.upiId = upiId;
  }

  pay(amount) {
    console.log("Processing UPI Payment...");
    console.log(`📱 Sending ₹${amount} request to UPI ID: ${this.upiId}`);
    console.log("✅ UPI Payment Successful\n");
  }
}

// 🚚 Cash On Delivery
class CODPayment extends PaymentStrategy {
  pay(amount) {
    console.log("Processing Cash On Delivery...");
    console.log(`🚚 ₹${amount} will be collected at delivery`);
    console.log("✅ COD Order Confirmed\n");
  }
}


/***********************
 * 3️⃣ Payment Context
 ***********************/
class PaymentService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  // Change payment method at runtime
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    if (!this.strategy) {
      throw new Error("Payment strategy not set");
    }
    this.strategy.pay(amount);
  }
}

/***********************
 * 4️⃣ Usage Example
 ***********************/

console.log("\n========== PAYMENT STRATEGY DEMO ==========\n");

const amount = 50000;

// Create Payment Service with Credit Card
const paymentService = new PaymentService(
  new CreditCardPayment("1234-5678-9012-3456", "Abhinish")
);

// Pay with Credit Card
paymentService.processPayment(amount);

// Switch to UPI dynamically
paymentService.setStrategy(new UpiPayment("abhinish@upi"));
paymentService.processPayment(amount);

// Switch to Cash on Delivery
paymentService.setStrategy(new CODPayment());
paymentService.processPayment(amount);

console.log("===========================================\n");



/**
 *                     +------------------------+
                    |    PaymentStrategy     |   <<abstract>>
                    +------------------------+
                    | + pay(amount)          |
                    +-----------▲------------+
                                |
        -------------------------------------------------
        |                       |                       |
+-------------------+   +-------------------+   +-------------------+
| CreditCardPayment |   |    UpiPayment     |   |    CODPayment     |
+-------------------+   +-------------------+   +-------------------+
| - cardNumber      |   | - upiId           |   |                   |
| - holderName      |   +-------------------+   +-------------------+
+-------------------+   | + pay(amount)     |   | + pay(amount)     |
| + pay(amount)     |   +-------------------+   +-------------------+
+-------------------+


                    (Has-A Relationship)
                +--------------------------------+
                |        PaymentService          |   <<Context>>
                +--------------------------------+
                | - strategy : PaymentStrategy   |
                +--------------------------------+
                | + setStrategy(strategy)        |
                | + processPayment(amount)       |
                +--------------------------------+


         PaymentService
               |
               | uses
               v
        PaymentStrategy
           /      |      \
        Card     UPI     COD

 */


const express = require("express");
const router = express.Router();

const PaymentService = require("../strategies/PaymentService");
const CreditCardPayment = require("../strategies/CreditCardPayment");
const UpiPayment = require("../strategies/UpiPayment");
const CODPayment = require("../strategies/CODPayment");

// POST /payment
router.post("/", (req, res) => {
  try {
    const { method, amount, cardNumber, holderName, upiId } = req.body;

    let strategy;

    switch (method) {
      case "CARD":
        strategy = new CreditCardPayment(cardNumber, holderName);
        break;
      case "UPI":
        strategy = new UpiPayment(upiId);
        break;
      case "COD":
        strategy = new CODPayment();
        break;
      default:
        return res.status(400).json({ error: "Invalid payment method" });
    }

    const paymentService = new PaymentService(strategy);
    const result = paymentService.processPayment(amount);

    res.json({ message: "Payment processed successfully", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
