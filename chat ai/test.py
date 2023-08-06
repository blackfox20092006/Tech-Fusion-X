import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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

file_path = 'D:\\hackathon round 3\\data\\1.txt'  # Đường dẫn đến tập dữ liệu văn bản
corpus = load_corpus(file_path)

# Vector hóa văn bản
vectorizer = TfidfVectorizer()
vectorized_corpus = vectorizer.fit_transform(corpus)

# Tính toán độ tương đồng cosine giữa câu hỏi và các văn bản
def get_response(question):
    question = preprocess_text(question)
    question_vector = vectorizer.transform([question])
    similarity_scores = cosine_similarity(question_vector, vectorized_corpus)[0]
    max_similarity_index = similarity_scores.argmax()
    response = corpus[max_similarity_index]
    return response

# Gọi hàm get_response để test
while True:
    user_input = input("User: ")
    if user_input.lower() == 'exit':
        break
    response = get_response(user_input)
    print("Trọng đặc cầu:", response)