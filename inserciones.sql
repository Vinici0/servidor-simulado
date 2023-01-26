


INSERT INTO organizacions (name, status) VALUES ('Organizion', 1);

INSERT INTO trybes (name, status, id_organizacion) VALUES ('tribe1 ', 1, 1);
INSERT INTO trybes (name, status, id_organizacion) VALUES ('tribe1 ', 1, 1);

INSERT INTO repositories (name, state, status, id_tribe) VALUES ('repository2', 'E', 'A', 1);
INSERT INTO repositories (name, state, status, id_tribe) VALUES ('repository2', 'E', 'A', 1);

-- INNER JOIN DE OTAS LAS TABLAS
SELECT * FROM organizacions;
SELECT * FROM trybes;
SELECT * FROM repositories;
SELECT * FROM metrics;

SELECT * FROM organizacions INNER JOIN trybes ON organizacions.id = trybes.id_organizacion
INNER JOIN repositories ON trybes.id = repositories.id_tribe
INNER JOIN metrics ON repositories.id = metrics.id_repository;




