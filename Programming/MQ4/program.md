# program structure
header -> init() -> onTick() -> deinit()

# predefined variable
Ask: last sell-price
Bid: last buy-price
Bars: num of bars on current chart
Point: point size of current security in quote currency
Digits: num of digits after decimal point in price

## arrays-Timeseries
Time: opening time
Open: opening price
Close: closing price of each bar
High: max price
Low: min price
Volume: tick volume

## function
RefreshRates(): update values of local historic data copies
- True: new data come in terminal

# static variable
locate a variable declared inside a function in permanent memory
- static variable initialized once
- values not lost at existing a function

# external variable
`extern int num;`
declared outside all functions and is global one
before any function that contains external function call

can use program parameter window to change external var value

GlobalVariableSet, GlobalVariableGet, GlobalVariableDel

# trading operation
OrderSend(): open market and pending orders
OrderClose()
OrderDelete(): delete pending orders
OrderModify()

## server
right to execute trade requests only to dealer 
request delivered in server can either executed / rejected

may reject if open/delete/modify pending orders too frequent

## conflict in making trades
client terminal could process only 1 request in a time

## order type
### market order
buy: buying of assets for a symbol
sell: selling of assets for a symbol

### pending order
BuyLimit: buy when Ask <= BuyLimit
SellLimit: sell when Bid >= SellLimit
BuyStop: buy when Ask >= BuyStop
SellStop: sell when Bid <= SellStop

Lot: volume of an order expressed in amount of lots
StopLoss: stop order, market order closed if producing loss
TakeProfit: stop order, market order closed if producing profit

# principle
All trades performed at correct price
Execution price for each trade is calculated on basis of correct price of a two-way quote

## limitation 
minimum distance: diff between current and stop-order price
  - normally distance 1 - 15 points

freeze distance: limits possibility to modify requested prices of opening your pending orders
  - eg. broker's prescription = 10, market price = 1.3800, pending order = 1.3807
  => pending order in freeze area

StopLoss, TakeProfit , BuyLimit, BuyStop, SellLimit, SellStop
cannot be placed closer to market price than minimum distance

# order
int OrderSend (string symbol, int cmd, double volume, double price, int slippage, 
double stoploss,
double takeprofit, string comment=NULL, int magic=0, datetime expiration=0, 
color arrow_color=CLR_NONE)



















