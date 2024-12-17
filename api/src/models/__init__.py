"""Package for models."""
import os

from sqlalchemy import (
    Engine,
    MetaData,
    create_engine,
)


class Database:
    """Database class."""

    engine: Engine
    metadata = MetaData()

    def init_db(self) -> None:
        """Init the database."""
        database = os.getenv("MYSQL_DATABASE")
        username = os.getenv("MYSQL_USER")
        password = os.getenv("MYSQL_PASSWORD")
        self.engine = create_engine(
            f"mariadb+mariadbconnector://{username}:{password}@networkers-db/{database}")
        self.metadata.create_all(self.engine)


db = Database()
