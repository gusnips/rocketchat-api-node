/*eslint no-console: ["error", { allow: ["log", "error"] }] */
const Promise = require("bluebird");
const net = require("./net");
function RocketChatClient(protocol, host, port, username, password, onConnected) {
    let _authToken;
    let _userId;
    let basepath = "";

    if (arguments.length === 1) {
        host = arguments[0].host || "localhost";
        port = arguments[0].port || 3000;
        username = arguments[0].username || "";
        password = arguments[0].password || "";
        onConnected = arguments[0].onConnected;
        basepath = (arguments[0].basepath || "").replace(/^\/+|\/+$/g, "");
        protocol = arguments[0].protocol || "http";
    }

    onConnected = onConnected || function() {};

    const self = this;

    const restClient = new net.RestClient(protocol, host, port, basepath + "/api/v1/");
    const wsClient = new net.WsClient("ws", host, port, basepath + "/websocket");

    this.authentication = new (require("./api/authentication"))(restClient);

    this.miscellaneous = new (require("./api/miscellaneous"))(restClient);
    this.chat = new (require("./api/chat"))(restClient);
    this.channels = new (require("./api/channels"))(restClient);
    this.groups = new (require("./api/groups"))(restClient);
    this.settings = new (require("./api/setting"))(restClient);
    this.users = new (require("./api/users"))(restClient);
    this.integration = new (require("./api/integration"))(restClient);
    this.realtime = new (require("./api/realtime"))(wsClient);
    this.notify = new (require("./api/notify"))(wsClient);
    this.im = new (require("./api/im"))(restClient);

    this.restClient = restClient;
    this.wsClient = wsClient;

    this.setAuthToken=(value)=>{
        _authToken=value;
        restClient.setHeader("X-Auth-Token", value);
    };
    this.setUserId=(value)=>{
        _userId=value;
        restClient.setHeader("X-User-Id", value);
    };
    this.getAuthToken=()=>{
        return _authToken;
    };
    this.getUserId=()=>{
        return _userId;
    };
    this.login=(username, password, realtime, callback)=>{
        return new Promise((resolve, reject) => {
            self.authentication.login(username, password, function(err, body) {
                if (err)
                    return callback ? callback(err, null) : reject(err);

                self.setAuthToken(body.data.authToken);
                self.setUserId(body.data.userId);

                if(realtime){
                    self.realtime.login(username, password, function (err) {
                        if (err)
                            return callback ? callback(err, null) : reject(err);
                        return callback ? callback(null, self, body.data) : resolve(self, body.data);
                    });
                }
                else {
                    return callback ? callback(null, self, body.data) : resolve(self, body.data);
                }
            });
        });
    };


    if (username && password) {
        this.login(username, password, false, onConnected);
    } else {
        onConnected(null, self);
    }
}

exports.RocketChatClient = RocketChatClient;
