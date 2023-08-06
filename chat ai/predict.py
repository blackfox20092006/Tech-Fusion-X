import pickle
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

# Load trained model and tokenizer
model = load_model('trained_model.h5')
tokenizer = pickle.load(open('tokenizer.pkl', 'rb'))

# Step 5: Giao diện người dùng
def answer_question(question):
    # Tiền xử lý câu hỏi
    question_seq = tokenizer.texts_to_sequences([question])
    question_seq = pad_sequences(question_seq, maxlen=model.input_shape[1])

    # Dự đoán phân phối xác suất cho từ tiếp theo
    probabilities = model.predict(question_seq, verbose=0)
    next_word_id = tf.argmax(probabilities, axis=-1).numpy()[0]

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