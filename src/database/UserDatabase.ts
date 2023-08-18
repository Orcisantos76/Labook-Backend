import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users";
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public insertUser = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email: email })
        return userDB as UserDB | undefined
    }

    public async findUserById(id: string): Promise<UserDB | undefined> {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
            UserDatabase.TABLE_USERS
        ).where({ id });
        return userDB;
    }

    public async findUsers(q: string | undefined): Promise<UserDB[]> {
        let usersDB;
        if (q) {
            const result: UserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            ).where("name", "LIKE", `%${q}%`);

            usersDB = result;
        } else {
            const result: UserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            );
            usersDB = result;
        }
        return usersDB;
    }
}