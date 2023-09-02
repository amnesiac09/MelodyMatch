interface IUser {
    _id: string;
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    file: string
}

interface ICreateUserApiReq {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string
}
interface ILogInUserApiReq {
    usernameOrEmail: string,
    password: string
}
interface IForgetPasswordUserApiReq {
    usernameOrEmail: string,
}
interface IResetPasswordUserApiReq {
    password: "",
    confirm_password: ""
}