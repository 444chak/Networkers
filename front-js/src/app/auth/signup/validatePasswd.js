export function validate_passwd(passwd){
    if (passwd.length < 8) {
        return false;
    }

    if (!/[0-9]/.test(passwd)) {
        return false;
    }

    if (!/[a-z]/.test(passwd)){
        return false;
    }

    if (!/[A-Z]/.test(passwd)){
        return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwd)) {
        return false;
    }

    return true;
}