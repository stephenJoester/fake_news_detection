import os
import json

# Define the directory containing the JSON files
directory = 'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_quan\\True_w_false\\'

# Get a list of all files in the directory
files = os.listdir(directory)
print(len(files))

list_file_path = []
list_url = []
# Iterate over each file
for file in files:
    # Only process JSON files
    if file.endswith('.json'):
        # Construct the full file path
        file_path = os.path.join(directory, file)

        # Open and load the JSON file
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception:
                print(f"Could not parse {file}")
                continue

            # Check if "maintext" is None
            if data.get('maintext') is None or data.get('maintext') == 'Đảng Việt Tân\nVới chủ đề 75 NĂM TUYÊN NGÔN QUỐC TẾ NHÂN QUYỀN – TỰ DO, BÌNH ĐẲNG & CÔNG LÝ CHO VIỆT NAM, Đảng Việt Tân muốn đề cao sự hy sinh can đảm của các nhà hoạt động, ngay cả khi ở trong tù, vẫn miệt mài tranh đấu để đòi tự do, bình đẳng và công lý cho dân tộc Việt Nam.':
                list_file_path.append(file_path)
                list_url.append(data.get('url'))

# for file_path in list_file_path:
    # os.rename(file_path, file_path.split('.')[0]+'_no_maintext'+'.json')
    # os.rename(file_path, file_path.replace('_no_maintext', ''))

for i in range(len(list_file_path)):
    # print("'"+list_url[i]+"',")
    print("'"+list_file_path[i]+"',")
    # print()
