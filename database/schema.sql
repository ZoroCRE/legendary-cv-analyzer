create table if not exists keyword_lists (
  id serial primary key,
  list_name text not null,
  keywords text[] not null
);

create table if not exists cv_results (
  id serial primary key,
  file_name text not null,
  match_percentage int not null,
  created_at timestamp default now()
);
