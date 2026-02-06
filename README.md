# System-Design
System design of different projects


// Decorator design pattern 

1. used to give additional behaviour to object at runtime(not at compile time)
2. We have inheritance , to do something at runtime like same method for child and parent , child is giving message , hello world, and parent is giving message hello, child is just adding extra text on message, or on based of condition we can create child or parent and call its getmessage to get whatever message we want so , why we need decorator if we have inheritance to extrand the feature and add some other features to the existing object.

```java

class Base{
    run(){
        return "running";
    }
}

class Child extends Base{
    run(){
        return "running with state";
    }
}

if(true)
Base *b = new Base()
else
Base *b = new Child()

based on condition we can create instance of class whichever we want ,and call its run() method.

```




3. Inheritance is bad , because it creates multiple herarchy , class explosition. , decorator is the solution of one of the prolem that comes when we use , inheritance.





## Example (Mario game) increate power by getting power.

powerup when he get something.
We are increasing the functionality of a object on time (dynamically chaging the behavious of a object or inhencing its property )

at a certain point we have class explosition (n number of class with different property)

==> use composition over inheritance 

How we can solve this problem and get what we want

1. Suppose we have a object , initial object. and we want to increate its power at runtime.

we want to decorate initial object with a wraper, of property.


once we decorate our initial object it will behave like a one single object, and its like decorator inside decorator and it can go infinite, and when we call run of last decorator outer decorator , it will call its inner decorator till center.


decorator is a object- is a relatio is also there . which comes from inheritance , and there is a another relation which is composition relation. which is a has a relation , means decorator also have has-a relation.

it is using has a relation to dynamically change the behaviour of object.

1. its using inheritance not to change property , but to behave like object(decorator will also behave like object)(is-s)
2. for property inhancement its using composition (has-a)




we have has a relation - to show , that we will have base class obj in , decorator class, and in decorator class we can call run() of base class and also call its own run() with base class run add on.


14...


Suppose we have three power, then we can add then at any order and at any number of time.

1. we can create any number of permutation and combination
2. we are using here the recursion mechanism,
3. we can create and add new power easily.



ICharacter mario = new StarPower(new GunPower(new Mario()))




## Official defination

==> Decorator pattern attaches additional responsibility to an object dynamically , decorator provides a flexible alternative to subclassing for entending functionality






























