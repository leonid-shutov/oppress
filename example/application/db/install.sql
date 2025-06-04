DROP DATABASE IF EXISTS application;

DROP USER IF EXISTS leonid;

CREATE USER leonid
WITH
  PASSWORD 'leonid';

CREATE DATABASE application OWNER leonid;
