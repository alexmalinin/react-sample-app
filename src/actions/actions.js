export function userType(user) {
    const action = {
        type: 'CHANGE_USER_TYPE',
        user,
    };

    return action;
}
