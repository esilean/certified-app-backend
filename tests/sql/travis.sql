#CREATE DATABASE IF NOT EXISTS test;
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT ALL ON test.* TO 'dev'@'localhost';
USE test;

# Create Users
CREATE TABLE IF NOT EXISTS `Users`
(
 `id`          char(36) NOT NULL ,
 `name`       varchar(50) NOT NULL ,
 `email`      varchar(100) NOT NULL ,
 `password`   varchar(100) NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`),
UNIQUE KEY `Ind_email_72` (`email`)
);

insert into `test`.`Users` values ('x37592d6-a41d-4401-99a4-a87740afa2b7', 'Leandro', 'le@gmail.com', '$2b$10$grBLgJE0xqO6KvbG3ZqOAuxXWmmBam38K4FrQlomEr3XhwfsjCZqS', '2020-04-21 14:42:05', '2020-04-21 14:42:05');

# Create Questions
CREATE TABLE IF NOT EXISTS `Questions`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `title`       varchar(1000) NOT NULL ,
 `description` varchar(1000) NULL ,
 `value`       int NOT NULL ,
 `image_url`   varchar(1000) NULL ,
 `image_name`  varchar(250) NULL ,
 `image_key`   varchar(250) NULL ,
 `image_size`  int NULL,
 `active`      tinyint NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

# Create Answers
CREATE TABLE IF NOT EXISTS `Answers`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `name`        varchar(250) NOT NULL ,
 `valid`       tinyint NOT NULL ,
 `active`      tinyint NOT NULL ,
 `question_id` int NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_21` (`question_id`),
CONSTRAINT `FK_question_id_14` FOREIGN KEY `fkIdx_21` (`question_id`) REFERENCES `Questions` (`id`)
) AUTO_INCREMENT=1;

# Create Custmers
CREATE TABLE IF NOT EXISTS `Customers`
(
 `id`           char(36) NOT NULL ,
 `name`         varchar(250) NOT NULL ,
 `email`        varchar(100) NOT NULL ,
 `password`     varchar(100) NOT NULL ,
 `access_token` varchar(100) NULL ,
 `active`       tinyint NOT NULL ,
 `created_at`   datetime NOT NULL ,
 `updated_at`   datetime NOT NULL ,

PRIMARY KEY (`id`),
UNIQUE KEY `Ind_95_token` (`access_token`),
UNIQUE KEY `Ind_email_73` (`email`)
);

# Create Customeremails
CREATE TABLE IF NOT EXISTS `CustomerEmails`
(
 `id`          char(36) NOT NULL ,
 `customer_id` char(36) NOT NULL ,
 `email_from`  varchar(75) NOT NULL ,
 `email_to`    varchar(1000) NOT NULL ,
 `email_body`  varchar(1000) NOT NULL ,
 `subject`     varchar(250) NOT NULL ,
 `message_id`   varchar(100) NULL ,
 `error`       varchar(1000) NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_91` (`customer_id`),
CONSTRAINT `FK_customer_email_id_91` FOREIGN KEY `fkIdx_91` (`customer_id`) REFERENCES `Customers` (`id`)
);

# Create Stages
CREATE TABLE IF NOT EXISTS `Stages`
(
 `id`              int NOT NULL ,
 `name`            varchar(55) NOT NULL ,
 `title_ini`       varchar(150) NOT NULL ,
 `description_ini` varchar(4000) NOT NULL ,
 `video_url_ini`   varchar(250) NULL ,

 `title_end`       varchar(150) NOT NULL ,
 `description_end` varchar(4000) NOT NULL ,
 `video_url_end`   varchar(250) NULL ,

  `title_end_fail`       varchar(150) NOT NULL ,
 `description_end_fail` varchar(4000) NOT NULL ,
 `video_url_end_fail`   varchar(250) NULL ,

 `duration_min`    int NOT NULL ,
  `questions_qty`    int NOT NULL ,
  `grade_perc_min`    double NOT NULL ,
  `max_attempts`    int NOT NULL ,    

 `created_at`      datetime NOT NULL ,
 `updated_at`      datetime NOT NULL ,

PRIMARY KEY (`id`)
);

# Create CustomerStages
CREATE TABLE IF NOT EXISTS `CustomerStages`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `customer_id` char(36) NOT NULL ,
 `stage_id`    int NOT NULL ,
 `questions_qty`    int NOT NULL ,
 `duration_min`    int NOT NULL ,
 `grade_perc_min`    double NOT NULL ,
 `date_ini`    datetime NULL ,
 `date_end`    datetime NULL ,
 `approved`    tinyint NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_30` (`customer_id`),
CONSTRAINT `FK_customer_id_34` FOREIGN KEY `fkIdx_30` (`customer_id`) REFERENCES `Customers` (`id`),
KEY `fkIdx_33` (`stage_id`),
CONSTRAINT `FK_stage_id_33` FOREIGN KEY `fkIdx_33` (`stage_id`) REFERENCES `Stages` (`id`)
) AUTO_INCREMENT=1;

# Create CustomerStageOnes
CREATE TABLE IF NOT EXISTS `CustomerStageOnes`
(
 `id`                int NOT NULL AUTO_INCREMENT ,
 `customer_stage_id` int NOT NULL ,
 `question_id`       int NOT NULL ,
 `answer_id`         int NULL ,
 `value`             int NOT NULL ,
 `order`             int NOT NULL ,
 `created_at`        datetime NOT NULL ,
 `updated_at`        datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_46` (`customer_stage_id`),
CONSTRAINT `FK_customer_stage_id_46` FOREIGN KEY `fkIdx_46` (`customer_stage_id`) REFERENCES `CustomerStages` (`id`),
KEY `fkIdx_49` (`question_id`),
CONSTRAINT `FK_question_id_49` FOREIGN KEY `fkIdx_49` (`question_id`) REFERENCES `Questions` (`id`),
KEY `fkIdx_52` (`answer_id`),
CONSTRAINT `FK_answer_id_52` FOREIGN KEY `fkIdx_52` (`answer_id`) REFERENCES `Answers` (`id`)
) AUTO_INCREMENT=1;

# End



















