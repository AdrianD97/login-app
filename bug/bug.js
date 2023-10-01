const fs = require('fs');

function readFile(path, callback) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

function writeFile(path, data, callback) {
    fs.writeFile(path, data, 'utf8', err => {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
}

readFile('input.txt', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }

    const newData = data.toUpperCase();

    writeFile('output.txt', newData, (err) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log('File written successfully');
    });
});
