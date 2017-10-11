/**
 * @author Dennis ritter
 * @created 06.07.17
 * @description Contains filters to format Dates.
 */

import moment from 'moment';

/**
 * The String to display when the given String is a invalid date String.
 * @type {String}
 */
const INVALID_DATE_STRING = '-';

const dateFilters = {
  /**
   * @description Transforms the given date into a US Date Format String
   * @param {date} date - The given date
   * @returns {String}
   */
  formatUS(date) {
    if (date) return moment(String(date)).format('MM/DD/YYYY');
    return INVALID_DATE_STRING;
  },
  /**
   * @description Returns a String representing the expired time from the given date to now.
   * @param {date} date - The given date
   * @returns {String}
   */
  fromNow(date) {
    if (date) return moment(String(date)).fromNow();
    return INVALID_DATE_STRING;
  },
};

export default dateFilters;
