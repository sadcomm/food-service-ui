DROP TABLE IF EXISTS dic;

CREATE SEQUENCE IF NOT EXISTS dic_seq;

CREATE TABLE dic (
  id int NOT NULL DEFAULT NEXTVAL ('dic_seq'),
  name varchar(50) DEFAULT NULL,
  sign varchar(100) DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  PRIMARY KEY (id)
);

ALTER SEQUENCE dic_seq RESTART WITH 3;

-- LOCK TABLES dic WRITE;

INSERT INTO dic VALUES (1,'Тип оплаты','type_pay','2022-10-20 00:14:59'),(2,'Тип доставки','type_delivery','2022-10-20 00:14:59');

-- UNLOCK TABLES;

DROP TABLE IF EXISTS cls_order;

CREATE SEQUENCE cls_order_seq;

CREATE TABLE cls_order (
  id int NOT NULL DEFAULT NEXTVAL ('cls_order_seq'),
  reg_user_id int NOT NULL,
  status int DEFAULT NULL,
  cost double precision DEFAULT NULL,
  comment varchar(100) DEFAULT NULL,
  type_pay int DEFAULT NULL,
  status_pay int DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  updated_at timestamp(0) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- LOCK TABLES order WRITE;

-- UNLOCK TABLES;

DROP TABLE IF EXISTS cls_order_x_product;

CREATE TABLE cls_order_x_product (
  cls_order_id int NOT NULL,
  product_id int NOT NULL,
  cnt int DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  PRIMARY KEY (cls_order_id,product_id)
);

-- LOCK TABLES order_x_product WRITE;

-- UNLOCK TABLES;

DROP TABLE IF EXISTS product;

CREATE SEQUENCE product_seq;

CREATE TABLE product (
  id int NOT NULL DEFAULT NEXTVAL ('product_seq'),
  category_id int NOT NULL,
  name varchar(50) DEFAULT NULL,
  price double precision DEFAULT NULL,
  discount double precision DEFAULT NULL,
  imgs text DEFAULT NULL,
  summary varchar(100) DEFAULT NULL,
  description varchar(500) DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  updated_at timestamp(0) DEFAULT NULL,
  PRIMARY KEY (id)
)  ;

-- LOCK TABLES product WRITE;

-- UNLOCK TABLES;

DROP TABLE IF EXISTS product_category;

CREATE SEQUENCE product_category_seq;

CREATE TABLE product_category (
  id int NOT NULL DEFAULT NEXTVAL ('product_category_seq'),
  up int DEFAULT NULL,
  emoji varchar(5) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(100) DEFAULT NULL,
  thumb varchar(100) DEFAULT NULL,
  ord int DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  updated_at timestamp(0) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- LOCK TABLES product_category WRITE;

-- UNLOCK TABLES;

DROP TABLE IF EXISTS product_review;

CREATE SEQUENCE product_review_seq;

CREATE TABLE product_review (
  id int NOT NULL DEFAULT NEXTVAL ('product_review_seq'),
  product_id int NOT NULL,
  reg_user_id int NOT NULL,
  message varchar(1000) DEFAULT NULL,
  photos text DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  updated_at timestamp(0) DEFAULT NULL,
  PRIMARY KEY (id)
)  ;

-- LOCK TABLES product_review WRITE;

-- UNLOCK TABLES;

DROP TABLE IF EXISTS term;

CREATE SEQUENCE term_seq;

CREATE TABLE term (
  id int NOT NULL DEFAULT NEXTVAL ('term_seq'),
  dic_id int NOT NULL,
  term varchar(100) DEFAULT NULL,
  sign varchar(100) DEFAULT NULL,
  status int DEFAULT NULL,
  val int DEFAULT NULL,
  val_str varchar(300) DEFAULT NULL,
  val_js text DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  updated_at timestamp(0) DEFAULT NULL,
  PRIMARY KEY (id)
)  ;

-- LOCK TABLES term WRITE;

-- UNLOCK TABLES;

DROP TABLE IF EXISTS reg_user;

CREATE SEQUENCE reg_user_seq;

CREATE TABLE reg_user (
  id int NOT NULL DEFAULT NEXTVAL ('reg_user_seq'),
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  role int DEFAULT NULL,
  status int DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  phone varchar(50) DEFAULT NULL,
  login varchar(50) DEFAULT NULL,
  password varchar(50) DEFAULT NULL,
  telegram_uid varchar(50) DEFAULT NULL,
  created_at timestamp(0) DEFAULT now(),
  updated_at timestamp(0) DEFAULT NULL,
  PRIMARY KEY (id)
)   ;

ALTER SEQUENCE reg_user_seq RESTART WITH 2;

-- LOCK TABLES reg_user WRITE;

INSERT INTO reg_user VALUES (1,'Ivanov','Ivan',2,1,'ivan.cool@mail.ru','+79021999999','ivan.cool','098f6bcd4621d373cade4e832627b4f6','1782930937','2022-10-20 00:28:15',NULL);

-- UNLOCK TABLES;