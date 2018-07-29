# Class of automata
Combinational logic: digital logic implemented by boolean circuit 
⊆ finite state machine: 
⊆ pushdown automation 
⊆ Turing machine

# Electronics
## adder
used in ALU, calculate address, +/- operator
### half adder
note: A,B: inputs, C=carrier, S=sum
A | B | C | S
--|---|---|---
0 | 0 | 0 | 0
1 | 0 | 0 | 1
0 | 1 | 0 | 1
1 | 1 | 1 | 0

### full adder
A,B=input, C_in=carrier from previous less sig. bit
C_out=carrier of output, S=sum

Input        | Output
A | B | C_in | C_out | S
--|---|------|-------|---
0 | 0 | 0    | 0     | 0
0 | 0 | 1    | 0     | 1
0 | 1 | 0    | 0     | 1
0 | 1 | 1    | 1     | 0
1 | 0 | 0    | 0     | 1
1 | 0 | 1    | 1     | 0
1 | 1 | 0    | 1     | 0
1 | 1 | 1    | 1     | 1

## multiplexer(mux)
device that select one of several analog/digital input signal and forward to single line
- 2^n inputs has n select lines
oftern multiplexer and demultiplexer combined together into single equipment => multiplexer

### 2-to-1 multiplexer
Z = AS'+BS
Z controlled by S, 0->A, 1->B

S | A | B | Z
--|---|---|---
0 | 0 | 0 | 0
0 | 0 | 1 | 0
0 | 1 | 0 | 1
0 | 1 | 1 | 1
1 | 0 | 0 | 0
1 | 0 | 1 | 1
1 | 1 | 0 | 0
1 | 1 | 1 | 1

### 4-to-1 multiplexer
input: A,B,C,D
selector: S0,S1
output: Z
Z = A*S0'*S1' + B*S0*S1' + C*S0'*S1 + D*S0*S1

S0 | S1 | Z
---|----|---
0  | 0  | A
1  | 0  | B
0  | 1  | C
1  | 1  | D

make use of property that different S0,S1 select different input signal, can implement any logic by considering table of boolean

### usage
data routing
logic function generator:
- duplicate logic of any truth table
- abruptly reduce num of logic gates / integrated circuits to perform logic function
parallel to serial conversion
larger multiplexers can be constructed by using smaller multiplexers by chaining together
- 8-to-1 => two 4-to-1 + one 2-to-1

## demultiplexer 
take single input signal -> many data-output-line
eg. volume up/dpwn in TV set

## synchronous logic circuit
electronic oscillator generate repetitive pulses = clock signal -> applied to memory elements = flip-flop
- output of all memory elements = state of circuit
- slow, because maximum possible clock rate depends on longest propagation delay (time for signal to propagate through logic gates)

## Asynchronous circuit
sequential digital logic circuit not governed by clock circuit / global clock signal
- use signals that indicate completion of instrucitons and operations, specified by simple data transfer protocols
- may have race condition: transition on two inputs arrive at same time -> go to wrong state
- use in spped critical system, eg. signal processing circuits

# Sequential logic
output depends on present input signal & sequence of past inputs

# logic family
group of electronic logic gates using one of several different designs

## monolithic integrated circuit logic families

### resistor-transistor logic
### diode-transistor logic
### emitter-coupled logic*

### gunning transceiver logic
### TTL (transistor-transistor logic)*
in old times TTL is faster, now CMOS faster
form by resistor and transistor, diode

### PMOS (P-type metal-oxide-semiconductor logic)
### NMOS*
### integrated injection logic
### BiCMOS*
### CMOS*
- use complementary & symmetrical pairs of p-type and n-type metal oxide semiconductor field effect transsistor (MOSFETs)
- high noise immunity, low static power consumption
- allow high desity of logic functions on chip => CMOS most used tech in VLSI

PMOS: reverse input, NMOS: keep input

invertor by CMOS style (same inputs, Vdd->1, ground->0):

        Vdd
input -->| [PMOS]
         |---- output
input -->| [NMOS]
      Ground



## static logic
## dynamic logic

# FET (field-effect transistor)
transistor that use electric field to control electrical behaviour of device
3 terminals: 
source: carrier enter channel
drain: carrier leaves channel
gate: modulates channel conductivity by applying voltage

## MOSFET
    |   |  |
    |   |  |
    |  |G| |
 --------------
   |n+|  |n+|
        P
 --------------










