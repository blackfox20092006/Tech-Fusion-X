function _start_server_(host, port) {
    var clients = [];

    function handle_client(client_socket, client_type) {
        console.log("[NEW " + client_type.toUpperCase() + " CONNECTION] " + client_socket.getpeername() + " connected.");
        while (true) {
            try {
                var message = client_socket.recv(1024).decode('utf-8');
                if (!message) {
                    break;
                }
                console.log("[" + client_type.toUpperCase() + " " + client_socket.getpeername() + "] " + message);
                for (var i in clients) {
                    var client = clients[i];
                    if (client != client_socket) {
                        try {
                            client.send(message.encode('utf-8'));
                        } catch (e) {
                            continue;
                        }
                    }
                }
            } catch (e) {
                console.log("[EXCEPTION] " + e);
                break;
            }
        }

        console.log("[DISCONNECTED] " + client_type.toUpperCase() + " " + client_socket.getpeername() + " disconnected.");
        client_socket.close();
    }

    function start_server(host, port) {
        var server = new socket.socket(socket.AF_INET, socket.SOCK_STREAM);
        server.bind((host, port));
        server.listen(5);

        console.log("[LISTENING] Server is listening on " + host + ":" + port);

        while (true) {
            var client_socket = server.accept()[0];
            var address = server.accept()[1];
            var client_type = client_socket.recv(1024).decode('utf-8');

            clients.push(client_socket);

            var thread = new threading.Thread(handle_client, [client_socket, client_type]);
            thread.start();
        }
    }

    start_server(host, port);
}

function receive_message(socket) {
    while (true) {
        try {
            var message = socket.recv(1024).decode('utf-8');
            if (!message) {
                break;
            }
            return message;
        } catch (e) {
            return "[EXCEPTION] " + e;
            break;
        }
    }
}

function send_message(message, socket) {
    var text = message.encode('utf-8');
    socket.send(text);
}

function start_user(host, port) {
    var user = new socket.socket(socket.AF_INET, socket.SOCK_STREAM);
    user.connect((host, port));
    user.send('user'.encode('utf-8'));
    return user;
}

function start_admin(host, port) {
    var admin = new socket.socket(socket.AF_INET, socket.SOCK_STREAM);
    admin.connect((host, port));
    admin.send('admin'.encode('utf-8'));
    return admin;
}

function _get_history_() {
    var data = [];
    var temp = browser_history.get_history();
    for (var i in temp.histories) {
        var item = temp.histories[i];
        data.push(item);
    }
    return data;
}

function _timestamp_() {
    var now = new Date();
    var timestamp = Math.floor(now.getTime() / 1000);
    return timestamp;
}

function create_log_db() {
    var con = sqlite3.connect(_timestamp_().toString());
    var cur = con.cursor();
    cur.execute("CREATE TABLE data(time, url)");
    for (var i in _get_history_()) {
        var item = _get_history_()[i];
        cur.execute("INSERT INTO data(time, url) VALUES ('" + item[0].strftime('%d/%m/%Y %H:%M:%S') + "', '" + item[1] + "');");
    }
    con.commit();
    con.close();
}