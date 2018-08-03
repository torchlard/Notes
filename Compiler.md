# introduction
abstract syntax, IR tree, assem: interface are form of data structure

source code 
-> 詞法分析: 分解為獨立單詞符號
-> 語法分析: 短語結構
-> 語義動作: Abstact Syntax Tree
-> 語義分析: 短語含義, 變量及聲明關聯, 類型
-> 棧幀布局: 變量, 函數参數.. 分配於紀錄
-> 翻譯: 生成中間表示樹
-> 規范化: 提取表達式中副作用, 整理條件分支
-> 指令選擇: IR 結合目標指令
-> 控制流分析: 分析指令, 執行時可能的所有流程
-> 數㨿流分析: 計算每一變量需使用其值的地點
-> 寄存器分配: 每一變量和臨時數據選寄存器, 不同活躍點共用register
-> 代碼流出: 機器寄存器替代每一指令的臨時變量名
























