import dotenv from 'dotenv';
dotenv.config();
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_URL } = process.env;

/**
 * Fetches an access token from the PayPal API.
 * @see {@link https://developer.paypal.com/reference/get-an-access-token/#link-getanaccesstoken}
 *
 * @returns {Promise<string>} The access token if the request is successful.
 * @throws {Error} If the request is not successful.
 *
 */
async function getPayPalAccessToken() {
    // Authorization header requires base64 encoding
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString('base64');

    const url = `${PAYPAL_API_URL}/v1/oauth2/token`;

    const headers = {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        Authorization: `Basic ${auth}`,
    };

    const body = 'grant_type=client_credentials';
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
    });

    if (!response.ok) throw new Error('Failed to get access token');

    const paypalData = await response.json();

    return paypalData.access_token;
}
