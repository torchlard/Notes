# POJO
plain old java object 
- not implementing any interface
- not inherit any class
- not invented by framework

POCO = plain old C# object

avoid complicated EJB, use simple object, all fields with getter and setter

## VO, PO
VO = value object, view object
PO = persistant object
- correspond to entity in DB

POJO created by `new`, deleted by GC
PO created  by `insert` in DB, deleted by `delete` in DB
- lifecycle only within Connection

ORM wants PO to be consistent with POJO, ignore existence of PO

## POJO extension
POJO + persistence method (insert,update,delete...) = PO
POJO + data binding = View Object (UI model)
POJO + business logic (audit,transact...) = Domain Model
POJO as DTO


# JavaBean
reusable component written in Java
Java class satisfying certian standard, not a technology

1. all fields private
2. no arg constructor
3. use getter, setter to access
4. serializable

1. POJO is simpler than JavaBeans, POJO just follow OO concept, JavaBeans may come with simple logic
2. POJO only for data transfer, no logic
3. JavaBean can hav other methods

















