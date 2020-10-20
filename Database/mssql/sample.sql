CREATE FUNCTION getNthHighestSalary(@N INT) RETURNS INT AS
BEGIN
  declare @a INT;
  set @a = @N-1;
    RETURN (
        /* Write your T-SQL query statement below. */
        select distinct Salary from Employee 
          order by Salary desc
          offset @a rows
          fetch first 1 row only
    );
END

select distinct Num as ConsecutiveNums
  from ( select Num, Num + Id - row_number() over (partition by Num order by Id) as grp
	      from sales.Logs  ) as k
group by Num, grp
having count(*) >= 3

select d.Name as Department, k.Name as Employee, k.Salary
from (
select Salary, rank() over (partition by DepartmentId order by Salary desc) as r, DepartmentId, Name
from Employee e) as k
inner join Department d on k.DepartmentId = d.Id
where k.r = 1


select a1.player_id, a1.event_date, sum(a2.games_played) as games_played_so_far
from Activity a1
    left join Activity a2
        on a1.player_id = a2.player_id  
where a1.event_date >= a2.event_date
group by a1.player_id, a1.event_date




grep -E '^(\([0-9]{3}\) |[0-9]{3}\-)[0-9]{3}\-[0-9]{4}' file.txt

if [[ `wc -l file.txt | awk '{print $1}'` -lt 10 ]]; then
    echo ''
else
    head -n 10 file.txt | tail -n 1
fi

sed -n 10p file.txt
awk 'NR==10' file.txt



with cte1 as (
    select user_id, spend_date
    from Spending
    group by spend_date, user_id
    having count(distinct platform) = 2   
), cte2 as (
    select spend_date, platform, sum(amount) as total_amount, count(user_id) as total_users
    from Spending
    group by spend_date, platform
), cte3 as (
    select distinct spend_date as spend_date, 'both' platform
    from Spending
)
select * from (
select s.spend_date,'both' platform, sum(s.amount) as total_amount, count(distinct s.user_id) as total_users
from Spending s
    inner join cte1 on cte1.user_id = s.user_id and cte1.spend_date = s.spend_date
group by s.spend_date
    union all
select * from cte2
    union all
select distinct s.spend_date as spend_date, 'both' platform, 0 total_amount, 0 total_users
from Spending s
inner join cte1 on s.spend_date != cte1.spend_date
) t1 
order by spend_date, case when platform='desktop' then 0 
    when platform='mobile' then 1 else 2 end




