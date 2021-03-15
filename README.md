# Stream app
# Eng version

To start, after cloning this repository, run the following command in the api and client subfolders:
> npm run start


After that, you will have the API launched, from where the React client application will fetch all streams.
On the settings page, you can create a stream, when you create it, the ID will be indicated. In OBS, you must go to the settings, select in the "Broadcast" Service "Custom"
Server:
> rtmp://localhost/live

Stream key: "id for the stream you just created"

Then the client application will try to receive a stream with the corresponding ID from the RTMP server.
Added:
Registration and Login are done through firebase.
The ability to comment on the broadcast.
The ability to subscribe to streamers.

RTMP server uses [Node-Media-Server](https://github.com/illuspas/Node-Media-Server)

# Русская версия 

Чтобы запустить,после клонирования этого репозитория, выполните следующую команду в подпапке api и client:

> npm run start

После этого у вас будет запущен API, откуда клиентское приложение React извлечет все потоки.
На странице настроек можно создать стрим,при его создании будет указан айди.В OBS вы должны перейти в настройки выбрать в "Вещание" Сервис "Настраиваемый"
Сервер:
> rtmp://localhost/live


Ключ потока: "айди только что созданного стрима"


Затем клиентское приложение попытается получить поток с соответствующим идентификатором с RTMP-сервера.
Добавлено:
Регистрация и Вход осуществлены через firebase.
Возможность комментировать трансляцию.
Возможность подписываться на стримеров.

RTMP-сервер использует [Node-Media-Server](https://github.com/illuspas/Node-Media-Server)

![Пример](https://github.com/alexkozopolianski/react-streams-app/blob/master/client/public/stream2.png)


