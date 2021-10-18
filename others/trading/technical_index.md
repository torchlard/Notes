# MACD (moving average convergence divergence)
exponential moving average (EMA)
- higher weighting on recent dates

DIF = long term EMA - short term EMA
DEM = find EMA of DIF

fast line: DIF more responsive to price change
slow line: DEM less responsive to price change

gloden cross: fast line break slow line from bottom
death cross: fast line break slow line from above

MACD BAR/OSC: fast_line - slow_line

MACD是一種趨勢分析指標，不宜同時分析不同的市場環境。以下為三種交易訊號：
- 差離值（DIF值）與訊號線（DEM值，又稱MACD值）相交
- 差離值與零軸相交
- 股價與差離值的背離
k

# RSI (relative strenth index)
RSI = n_days_rise_avg / (n_days_rise_avg + n_days_fall_avg)

RSI > 50%              => rise
RSI < 50%              => fall
RSI > 80% or RSI < 20% => too much rise/fall, may invert

評估買賣盤雙方力道的強弱
上漲下跌走勢的趨勢乾淨程度
多方或空方力量越強，走勢就越乾淨、指標數值也越極端

## RSI指標背離
RSI走勢變化方向和股價走勢不一定一致

Bearish RSI Divergence: price new high, RSI go down => future go down
Bullish RSI Divergence: price new low, RSI go up => future go up


# KD index (Stochastic Oscillator)
calculate K value (fast line), D value (slow line)
RSV = (today_end - last_n_day_lowest) / (last_n_day_highest - last_n_day_lowest) x 100

current_K = previous_K*2/3 + current_RSV*1/3
current_D = previous_D*2/3 + current_K*1/3

K more responsive, D less responsive
K over D from bottom => rise
K over D from top => fall

if KD > 80, overprice
if KD < 20, underprice


## RSI VS KD
KD指標呈現「最新股價的相對高低位置」，估股價目前處於相對高點或低點
RSI指標呈現「一段時間內股價買盤與賣盤力量強弱比例


# B-band 布林通道
標準差的理論來判斷股價和標準差偏離多少

use average price fluctuation +-2 std => upper,lower limit
95% price within this region, if outside then return back

股性越活潑B-band布林通道數字越寬


# KDJ 隨機指標



# fibonacci
0
0.382
0.5
0.618





# index type
## overlays
directly show on graph, change with price
eg. MA, ATR

## oscillator
show on bottom of price chart, has its own unit (eg. 0 to 100, -100 to +100)
eg. MACD, RSI











