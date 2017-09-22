import axios from 'axios';

export default store => next => action => {
    const { contactRequest, type, name, surname, email, message, ...rest } = action;
    if (!contactRequest) return next(action);

    console.log('in axios')

    let data = {
        first_name: name,
        last_name: surname,
        email,
        message,
    };

    console.log(data);

    axios({
        method: 'post',
        url: `http://192.168.88.68${contactRequest}`,
        data: {
            first_name: name,
            last_name: surname,
            email,
            message,
        }
    }).then( response => {
        console.log('success');
    }).catch(function (error) {
        console.log(error);
    });
};
