import socket
import threading
import browser_history
import sqlite3
import datetime

def _start_server_(host, port):
    def handle_client(client_socket, client_type):
        print(f"[NEW {client_type.upper()} CONNECTION] {client_socket.getpeername()} connected.")
        while True:
            try:
                message = client_socket.recv(1024).decode('utf-8')
                if not message:
                    break
                print(f"[{client_type.upper()} {client_socket.getpeername()}] {message}")
                # Gửi tin nhắn tới tất cả các client khác
                for client in clients:
                    if client != client_socket:
                        try:
                            client.send(message.encode('utf-8'))
                        except:
                            continue
            except Exception as e:
                print(f"[EXCEPTION] {e}")
                break

        print(f"[DISCONNECTED] {client_type.upper()} {client_socket.getpeername()} disconnected.")
        client_socket.close()

    def start_server(host, port):
        #host = '127.0.0.1'
        #port = 12345

        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind((host, port))
        server.listen(5)

        print(f"[LISTENING] Server is listening on {host}:{port}")

        while True:
            client_socket, address = server.accept()

            # Xác định loại client (Admin hoặc User)
            client_type = client_socket.recv(1024).decode('utf-8')

            clients.append(client_socket)

            thread = threading.Thread(target=handle_client, args=(client_socket, client_type))
            thread.start()

    clients = []
    start_server(host=host, port=port)
#ví dụ : _start_server_('127.0.0.1', 5000)

def receive_message(socket):
    while True:
        try:
            message = socket.recv(1024).decode('utf-8')
            if not message:
                break
            return message
        except Exception as e:
            return f"[EXCEPTION] {e}"
            break
#sau khi start thành công 1 user hay admin, có thể dùng hàm này để get về tin nhắn mà máy chủ nhận được bằng 1 cấu hình socket loại socket.socket
#ví dụ :
# >>> user.connect(('127.0.0.1', 5000))
# >>> type(user)
# <class 'socket.socket'>
# >>> user
# <socket.socket fd=388, family=2, type=1, proto=0, laddr=('127.0.0.1', 51414), raddr=('127.0.0.1', 5000)>
#khi sử dụng hàm receive_message, tham số socket truyền trực tiếp biến user vào là được

def send_message(message, socket):
    text = message.encode('utf-8')
    socket.send(text)


def start_user(host, port):
    # host = '127.0.0.1'
    # port = 12345

    user = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    user.connect((host, port))

    # Xác định loại client (User)
    user.send('user'.encode('utf-8'))

    # receive_thread = threading.Thread(target=receive_message, args=(user,))
    # receive_thread.start()
    return user
#data trả về là 1 cấu hình socket thuộc socket.socket
#ví dụ :
# >>> user.connect(('127.0.0.1', 5000))
# >>> type(user)
# <class 'socket.socket'>
# >>> user
# <socket.socket fd=388, family=2, type=1, proto=0, laddr=('127.0.0.1', 51414), raddr=('127.0.0.1', 5000)>
#khi sử dụng hàm send_message hoặc receive_message, tham số socket truyền trực tiếp biến user vào là được

def start_admin(host, port):
    # host = '127.0.0.1'
    # port = 12345

    admin = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    admin.connect((host, port))

    # Xác định loại client (Admin)
    admin.send('admin'.encode('utf-8'))

    # receive_thread = threading.Thread(target=receive_message, args=(admin,))
    # receive_thread.start()

    return admin
#data trả về là 1 cấu hình socket thuộc socket.socket
#ví dụ :
# >>> admin.connect(('127.0.0.1', 5000))
# >>> type(admin)
# <class 'socket.socket'>
# >>> admin
# <socket.socket fd=388, family=2, type=1, proto=0, laddr=('127.0.0.1', 51414), raddr=('127.0.0.1', 5000)>
#khi sử dụng hàm send_message hoặc receive_message, tham số socket truyền trực tiếp biến admin vào là được
def _get_history_():
    data = []
    temp = browser_history.get_history()
    for i in temp.histories:
        data.append(i)
    return data
def _timestamp_():
    now = datetime.datetime.now()
    timestamp = int(now.timestamp())
    return timestamp
def creat_log_db():
    con = sqlite3.connect(f"{_timestamp_()}")
    cur = con.cursor()
    cur.execute("CREATE TABLE data(time, url)")
    for i in _get_history_():
        cur.execute(f"INSERT INTO data(time, url) VALUES ('{i[0].strftime('%d/%m/%Y %H:%M:%S')}', '{i[1]}');")
    con.commit()
    con.close()
