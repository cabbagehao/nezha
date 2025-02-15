import requests
from bs4 import BeautifulSoup
import time
import schedule
import warnings
import re
import json
import subprocess
import os

# 忽略 urllib3 警告
warnings.filterwarnings("ignore", category=requests.packages.urllib3.exceptions.InsecureRequestWarning)

# 保存上一次的票房数据
last_box_office = None
git_dir = os.path.dirname(os.path.abspath(__file__))

def git_push_changes(box_office_b: str, new_rank: int):
    """提交更改到 Git"""
    try:
        os.chdir(git_dir)

        # Git 操作
        subprocess.run(['git', 'pull'], check=True)
        subprocess.run(['git', 'add', '.'], check=True)
        commit_message = f"Update: Ne Zha 2 box office to {box_office_b} (Rank: {new_rank})"
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)
        subprocess.run(['git', 'push'], check=True)

        print(f"已提交更改到 Git")
        print(f"提交信息: {commit_message}")

    except subprocess.CalledProcessError as e:
        print(f"Git 操作失败: {e}")
    except Exception as e:
        print(f"执行 Git 操作时发生错误: {e}")

def update_github_data(rank: str, box_office: str):
    """更新 GitHub 上的电影数据"""
    try:
        # 将票房转换为 B 为单位（不四舍五入）
        amount = float(box_office.replace('$', '').replace(',', ''))
        box_office_b = f"${amount/1000000000:.3f}B".replace('.000B', 'B')

        ts_file = f'{git_dir}/src/data/movieData.ts'
        # 读取文件内容
        with open(ts_file, 'r', encoding='utf-8') as file:
            content = file.read()

        # 解析现有数据
        movies_str = re.search(r'export const topMovies: Movie\[\] = (\[[\s\S]*?\]);', content)
        if not movies_str:
            raise Exception("无法找到电影数据数组")

        # 将字符串转换为Python列表
        movies_text = movies_str.group(1)

        # 直接提取每个电影对象
        movies = []
        # 使用更精确的模式匹配每个电影对象
        movie_pattern = r'{([^{}]+)}'

        for match in re.finditer(movie_pattern, movies_text):
            movie_str = match.group(1).strip()
            props = {}

            # 使用更可靠的属性匹配模式
            patterns = {
                'rank': r'rank:\s*(\d+)',
                'title': r'title:\s*"([^"]+)"',
                'boxOffice': r'boxOffice:\s*"([^"]+)"',
                'year': r'year:\s*(\d+)',
                'country': r'country:\s*"([^"]+)"',
                'posterUrl': r'posterUrl:\s*"([^"]+)"'
            }

            for key, pattern in patterns.items():
                match = re.search(pattern, movie_str)
                if match:
                    value = match.group(1)
                    if key in ['rank', 'year']:
                        props[key] = int(value)
                    else:
                        props[key] = value

            if 'title' not in props:
                print(f"警告: 无法解析电影标题，跳过此条目: {movie_str}")
                continue

            movies.append(props)

        if not movies:
            raise Exception("未能成功解析任何电影数据")

        # 找到哪吒2的当前位置并更新数据
        nezha_index = next((i for i, m in enumerate(movies) if m['title'] == "Ne Zha 2"), -1)
        if nezha_index == -1:
            raise Exception("未找到Ne Zha 2的数据")

        # 创建新的哪吒2数据
        nezha_data = movies[nezha_index].copy()
        nezha_data.update({
            'boxOffice': box_office_b
        })

        # 从列表中移除旧数据
        movies.pop(nezha_index)

        # 将所有票房转换为数值以便排序
        def get_box_office_value(movie):
            box_office = movie['boxOffice']
            # 移除 $ 和 B，并转换为浮点数
            return float(box_office.replace('$', '').replace('B', ''))

        # 添加新的哪吒数据
        movies.append(nezha_data)

        # 根据票房排序（降序）
        movies.sort(key=get_box_office_value, reverse=True)

        # 更新所有电影的排名
        for i, movie in enumerate(movies):
            movie['rank'] = i + 1

        # 生成新的TypeScript代码
        movies_lines = []
        for movie in movies:
            movie_str = "  { "
            parts = []

            # 按固定顺序添加属性
            for key in ['rank', 'title', 'boxOffice', 'year', 'country']:
                if key in movie:
                    value = movie[key]
                    if isinstance(value, str):
                        parts.append(f'{key}: "{value}"')
                    else:
                        parts.append(f'{key}: {value}')

            # 如果有posterUrl，添加到最后
            if 'posterUrl' in movie:
                parts.append(f'posterUrl: "{movie["posterUrl"]}"')

            movie_str += ", ".join(parts) + " }"
            movies_lines.append(movie_str)

        new_movies_str = "[\n" + ",\n".join(movies_lines) + "\n]"

        # 更新文件内容
        new_content = re.sub(
            r'export const topMovies: Movie\[\] = \[[\s\S]*?\];',
            f'export const topMovies: Movie[] = {new_movies_str};',
            content
        )

        # 写入文件
        with open(ts_file, 'w', encoding='utf-8') as file:
            file.write(new_content)

        print(f"已更新GitHub数据文件")
        print(f"新票房: {box_office_b}")
        print(f"新排名: {nezha_data['rank']}")  # 打印排序后的新排名

        # 提交到 Git
        git_push_changes(box_office_b, nezha_data['rank'])

    except Exception as e:
        print(f"更新GitHub数据时发生错误: {e}")
        if isinstance(e, json.JSONDecodeError):
            print(f"JSON错误位置: 行 {e.lineno}, 列 {e.colno}")
            print(f"错误内容: {e.doc[max(0, e.pos-50):e.pos+50]}")

def get_nezha_box_office():
    global last_box_office
    url = "https://zh.wikipedia.org/wiki/%E5%85%A8%E7%90%83%E6%9C%80%E9%AB%98%E9%9B%BB%E5%BD%B1%E7%A5%A8%E6%88%BF%E6%94%B6%E5%85%A5%E5%88%97%E8%A1%A8"

    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=20)
        response.encoding = 'utf-8'

        soup = BeautifulSoup(response.text, 'html.parser')

        # 使用正确的类名组合查找表格
        target_table = soup.find('table', {'class': ['wikitable', 'sortable']})

        if not target_table:
            print(f"时间: {time.strftime('%Y-%m-%d %H:%M:%S')}")
            print("未找到目标表格")
            print("-" * 50)
            return

        # 遍历表格行
        rows = target_table.find_all('tr')
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if cells and any("哪吒" in cell.text for cell in cells):
                rank = cells[0].text.strip()  # 排名
                title = cells[1].text.strip() # 电影名
                # 确保获取到的是票房数据而不是电影名
                box_office = None
                for cell in cells:
                    text = cell.text.strip()
                    if text.startswith('$'):
                        box_office = text
                        break

                if not box_office:
                    print(f"未找到票房数据")
                    continue

                # 转换票房字符串为数值进行比较
                current_box_office = float(box_office.replace('$', '').replace(',', ''))

                print(f"时间: {time.strftime('%Y-%m-%d %H:%M:%S')}")
                print(f"电影: {title}")
                print(f"当前排名: {rank}")

                if last_box_office is None:
                    print(f"首次获取票房收入: {box_office}")
                    # 读取当前 movieData.ts 中的票房数据
                    try:
                        with open(f'{git_dir}/src/data/movieData.ts', 'r', encoding='utf-8') as file:
                            content = file.read()
                            match = re.search(r'title: "Ne Zha 2"[^}]*boxOffice: "([^"]+)"', content)
                            if match:
                                current_ts_box_office = float(match.group(1).replace('$', '').replace('B', ''))
                                # 将当前票房转换为 B 单位进行比较
                                current_wiki_box_office = current_box_office / 1000000000
                                # 使用 3 位有效小数进行比较
                                wiki_box_rounded = round(current_wiki_box_office, 3)
                                ts_box_rounded = round(current_ts_box_office, 3)
                                if wiki_box_rounded > ts_box_rounded:
                                    print(f"维基百科票房（${wiki_box_rounded:.3f}B）大于当前记录（${ts_box_rounded:.3f}B），更新数据")
                                    update_github_data(rank, box_office)
                                else:
                                    print(f"维基百科票房（${wiki_box_rounded:.3f}B）不大于当前记录（${ts_box_rounded:.3f}B），无需更新")
                    except Exception as e:
                        print(f"检查 movieData.ts 时发生错误: {e}")
                elif current_box_office > last_box_office:
                    print(f"票房收入更新: {box_office}")
                    print(f"增加了: ${current_box_office - last_box_office:,.2f}")
                    # 当票房更新时，更新GitHub数据
                    update_github_data(rank, box_office)
                else:
                    print("票房收入未更新")
                    print(f"当前票房: {box_office}")

                # 更新保存的票房数据
                last_box_office = current_box_office

                print("-" * 50)
                return

        print(f"时间: {time.strftime('%Y-%m-%d %H:%M:%S')}")
        print("未找到《哪吒之魔童闹海》的数据")
        print("-" * 50)

    except Exception as e:
        print(f"时间: {time.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"发生错误: {e}")
        print("-" * 50)

def main():
    # 首次运行
    get_nezha_box_office()

    # 每分钟运行一次
    schedule.every(10).minutes.do(get_nezha_box_office)

    # 保持运行
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    print("开始监控《哪吒：魔童闹海》票房数据...")
    print("程序将每10分钟更新一次数据")
    print("-" * 50)
    main()