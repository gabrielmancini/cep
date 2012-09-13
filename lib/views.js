/**
 * Show functions to be exported from the design doc.
 */

exports.full = {
    map: function (doc) {
        var obj = doc._id.split('/');
        var type = obj[0];
        var id = obj[1];

        if (type === 'logradouro') {
            emit(doc._id, { _id: doc._id });
            emit(doc._id, { _id: doc.localidade._id });
            emit(doc._id, { _id: doc.bairro._id });
        }
    }
};