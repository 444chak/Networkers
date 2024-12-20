export function validate_passwd(passwd) {
    if (!passwd.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)) {
        return false;
    }p
    return true;
}
