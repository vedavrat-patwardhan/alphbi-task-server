/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object: any, keys: string[]) => {
    return keys.reduce((obj: any, key) => {
        // Reference - https://medium.com/@5066aman/whats-the-deal-with-object-prototype-hasownproperty-call-45bf8f8e1e83
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

export default pick;