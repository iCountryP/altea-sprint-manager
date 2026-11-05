-- ALTEA · Sprint 2. Ejecutar UNA VEZ en Supabase > SQL Editor.
-- Seguro si se ejecuta varias veces: no modifica filas existentes.
-- Mantiene intactos los estados, responsables, prioridades y notas de las tareas 01–15.
insert into public.altea_tasks(board_id,code,category,title,description,hours,modules,status,owner,priority,notes,updated_by)
values
('altea-sprint-1','16','MOTILLA','MOTILLA #2','Segona motilla del projecte. L’enunciat no inclou més indicacions.',4,ARRAY['MP06','MP07','MP08','MP09'],'todo','','normal','',''),
('altea-sprint-1','17','SRV','Disseny i implementació de la base de dades','Dissenyar i implementar la BD, amb diagrama a la wiki. Les zones d’entrades numerades han de ser rectangulars i definides per files i seients; cal representar les reserves. ABANS de la implementació, enviar el disseny al professor per validar-lo.',3,ARRAY['MP06'],'todo','','normal','',''),
('altea-sprint-1','18','SRV','Migració del catàleg XML i de les connexions a BD','Migrar l’XML a la BD i migrar/adaptar les connexions. Integrar amb el disseny validat a la tasca 17.',3,ARRAY['MP06','MP09'],'todo','','normal','',''),
('altea-sprint-1','19','DESKTOP','Mapa del recinte i estat de les butaques','Representació gràfica del recinte: seients lliures/venuts i ocupació de cada zona segons aforament. Accés al detall de venda des de cada seient venut. Incloure dades de prova amb seients venuts.',3,ARRAY['MP06','MP07'],'todo','','normal','',''),
('altea-sprint-1','20','APP + SRV','Les meves entrades: recuperar i mostrar les compres','Vista de les entrades del comprador recuperades del servidor. Cada entrada mostra esdeveniment, tipus, seient (si en té) i titular.',2,ARRAY['MP06','MP08','MP09'],'todo','','normal','','')
on conflict (board_id,code) do nothing;

-- Comprovació: ha de tornar una fila amb total_tasques = 20 i sprint_2 = 5.
select count(*) as total_tasques,
       count(*) filter (where code in ('16','17','18','19','20')) as sprint_2
from public.altea_tasks where board_id = 'altea-sprint-1';
