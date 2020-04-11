
-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

DROP TABLE `CustomerStageOnes`;

DROP TABLE `CustomerStages`;

DROP TABLE `Customers`;

DROP TABLE `Answers`;

DROP TABLE `Questions`;

DROP TABLE `Stages`;

DROP TABLE `Users`;


-- **************************************
-- ************************************** `Users`

CREATE TABLE `Users`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `name`       varchar(50) NOT NULL ,
 `email`      varchar(100) NOT NULL ,
 `password`   varchar(100) NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`),
UNIQUE KEY `Ind_email_72` (`email`)
) AUTO_INCREMENT=1;

-- ************************************** `Stages`

CREATE TABLE `Stages`
(
 `id`              int NOT NULL ,
 `name`            varchar(45) NOT NULL ,
 `title_ini`       varchar(100) NOT NULL ,
 `description_ini` varchar(4000) NOT NULL ,
 `video_url_ini`   varchar(250) NULL ,
 `title_end`       varchar(100) NOT NULL ,
 `description_end` varchar(4000) NOT NULL ,
 `video_url_end`   varchar(250) NULL ,
 `duration_min`    int NOT NULL ,
 `question_qty`    int NOT NULL ,
 `created_at`      datetime NOT NULL ,
 `updated_at`      datetime NOT NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `Questions`

CREATE TABLE `Questions`
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

-- ************************************** `Answers`

CREATE TABLE `Answers`
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

-- ************************************** `Customers`

CREATE TABLE `Customers`
(
 `id`         int NOT NULL AUTO_INCREMENT ,
 `name`       varchar(250) NOT NULL ,
 `email`      varchar(100) NOT NULL ,
 `password`   varchar(100) NOT NULL ,
 `active`     tinyint NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`),
UNIQUE KEY `Ind_email_73` (`email`)
) AUTO_INCREMENT=1;

-- ************************************** `CustomerStages`

CREATE TABLE `CustomerStages`
(
 `id`          int NOT NULL AUTO_INCREMENT ,
 `customer_id` int NOT NULL ,
 `stage_id`    int NOT NULL ,
 `date_ini`    datetime NOT NULL ,
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

-- ************************************** `CustomerStageOne`

CREATE TABLE `CustomerStageOnes`
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



















