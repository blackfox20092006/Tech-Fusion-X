import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from transformers import GPT2Tokenizer, GPT2LMHeadModel

# Đọc nội dung từ file '1.txt'
file_path = 'data/1.txt'
with open(file_path, 'r', encoding='utf-8') as file:
    text_data = file.read()

# Tạo tokenizer và mã hóa dữ liệu thành các token
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
tokens = tokenizer.encode(text_data, add_special_tokens=True)

# Xác định độ dài của các mẫu đầu vào (độ dài cần phải nhỏ hơn kích thước mô hình GPT)
max_length = 100

# Chuẩn bị dữ liệu để tạo thành các mẫu huấn luyện
input_ids = []
attention_masks = []

for i in range(0, len(tokens), max_length):
    chunk = tokens[i:i + max_length]
    padding_length = max_length - len(chunk)
    input_ids.append(chunk + [tokenizer.pad_token_id] * padding_length)
    attention_masks.append([1] * len(chunk) + [0] * padding_length)

# Tạo tập dữ liệu huấn luyện từ các mẫu đã chuẩn bị
class CustomDataset(Dataset):
    def __init__(self, input_ids, attention_masks):
        self.input_ids = torch.tensor(input_ids)
        self.attention_masks = torch.tensor(attention_masks)

    def __len__(self):
        return len(self.input_ids)

    def __getitem__(self, idx):
        return self.input_ids[idx], self.attention_masks[idx]

dataset = CustomDataset(input_ids, attention_masks)
dataloader = DataLoader(dataset, batch_size=2, shuffle=True)

# Định nghĩa mô hình GPT cơ bản
num_tokens = len(tokenizer)
gpt_model = GPT2LMHeadModel.from_pretrained("gpt2")

# Định nghĩa hàm mất mát và bộ tối ưu hóa
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(gpt_model.parameters(), lr=1e-4)

# Huấn luyện mô hình (fine-tuning)
num_epochs = 5
for epoch in range(num_epochs):
    total_loss = 0
    for input_ids, attention_masks in dataloader:
        optimizer.zero_grad()
        logits = gpt_model(input_ids, attention_mask=attention_masks)[0]
        loss = criterion(logits.view(-1, num_tokens), input_ids.view(-1))
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {total_loss:.4f}")

# Sử dụng mô hình để sinh văn bản mới
prompt_text = "Once upon a time"
input_ids = tokenizer.encode(prompt_text, return_tensors="pt")
output = gpt_model.generate(input_ids, max_length=100, num_return_sequences=1)
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print("Generated text:", generated_text)
