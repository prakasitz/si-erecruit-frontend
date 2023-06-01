export declare class IAuth {
    signIn(payload: UserLogin): Promise<string>;
    signOut(): boolean;
    getUser(): object;
}


export interface UserLogin {
    username: string
    password: string
}