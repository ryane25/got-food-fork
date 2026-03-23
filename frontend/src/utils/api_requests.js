/**
 * A private helper function that applies specified URL query parameters
 * to a dispatched API call to /api/pantries. This allows us to provide the
 * illusion of several distinct JS functions that all call to the same API
 * with different parameters.
 *
 * @param {boolean} open_now - True if we want to get all pantries that are open
 * currently (based on EST).
 * @param {string} eligible_zip - The single ZIP code of the user's residential
 * address. This gets all pantries that the user is eligible to attend.
 * @param {Array[String]} supported_diets - An array of all of the user's requested
 * diets. This returns all pantries that support at least one of the specified diets.
 * @param {boolean} show_unknown - A more internal query parameter that allows us
 * to specify whether or not we should display to the user pantries that do not
 * contain any information about their query. If we want to show the user vague entries,
 * specify true, else false.
 * @returns {Object} The result of the query.
 */
export async function getPantries(
  open_now = false,
  eligible_zip = undefined,
  supported_diets = undefined,
  show_unknown = true,
) {
  try {
    let url = "/api/pantries";
    let ampersand_prefix = false;

    // Prepare URL for query parameters
    if (
      open_now ||
      eligible_zip !== undefined ||
      supported_diets !== undefined ||
      show_unknown
    )
      url += "?";

    // Append open_now query parameter
    if (open_now) {
      if (ampersand_prefix) {
        url += "&";
      } else {
        ampersand_prefix = true;
      }
      url += "open_now=true";
    }

    // Append eligibility
    if (eligible_zip !== undefined) {
      if (ampersand_prefix) {
        url += "&";
      } else {
        ampersand_prefix = true;
      }
      url += "eligibility=" + eligible_zip;
    }

    // Append supported diets
    if (supported_diets !== undefined) {
      if (ampersand_prefix) {
        url += "&";
      } else {
        ampersand_prefix = true;
      }
      url += "supported_diets=" + supported_diets.toString();
    }

    // Append show_unknown
    if (show_unknown) {
      if (ampersand_prefix) {
        url += "&";
      } else {
        ampersand_prefix = true;
      }
      url += "show_unknown=true";
    }

    // Dispatch request
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    if (open_now) console.log("ERROR: getAllPantries(): " + err);
    return null;
  }
}

/**
 * Obtains a JSON object containing all pantry entries stored in the database.
 * Also obtains their hourly information.
 *
 * @returns {Object} A JSON object containing a pantry entry at each index.
 */
export async function getAllPantries() {
  return await getPantries();
}

/**
 * Obtains a JSON object containing all pantry entries that are currently
 * open, based on Eastern Standard Time. Also includes their hourly information.
 *
 * @returns {Object} A JSON object containing all open pantries.
 */
export async function getPantriesOpenNow() {
  return await getPantries(true);
}

/**
 * Obtains a JSON object containing the pantry information of the pantry with
 * id ID. This also returns its associated hours in the JSON field "hours".
 *
 * @param {number} id - The ID of the pantry to look up.
 * @returns {Object} An
 */
export async function getPantryByID(id) {
  try {
    const res = await fetch("/api/pantries/" + id);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.log("ERROR: getPantryByID(): " + err);
    return null;
  }
}

/**
 * Queries the database for pantry of id ID to obtain only its stored hours of operation.
 *
 * @param {number} id - The ID of the pantry that we want to find the hours of.
 * @returns {Object} A JSON object containing the pantry's hours.
 */
export async function getPantryHours(id) {
  try {
    const res = await fetch("/api/pantries/" + id + "/hours");
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.log("ERROR: getPantryHours(): " + err);
    return null;
  }
}

/**
 * Queries the database for all pantries that support the residential ZIP code
 * ELIGIBLE_ZIP. Note that this does not locate all pantries located WITHIN
 * ELIGIBLE_ZIP -- this finds the pantries that will serve the specified ZIP
 * code.
 *
 * @param {string} eligible_zip - The user's residential ZIP code.
 * @returns {Object} A JSON object containing all pantries that serve ELIGIBLE_ZIP.
 */
export async function getEligiblePantries(eligible_zip) {
  return await getPantries(undefined, eligible_zip);
}

/**
 * Queries the database for any pantries that support any of the user's requested
 * diets, DIETS. Note that pantries returned by this function may support one
 * or all of the requested diets -- the only requisite for return is that at least
 * one of the diets is supported.
 *
 * @param {Array[string]} diets - All of the user's requested diets.
 * @returns {Object} A JSON object containing any pantries that support any
 * of the user's requested diets.
 */
export async function getPantriesThatSupportDiets(diets) {
  return await getPantries(undefined, undefined, diets, false);
}
