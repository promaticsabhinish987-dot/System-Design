## Component relation and communication.

UI/frontend is nothing more then a tree structure , where each node has its own (UI+logic) and for communication, we first have to understnad the relation between them, communication is nothing just passing data in relation from one componnet to the other component. (like pub sub / event based communication)


### There are three fundamental relationships in any component tree:

1. Parent child :- child is dump node and get data from the parent to render, but when child should get only id from param to call api for the data?
2. Child parent :- child notify parent for something, parent pass a **callback** or **event emitter**  down to the child, which the child call and parent react to it.
3. Sibling / distant communication :- **use Shared State** either lifted up to their nested ancestor, or store in dedicated **state containe**r. (Service, context, store)



Note :- 

```
1. data flows down
2. event flows up
```


```
1. data down (props / @input)
2. EEvent up (@output / callback)
3. Global / Sibling
```

```
================================================================

Global State (service /context/store)
Any component can read from here and write here.

================================================================

```

## Angular

1. Parent --> child (**@Input**) 
The parent passes data down; the child declares it with @Input().


```ts

// parent.component.ts
export class ParentComponent {
  userName = 'Alice';
  userAge = 30;
}

```
```html
<!-- parent.component.html -->
<app-child [name]="userName" [age]="userAge"></app-child>
```


```ts
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Hello, {{ name }}! You are {{ age }} years old.</p>`
})
export class ChildComponent {
  @Input() name: string = '';
  @Input() age: number = 0;
}
```

2. Child → Parent (**@Output + EventEmitter**)
The child emits events; the parent listens with (eventName) syntax.


@Output :- “This property is an event that parent components are allowed to listen to.”

```ts
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button (click)="sendMessage()">Send to Parent</button>`
})
export class ChildComponent {
  @Output() messageSent = new EventEmitter<string>();

  sendMessage() {
    this.messageSent.emit('Hello from Child!');
  }
}
```

Child creates event , parent uses it. 

```ts
<!-- parent.component.html -->
<app-child (messageSent)="onMessageReceived($event)"></app-child>
<p>{{ receivedMessage }}</p>
```
Parent uses this event created by the child and attach a callback to it, and this callback will receieve data from the child ,(onMessageReceived() --> callback), (messageSent --> event used by the parent)

```ts
// parent.component.ts
export class ParentComponent {
  receivedMessage = '';

  onMessageReceived(msg: string) {
    this.receivedMessage = msg;
  }
}
```

3.  Sibling communication via a Shared Service

Services are singletons in Angular. Two sibling components can both inject the same service and communicate through it using **BehaviorSubject**.







