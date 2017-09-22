import axios from 'axios';

export default store => next => action => {
    const { type, contactRequest, first_name, last_name, email, message, ...rest } = action;
    if (!contactRequest) return next(action);

    let data = {
        first_name,
        last_name,
        email,
        message,
    };

    console.log(data);

    axios({
        method: 'post',
        url: contactRequest,
        data: {
            first_name,
            last_name,
            email,
            message,
        }
    }).then( response => {
        console.log('success');
    }).catch( error => {
        console.log(error);
    });
};
