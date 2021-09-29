const mongoose = require('mongoose');
const Types = mongoose.Schema.Types

const groupSchema = mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    admins: {
        type: [{ type: Types.ObjectId, ref: 'User', populate: true }],
        required: true
    },
    inspectors: [{ type: Types.ObjectId, ref: 'User', populate: true }]
}, {
    versionKey: false
});

function distinctObjectIdArray(arr) {

    /* Removing duplicate values */

    // ["61507eaab51b4983b5fb8f1a", "61507eaab51b4983b5fb8f1a"]
    let uniqueArr = arr.map(item => item.toString());

    // ["61507eaab51b4983b5fb8f1a"]
    uniqueArr = [...new Set(arr)];

    // [ new ObjectId("61507eaab51b4983b5fb8f1a") ]
    uniqueArr = arr.map(item => mongoose.Types.ObjectId(item));

    return uniqueArr;
}

groupSchema.pre('save', function(next) {
    this.admins = distinctObjectIdArray(this.arr);
    next();
});
groupSchema.pre('updateOne', function(next) {
    const data = this.getUpdate();

    data.admins = distinctObjectIdArray(data.admins);
    this.update({}, data);

    next();
});

groupSchema.statics.create = function(payload) {
    const group = new this(payload);

    return group.save();
};

module.exports = mongoose.model('Group', groupSchema);