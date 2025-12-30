from config import users_collection

def create_user(email, password, provider):
    user = {
        "email": email,
        "password": password,  # None for Google users
        "provider": provider
    }
    users_collection.insert_one(user)

def find_user_by_email(email):
    return users_collection.find_one({"email": email})
