-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

DROP TABLE `CustomerAttemptQuestions`;

DROP TABLE `CustomerAttempts`;

DROP TABLE `Customers`;

DROP TABLE `Stages`;

DROP TABLE `Answers`;

DROP TABLE `Questions`;

DROP TABLE `Users`;


-- ************************************** `Users`

CREATE TABLE `Users`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `name`       varchar(50) NOT NULL ,
 `email`      varchar(100) NOT NULL ,
 `password`   varchar(100) NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;


-- ************************************** `Questions`

CREATE TABLE `Questions`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `title`       varchar(250) NOT NULL ,
 `value`       int NOT NULL ,
 `active`      tinyint NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,
 `description` varchar(1000) NULL ,
 `image_url`   varchar(1000) NULL ,

PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;


-- ************************************** `Answers`

CREATE TABLE `Answers`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `name`        varchar(250) NOT NULL ,
 `valid`       tinyint NOT NULL ,
 `active`      tinyint NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,
 `question_id` int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_21` (`question_id`),
CONSTRAINT `FK_question_id_14` FOREIGN KEY `fkIdx_21` (`question_id`) REFERENCES `Questions` (`id`)
) AUTO_INCREMENT=1;



-- ************************************** `Stages`

CREATE TABLE `Stages`
(
 `id`         int NOT NULL ,
 `name`       varchar(45) NOT NULL ,
 `active`     tinyint NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Customers`

CREATE TABLE `Customers`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `name`       varchar(250) NOT NULL ,
 `email`      varchar(100) NOT NULL ,
 `cpf`        varchar(14) NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,
 `active`     tinyint NOT NULL ,

PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;




-- ************************************** `CustomerAttempts`

CREATE TABLE `CustomerAttempts`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `date_ini`    datetime NOT NULL ,
 `date_end`    datetime NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,
 `customer_id` int NOT NULL ,
 `stage_id`    int NOT NULL ,
 `approved`    tinyint NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_30` (`customer_id`),
CONSTRAINT `FK_customer_id_34` FOREIGN KEY `fkIdx_30` (`customer_id`) REFERENCES `Customers` (`id`),
KEY `fkIdx_33` (`stage_id`),
CONSTRAINT `FK_stage_id_33` FOREIGN KEY `fkIdx_33` (`stage_id`) REFERENCES `Stages` (`id`)
) AUTO_INCREMENT=1;


-- ************************************** `CustomerAttemptQuestions`

CREATE TABLE `CustomerAttemptQuestions`
(
 `id`                  int NOT NULL AUTO_INCREMENT ,
 `created_at`          datetime NOT NULL ,
 `updated_at`          datetime NOT NULL ,
 `customer_attempt_id` int NOT NULL ,
 `question_id`         int NOT NULL ,
 `answer_id`           int NULL ,
 `order`               int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_46` (`customer_attempt_id`),
CONSTRAINT `FK_customer_attempt_id_46` FOREIGN KEY `fkIdx_46` (`customer_attempt_id`) REFERENCES `CustomerAttempts` (`id`),
KEY `fkIdx_49` (`question_id`),
CONSTRAINT `FK_question_id_49` FOREIGN KEY `fkIdx_49` (`question_id`) REFERENCES `Questions` (`id`),
KEY `fkIdx_52` (`answer_id`),
CONSTRAINT `FK_answer_id_52` FOREIGN KEY `fkIdx_52` (`answer_id`) REFERENCES `Answers` (`id`)
) AUTO_INCREMENT=1;