const startTime = new Date().getTime();

function getCurrentTime() {
    return new Date().getTime() - startTime;
}

export {
    getCurrentTime
}