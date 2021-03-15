# Стриминговое приложение 

Чтобы запустить,после клонирования этого репозитория, выполните следующую команду в подпапке api и client:

> npm run start

После этого у вас будет запущен API, откуда клиентское приложение React извлечет все потоки.
На странице настроек можно создать стрим,при его создании будет указан айди.В OBS вы должны перейти в настройки выбрать в "Вещание" Сервис "Настраиваемый"
Сервер:
> rtmp://localhost/live


Ключ потока: "айди только что созданного стрима"


Затем клиентское приложение попытается получить поток с соответствующим идентификатором с RTMP-сервера.

RTMP-сервер использует [Node-Media-Server](https://github.com/illuspas/Node-Media-Server)

![Пример](https://github.com/alexkozopolianski/react-streams-app/blob/master/client/public/stream.png)

![Пример](https://github.com/alexkozopolianski/react-streams-app/blob/master/client/public/streams.png)
