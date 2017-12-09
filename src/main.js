import findRoute from "./lib/findRoute";
import { forEachEntry } from "lightdash";

/**
 * Returns hash without init-character
 *
 * @returns {string} replaced string
 */
const getHash = () => location.hash.replace("#", "");

/**
 * Splits path by dashes and trims
 *
 * @param {string} path path string
 * @returns {Array<string>} split path
 */
const splitPath = path => path.split("/").filter(item => item.length);

/**
 * Avenue Class
 *
 * @class
 */
const Avenue = class {
    /**
     * Avenue constructor
     *
     * @constructor
     * @param {Object} routeMap routing map
     */
    constructor(routeMap) {
        const currentPath = getHash();

        this.routes = [];
        this.fallback = () => {};

        //Change routes from {path:fn} to [{path,fn}] and extracts fallback route
        forEachEntry(routeMap, (routeFn, routePath) => {
            if (routePath === "?") {
                this.fallback = routeFn;
            } else {
                this.routes.push([splitPath(routePath), routeFn]);
            }
        });

        window.addEventListener(
            "hashchange",
            e => this.changeView(getHash(), e),
            false
        );

        //Load current route if exists
        if (currentPath) {
            this.changeView(currentPath);
        }
    }
    /**
     * Changes view by route
     *
     * @param {string} path route path
     * @param {Event} e Event object
     */
    changeView(path, e = null) {
        const result = findRoute(splitPath(path), this.routes);

        return result
            ? result.route[1](e, result.args, path)
            : this.fallback(e, path);
    }
    /**
     * Navigate to the given path, triggering hashchange event
     *
     * @param {string} path Path string
     */
    navigate(path) {
        location.hash = path;
    }
};

export default Avenue;
