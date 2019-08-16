# Стриминговое приложение 

Чтобы запустить,после клонирования этого репозитория, выполните следующую команду в подпапке api и client:

> npm run start

После этого у вас будет запущен API, откуда клиентское приложение React извлечет все потоки.
На стороне клиента вы должны войти в систему, чтобы создать поток, и вы получите несколько кнопок администратора, которые позволяют редактировать и удалять ваши потоки.
Затем вы можете передавать с OBS, например:

> rtmp://localhost/live

Ключ потока будет идентификатором потока.
Затем клиентское приложение попытается получить поток с соответствующим идентификатором с RTMP-сервера.
В идеале, когда вы создаете поток, вы получите уникальный ключ для использования в качестве ключа потока. И тогда компонент StreamView будет использовать соответствующий ключ потока для получения каждого потока с сервера RTMP.
API-сервер использует пакет  [JSON-Server](https://github.com/typicode/json-server)
RTMP-сервер использует [Node-Media-Server](https://github.com/illuspas/Node-Media-Server)

![alt text]()
