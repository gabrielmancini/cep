/**
 * List functions to be exported from the design doc.
 */

exports.embedded = function (head, req) {
// specify that we're providing a JSON response
    provides('html', function() {
        // create an array for our result set
        var result = {};
        var results = [];

        while (row = getRow()) {
            if (undefined == row.doc) {
                throw (['error', 'expected parameter', 'precisa incluir ?include_docs=true']);
            }
            var obj = row.doc._id.split('/');
            var type = obj[0];
            var id = obj[1];

            if (type === 'logradouro') {
                if (result !== {}) {
                    row.doc['localidade'] = result['localidade'];
                    row.doc['bairro'] = result['bairro'];

                    results.push(row.doc);
                    result = {};
                }
            } else {
                result[type] = row.doc;
            }
        }

        // make sure to stringify the results :)
        send(JSON.stringify(
            {
                total_rows: results.length
                , offset: parseInt( req.query.skip || '0' )
                , rows: results
//                , log: req
            })
        );
    });
};
