from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(80),nullable = False)
    edad: Mapped[int] = mapped_column(Integer(),nullable = False)
    description: Mapped[str] = mapped_column(Text,nullable = False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def __repr__(self):
        return f"User: {self.email}"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "edad": self.edad,
            "name": self.name,
            "desciption": self.desciption,
            # do not serialize the password, its a security breach
        }
