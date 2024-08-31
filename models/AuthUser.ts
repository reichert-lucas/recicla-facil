class AuthUser {
    name: string;
    email: string;
    system_id: Number|null;
    is_admin: boolean;
    is_super_admin: boolean;

    constructor(name: string, email: string, system_id: Number|null, is_admin: boolean, is_super_admin: boolean) {
        this.name = name;
        this.email = email;
        this.system_id = system_id;
        this.is_admin = is_admin;
        this.is_super_admin = is_super_admin;
    }
}