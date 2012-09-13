/**
 * List functions to be exported from the design doc.
 */

exports.embedded = function (head, req) {
// specify that we're providing a JSON response
    provides('html', function() {
        // create an array for our result set
        var results = {};

        while (row = getRow()) {
            var obj = row.doc._id.split('/');
            var type = obj[0];
            var id = obj[1];

            if (type === 'logradouro') {
                if (results !== {}) {
                    row.doc['localidade'] = results['localidade'];
                    row.doc['bairro'] = results['bairro'];

                    results = row.doc;
                }
            } else {
                results[type] = row.doc;
            }
//            results.push({
//                city: row.value.city,
//                address: row.value.address
//            });
        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
};
