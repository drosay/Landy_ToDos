
CREATE TABLE user (
  id INT NOT NULL,
  username VARCHAR(15) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  email VARCHAR(45) NOT NULL,
  pass VARCHAR(50) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
  UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);

CREATE TABLE work_group (
  id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(70) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);

CREATE TABLE task (
  id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(45) NOT NULL,
  description TEXT NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL,
  work_group_id INT NULL,
  PRIMARY KEY (id),
  INDEX user_id_idx (user_id ASC) VISIBLE,
  INDEX fk_task_work_group1_idx (work_group_id ASC) VISIBLE,
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  CONSTRAINT user_id
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT work_group
    FOREIGN KEY (work_group_id)
    REFERENCES work_group (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE user_has_work_group (
  id INT NOT NULL,
  user_id INT NOT NULL,
  work_group_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_user_has_work_group_work_group1_idx (work_group_id ASC) VISIBLE,
  INDEX fk_user_has_work_group_user1_idx (user_id ASC) VISIBLE,
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  CONSTRAINT user_has_work_group_user
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_has_work_group_work_group
    FOREIGN KEY (work_group_id)
    REFERENCES work_group (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);