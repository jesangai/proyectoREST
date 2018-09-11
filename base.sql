CREATE TABLE public.usuarios (
    id SERIAL PRIMARY KEY,
    nombre character varying(100),
    usuario character varying(50),
    pass character varying(255)
);
CREATE TABLE public.alumnos (
    id SERIAL PRIMARY KEY,
    nombre character varying(100),
    avatar character varying(255),
    puntaje integer not null
);
CREATE TABLE public.excursiones (
    id SERIAL PRIMARY KEY,
    titulo character varying(100),
    descripcion character varying(255),
    creditos character varying(255),
    portada character varying(255),
    idusuario integer not null
);
CREATE TABLE public.pasos (
    id SERIAL PRIMARY KEY,
    video character varying(255),
    pregunta character varying(255),
    respuesta integer not null,
    opciona character varying(255),
    opcionb character varying(255),
    opcionc character varying(255),
    idexcursion integer not null
);


ALTER TABLE ONLY public.excursiones
    ADD CONSTRAINT fk_excursion_usuario FOREIGN KEY (idusuario) REFERENCES public.usuarios(id);
    
ALTER TABLE ONLY public.pasos
    ADD CONSTRAINT fk_pasos_excursion FOREIGN KEY (idexcursion) REFERENCES public.excursiones(id);
    
INSERT INTO usuarios (nombre,usuario,pass) VALUES ('jessica','jesangai','bryan'),('Nancy','nchalen','jhoncito'),('Olga','olguis','123');

INSERT INTO alumnos (nombre,avatar,puntaje) VALUES ('Bryan','..\/excursiones\/user1.jpg',0),('Jhoncito','..\/excursiones\/user3.jpg',0),('Samantha','..\/excursiones\/user5.jpg',0),('Joseline','..\/excursiones\/user7.jpg',0);

INSERT INTO excursiones (titulo,descripcion,creditos,portada,idusuario) VALUES ('Planetas','El sistema solar','Jessi','..\/excursiones\/sistemaSolar.png',1),('El Lobo y los Siete Cabritos','Cuento infantil','Nancy','..\/excursiones\/loboycabritos.jpeg',2);

INSERT INTO pasos (video,pregunta,respuesta,opciona,opcionb,opcionc,idexcursion) VALUES ('//www.youtube.com/embed/-1_Is6fJqdU','..\/excursiones\/audio1.wav',1,'..\/excursiones\/pl1.jpeg','..\/excursiones\/pl2.jpeg','..\/excursiones\/pl3.jpeg',1),('//www.youtube.com/embed/-1_Is6fJqdU','..\/excursiones\/audio2.wav',3,'..\/excursiones\/pl5.jpeg','..\/excursiones\/pl1.jpeg','..\/excursiones\/mercurio.png',1),('//www.youtube.com/embed/pRFhHgoW6Nk','..\/excursiones\/audio3.wav',3,'..\/excursiones\/letra.png','..\/excursiones\/letra_A.png','..\/excursiones\/hoja.png',2);