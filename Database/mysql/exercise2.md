```sql
use testdb;

create table Owner (
	SSN int primary key AUTO_INCREMENT,
	name varchar(30),
	SpouseName varchar(30),
	Profession varchar(30),
	SpouseProfessional varchar(20)
);

create table Office (
	OfficeID int primary key AUTO_INCREMENT,
	MgrName varchar(30),
	Phone int(10),
	Address varchar(60)
);

create table Agent (
	AgentID int AUTO_INCREMENT,
	Name varchar(20),
	Phone int(10),
	OfficeID int,
	primary key (AgentID),
	index (AgentID),
	constraint agent_office 
	foreign key (OfficeID) REFERENCES Office (OfficeID)
		on delete no action
);

create table Home (
	HomeID int primary key auto_increment,
	street varchar(100),
	city varchar(40),
	state char(4),
	zip int(6),
	NoBedrms bit(1),
	NoBaths bit(1),
	SqFt decimal(6,1),
	OwnOccupied bit(1),
	Commission decimal(7,1),
	SalesPrice decimal(10,2),
	SSN int,
	AgentID int,
	foreign key (SSN) references Owner(SSN),
	foreign key (AgentID) references Agent (AgentID)
);

-- ===========================================
create table Project (
	ProjNo int primary key auto_increment,
	ProjName varchar(30),
	index (ProjNo) 
);

create table Specialty (
	SpecNo int primary key AUTO_INCREMENT,
	SpecName varchar(30)
);

create table Contractor (
	ContrNo int primary key AUTO_INCREMENT,
	ContrName varchar(20),
	SpecNo int,
	foreign key (SpecNo) REFERENCES Specialty(SpecNo)
);

CREATE table ProjectNeeds (
	ProjNo int not null,
	SpecNo int not null,
	primary key (ProjNo, SpecNo),
	foreign key (ProjNo) references Project(ProjNo),
	foreign key (SpecNo) REFERENCES Specialty(SpecNo)
);

create table ProvidedBy ( 
	ContrNo int not null,
	ProjNo int not null,
	SpecNo int not null,
	PRIMARY key (ContrNo, ProjNo, SpecNo),
	FOREIGN key (ContrNo) REFERENCES Contractor(ContrNo) ,
	FOREIGN key (ProjNo,SpecNo) REFERENCES ProjectNeeds(ProjNo,SpecNo)
);

-- ==========================
create table Account ( 
	AccID int primary key,
	AccName varchar(30),
	Balance varchar(30),
	AccID_parent int,
	foreign key (AccID_parent) references Account (AccID)
);

-- ===========================




```


