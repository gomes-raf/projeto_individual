CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  senha VARCHAR(255),
  tipo_de_acesso VARCHAR(50)
);

CREATE TABLE salas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100)
);

CREATE TABLE agendamentos (
  id SERIAL PRIMARY KEY,
  id_usuario INTEGER,
  id_sala INTEGER,
  tempo INTEGER,

  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_sala) REFERENCES salas(id)
);