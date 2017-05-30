# Vendor API

The Vendor API is a RESTful JSON web service for securely retrieving neighborhood preference information for users. [Contact us] to receive a vendor API access token.

  [Contact Us]: https://qa.liveby.com/contact#interests:api
## Endpoints

### vendor/users

`https://liveby.co/v1/vendor/users`

Retrieve neighborhood preference information for users who have created an account on the LiveBy Neighborhood Finder. Information can be requested for a single user, or for all users who created an account within a specific date range.

For example, neighborhood preference information for `ben.barber@liveby.co` can be accessed at:

```
https://liveby.co/v1/vendor/users?email=ben.barber%40liveby.co&brokerage=woodsbros&access_token=1GcfIcreeoOLXcXnQl6B%2Fqriggt79LIyGzMb5tc1YLU%3D
```

> Note: Query parameters—including the email address—must be encoded/escaped using [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or something similar (like [`rawurlencode`](http://us3.php.net/manual/ro/function.rawurlencode.php) in PHP).

Additionally, neighborhood preference information can be requested for users who created an account during a specific date range. For example:

```
https://liveby.co/v1/vendor/users?after=1450132058974&before=1481753256437&brokerage=woodsbros&access_token=1GcfIcreeoOLXcXnQl6B%2Fqriggt79LIyGzMb5tc1YLU%3D
```

#### Parameters

> Note: The `brokerage` and `access_token` parameters are required for all vendor API requests.

|                |          | Example   | Default  | Description | 
|-|-|-|:-:|-|
| `access_token` | required | 1G2csdf…  | |  The access\_token provided to your brokerage or vendor. [Contact us] to retrieve an API access token or invalidate a compromised token.          |
| `brokerage`    | required | woodsbros |  | The brokerage identifier, which is the same as the last part of the neighborhood finder URL.          |
| `email`        |          | ben.barber%40liveby.co |  | A URL-encoded email address         |
| `after`        |          | 1450132058974 |  0 | A Unix timestamp (in milliseconds) for the beginning date range |
| `before`       |          | 1481753256437 | [Date.now()] | A Unix timestamp (in milliseconds) for the ending date range |
| `page[limit]`        |          | 100           | 100 | The number of users to return, up to 1000 |
| `page[offset]`         |          | 200           |  0  | The starting point in the user result. Use with `limit` to implement pagination for results |


> Note: Timestamps are specified in [Unix time], which specifies the number of milliseconds since midnight, January 1, 1970. They can be generated in JavaScript with [Date#getTime()] or in PHP with [DateTime::getTimestamp()].
  
  [Unix time]: https://en.wikipedia.org/wiki/Unix_time
  [Date.now()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
  [DateTime::getTimestamp()]: http://php.net/manual/en/datetime.gettimestamp.php
  [Date#getTime()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime

#### Response Properties

| | |
|-|-|
| `meta.status` | The HTTP status for the response. Will be `200` for successful API requests |
| `meta.message`| The HTTP status message. |
| `errors`| An array of **error** objects if an error occurred servicing the request |
| `links.next` | A URL to the next page of results if `page[limit]` was used | 
| `links.prev` | A URL to the previous page of results. Only present if `page[offset]` was used | 
| `data` | An array of [**user**](#user-response-object) objects containing neighborhood preference information |

#### User Response Object

| Property | Type | Example | Description |
|-|-|-|-|
| `_id` | String | "5732251987513e322cfab8a1" | The unique identifier for the user |
| `email` | String | "jsmith@example.com" | The email address for the user |
| `fname` | String | "John" | The user's first name, or an empty string ('') if the user did not provide a first name |
| `lname` | String | "Smith" | The user's last name, or an empty string if the user did not provide a last name |
| `hasAgent` | Boolean | `true` | `true` if the user identified that they were already working with an agent at time of registration |
| `moveTime` | String | "6 months" | The amount of time before the user is planning to move. One of "1–3 months", "6 months", or "12 months" |  
| `created` | String | "2016-05-10T18:14:49.327Z" | The time stamp when the user registered, specified as a UTC datetime String |
| `preferences` | Object | See [example response](#example-response) | An object containing the user's neighborhood preferences |
| `favorites` | Array | See [example response](#example-response) | An array containing the user's favorite neighborhoods |

#### Example Response
```json
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "links": {
        "self": "https://localhost/v1/vendor/user?after=1450132058974&before=1481753256437&&brokerage=liveby&access_token=1GcfIcreeoOLXcXnQl6B%2Fqriggt79LIyGzMb5tc1YLU%3D"
    },
    "data": [
        {
            "_id": "5732251987513e322cfab8a1",
            "email": "test@user.com",
            "fname": "Test",
            "lname": "User",
            "hasAgent": true,
            "moveTime": "6 months",
            "created": "2016-05-10T18:14:49.327Z",
            "session": {
                "preferences": {
                    "buyBudgetHighIndex": 100000,
                    "buyBudgetLowIndex": null
                },
                "favorites": [
                    {
                        "_id": "56699b76dd4700202391c616",
                        "label": "Westside",
                        "href": "https://liveby.co/liveby/neighborhood/56699b76dd4700202391c616?utm_source=liveby&utm_medium=api",
                        "lat": "41.25976992792788",
                        "lon": "-96.04126727327323"
                    },
                    {
                        "_id": "56699b76dd4700202391c618",
                        "label": "Aksarben",
                        "href": "https://liveby.co/liveby/neighborhood/56699b76dd4700202391c618?utm_source=liveby&utm_medium=api",
                        "lat": "41.2357568112745",
                        "lon": "-96.00966760294118"
                    },
                    {
                        "_id": "56699b76dd4700202391c61a",
                        "label": "Colonial Hills",
                        "href": "https://liveby.co/liveby/neighborhood/56699b76dd4700202391c61a?utm_source=liveby&utm_medium=api",
                        "lat": "40.761958765137635",
                        "lon": "-96.63362331009176"
                    },
                    {
                        "_id": "56699b76dd4700202391c61c",
                        "label": "Haymarket",
                        "href": "https://liveby.co/liveby/neighborhood/56699b76dd4700202391c61c?utm_source=liveby&utm_medium=api",
                        "lat": "40.81228593212669",
                        "lon": "-96.70411726696835"
                    }
                ]
            }
        },
        {
            "_id": "573236637f816d8c0ffc3a73",
            "email": "joel@liveby.co",
            "fname": "Joel",
            "lname": "Gimbel",
            "hasAgent": false,
            "moveTime": "1 month",
            "created": "2016-05-10T19:28:35.923Z",
            "session": {
                "preferences": {
                    "walk_score": false,
                    "transit_stops": false,
                    "transit_score": false,
                    "drive_score": true,
                    "bike_score": false,
                    "commute_method": "car",
                    "library_score": false,
                    "entertainment_score": false,
                    "brewery_score": false,
                    "bakery_score": false,
                    "coffeeshop_score": false,
                    "lot_size": "no_preference",
                    "household_type": "apartment_condo",
                    "buyBudgetHighIndex": null,
                    "buyBudgetLowIndex": null
                },
                "favorites": [
                    {
                        "_id": "56699b76dd4700202391c61a",
                        "label": "Colonial Hills",
                        "href": "https://liveby.co/liveby/neighborhood/56699b76dd4700202391c61a?utm_source=liveby&utm_medium=api",
                        "lat": "40.761958765137635",
                        "lon": "-96.63362331009176"
                    }
                ]
            }
        },
        {
            "_id": "573246f587513e322cfab8a2",
            "email": "favorites@test.com",
            "fname": "Test",
            "lname": "Email",
            "hasAgent": true,
            "moveTime": "6 months",
            "created": "2016-05-10T20:39:17.884Z",
            "session": {
                "preferences": {
                    "household_type": "apartment_condo",
                    "buy_or_rent": "buy",
                    "gym_score": true,
                    "busstop_score": true,
                    "bikeshare_score": true,
                    "buyBudgetHighIndex": null,
                    "buyBudgetLowIndex": null
                },
                "favorites": []
            }
        }
    ]
}
```