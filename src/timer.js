const Timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve,ms))
}
export default Timeout;