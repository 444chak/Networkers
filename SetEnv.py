"""
Set the environment variables for the project.
Run this script before running the Docker container.
"""

from os.path import exists
from os import makedirs, remove

ENV_PATH = ".env"
ENV_DB = ENV_PATH + "/db"
ENV_API = ENV_PATH + "/api"

GREEN = "\x1b[32m"
BLUE = "\x1b[34m"
RESET = "\x1b[0m"

def check_env():
    """Check if the .env directory exists.
    If it doesn't, create it.
    If it exists, remove the api and db files."""
    print("Checking .env directory...")
    if not exists(ENV_PATH):
        print("Creating .env directory...")
        makedirs(ENV_PATH)
    if exists(ENV_API):
        print("Removing .env/api file...")
        remove(ENV_API)
    if exists(ENV_DB):
        print("Removing .env/db file...")
        remove(ENV_DB)

def create_db_env():
    """Create the .env/db file."""
    print("Database configuration:")
    with open(ENV_DB, 'w', encoding="UTF-8") as f:
        database = input("Database: ")
        f.write("MYSQL_DATABASE=" + database + "\n")
        user = input("Database user: ")
        f.write("MYSQL_USER=" + user + "\n")
        password = input("Database password: ")
        f.write("MYSQL_PASSWORD=" + password + "\n")
        passwordroot = input("Database root password: ")
        f.write("MYSQL_ROOT_PASSWORD=" + passwordroot + "\n")
        f.close()

def create_api_env():
    """Create the .env/api file."""
    print("API configuration:")
    with open(ENV_API, 'w', encoding="UTF-8") as f:
        jwt_secret_key = input("JWT Secret Key: ")
        f.write("JWT_SECRET_KEY=" + jwt_secret_key + "\n")
        jwt_refresh_key = input("JWT Refresh Key: ")
        f.write("JWT_REFRESH_KEY=" + jwt_refresh_key + "\n")
        common_key = input("Common key: ")
        f.write("COMMON_KEY=" + common_key + "\n")
        f.close()

if __name__ == "__main__":
    print(f"{BLUE}--------------------")
    print("|    BORGO TEAM    |")
    print("|   SetEnv Script  |")
    print(f"--------------------{RESET}")
    print("")
    check_env()
    print("")
    create_db_env()
    print("")
    create_api_env()
    print("")
    print(f"{GREEN}Environment variables set successfully.{RESET}")
