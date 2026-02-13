/*********************************************************
 * ORDER STATE PATTERN - COMPLETE IMPLEMENTATION
 *********************************************************/

/***********************
 * 1. ABSTRACT STATE
 ***********************/
class OrderState {
  constructor(name) {
    this.name = name;
  }

  pay(order) {
    throw new Error(`❌ Cannot pay when order is ${this.name}`);
  }

  ship(order) {
    throw new Error(`❌ Cannot ship when order is ${this.name}`);
  }

  deliver(order) {
    throw new Error(`❌ Cannot deliver when order is ${this.name}`);
  }

  cancel(order) {
    throw new Error(`❌ Cannot cancel when order is ${this.name}`);
  }
}

/***********************
 * 2. CONCRETE STATES
 ***********************/

// CREATED
class CreatedState extends OrderState {
  constructor() {
    super("CREATED");
  }

  pay(order) {
    order.setState(new PaidState());
    console.log("✅ Payment successful. Order moved to PAID");
  }

  cancel(order) {
    order.setState(new CancelledState());
    console.log("❌ Order cancelled from CREATED state");
  }
}

// PAID
class PaidState extends OrderState {
  constructor() {
    super("PAID");
  }

  ship(order) {
    order.setState(new ShippedState());
    console.log("📦 Order shipped");
  }

  cancel(order) {
    order.setState(new CancelledState());
    console.log("💰 Order cancelled after payment (refund initiated)");
  }
}

// SHIPPED
class ShippedState extends OrderState {
  constructor() {
    super("SHIPPED");
  }

  deliver(order) {
    order.setState(new DeliveredState());
    console.log("🚚 Order delivered successfully");
  }
}

// DELIVERED
class DeliveredState extends OrderState {
  constructor() {
    super("DELIVERED");
  }
}

// CANCELLED
class CancelledState extends OrderState {
  constructor() {
    super("CANCELLED");
  }
}

/***********************
 * 3. ORDER ENTITY
 ***********************/
class Order {
  constructor(id, user, items) {
    this.id = id;
    this.user = user;
    this.items = items;
    this.state = new CreatedState();
    this.stateHistory = ["CREATED"];
  }

  setState(newState) {
    this.state = newState;
    this.stateHistory.push(newState.name);
  }

  pay() {
    this.state.pay(this);
  }

  ship() {
    this.state.ship(this);
  }

  deliver() {
    this.state.deliver(this);
  }

  cancel() {
    this.state.cancel(this);
  }

  getStatus() {
    return this.state.name;
  }

  getHistory() {
    return this.stateHistory;
  }

  printSummary() {
    console.log("\n========= ORDER SUMMARY =========");
    console.log("Order ID:", this.id);
    console.log("User:", this.user.name);
    console.log("Items:", this.items.join(", "));
    console.log("Current Status:", this.getStatus());
    console.log("State History:", this.getHistory().join(" → "));
    console.log("=================================\n");
  }
}

/***********************
 * 4. USAGE EXAMPLE
 ***********************/

// Create Order
const order = new Order(
  1001,
  { id: 1, name: "Abhinish" },
  ["Laptop", "Mouse"]
);

console.log("Initial Status:", order.getStatus());

// Invalid operation example
try {
  order.ship();
} catch (err) {
  console.log(err.message);
}

// Valid flow
order.pay();
order.ship();
order.deliver();

// Try invalid transition
try {
  order.cancel();
} catch (err) {
  console.log(err.message);
}

// Print final summary
order.printSummary();



# UML

```ts
                    +----------------------+
                    |      OrderState      |  <<abstract>>
                    +----------------------+
                    | - name : String      |
                    +----------------------+
                    | + pay(order)         |
                    | + ship(order)        |
                    | + deliver(order)     |
                    | + cancel(order)      |
                    +----------▲-----------+
                               |
      ---------------------------------------------------------
      |            |             |            |              |
+-------------+ +-------------+ +-------------+ +-------------+ +---------------+
| CreatedState| | PaidState   | | ShippedState| |DeliveredState| |CancelledState|
+-------------+ +-------------+ +-------------+ +-------------+ +---------------+
|             | |             | |             | |             | |               |
+-------------+ +-------------+ +-------------+ +-------------+ +---------------+
| + pay()     | | + ship()    | | + deliver() | | (no change) | | (no change)   |
| + cancel()  | | + cancel()  | |             | |             | |               |
+-------------+ +-------------+ +-------------+ +-------------+ +---------------+

                        (Composition)
                    +----------------------+
                    |        Order         |
                    +----------------------+
                    | - id                 |
                    | - user               |
                    | - items              |
                    | - state : OrderState |
                    | - stateHistory[]     |
                    +----------------------+
                    | + setState()         |
                    | + pay()              |
                    | + ship()             |
                    | + deliver()          |
                    | + cancel()           |
                    | + getStatus()        |
                    +----------------------+

```
