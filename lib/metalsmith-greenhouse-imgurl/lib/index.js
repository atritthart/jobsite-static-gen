'use strict';

var _ = require('underscore');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to retrieve content from Greenhouse.io and place in the file's metadata.
 *
 * @param {Object} options
 *   @property {String} urlPrefix URL prefix for images, for determining file name without path
 * @return {Function}
 */

function plugin() {
    var filenameRegex = /^.*\/(.+)$/;

    return function(files, metalsmith, done) {
        var meta = metalsmith.metadata();
        meta.imgurls = meta.imgurls || [];

        Array.prototype.push.apply(meta.imgurls, _.chain(meta.greenhouse.jobs)
            .pluck('metadata')
            .flatten()
            .filter(imageUrl)
            .each(enrichFileName)
            .map(intoImgurlObject)
            .value());

        done();
    }

    function imageUrl(metadataItem) {
        return metadataItem.name === 'image-url'
            && metadataItem.value_type === 'url'
            && filenameRegex.test(decodeURIComponent(metadataItem.value));
    }
    function enrichFileName(imageUrl) {
        var matches = decodeURIComponent(imageUrl.value).match(filenameRegex);
        if (matches) {
            imageUrl.fileName = matches[1];
        } else {
            throw new Error("W00t, this should never happen!");
        }
    }
    function intoImgurlObject(imageUrl) {
        return {
            origUrl: imageUrl.value,
            fileName: imageUrl.fileName
        };
    }
}
