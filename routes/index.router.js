/**
 * @file(index.router.js) All routing is imported here
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import device from './device.router.js';
import asset from './asset.router.js';
import region from './branch.router.js';
import zone from './zone.router.js';
import branch from './branch.router.js';
import user from './user.router.js';
import usertype from './usertype.router.js';

export default {device, asset, region, zone, branch, user, usertype};
