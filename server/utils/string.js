function getFileName(path) {
    const index = path.lastIndexOf('\\');
    return path.slice(index + 1);
}

module.exports = {
    getFileName
}