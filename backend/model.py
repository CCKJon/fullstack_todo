from pydantic import BaseModel

class Todo(BaseModel):
    title: str
    description: str



# class Todo(BaseModel):
#     def __init__(self, title, description):
#         self.title: str = title
#         self.description: str = description