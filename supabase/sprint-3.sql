-- ALTEA · Sprint 3 (11–18 novembre 2026). Migració segura.
-- Afegeix exclusivament les tasques 21–29 al tauler existent.
-- Es pot executar més d'una vegada. No modifica les tasques dels sprints 1 i 2.
insert into public.altea_tasks (board_id, code, category, title, description, hours, modules, status, owner, priority, notes, updated_by)
values
('altea-sprint-1','21','MOTXILLA','MOTXILLA #3','Tercera motxilla del projecte. L''enunciat no inclou més indicacions.',3,ARRAY['MP06','MP07','MP08','MP09'],'todo','','normal','',''),
('altea-sprint-1','22','APP + SRV','Selecció de seients numerats per zona','L''APP demana al servidor l''estat de les butaques d''una zona per a un esdeveniment i un tipus d''entrada numerada, i mostra una graella rectangular de files per seients. Diferenciar lliures, venudes i seleccionades. Tocar una butaca lliure l''afegeix a la cistella; tornar-la a tocar la desselecciona i la treu de la cistella.',3,ARRAY['MP06','MP08','MP09'],'todo','','normal','',''),
('altea-sprint-1','23','APP + SRV','Compra atòmica d''entrades numerades i generals','El botó COMPRAR envia al servidor les butaques seleccionades. Registrar la compra a BD amb un localitzador únic per entrada. Evitar la doble venda i superar quotes. Si alguna entrada no està disponible, rebutjar tota l''operació i mostrar quines butaques han fallat, marcant-les amb error. Les entrades generals de la cistella es compren conjuntament. Si tot va bé, mostrar els localitzadors i treure les entrades comprades de la cistella.',2,ARRAY['MP06','MP08','MP09'],'todo','','normal','',''),
('altea-sprint-1','24','APP','Configuració de servidor i dades del comprador','Permetre canviar la URL del servidor i el nom del comprador, però no el correu electrònic. Les entrades ja comprades conserven el nom que tenien en el moment de la compra.',1,ARRAY['MP08'],'todo','','normal','',''),
('altea-sprint-1','25','APP','Cistella: quantitats d''entrades i eliminació','Augmentar o disminuir quantitats d''entrades generals. Quan la quantitat d''una línia arribi a zero, demanar confirmació i eliminar-la. Les butaques numerades no tenen quantitat: permetre eliminar-les amb confirmació i deixar-les de mostrar com a seleccionades al mapa.',2,ARRAY['MP08'],'todo','','normal','',''),
('altea-sprint-1','26','SRV + DESKTOP','Llistat cronològic d''entrades venudes','Sota el mapa de sala d''un esdeveniment, mostrar les entrades venudes en ordre cronològic. Per a cada entrada: data i hora de compra, localitzador, tipus, seient si en té, nom del comprador i estat.',3,ARRAY['MP06','MP07','MP09'],'todo','','normal','',''),
('altea-sprint-1','27','DESKTOP','Configuració d''ubicació i servidor al DESKTOP','Permetre canviar ubicació (taquilla, porta, oficina) i URL del servidor. Connectar al servidor nou i informar de l''èxit o de l''error. Mostrar o amagar funcionalitats segons la ubicació, amb només el validador en mode porta. Guardar a CONFIG.XML.',2,ARRAY['MP06','MP07','MP09'],'todo','','normal','',''),
('altea-sprint-1','28','SRV + DESKTOP','Validació d''entrades per localitzador en mode porta','En mode porta, introduir un localitzador. El servidor comprova la seva validesa, marca l''entrada validada i rebutja codis inexistents o ja validats. Mostrar el titular, tipus i seient de les entrades vàlides, o el motiu del rebuig.',3,ARRAY['MP06','MP07','MP09'],'todo','','normal','',''),
('altea-sprint-1','29','VÍDEO','Vídeo de presentació del projecte a YouTube','Publicar un vídeo de presentació del projecte a YouTube i posar-ne l''enllaç a la plataforma de gestió del projecte.',5,ARRAY['MP06','MP07','MP08','MP09'],'todo','','normal','','')
on conflict (board_id, code) do nothing;

-- Comprovació esperada si s'han executat les migracions anteriors: 29 tasques totals, 9 al Sprint 3.
select count(*) as total_tasques,
       count(*) filter (where code in ('21','22','23','24','25','26','27','28','29')) as sprint_3,
       coalesce(sum(hours) filter (where code in ('21','22','23','24','25','26','27','28','29')),0) as hores_sprint_3
from public.altea_tasks
where board_id='altea-sprint-1';
