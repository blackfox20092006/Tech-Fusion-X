import os
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense
import numpy as np

# Step 1: Thu thập và tiền xử lý dữ liệu
data_folder = 'D:\hackathon round 3\data'
file_paths = [os.path.join(data_folder, file) for file in os.listdir(data_folder) if file.endswith('.txt')]
documents = []

for file_path in file_paths:
    with open(file_path, 'r', encoding='utf-8') as file:
        document = file.read()
        documents.append(document)

# Step 2: Tiền xử lý dữ liệu
tokenizer = Tokenizer()
tokenizer.fit_on_texts(documents)
vocab_size = len(tokenizer.word_index) + 1

# Tạo các sequences từ văn bản
sequences = tokenizer.texts_to_sequences(documents)

# Sử dụng padding để làm cho các sequences có cùng độ dài
max_seq_length = max(len(seq) for seq in sequences)
padded_sequences = pad_sequences(sequences, maxlen=max_seq_length)

# Chuẩn bị dữ liệu huấn luyện và dữ liệu đích
X = padded_sequences[:, :-1]
y = padded_sequences[:, -1]

# Step 3: Xây dựng mô hình
model = Sequential()
model.add(Embedding(vocab_size, 100, input_length=max_seq_length-1))
model.add(LSTM(100))
model.add(Dense(vocab_size, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Huấn luyện mô hình
model.fit(X, y, epochs=1000, verbose=2)

# Step 5: Giao diện người dùng
# Sửa đổi phần dự đoán trong hàm answer_question
def answer_question(question):
    # Tiền xử lý câu hỏi
    question_seq = tokenizer.texts_to_sequences([question])
    question_seq = pad_sequences(question_seq, maxlen=max_seq_length-1)

    # Dự đoán phân phối xác suất cho từ tiếp theo
    probabilities = model.predict(question_seq, verbose=0)
    next_word_id = np.argmax(probabilities)

    # Chuyển đổi từ ID thành từ
    next_word = ''
    for word, index in tokenizer.word_index.items():
        if index == next_word_id:
            next_word = word
            break

    return next_word
# Sử dụng giao diện người dùng để yêu cầu người dùng nhập câu hỏi
while True:
    question = input('Nhập câu hỏi của bạn (hoặc gõ "q" để thoát): ')
    if question.lower() == 'q':
        break
    answer = answer_question(question)
    print('Câu trả lời:', answer)