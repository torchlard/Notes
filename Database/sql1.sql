declare @ps float
select @ps = count(distinct player_id) from Activity;

with a2 as (
select min(event_date) as event_date, player_id
		from Activity
		group by player_id
)
select round(count(distinct a1.player_id) / @ps, 2) as fraction
from Activity a1
	inner join a2
		on a1.event_date = DATEADD(day, 1, a2.event_date) 
        and a1.player_id  = a2.player_id 


select 
round(cast(sum(
	case when datediff(day,first_login, event_date)=1 then 1 else 0 end) as float)
			/ count(distinct player_id),2) as fraction
from
(    
    select
    player_id, 
    device_id,
    event_date,
    first_value(event_date) over(partition by player_id order by event_date) as first_login
    from sales.Activity
)t

select Name from Candidate c
inner join (
        select CandidateId from Vote 
        group by CandidateId
        order by count(*) desc 
        offset 0 rows
        fetch first 1 row only
) as t1
on t1.CandidateId = c.id


select d.Name as Department, t1.Name as Employee, t1.Salary
from Department d 
inner join (
  select Name, DENSE_RANK() over(partition by DepartmentId order by Salary desc) as rk
    ,DepartmentId, Salary
  from Employee 
) as t1
	on t1.DepartmentID = d.Id 
where t1.rk <= 3

SELECT
    d.Name AS 'Department', e1.Name AS 'Employee', e1.Salary
FROM
    Employee e1
        JOIN
    Department d ON e1.DepartmentId = d.Id
WHERE
     (SELECT
            COUNT(DISTINCT e2.Salary)
        FROM
            Employee e2
        WHERE
            e2.Salary > e1.Salary
                AND e1.DepartmentId = e2.DepartmentId
        ) < 3

select Request_at as Day,
   round(cast(sum(case when Status!='completed' then 1 else 0 end) as float)/ count(*) ,2) as 'Cancellation Rate'
from Trips t1
    inner join Users u on t1.Client_Id = u.Users_Id and u.Banned = 'No'
where Request_at between '2013-10-01' and '2013-10-03'
group by Request_at

select Id,Company,Salary
from (
		select ROW_NUMBER() over(partition by Company order by Salary) as rk,*,
			cast(count(*) over(partition by Company) as float) as ct
		from Employee e 
	 ) as t1
where rk=floor(ct/2+0.5) or rk=ceiling(ct/2+0.5)


select sum(Salary) over() as p from Employee e  => SUM OVER ALL
select sum(Frequency) over(order by Number rows between unbounded preceding and current row) as rk

declare @tot float
select @tot = sum(Frequency) from Numbers;

select avg(t1.Number*1.0) as median from (
select sum(Frequency) over(order by Number) as high, 
    isnull(sum(Frequency) over(order by Number rows between UNBOUNDED preceding and 1 preceding), 0)+1 as low, Number
from Numbers 
) as t1
where (floor(@tot/2.0+0.5) between low and high) or (ceiling(@tot/2.0+0.5) between low and high)

select t1.Number, max(t1.p), isnull(sum(n3.Frequency),0)+1
from (
    select n1.Number as Number, sum(n2.Frequency) as p
    from Numbers n1 
    left join Numbers n2 on n1.Number >= n2.Number
    group by n1.Number
) t1
left join Numbers n3 on t1.Number > n3.Number
group by t1.Number


with rk as(
    select *, sum(frequency) over(order by number) as cs from numbers
)
select avg(number*1.00) as median from rk
where (select sum(frequency)/2.0 from rk) between cs-frequency and cs

select Id,Month,Salary
from (
select e.Id, e.Month, sum(Salary) over(partition by e.Id order by e.Month rows 2 preceding) as Salary,
    max(Month) over(partition by Id) as maxm
from Employee e
) as t1
where Month != maxm
order by Id, Month desc

with cte as (
    select * 
    from Stadium
    where people >= 100
)
select cte.*
from cte inner join (
    select distinct two as two from (
        select count(*) over(partition by one) as ct, one, two from (
            select c1.id as one, c2.id as two
            from cte c1 inner join cte c2 
                on c2.id = c1.id-2 or c2.id = c1.id-1 or c2.id = c1.id
            ) t1
        ) t2 
    where ct = 3
) t3 on t3.two = cte.id
order by id

with cte as (
select distinct spend_date as dt from spending
), cte2 as (
	select dt as spend_date,'both' platform, 0 total_amount, 0 total_users from cte union all
	select dt as spend_date,'mobile' platform, 0 total_amount, 0 total_users from cte union all
	select dt as spend_date,'desktop' platform, 0 total_amount, 0 total_users from cte 
), cte3 as (
	select spend_date, max(pt) platform, sum(amount) total_amount, count(distinct user_id) total_users 
	from (
	select *, case when ct=2 then 'both' else platform end as pt 
	from (
	SELECT 
		DENSE_RANK() over(partition by spend_date, user_id order by platform) 
		+ DENSE_RANK() over(partition by spend_date, user_id order by platform desc) -1 as ct,*
	from Spending s 
	) t1
	) t2 
	group by spend_date, pt 
)
select spend_date,platform,sum(total_amount) total_amount, sum(total_users) total_users from (
	select * from cte3 union all select * from cte2
) t1 group by spend_date,platform







