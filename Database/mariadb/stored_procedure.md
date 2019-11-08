```sql
delimiter //
CREATE OR REPLACE PROCEDURE xxx(OUT outs date)
BEGIN
  DECLARE _day date;
  DECLARE _time1 datetime;
  DECLARE _time2 datetime;
  SET _day = '2019-02-01';
  SET _time1 = _day;
  SET _time2 = concat(_day, ' 23.59.59.99999');

  WHILE _day < '2019-02-15' do
    SELECT _day INTO outs;
    SET _day = date_add(_day, INTERVAL 1 day);
  END WHILE;
  
END //
delimiter ;

CALL xxx(@a);
SELECT @a;

-- =================
-- loop by date

delimiter //
CREATE OR REPLACE PROCEDURE xxx(IN t1 date, IN t2 date)
BEGIN
  DECLARE _day date;
  DECLARE _time1 datetime;
  DECLARE _time2 datetime;
  SET _day = t1;
  SET _time1 = _day;
  SET _time2 = concat(_day, ' 23.59.59.99999');

  WHILE _day <= t2 DO
    UPDATE xxx
    INNER JOIN (
      SELECT  
        xxx, date(...)
      FROM yyy
        INNER JOIN ...
      WHERE ...  
      GROUP BY ...
    )  uu 
      ON ...
    SET aa=bb;
    
    SET _day = date_add(_day, INTERVAL 1 day);
  END WHILE;
END //
delimiter ;

CALL xxx('2019-02-01', '2019-02-10');

```