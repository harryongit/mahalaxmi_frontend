import pymysql

passwords = ["root", "admin", "123456", "password", "root123", "admin123", "1234", ""]

for p in passwords:
    try:
        conn = pymysql.connect(host="localhost", user="root", password=p, port=3306)
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS mahalaxmi;")
        print(f"SUCCESS: Connected to MySQL with password: '{p}'")
        conn.close()
        break
    except Exception as e:
        print(f"Tried password '{p}': {e}")
