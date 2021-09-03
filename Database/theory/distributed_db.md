# key point
nodes sharing, replication start at which phase
coordination occur at which level and which phase

| architecture                       | layer            | product                         | scalability                 | availability                   | notes         |
|------------------------------------|------------------|---------------------------------|-----------------------------|--------------------------------|---------------|
| shared alone                       | none             | DBMS standalone                 | no                          | no                             |               |
| shared disk failover               | disk             | master-slave                    | general                     | general                        |               |
| shared disk parallel               | SE               | Oracle RAC                      | CPU and memory scale        | instance HA                    |               |
| shared nothing                     | JDBC, connection | DBMS(MySQL) + DBproxy           | read scale, write not scale | general, need replica election | popular in it |
| shared nothing certification based | PE ~ SE          | mysql group replication, galera | read, limited write         | election                       |               |
















