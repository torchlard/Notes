# programming tools
## custom indicator
graphcis display market regularities according to algorithm in program

2 types: technical(built-in), custom indicators

## Expert Advisor
allow partial / fully automated trading
program coded in MQL4 and called by client terminal to be executed at every kick

if new tick come when program execute
- program pass control to client terminal only upon completion

## script
program for one-time action, for performing operations

# tick
event that new price of symbol at some instant
Expert Advisor(EA) doesn't work continuously all the time
- normal EA complete 1 information-processing cycle in 1/10 - 1/100 second



# Trading
trading instruction: open, close, modify orders

## simultaneous use
EA: attach only 1 EA in 1 symbol window
script: only 1 script in 1 symbol window
custom indicator: can attach many indicators in 1 symbol window

can launch many windows for 1 symbol => EA can work simultaneously


# file type
mq4: program source code
ex4: compiled program ready for practical use
mqh: include fiels, source of frequently used custom program
  - include in stage of compilation


















