CREATE TABLE users(
  id serial primary key,
  email varchar(150),
  hash text,
  is_admin boolean
)