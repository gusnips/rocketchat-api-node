# JavaScript RocketChat API for node.js

Forked from https://github.com/qeesung/rocketchat-node  

A node.js module, which provides an object oriented wrapper for the RocketChat REST API.

RocketChat official website address can be found [here](https://rocket.chat/)  .
RocketChat REST API document can be found [here](https://rocket.chat/docs/developer-guides/rest-api/).

The Version of this library is in sync with the rocket.chat release. A version of 0.57 means this release was tested against the official docker image of rocket.chat:0.57.

## Installation

Install with the node package manager [npm](http://npmjs.org/):

```bash
$ npm install rocketchat-api
```

or

Install via git clone:
```
$ git clone https://github.com/gusnips/rocketchat-api-node.git
$ cd rocketchat-node
$ npm install
```

## Getting Started

### Basic Usage

```js
const RocketChatApi = require('rocketchat-api')
```

Now you can either login or instantiate with username and password  

```js
const rocketChatClient = new RocketChatApi(
  'https',
  'chat.localhost',
  443,
  'myuser',
  'mypassword',
  (err, result)=>{
    console.info('RC connected', result)
})
```

or

```js
const rocketChatClient = new RocketChatApi('https','chat.localhost',443)
rocketChatClient.login('myuser','password')
  .then(rocketChatClientInstance, result)=>{
      console.info('RC connected')
  })
  .catch((err)=>{
    console.error(err)
  })
```

### Using as express middleware

```js
app.use(async (req, res, next)=>{
  req.rocketChatClient = new RocketChatApi('https','chat.localhost',443)
  // wait for rocket to login before continue in case you want to use it right away
  await rocketChatClient.login('myusername',',mypassword')
  next()
})
```

This Lib library package the following functions:

## [RocketChatClient](#api)
- [Miscellaneous](#Miscellaneous)
  - [info](#Miscellaneous.info)
- [Authentication](#Authentication)
  - [login](#Authentication.login)
  - [logout](#Authentication.logout)
  - [me](#Authentication.me)
- [Users](#Users)
  - [create](#Users.create)
  - [delete](#Users.delete)
  - [getPresence](#Users.getPresence)
  - [info](#Users.info)
  - [list](#Users.list)
  - [setAvatar](#Users.setAvatar)
  - [update](#Users.update)
- [Channels](#Channels)
  - [addAll](#Channels.addAll)
  - [addModerator](#Channels.addModerator)
  - [addOwner](#Channels.addOwner)
  - [archive](#Channels.archive)
  - [cleanHistory](#Channels.cleanHistory)
  - [close](#Channels.close)
  - [create](#Channels.create)
  - [getIntegrations](#Channels.getIntegrations)
  - [history](#Channels.history)
  - [info](#Channels.info)
  - [invite](#Channels.invite)
  - [kick](#Channels.kick)
  - [leave](#Channels.leave)
  - [list.joined](#Channels.list.joined)
  - [list](#Channels.list)
  - [open](#Channels.open)
  - [removeModerator](#Channels.removeModerator)
  - [removeOwner](#Channels.removeOwner)
  - [rename](#Channels.rename)
  - [setDescription](#Channels.setDescription)
  - [setJoinCode](#Channels.setJoinCode)
  - [setPurpose](#Channels.setPurpose)
  - [setReadOnly](#Channels.setReadOnly)
  - [setTopic](#Channels.setTopic)
  - setType
  - [unarchive](#Channels.unarchive)
- [Groups](#Groups)
  - [addAll](#Groups.addAll)
  - [addModerator](#Groups.addModerator)
  - [addOwner](#Groups.addOwner)
  - [archive](#Groups.archive)
  - [close](#Groups.close)
  - [create](#Groups.create)
  - [getIntegrations](#Groups.getIntegrations)
  - [history](#Groups.history)
  - [info](#Groups.info)
  - [invite](#Groups.invite)
  - [kick](#Groups.kick)
  - [leave](#Groups.leave)
  - [list](#Groups.list)
  - [open](#Groups.open)
  - [removeModerator](#Groups.removeModerator)
  - [removeOwner](#Groups.removeOwner)
  - [rename](#Groups.rename)
  - [setDescription](#Groups.setDescription)
  - [setPurpose](#Groups.setPurpose)
  - [setReadOnly](#Groups.setReadOnly)
  - [setTopic](#Groups.setTopic)
  - [setType](#Groups.setType)
  - [unarchive](#Groups.unarchive)
- [Im](#Im)
  - [close](#Im.close)
  - [history](#Im.history)
  - [list.everyone](#Im.everyone)
  - [list](#Im.list)
  - [messages.others](#Im.others)
  - [open](#Im.open)
  - [setTopic](#Im.setTopic)
- [Chat](#Chat)
  - [delete](#Chat.delete)
  - [postMessage](#Chat.postMessage)
  - [update](#Chat.update)
- [Settings](#Setting)
  - [get](#Settings.get)
  - [update](#Settings.update)
- [Integration](#Integration)
  - [create](#Integration.create)
  - [list](#Integration.list)
  - [remove](#Integration.remove)
- Livechat
- [Realtime](#Realtime)
  - [API](#RealtimeAPI)
    - [Login](#Realtime.login)
    - [Logout](#Realtime.logout)
    - Get User Roles
    - List Custom Emoji
    - Load History
    - Get Room Roles
    - Get Subscriptions
    - Get Rooms
    - Get Public Settings
    - Get Permissions
    - User Presence
    - Notify Room Stream
    - Send Message
    - Delete Message
    - Update Message
    - Pin Message
    - Unpin Message
    - Star Message
    - Set Reaction
    - Create Channels
    - Create Private Groups
    - Delete Rooms
    - Archive Rooms
    - Unarchive Rooms
    - Joining Channels
    - [Leaving Rooms](#Realtime.leaveRoom)
    - Hiding Rooms
    - Opening Rooms
    - Favoriting Rooms
    - Save Room Settings
  - [Subscriptions](#Subscriptions)
    - [stream-notify-user](#Subscriptions.stream-notify-user)
      - [notification](#Subscriptions.stream-notify-user.notification)
    - [stream-room-messages](#Subscriptions.stream-room-messages)

## <a id="api"></a> API

More information can be found by checking [RocektChat REST API](https://rocket.chat/docs/master/developer-guides/rest-api/)

### <a id="Miscellaneous"></a>Miscellaneous

#### <a id="Miscellaneous.info"></a>Info

A simple method, requires no authentication, that returns information about the server including version information.

```js
rocketChatClient.miscellaneous.info((err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/miscellaneous/info)](https://rocket.chat/docs/developer-guides/rest-api/miscellaneous/info)

```json
{
  "success": true,
  "info": {
    "version": "0.6.0-develop",
    "build": {
      "nodeVersion": "v9.2",
      "arch": "x64",
      "platform": "linux",
      "cpus": 4
    },
    "commit": {
      "hash": "5901cc7270e3587101631ee222def950d705c611",
      "date": "Thu Dec 1 19:08:01 2017 -0200",
      "author": "Gustavo Salome",
      "subject": "Merge branch 'develop' into experimental",
      "tag": "0.6.0",
      "branch": "develop"
    }
  }
}
```

### <a id="Authentication"></a>Authentication

The authentication with the API is a process that is handled for you automatically when you create a new instance of the client.

```js
const rocketChatClient = new RocketChatApi('https', 'chat.localhost', 443, 'admin', 'password', (err, responseBody, self)=>{
  if(err)
    return console.error('Error connecting to RocketChat', err)
  console.info('RocketChat client connect')
  // self refers to an instance of rocketChatClient, useful if you need subsequent calls
  // responseBody is an object containing authToken and userId  
});
```
You can, however, use the provided methods to switch user, or - i.e. if you don't have the credentials at startup time - you can choose a late authentication.  

### Loading stored credentials

You can also use setAuthToken and setUserId to set stored credentials, like this:  

```js
rocketChatClient.setAuthToken('my-stored-token')
rocketChatClient.setUserId('my-stored-userId')
```

Note that the api methods here will only authenticate the Web Api, not the realtime websocket api. For authenticating the realtime api, please [Check here](#Realtime.login).

#### <a id="Authentication.login"></a>login

```js
rocketChatClient.login(username, password)
  .then((body, self)=>{
    // self is an instance of rocketChatClient,useful if you need subsequent calls
    console.log(responseBody)
    // body is an object containing authToken and userId  
  }).catch((err)=>{
    console.log(err)
  })
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/authentication/login)](https://rocket.chat/docs/developer-guides/rest-api/authentication/login)

```json
{
  "authToken": "9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq",
  "userId": "aobEdbYhXfu5hkeqG"
}
```

#### <a id="Authentication.logout"></a>logout

```js
rocketChatClient.logout()
  .then((body)=>{})
  .catch((err)=>{})
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/authentication/logout)](https://rocket.chat/docs/developer-guides/rest-api/authentication/logout)

```json
{
  "status": "success",
  "data": {
      "authToken": "9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq",
      "userId": "aobEdbYhXfu5hkeqG"
   }
}
```


#### <a id="Authentication.me"></a>me

Quick information about the authenticated user.

```js
rocketChatClient.authentication.me((err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/authentication/me)](https://rocket.chat/docs/developer-guides/rest-api/authentication/me)

```json
{
  "_id": "aobEdbYhXfu5hkeqG",
  "name": "Example User",
  "emails": [
    {
      "address": "example@example.com",
      "verified": true
    }
  ],
  "status": "offline",
  "statusConnection": "offline",
  "username": "example",
  "utcOffset": 0,
  "active": true,
  "success": true
}
```

### <a id="Users"></a>Users

#### <a id="Users.create"></a>create

**NOTE** Due to a funny behavior of rocket.chat not responding to this call, the result is evaluated with a workaround and will always take minimum 500ms!

```js
const userToAdd = {
    "name": "name",
    "email": "email@example.com",
    "password": "anypassyouwant",
    "username": "uniqueusername",
    "sendWelcomeEmail": false,
    "joinDefaultChannels": false,
    "verified":false,
    "requirePasswordChange":false,
    "roles":["user"]
};
rocketChatClient.users.create(userToAdd, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/create)](https://rocket.chat/docs/developer-guides/rest-api/users/create)

```json
{
   "user": {
      "_id": "BsNr28znDkG8aeo7W",
      "createdAt": "2016-09-13T14:57:56.037Z",
      "services": {
         "password": {
            "bcrypt": "$2a$10$5I5nUzqNEs8jKhi7BFS55uFYRf5TE4ErSUH8HymMNAbpMAvsOcl2C"
         }
      },
      "username": "uniqueusername",
      "emails": [
         {
            "address": "email@user.tld",
            "verified": false
         }
      ],
      "type": "user",
      "status": "offline",
      "active": true,
      "roles": [
         "user"
      ],
      "_updatedAt": "2016-09-13T14:57:56.175Z",
      "name": "name",
      "customFields": {
         "twitter": "@userstwitter"
      }
   },
   "success": true
}
```

#### <a id="Users.delete"></a>delete

```js
rocketChatClient.users.delete(userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/delete)](https://rocket.chat/docs/developer-guides/rest-api/users/delete)

```json
{
  "success": true
}
```

#### <a id="Users.getPresence"></a>getPresence

```js
rocketChatClient.users.getPresence(userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/getpresence)](https://rocket.chat/docs/developer-guides/rest-api/users/getpresence)

```json
{
  "presence": "offline",
  "success": true
}
```

#### <a id="Users.info"></a>info

```js
rocketChatClient.users.info({userId: userId}, (err, body)=>{});
//or
rocketChatClient.users.info({username: username}, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/info)](https://rocket.chat/docs/developer-guides/rest-api/users/info)

```json
{
  "user": {
    "_id": "nSYqWzZ4GsKTX4dyK",
    "type": "user",
    "status": "offline",
    "active": true,
    "name": "Example User",
    "utcOffset": 0,
    "username": "example"
  },
  "success": true
}
```

#### <a id="Users.list"></a>list

```js
rocketChatClient.users.list(offset, count, (err, body)=>{});
rocketChatClient.users.list((err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/list)](https://rocket.chat/docs/developer-guides/rest-api/users/list)

```json
{
  "user": [{
    "_id": "nSYqWzZ4GsKTX4dyK",
    "type": "user",
    "status": "offline",
    "active": true,
    "name": "Example User",
    "utcOffset": 0,
    "username": "example"
  }],
  "success": true
}
```
#### <a id="Users.setAvatar"></a>setAvatar

```js
rocketChatClient.users.setAvatar(userId, avatarUrl, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/setavatar)](https://rocket.chat/docs/developer-guides/rest-api/users/setavatar)

```json
{
    "success": true
}
```

#### <a id="Users.update"></a>update

```js
rocketChatClient.users.update(userId, updateData, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/users/update)](https://rocket.chat/docs/developer-guides/rest-api/users/update)


```json
{
   "user":{
      "_id": "BsNr28znDkG8aeo7W",
      "createdAt": "2016-09-13T14:57:56.037Z",
      "services": {
         "password": {
            "bcrypt": "$2a$10$5I5nUzqNEs8jKhi7BFS55uFYRf5TE4ErSUH8HymMNAbpMAvsOcl2C"
         }
      },
      "username": "uniqueusername",
      "emails": [
         {
            "address": "newemail@user.tld",
            "verified": false
         }
      ],
      "type": "user",
      "status": "offline",
      "active": true,
      "roles": [
         "user"
      ],
      "_updatedAt": "2016-09-13T14:57:56.175Z",
      "name": "new name",
      "customFields": {
         "twitter": "userstwitter"
      }
   },
   "success": true
}
```

### <a id="Channels"></a>Channels

#### <a id="Channels.addAll"></a>AddAll

Adds all of the users of the Rocket.Chat server to the channel.

```js
rocketChatClient.channels.addAll(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/addall)](https://rocket.chat/docs/developer-guides/rest-api/channels/addall)

```json
{
   "channel": {
      "_id": "ByehQjC44FwMeiLbX",
      "name": "channelname",
      "t": "c",
      "usernames": [
         "example",
         "rocket.cat"
      ],
      "msgs": 0,
      "u": {
         "_id": "aobEdbYhXfu5hkeqG",
         "username": "example"
      },
      "ts": "2016-05-30T13:42:25.304Z"
   },
   "success": true
}
```

#### <a id="Channels.addModerator"></a>addModerator

Gives the role of moderator for a user in the current channel.

```js
rocketChatClient.channels.addModerator(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/addmoderator)](https://rocket.chat/docs/developer-guides/rest-api/channels/addmoderator)

```json
{
   "success": true
}
```

#### <a id="Channels.addOwner"></a>addOwner

Gives the role of owner for a user in the current channel.

```js
rocketChatClient.channels.addOwner(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/addowner)](https://rocket.chat/docs/developer-guides/rest-api/channels/addowner)

```json
{
   "success": true
}
```

  - archive

#### <a id="Channels.archive"></a>archive

Archives a channel.

```js
rocketChatClient.channels.archive(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/archive)](https://rocket.chat/docs/developer-guides/rest-api/channels/archive)

```json
{
   "success": true
}
```

  - cleanHistory

#### <a id="Channels.cleanHistory"></a>cleanHistory

Cleans up a channel, removing messages from the provided time range.

```js
rocketChatClient.channels.cleanHistory(roomId, roomId, latest, oldest, (err, body)=>{});
// inclusive default value is false, if you want to change that pass the parameter
rocketChatClient.channels.cleanHistory(roomId, roomId, latest, oldest, inclusive, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/cleanhistory)](https://rocket.chat/docs/developer-guides/rest-api/channels/cleanhistory)

```json
{
   "success"
}
```

  - close

#### <a id="Channels.close"></a>close

Removes the channel from the user’s list of channels.

```js
rocketChatClient.channels.close(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/close)](https://rocket.chat/docs/developer-guides/rest-api/channels/close)

```json
{
   "success"
}
```

#### <a id="Channels.create"></a>create

Creates a new public channel.

```js
rocketChatClient.channels.create(roomName, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/create)](https://rocket.chat/docs/developer-guides/rest-api/channels/create)

```json
{
   "channel": {
      "_id": "ByehQjC44FwMeiLbX",
      "name": "channelname",
      "t": "c",
      "usernames": [
         "example"
      ],
      "msgs": 0,
      "u": {
         "_id": "aobEdbYhXfu5hkeqG",
         "username": "example"
      },
      "ts": "2016-05-30T13:42:25.304Z"
   },
   "success": true
}
```

#### <a id="Channels.getIntegrations"></a>getIntegrations

Retrieves the integrations which the channel has, requires the permission manage-integrations.
And supports the [Offset and Count Query Parameters](https://rocket.chat/docs/developer-guides/rest-api/offset-and-count-info).

```js
rocketChatClient.channels.getIntegrations(roomId, {/** query options */},(err, body)=>{});
rocketChatClient.channels.getIntegrations(roomId, {0, 5}, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/getintegrations)](https://rocket.chat/docs/developer-guides/rest-api/channels/getintegrations)

```json
{
    "integrations": [{
        "_id": "WMQDChpnYTRmFre9h",
        "enabled": true,
        "username": "rocket.cat",
        "alias": "Guggy",
        "avatar": "http://res.guggy.com/logo_128.png",
        "name": "Guggy",
        "triggerWords": [
            "!guggy",
            "guggy",
            "gif+"
        ],
        "urls": [
            "http://text2gif.guggy.com/guggify"
        ],
        "token": "8DFS89DMKLWEN",
        "script": "/* Some script */",
        "scriptEnabled": true,
        "impersonateUser": false,
        "scriptCompiled": "/* lot of script */",
        "scriptError": null,
        "type": "webhook-outgoing",
        "userId": "rocket.cat",
        "channel": [],
        "_createdAt": "2017-01-05T17:06:05.660Z",
        "_createdBy": {
            "username": "graywolf336",
            "_id": "R4jgcQaQhvvK6K3iY"
        },
        "_updatedAt": "2017-01-05T17:06:05.660Z"
    }],
    "success": true
}
```

#### <a id="Channels.history"></a>history

Retrieves the messages from a channel.
And supports the [Offset and Count Query Parameters](https://rocket.chat/docs/developer-guides/rest-api/offset-and-count-info).

```js
rocketChatClient.channels.history(roomId, {/** query option here*/}, (err, body)=>{});
rocketChatClient.channels.history(roomId, {0, 5}, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/history)](https://rocket.chat/docs/developer-guides/rest-api/channels/history)

```json
{
  "messages": [
    {
      "_id": "AkzpHAvZpdnuchw2a",
      "rid": "ByehQjC44FwMeiLbX",
      "msg": "hi",
      "ts": "2016-12-09T12:50:51.555Z",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "_updatedAt": "2016-12-09T12:50:51.562Z"
    },
    {
      "_id": "vkLMxcctR4MuTxreF",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-08T15:41:37.730Z",
      "msg": "testing2",
      "u": {
        "_id": "bRtgdhzM6PD9F8pSx",
        "username": "testing2"
      },
      "groupable": false,
      "_updatedAt": "2016-12-08T16:03:25.235Z"
    },
    {
      "_id": "bfRW658nEyEBg75rc",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-07T15:47:49.099Z",
      "msg": "testing",
      "u": {
        "_id": "nSYqWzZ4GsKTX4dyK",
        "username": "testing1"
      },
      "groupable": false,
      "_updatedAt": "2016-12-07T15:47:49.099Z"
    },
    {
      "_id": "pbuFiGadhRZTKouhB",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-06T17:57:38.635Z",
      "msg": "testing",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "groupable": false,
      "_updatedAt": "2016-12-06T17:57:38.635Z"
    }
  ],
  "success": true
}
```

#### <a id="Channels.info"></a>info

Retrieves the information about the channel.

```js
rocketChatClient.channels.info(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/info)](https://rocket.chat/docs/developer-guides/rest-api/channels/info)

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "c",
    "name": "testing",
    "usernames": [
      "testing",
      "testing1",
      "testing2"
    ],
    "msgs": 1,
    "default": true,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```


#### <a id="Channels.invite"></a>invite

Adds a user to the channel.

```js
rocketChatClient.channels.invite(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/invite)](https://rocket.chat/docs/developer-guides/rest-api/channels/invite)

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "c",
    "name": "testing",
    "usernames": [
      "testing",
      "testing1"
    ],
    "msgs": 1,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```

#### <a id="Channels.kick"></a>kick

Kicks a user from the channel.

```js
rocketChatClient.channels.kick(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/kick)](https://rocket.chat/docs/developer-guides/rest-api/channels/kick)

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "invite-me",
    "t": "c",
    "usernames": [
      "testing1"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:22:40.656Z"
  },
  "success": true
}
```

#### <a id="Channels.leave"></a>leave

Causes the callee to be removed from the channel.

```js
rocketChatClient.channels.leave(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/leave)](https://rocket.chat/docs/developer-guides/rest-api/channels/leave)

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "invite-me",
    "t": "c",
    "usernames": [
      "testing2"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:22:40.656Z"
  },
  "success": true
}
```

#### <a id="Channels.list.joined"></a>list.joined

Lists all of the channels the calling user has joined.

```js
// pass a query object to limit the results
rocketChatClient.channels.listJoined({}, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/list-joined)](https://rocket.chat/docs/developer-guides/rest-api/channels/list-joined)

```json
{
    "channels": [
        {
            "_id": "ByehQjC44FwMeiLbX",
            "name": "invite-me",
            "t": "c",
            "usernames": [
                "testing1"
            ],
            "msgs": 0,
            "u": {
                "_id": "aobEdbYhXfu5hkeqG",
                "username": "testing1"
            },
            "ts": "2016-12-09T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        }
    ],
    "success": true
}
```

#### <a id="Channels.list"></a>list

Lists all of the channels on the server, this method supports the Offset and Count Query Parameters.

```js
// get the first items
rocketChatClient.channels.list({}, (err, body)=>{});
// get by offset and count
// first 5 items
rocketChatClient.channels.list({0, 5}, (err, body)=>{});
// third page
rocketChatClient.channels.list({10, 5}, (err, body)=>{});
// find an item using mongo query syntax
rocketChatClient.channels.list({ query : { "name": { "$regex": "thisreallydoesnotexist" } } }, (err, body)=>{});
// sort using mongo sort syntax
rocketChatClient.channels.list({ sort : { "_updatedAt": 1 } }, (err, body)=>{});
// fielding using mongo field syntax
rocketChatClient.channels.list({ fields : { "name": 1 } }, (err, body)=>{});

```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/list)](https://rocket.chat/docs/developer-guides/rest-api/channels/list)

```json
{
    "channels": [
        {
            "_id": "ByehQjC44FwMeiLbX",
            "name": "test-test",
            "t": "c",
            "usernames": [
                "testing1"
            ],
            "msgs": 0,
            "u": {
                "_id": "aobEdbYhXfu5hkeqG",
                "username": "testing1"
            },
            "ts": "2016-12-09T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        },
        {
            "_id": "t7qapfhZjANMRAi5w",
            "name": "testing",
            "t": "c",
            "usernames": [
                "testing2"
            ],
            "msgs": 0,
            "u": {
                "_id": "y65tAmHs93aDChMWu",
                "username": "testing2"
            },
            "ts": "2016-12-01T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        }
    ],
    "success": true
}
```

#### <a id="Channels.open"></a>open

Adds the channel back to the user’s list of channels.

```js
rocketChatClient.channels.open(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/open)](https://rocket.chat/docs/developer-guides/rest-api/channels/open)

```json
{
  "success": true
}
```

#### <a id="Channels.removeModerator"></a>removeModerator

Removes the role of moderator from a user in the currrent channel.

```js
rocketChatClient.channels.removeModerator(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/removemoderator)](https://rocket.chat/docs/developer-guides/rest-api/channels/removemoderator)

```json
{
  "success": true
}
```

#### <a id="Channels.removeOwner"></a>removeOwner

Removes the role of owner from a user in the currrent channel.

```js
rocketChatClient.channels.removeOwner(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/removeowner)](https://rocket.chat/docs/developer-guides/rest-api/channels/removeowner)

```json
{
  "success": true
}
```

#### <a id="Channels.rename"></a>rename

Changes the name of the channel.

```js
rocketChatClient.channels.rename(roomId, newName, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/rename)](https://rocket.chat/docs/developer-guides/rest-api/channels/rename)

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "new-name",
    "t": "c",
    "usernames": [
      "testing1"
    ],
    "msgs": 4,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:57:44.686Z"
  },
  "success": true
}
```

#### <a id="Channels.setDescription"></a>setDescription

Sets the description for the channel.

```js
rocketChatClient.channels.setDescription(roomId, description, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/setdescription)](https://rocket.chat/docs/developer-guides/rest-api/channels/setdescription)

```json
{
  "description": "Testing out everything.",
  "success": true
}
```

#### <a id="Channels.setJoinCode"></a>setJoinCode

Sets the code required to join the channel.

```js
rocketChatClient.channels.setJoinCode(roomId, joinCode, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/setjoincode)](https://rocket.chat/docs/developer-guides/rest-api/channels/setjoincode)

```json
{
    "channel": {
        "_id": "ByehQjC44FwMeiLbX",
        "name": "testing0",
        "t": "c",
        "msgs": 0,
        "u": {
            "_id": "aiPqNoGkjpNDiRx6d",
            "username": "goose160"
        },
        "ts": "2017-01-05T18:02:50.754Z",
        "ro": false,
        "sysMes": true,
        "_updatedAt": "2017-01-05T18:41:48.840Z",
        "usernames": [
            "goose160",
            "graywolf336"
        ],
        "joinCodeRequired": true
    },
    "success": true
}
```

#### <a id="Channels.setPurpose"></a>setPurpose

Sets the purpose/description for the channel.

```js
rocketChatClient.channels.setPurpose(roomId, purpose, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/setpurpose)](https://rocket.chat/docs/developer-guides/rest-api/channels/setpurpose)

```json
{
  "purpose": "Testing out everything.",
  "success": true
}
```

#### <a id="Channels.setReadOnly"></a>setReadOnly

Sets whether the channel is read only or not.

```js
rocketChatClient.channels.setReadOnly(roomId, readonly, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/setreadonly)](https://rocket.chat/docs/developer-guides/rest-api/channels/setreadonly)

```json
{
    "channel": {
        "_id": "ByehQjC44FwMeiLbX",
        "name": "testing0",
        "t": "c",
        "msgs": 0,
        "u": {
            "_id": "aiPqNoGkjpNDiRx6d",
            "username": "goose160"
        },
        "ts": "2017-01-05T18:02:50.754Z",
        "ro": true,
        "sysMes": true,
        "_updatedAt": "2017-01-05T19:02:24.429Z",
        "usernames": [
            "goose160",
            "graywolf336"
        ],
        "joinCodeRequired": true,
        "muted": []
    },
    "success": true
}
```

#### <a id="Channels.setTopic"></a>setTopic

Sets the topic for the channel.

```js
rocketChatClient.channels.setTopic(roomId, topic, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/settopic)](https://rocket.chat/docs/developer-guides/rest-api/channels/settopic)

```json
{
  "topic": "Testing out everything.",
  "success": true
}
```


#### <a id="Channels.unarchive"></a>unarchive

Unarchives a channel.

```js
rocketChatClient.channels.unarchive(roomId, topic, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/channels/unarchive)](https://rocket.chat/docs/developer-guides/rest-api/channels/unarchive)

```json
{
  "success": true
}
```

### <a id="Groups"></a>Groups

#### <a id="Groups.addAll"></a>AddAll

Adds all of the users of the Rocket.Chat server to the group.

```js
rocketChatClient.groups.addAll(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/addall)](https://rocket.chat/docs/developer-guides/rest-api/groups/addall)

```json
{
   "group": {
      "_id": "ByehQjC44FwMeiLbX",
      "name": "groupname",
      "t": "c",
      "usernames": [
         "example",
         "rocket.cat"
      ],
      "msgs": 0,
      "u": {
         "_id": "aobEdbYhXfu5hkeqG",
         "username": "example"
      },
      "ts": "2016-05-30T13:42:25.304Z"
   },
   "success": true
}
```

#### <a id="Groups.addModerator"></a>addModerator

Gives the role of moderator for a user in the current group.

```js
rocketChatClient.groups.addModerator(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/addmoderator)](https://rocket.chat/docs/developer-guides/rest-api/groups/addmoderator)

```json
{
   "success": true
}
```

#### <a id="Groups.addOwner"></a>addOwner

Gives the role of owner for a user in the current group.

```js
rocketChatClient.groups.addOwner(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/addowner)](https://rocket.chat/docs/developer-guides/rest-api/groups/addowner)

```json
{
   "success": true
}
```

  - archive

#### <a id="Groups.archive"></a>archive

Archives a private group, only if you’re part of the group.

```js
rocketChatClient.groups.archive(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/archive)](https://rocket.chat/docs/developer-guides/rest-api/groups/archive)

```json
{
   "success": true
}
```

  - close

#### <a id="Groups.close"></a>close

Removes the group from the user’s list of groups.

```js
rocketChatClient.groups.close(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/close)](https://rocket.chat/docs/developer-guides/rest-api/groups/close)

```json
{
   "success" : true
}
```

#### <a id="Groups.create"></a>create

Creates a new private group, optionally including specified users. The group creator is always included.

```js
rocketChatClient.groups.create(roomName, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/create)](https://rocket.chat/docs/developer-guides/rest-api/groups/create)

```json
{
   "group": {
      "_id": "ByehQjC44FwMeiLbX",
      "name": "groupname",
      "t": "c",
      "usernames": [
         "example"
      ],
      "msgs": 0,
      "u": {
         "_id": "aobEdbYhXfu5hkeqG",
         "username": "example"
      },
      "ts": "2016-05-30T13:42:25.304Z"
   },
   "success": true
}
```

#### <a id="Groups.getIntegrations"></a>getIntegrations

Retrieves the integrations which the group has, requires the permission manage-integrations.
And supports the [Offset and Count Query Parameters](https://rocket.chat/docs/developer-guides/rest-api/offset-and-count-info).

```js
rocketChatClient.groups.getIntegrations(roomId, {/** query options */},(err, body)=>{});
rocketChatClient.groups.getIntegrations(roomId, {0, 5}, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/getintegrations)](https://rocket.chat/docs/developer-guides/rest-api/groups/getintegrations)

```json
{
    "integrations": [{
        "_id": "WMQDChpnYTRmFre9h",
        "enabled": true,
        "username": "rocket.cat",
        "alias": "Guggy",
        "avatar": "http://res.guggy.com/logo_128.png",
        "name": "Guggy",
        "triggerWords": [
            "!guggy",
            "guggy",
            "gif+"
        ],
        "urls": [
            "http://text2gif.guggy.com/guggify"
        ],
        "token": "8DFS89DMKLWEN",
        "script": "/* Some script */",
        "scriptEnabled": true,
        "impersonateUser": false,
        "scriptCompiled": "/* lot of script */",
        "scriptError": null,
        "type": "webhook-outgoing",
        "userId": "rocket.cat",
        "group": [],
        "_createdAt": "2017-01-05T17:06:05.660Z",
        "_createdBy": {
            "username": "graywolf336",
            "_id": "R4jgcQaQhvvK6K3iY"
        },
        "_updatedAt": "2017-01-05T17:06:05.660Z"
    }],
    "success": true
}
```

#### <a id="Groups.history"></a>history

Retrieves the messages from a private group, only if you’re part of the group.
And supports the [Offset and Count Query Parameters](https://rocket.chat/docs/developer-guides/rest-api/offset-and-count-info).

```js
rocketChatClient.groups.history(roomId, {/** query option here*/}, (err, body)=>{});
rocketChatClient.groups.history(roomId, {0, 5}, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/history)](https://rocket.chat/docs/developer-guides/rest-api/groups/history)

```json
{
  "messages": [
    {
      "_id": "AkzpHAvZpdnuchw2a",
      "rid": "ByehQjC44FwMeiLbX",
      "msg": "hi",
      "ts": "2016-12-09T12:50:51.555Z",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "_updatedAt": "2016-12-09T12:50:51.562Z"
    },
    {
      "_id": "vkLMxcctR4MuTxreF",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-08T15:41:37.730Z",
      "msg": "testing2",
      "u": {
        "_id": "bRtgdhzM6PD9F8pSx",
        "username": "testing2"
      },
      "groupable": false,
      "_updatedAt": "2016-12-08T16:03:25.235Z"
    },
    {
      "_id": "bfRW658nEyEBg75rc",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-07T15:47:49.099Z",
      "msg": "testing",
      "u": {
        "_id": "nSYqWzZ4GsKTX4dyK",
        "username": "testing1"
      },
      "groupable": false,
      "_updatedAt": "2016-12-07T15:47:49.099Z"
    },
    {
      "_id": "pbuFiGadhRZTKouhB",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-06T17:57:38.635Z",
      "msg": "testing",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "groupable": false,
      "_updatedAt": "2016-12-06T17:57:38.635Z"
    }
  ],
  "success": true
}
```

#### <a id="Groups.info"></a>info

Retrieves the information about the private group, only if you’re part of the group.

```js
rocketChatClient.groups.info(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/info)](https://rocket.chat/docs/developer-guides/rest-api/groups/info)

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "c",
    "name": "testing",
    "usernames": [
      "testing",
      "testing1",
      "testing2"
    ],
    "msgs": 1,
    "default": true,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```


#### <a id="Groups.invite"></a>invite

Adds a user to the private group.

```js
rocketChatClient.groups.invite(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/invite)](https://rocket.chat/docs/developer-guides/rest-api/groups/invite)

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "c",
    "name": "testing",
    "usernames": [
      "testing",
      "testing1"
    ],
    "msgs": 1,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```

#### <a id="Groups.kick"></a>kick

Removes a user from the private group.

```js
rocketChatClient.groups.kick(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/kick)](https://rocket.chat/docs/developer-guides/rest-api/groups/kick)

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "invite-me",
    "t": "c",
    "usernames": [
      "testing1"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:22:40.656Z"
  },
  "success": true
}
```

#### <a id="Groups.leave"></a>leave

Causes the callee to be removed from the private group, if they’re part of it and are not the last owner.

```js
rocketChatClient.groups.leave(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/leave)](https://rocket.chat/docs/developer-guides/rest-api/groups/leave)

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "invite-me",
    "t": "c",
    "usernames": [
      "testing2"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:22:40.656Z"
  },
  "success": true
}
```


#### <a id="Groups.list"></a>list

Lists all of the private groups the calling user has joined, this method supports the Offset and Count Query Parameters.

```js
// get the first items
rocketChatClient.groups.list({}, (err, body)=>{});
// get by offset and count
// first 5 items
rocketChatClient.groups.list({0, 5}, (err, body)=>{});
// third page
rocketChatClient.groups.list({10, 5}, (err, body)=>{});
// find an item using mongo query syntax
rocketChatClient.groups.list({ query : { "name": { "$regex": "thisreallydoesnotexist" } } }, (err, body)=>{});
// sort using mongo sort syntax
rocketChatClient.groups.list({ sort : { "_updatedAt": 1 } }, (err, body)=>{});
// fielding using mongo field syntax
rocketChatClient.groups.list({ fields : { "name": 1 } }, (err, body)=>{});

```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/list)](https://rocket.chat/docs/developer-guides/rest-api/groups/list)

```json
{
    "groups": [
        {
            "_id": "ByehQjC44FwMeiLbX",
            "name": "test-test",
            "t": "c",
            "usernames": [
                "testing1"
            ],
            "msgs": 0,
            "u": {
                "_id": "aobEdbYhXfu5hkeqG",
                "username": "testing1"
            },
            "ts": "2016-12-09T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        },
        {
            "_id": "t7qapfhZjANMRAi5w",
            "name": "testing",
            "t": "c",
            "usernames": [
                "testing2"
            ],
            "msgs": 0,
            "u": {
                "_id": "y65tAmHs93aDChMWu",
                "username": "testing2"
            },
            "ts": "2016-12-01T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        }
    ],
    "success": true
}
```

#### <a id="Groups.open"></a>open

Adds the private group back to the user’s list of private groups.

```js
rocketChatClient.groups.open(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/open)](https://rocket.chat/docs/developer-guides/rest-api/groups/open)

```json
{
  "success": true
}
```

#### <a id="Groups.removeModerator"></a>removeModerator

Removes the role of moderator from a user in the currrent group.

```js
rocketChatClient.groups.removeModerator(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/removemoderator)](https://rocket.chat/docs/developer-guides/rest-api/groups/removemoderator)

```json
{
  "success": true
}
```

#### <a id="Groups.removeOwner"></a>removeOwner

Removes the role of owner from a user in the current group.

```js
rocketChatClient.groups.removeOwner(roomId, userId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/removeowner)](https://rocket.chat/docs/developer-guides/rest-api/groups/removeowner)

```json
{
  "success": true
}
```

#### <a id="Groups.rename"></a>rename

Changes the name of the private group.

```js
rocketChatClient.groups.rename(roomId, newName, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/rename)](https://rocket.chat/docs/developer-guides/rest-api/groups/rename)

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "new-name",
    "t": "c",
    "usernames": [
      "testing1"
    ],
    "msgs": 4,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:57:44.686Z"
  },
  "success": true
}
```

#### <a id="Groups.setDescription"></a>setDescription

Sets the description for the private group.

```js
rocketChatClient.groups.setDescription(roomId, description, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/setdescription)](https://rocket.chat/docs/developer-guides/rest-api/groups/setdescription)

```json
{
  "description": "Testing out everything.",
  "success": true
}
```

#### <a id="Groups.setPurpose"></a>setPurpose

Sets the purpose/description for the private group.

```js
rocketChatClient.groups.setPurpose(roomId, purpose, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/setpurpose)](https://rocket.chat/docs/developer-guides/rest-api/groups/setpurpose)

```json
{
  "purpose": "Testing out everything.",
  "success": true
}
```

#### <a id="Groups.setReadOnly"></a>setReadOnly

Sets whether the group is read only or not.

```js
rocketChatClient.groups.setReadOnly(roomId, readonly, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/setreadonly)](https://rocket.chat/docs/developer-guides/rest-api/groups/setreadonly)

```json
{
    "group": {
        "_id": "ByehQjC44FwMeiLbX",
        "name": "testing0",
        "t": "c",
        "msgs": 0,
        "u": {
            "_id": "aiPqNoGkjpNDiRx6d",
            "username": "goose160"
        },
        "ts": "2017-01-05T18:02:50.754Z",
        "ro": true,
        "sysMes": true,
        "_updatedAt": "2017-01-05T19:02:24.429Z",
        "usernames": [
            "goose160",
            "graywolf336"
        ],
        "joinCodeRequired": true,
        "muted": []
    },
    "success": true
}
```

#### <a id="Groups.setTopic"></a>setTopic

Sets the topic for the private group.

```js
rocketChatClient.groups.setTopic(roomId, topic, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/settopic)](https://rocket.chat/docs/developer-guides/rest-api/groups/settopic)

```json
{
  "topic": "Testing out everything.",
  "success": true
}
```


#### <a id="Groups.unarchive"></a>unarchive

Unarchives a private group.

```js
rocketChatClient.groups.unarchive(roomId, topic, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/groups/unarchive)](https://rocket.chat/docs/developer-guides/rest-api/groups/unarchive)

```json
{
  "success": true
}
```

### <a id="Im"></a>Im

#### <a id="Im.close"></a>close
Removes the direct message from the user’s list of direct messages.

```js
rocketChatClient.im.close(roomId, (err, body)=>{});
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/im/close)](https://rocket.chat/docs/developer-guides/rest-api/im/close)

```json
{
   "success": true
}
```

#### <a id="Im.history"></a>history
Retrieves the messages from a direct message.

```js
rocketChatClient.im.history(historyOpts, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/im/history)](https://rocket.chat/docs/developer-guides/rest-api/im/history)

```json
{
  "messages": [
    {
      "_id": "AkzpHAvZpdnuchw2a",
      "rid": "ByehQjC44FwMeiLbX",
      "msg": "hi",
      "ts": "2016-12-09T12:50:51.555Z",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "_updatedAt": "2016-12-09T12:50:51.562Z"
    },
    {
      "_id": "vkLMxcctR4MuTxreF",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-08T15:41:37.730Z",
      "msg": "testing2",
      "u": {
        "_id": "bRtgdhzM6PD9F8pSx",
        "username": "testing2"
      },
      "groupable": false,
      "_updatedAt": "2016-12-08T16:03:25.235Z"
    },
    {
      "_id": "bfRW658nEyEBg75rc",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-07T15:47:49.099Z",
      "msg": "testing",
      "u": {
        "_id": "nSYqWzZ4GsKTX4dyK",
        "username": "testing1"
      },
      "groupable": false,
      "_updatedAt": "2016-12-07T15:47:49.099Z"
    },
    {
      "_id": "pbuFiGadhRZTKouhB",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-06T17:57:38.635Z",
      "msg": "testing",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "groupable": false,
      "_updatedAt": "2016-12-06T17:57:38.635Z"
    }
  ],
  "success": true
}
```

#### <a id="Im.messagesOthers"></a> messages.others

Retrieves the messages from any direct message in the server, this method supports the Offset and Count Query Parameters.

```js
rocketChatClient.im.messagesOthers(roomId, callback);
```
[Result(https://rocket.chat/docs/developer-guides/rest-api/im/messages-others)](https://rocket.chat/docs/developer-guides/rest-api/im/messages-others)

```json
{
  "messages": [
    {
      "_id": "AkzpHAvZpdnuchw2a",
      "rid": "ByehQjC44FwMeiLbX",
      "msg": "hi",
      "ts": "2016-12-09T12:50:51.555Z",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "_updatedAt": "2016-12-09T12:50:51.562Z"
    },
    {
      "_id": "vkLMxcctR4MuTxreF",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-08T15:41:37.730Z",
      "msg": "testing2",
      "u": {
        "_id": "bRtgdhzM6PD9F8pSx",
        "username": "testing2"
      },
      "groupable": false,
      "_updatedAt": "2016-12-08T16:03:25.235Z"
    },
    {
      "_id": "bfRW658nEyEBg75rc",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-07T15:47:49.099Z",
      "msg": "testing",
      "u": {
        "_id": "nSYqWzZ4GsKTX4dyK",
        "username": "testing1"
      },
      "groupable": false,
      "_updatedAt": "2016-12-07T15:47:49.099Z"
    },
    {
      "_id": "pbuFiGadhRZTKouhB",
      "t": "uj",
      "rid": "ByehQjC44FwMeiLbX",
      "ts": "2016-12-06T17:57:38.635Z",
      "msg": "testing",
      "u": {
        "_id": "y65tAmHs93aDChMWu",
        "username": "testing"
      },
      "groupable": false,
      "_updatedAt": "2016-12-06T17:57:38.635Z"
    }
  ],
  "success": true
}
```

#### <a id="#Im.listEveryone"></a> listEveryone

Lists all of the direct messages in the server, requires the permission view-room-administration permission and this method supports the Offset and Count Query Parameters.

```js
rocketChatClient.im.listEveryone({ offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined}, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/im/list-everyone)](https://rocket.chat/docs/developer-guides/rest-api/im/list-everyone)

```json
{
    "ims": [
        {
            "_id": "ByehQjC44FwMeiLbX",
            "name": "test-test",
            "t": "p",
            "usernames": [
                "testing1"
            ],
            "msgs": 0,
            "u": {
                "_id": "aobEdbYhXfu5hkeqG",
                "username": "testing1"
            },
            "ts": "2016-12-09T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        },
        {
            "_id": "t7qapfhZjANMRAi5w",
            "name": "testing",
            "t": "p",
            "usernames": [
                "testing2"
            ],
            "msgs": 0,
            "u": {
                "_id": "y65tAmHs93aDChMWu",
                "username": "testing2"
            },
            "ts": "2016-12-01T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        }
    ],
    "success": true
}
```

#### <a id="Im.list"></a> list

Lists all of the direct messages the calling user has joined, this method supports the Offset and Count Query Parameters.

```js
rocketChatClient.im.list({ offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined}, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/im/list)]([Result(https://rocket.chat/docs/developer-guides/rest-api/im/list)]())

```json
{
    "ims": [
        {
            "_id": "ByehQjC44FwMeiLbX",
            "name": "test-test",
            "t": "p",
            "usernames": [
                "testing1"
            ],
            "msgs": 0,
            "u": {
                "_id": "aobEdbYhXfu5hkeqG",
                "username": "testing1"
            },
            "ts": "2016-12-09T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        },
        {
            "_id": "t7qapfhZjANMRAi5w",
            "name": "testing",
            "t": "p",
            "usernames": [
                "testing2"
            ],
            "msgs": 0,
            "u": {
                "_id": "y65tAmHs93aDChMWu",
                "username": "testing2"
            },
            "ts": "2016-12-01T15:08:58.042Z",
            "ro": false,
            "sysMes": true,
            "_updatedAt": "2016-12-09T15:22:40.656Z"
        }
    ],
    "success": true
}
```

#### <a id="Im.open"></a>open

Adds the direct message back to the user’s list of direct messages.

```js
rocketChatClient.im.open(roomId, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/im/open)](https://rocket.chat/docs/developer-guides/rest-api/im/open)

```json
{
   "success": true
}
```


#### <a id="Im.setTopic"></a>setTopic

Sets the topic for the direct message.

```js
rocketChatClient.im.setTopic(roomId, newTopic, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/im/settopic)](https://rocket.chat/docs/developer-guides/rest-api/im/settopic)

```json
{
  "topic": "Testing out everything.",
  "success": true
}
```

### <a id="Chat"></a>Chat


#### <a id="Chat.delete"></a>delete

```js
rocketChatClient.chat.delete({ roomId, msgId }, callback);
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/chat/delete)](https://rocket.chat/docs/developer-guides/rest-api/chat/delete)

```json
{
  "_id": "7aDSXtjMA3KPLxLjt",
  "ts": 1481741940895,
  "success": true
}
```

#### <a id="Chat.postMessage"></a>postMessage

Post a chat message

```js
rocketChatClient.chat.postMessage({ roomId : roomId, text : message }, callback);
```

The passed object is equivalent to the [payload](https://rocket.chat/docs/developer-guides/rest-api/chat/postmessage#payload) from the documentation.

[Result (https://rocket.chat/docs/developer-guides/rest-api/chat/postmessage)](https://rocket.chat/docs/developer-guides/rest-api/chat/postmessage)

```json
{
  "ts": 1481748965123,
  "channel": "general",
  "message": {
    "alias": "",
    "msg": "This is a test!",
    "parseUrls": true,
    "groupable": false,
    "ts": "2016-12-14T20:56:05.117Z",
    "u": {
      "_id": "y65tAmHs93aDChMWu",
      "username": "graywolf336"
    },
    "rid": "GENERAL",
    "_updatedAt": "2016-12-14T20:56:05.119Z",
    "_id": "jC9chsFddTvsbFQG7"
  },
  "success": true
}
```

#### <a id="Chat.update"></a>update

```js
rocketChatClient.chat.update({ roomId, msgId, text: updatedText }, callback);
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/chat/update)](https://rocket.chat/docs/developer-guides/rest-api/chat/update)

```json
{
    "message": {
        "_id": "qGdhTGDnhMLJPQYY8",
        "rid": "GENERAL",
        "msg": "gif+ testing update",
        "ts": "2017-01-05T17:06:14.403Z",
        "u": {
            "_id": "R4jgcQaQhvvK6K3iY",
            "username": "graywolf336"
        },
        "_updatedAt": "2017-01-05T19:42:20.433Z",
        "editedAt": "2017-01-05T19:42:20.431Z",
        "editedBy": {
            "_id": "R4jgcQaQhvvK6K3iY",
            "username": "graywolf336"
        }
    },
    "success": true
}
```


### <a id="Settings"></a>Settings

#### <a id="Settings.get"></a>get
Gets the setting for the provided _id.

```js
rocketChatClient.settings.get(_id, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/settings/get)](https://rocket.chat/docs/developer-guides/rest-api/settings/get)

```json
{
  "_id": "Livechat_enabled",
  "value": false,
  "success": true
}
```

#### <a id="Settings.update"></a>update
Updates the setting for the provided _id.

```js
rocketChatClient.settings.update(id, value, callback);
```

[Result(https://rocket.chat/docs/developer-guides/rest-api/settings/update)](https://rocket.chat/docs/developer-guides/rest-api/settings/update)

```json
{
  "success": true
}
'''

### Integration<a id="Integration"></a>

#### <a id="Integration.create"></a>create

Creates an integration, if the callee has the permission.

- event: [see here](https://github.com/RocketChat/Rocket.Chat/blob/develop/packages/rocketchat-integrations/lib/rocketchat.js)
- channel: The channel, group, or @username. Can also be all_public_channels, all_private_groups, or all_direct_messages. Comma separated for more than one.

```js
rocketChatClient.integration.create({
            "type": "webhook-outgoing",
            "name": "Testing via REST API",
            "enabled": false,
            "username": "username",
            "urls": ["http://some-url.example.com"],
            "scriptEnabled": false,
            "channel" : "all_public_channels",
            "event" :  "sendMessage"
        }, callback);
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/integration/create)](https://rocket.chat/docs/developer-guides/rest-api/integration/create)

```json
{
    "integration": {
        "type": "webhook-outgoing",
        "name": "Testing via REST API",
        "enabled": false,
        "username": "rocket.cat",
        "urls": [
            "http://text2gif.guggy.com/guggify"
        ],
        "scriptEnabled": false,
        "userId": "rocket.cat",
        "channel": [],
        "_createdAt": "2017-01-06T13:23:46.018Z",
        "_createdBy": {
            "username": "graywolf336",
            "_id": "aobEdbYhXfu5hkeqG"
        },
        "_updatedAt": "2017-01-06T13:23:46.018Z",
        "_id": "3aazpZ2WzoBP8msi9"
    },
    "success": true
}
```

#### <a id="Integration.list"></a>list

Lists all of the integrations on the server, this method supports the Offset and Count Query Parameters.

```js
rocketChatClient.integration.list({}, callback);
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/integration/list)](https://rocket.chat/docs/developer-guides/rest-api/integration/list)

```json
{
    "integrations": [
        {
            "_id": "WMQDChpnYTRmFre9h",
            "enabled": true,
            "username": "rocket.cat",
            "alias": "Guggy",
            "avatar": "https://image.crisp.im/avatar/website/17651a90-e082-43f6-b308-957cea6e323c/128",
            "name": "Guggy",
            "triggerWords": [
                "!guggy",
                "guggy",
                "gif+"
            ],
            "urls": [
                "http://text2gif.guggy.com/guggify"
            ],
            "token": "aobEdbYhXfu5hkeqG",
            "script": ...,
            "scriptEnabled": true,
            "impersonateUser": false,
            "scriptCompiled": ...,
            "scriptError": null,
            "type": "webhook-outgoing",
            "userId": "rocket.cat",
            "channel": [],
            "_createdAt": "2017-01-05T17:06:05.660Z",
            "_createdBy": {
                "username": "graywolf336",
                "_id": "R4jgcQaQhvvK6K3iY"
            },
            "_updatedAt": "2017-01-05T17:06:05.660Z"
        },
        {
            "_id": "3aazpZ2WzoBP8msi9",
            "type": "webhook-outgoing",
            "name": "Testing via REST API",
            "enabled": false,
            "username": "rocket.cat",
            "urls": [
                "http://text2gif.guggy.com/guggify"
            ],
            "scriptEnabled": false,
            "userId": "rocket.cat",
            "channel": [],
            "_createdAt": "2017-01-06T13:23:46.018Z",
            "_createdBy": {
                "username": "graywolf336",
                "_id": "R4jgcQaQhvvK6K3iY"
            },
            "_updatedAt": "2017-01-06T13:23:46.018Z"
        }
    ],
    "offset": 0,
    "items": 2,
    "total": 2,
    "success": true
}
```

#### <a id="Integration.remove"></a>remove

Removes an integration from the server.

```js
rocketChatClient.integration.remove({
  type,
  integrationId
}, callback);
```

[Result (https://rocket.chat/docs/developer-guides/rest-api/integration/remove)](https://rocket.chat/docs/developer-guides/rest-api/integration/remove)

```json
{
    "integration": {
        "_id": "oNLthAt9RwMw39N2B",
        "type": "webhook-outgoing",
        "name": "Testing via REST API",
        "enabled": false,
        "username": "rocket.cat",
        "urls": [
            "http://text2gif.guggy.com/guggify"
        ],
        "scriptEnabled": false,
        "userId": "rocket.cat",
        "channel": [],
        "_createdAt": "2017-01-06T13:42:14.143Z",
        "_createdBy": {
            "username": "graywolf336",
            "_id": "R4jgcQaQhvvK6K3iY"
        },
        "_updatedAt": "2017-01-06T13:42:14.144Z"
    },
    "success": true
}
```

#### <a id="Realtime"></a>Realtime

**IMPORTANT!** These implementations are based on an unreleased version of the API. Use this at the risk that it may stop working anytime.

The realtime API is composed of two elements: Method Calls and Subscriptions.

Methods allow you to invoke methods (i.e. send message) while subscriptions allow you to subscribe to methods. Not all methods of the realtime api are implemented, so combining those two apis - classic and realtime - should give you all the tools you need to create an interactive application.

#### <a id="RealtimeAPI"></a>Realtime API

  - [Login](#Realtime.login)
  - [Logout](#Realtime.logout)
  - Send Message
  - [Leaving Rooms](#Realtime.leaveRoom)


#### <a id="Subscriptions"></a>Subscriptions

##### <a id="Subscriptions.stream-notify-user"></a>stream-notify-user

###### <a id="Subscriptions.stream-notify-user.notification"></a>notification

Subscribe to notification. A notification seems to be a mention in a channel. The result is only a part of the full message, to get attachments one will have to query for the message afterwards.

```js

rocketChatClient.notify.user.onNotification(userId, callback);

```

Result:

```json

{
    "msg":"changed",
    "collection":"stream-notify-user",
    "id":"id",
    "fields":{
        "eventName":"${userId}/message",
        "args":[
            {
                "title":"@username-sender",
                "text":"message text",
                "payload":{
                    "_id":"id of the payload. might be use to ensure delivered only once?",
                    "rid":"some id, probably userId + smth unique?",
                    "sender":{
                        "_id":"userid of the sender",
                        "username":"username of sender"
                    },
                    "type":"d"
                }
            }
        ]
    }
}

```

##### <a id="Subscriptions.stream-room-messages"></a> stream-room-messages

Subscribe to new messages in a room.

```js

rocketChatClient.notify.room.onChanged(roomId, callback);

```

Result

```json

{
    "msg":"changed",
    "collection":"stream-room-messages",
    "id":"id",
    "fields":{
        "eventName":"${roomId}"
    }
}

```

## TODO

-  achieved  OAuth authentication mode
-  Add SSL security mode

## CREDITS

Forked from https://github.com/qeesung/rocketchat-node
