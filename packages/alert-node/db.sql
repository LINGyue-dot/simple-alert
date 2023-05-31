create table alert_list(
    id INT NOT NULL AUTO_INCREMENT,
    project varchar(255),/* 项目名称 */
    env varchar(255), /* 环境 test 还是 production */
    version varchar(255),/* 版本 */
    type varchar(255),/* 错误类型 */
    data LONGTEXT,/* 具体上报的 JSON 数据 */
    fixed BOOLEAN,/* 是否修复 */
    hash text, /* 错误的 hash 值，用来识别是否同一错误 */
    PRIMARY KEY (id)
);