create table alert_list(
    id INT NOT NULL AUTO_INCREMENT,
    project varchar(255),
    env varchar(255),
    version varchar(255),
    type varchar(255),
    data LONGTEXT,
    fixed BOOLEAN,
    hash text,
    PRIMARY KEY (id)
);