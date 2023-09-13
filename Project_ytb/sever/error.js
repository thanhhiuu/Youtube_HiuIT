export const createError = (status, message) => {
    // Sử dụng constructor Error() 
    //  Đối tượng này sẽ được tùy chỉnh thông qua hai đối tượng status và message
    const err = new Error();
    err.status = status;
    err.message = message;
    return err
}