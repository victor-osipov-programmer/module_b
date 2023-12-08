function changeKeyName(pathKey, oldNameKey, newNameKey) {
    if (!pathKey.hasOwnProperty(oldNameKey)) return;

    pathKey[newNameKey] = pathKey[oldNameKey];
    delete pathKey[oldNameKey];
}

module.exports = {
    changeKeyName
}