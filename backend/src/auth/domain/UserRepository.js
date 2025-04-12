// Domain Layer Abstract class for accessing the Infrastructure layer to get to the Database

class UserRepository {

    getByUsername(username) {
        throw new Error("Method 'getByUsername()' not implemented")
    }

    save(user) {
        throw new Error("Method 'save()' not implemented")
    }
}

export default UserRepository;
