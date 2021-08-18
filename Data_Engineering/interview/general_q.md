# why study data engineering


# toughest thing about being a data engineer


# incident where supposed to bring data together but faced unexpected issues


# how is job of data engineer different from data architect
data architect: managing servers and building architecture of data system of a company
  - comprehensive mastery of all technologies that all other positions have
  - maximize performance
  - dynamic scale as needed
  - MPP

data engineer: test and maintain that architecture
  - use fast, scalable, intuitive database
  - develop code that utilize SDK to access data 
  - visualize data stored

## analogy to building house
architect: work with owner to understand their needs, draw diagrams to match req
engineer: work onsite to make sure building is structurally sound
builder: swing the hammer to make sure house gets built


<!-- ==================== -->

# what are big data's 4 V's 


# how is structured data different from unstructured data


# which ETL tools are you familiar


# tell us about design schemas of data modelling

# star VS snowflake schema

# data warehouse VS operational database
| Data warehouse                                        | operational db                       |
|-------------------------------------------------------|--------------------------------------|
| support analytical processing of high volume          | transactional process of high volume |
| historical data affect                                | current data affect                  |
| new, non-volatile data added regularly, unchanged     | data updated regularly               |
| designed for business measures by attr, subject areas | real-time processing                 |
| handful of OLTP like concurrent clients               | support many concurrent clients      |
| subject-oriented                                      | process oriented                     |
| data out                                              | data in                              |

# OLTP VS OLAP
| OLTP                                    | OLAP                                               |
|-----------------------------------------|----------------------------------------------------|
| operational data                        | informational data                                 |
| customer oriented                       | market-oriented                                    |
| manage current data for decision making | hugely historical data, facilities for aggregation |

# database VS datalake VS data warehouse
database: typically structured with defined schema

data warehouse: exist on top of several db, used for business intelligence
  - created a layer optimized to perform data analytics 

datalake: centralized repository for structued and unstructured data storage
  - store raw data
  - no need any ETL / transformation

# have you ever worked with Hadoop framework?


# mention import features of Hadoop


# how to increase business revenue by analyzing big data


# while deploying big data solution, what steps must follow


# challenge faced while introducing new data analytics applications 
I have been a part of introducing new data analytics in my previous company. The entire process is elaborate and needs a well-planned process for a smoothest possible transition.

However, even with immaculate planning, we can’t always avoid unforeseen circumstances and issues. One such issue was an incredibly high demand for user licenses. It went over and beyond what we expected. For obtaining the additional licenses, the company had to reallocate the financial resources.

Also, training had to be planned in a way that it doesn’t hamper the workflow. Also, we had to optimize the infrastructure to support the high number of users.

# is building NoSQL database better than building a relational db ?
In some situations, it might be beneficial to build a NoSQL database. In my last company when the franchise system was exponentially increasing in size, we had to scale up quickly for making the most of all operational and sales data we had.

Scaling out is better than scaling up with bigger servers when handling the increased data processing load. It is cost-effective and easier to accomplish with NoSQL databases as it can easily deal with huge volumes of data. That comes in handy when you need to respond quickly to considerable data load shifts in the future.

Although relational databases come with better connectivity to any analytics tools. But NoSQL databases have a lot to offer.


# what do you do when encounter unexpected problem with data maintenance?
data maintenance might be a routine task but it is vital to closely watch the specific tasks, including making sure of successful execution of the scripts.

Once while conducting the integrity check, I came across a corrupt index that could have caused serious issues in the future. That’s why I came up with a new maintenance task for preventing the addition of corrupt indexes into the database of the company.


# Have you ever trained someone in your field? If yes, what have you found most challenging about it?


# What are the pros and cons of working in cloud computing?

# work of data engineers usually backstage. Are you comfortable working away from spotlight


# Have you ever found a new innovative use for already existing data? Did it affect the company positively?
This question is meant for them to find out if you are self-motivated and eager enough to contribute to the success of the projects. If possible, answer the question with an example where you took the charge of a project or came up with an idea. And if you ever presented a novel solution to a problem, don’t miss it either.

In my last job, I took part in finding out why we have a high employee turnover rate. I observed the data closely from various departments where I found highly correlated data in key areas like finance, marketing, operations, etc. and the rate of employee turnover.

Collaborated with the department analysts for a better understanding of those correlations. With our understanding, we made some strategic changes that affected the employee turnover rate positively.

# What non-technical skills do you think comes in most handy as a data engineer?
Try to avoid the most obvious answers like communicating or interpersonal skills. 

prioritizing and multitasking have often come in handy in my job. We get various tasks in a day because we work with different departments. And hence, it becomes vital that we prioritize them. It makes our work easy and helps us efficiently finishing them all.


# What are some common problems you have faced as a data engineer?
Continuous and real-time integration.
Storing huge amounts of data and information from those data.
Constraints of resources.
Considering which tools to use and which ones can deliver the best results.











