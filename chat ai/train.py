import nltk
import numpy as np
from tensorflow import keras
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import pickle

# Chuẩn bị dữ liệu
nltk.download('punkt')  # Tải dữ liệu cần thiết từ thư viện nltk

# Đọc và xử lý tập dữ liệu văn bản
def preprocess_text(text):
    text = text.lower()  # Chuyển đổi thành chữ thường
    # Các bước xử lý khác như loại bỏ dấu câu, stop words, stemming, lemmatization, ...
    return text

def load_corpus(file_path):
    corpus = []
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    for line in lines:
        line = preprocess_text(line)
        corpus.append(line)
    return corpus

file_path = 'data/1.txt'  # Đường dẫn đến tập dữ liệu văn bản
corpus = load_corpus(file_path)

# Tạo tokenizer và biến đổi câu thành dạng vector
tokenizer = Tokenizer()
tokenizer.fit_on_texts(corpus)
total_words = len(tokenizer.word_index) + 1

# Tạo dữ liệu huấn luyện và đầu ra dự đoán
input_sequences = []
output_sequences = []
for line in corpus:
    token_list = tokenizer.texts_to_sequences([line])[0]
    for i in range(1, len(token_list)):
        n_gram_sequence = token_list[:i+1]
        input_sequences.append(n_gram_sequence[:-1])
        output_sequences.append(n_gram_sequence[-1])

# Chuyển đổi dữ liệu thành dạng ma trận đầu vào và đầu ra
max_sequence_len = max([len(seq) for seq in input_sequences])
input_sequences = np.array(pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre'))
output_sequences = np.array(output_sequences)

# Xây dựng mô hình LSTM
model = keras.Sequential()
model.add(keras.layers.Embedding(total_words, 100, input_length=max_sequence_len-1))
model.add(keras.layers.LSTM(150))
model.add(keras.layers.Dense(total_words, activation='softmax'))

# Biên dịch mô hình
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam')

# Huấn luyện mô hình
model.fit(input_sequences, output_sequences, epochs=100)

# Lưu tokenizer và mô hình vào file
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
model.save('model.keras')