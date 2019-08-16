# Simple Streaming App
To run it, after cloning this Repo, run the following command on the 3 subfolder:

> npm run start

You'll then have the API running, from where the client React App wil fetch all the streams.
On the client side, you have to be logged in to create a stream, and you will get some admin buttons do edit and delete your streams.
You can then stream with OBS for example to:
> rtmp://localhost/live
The stream key will be the ID of the stream.
The client app will then try to get the stream with the corresponding ID from the RTMP server.
Ideally when you create a stream, you would get a unique key to use as a stream key. And then the StreamView component would use the corresponding stream key to get each stream from the RTMP server.
API Server is using JSON-Server Package
RTMP Server is using Node-Media-Server
Client React App was built from Scratch.
![alt text](https://avatars2.githubusercontent.com/u/11632545?v=3&s=200)
