/**
 * @author Dennis Ritter
 * @created 11.05.2017
 * @description Contains helper functions for general purposes needed in the Application.
 */

/**
 * @description         Returns an array that contains unique values
 *                      of the given properties in the given array.
 * @param { String }    prop   - The key of {array} which values will be unique.
 * @param { [Object] }  array - The array to take keys from.
 * @returns { [*] }     A new Array containing unique values of the {arrays} {key} property
 */
function unique(prop, array) {
  // Filter elements in {array} that do not have a {prop} key.
  return [...new Set(array.filter(
    // Remove duplicates by creating a Set and remove items where {prop} has no value.
    item => Object.prototype.hasOwnProperty.call(item, prop) && !!item[prop])
  // Create a new array containing the {prop} values of each given item.
  .map(item => item[prop]))];
}

// Export all functions as default export.
export default { unique };
