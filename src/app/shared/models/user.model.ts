import { IUser } from "../interfaces/user.interfaces";

export class User implements IUser {
    constructor(
        public id: number,
        public books:string,
        public name :string,
        public category:string,
        public isbn :number
    ){}
}