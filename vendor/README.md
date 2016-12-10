# Vendor API

The Vendor API is a RESTful JSON web service for securely retrieving neighborhood preference information for users. It requires an access token, which can be retrieved by contacting <a href="mailto:integration@liveby.co">integration@liveby.co</a>.

## Endpoints

### vendor/user

The `vendor/user` endpoint allows vendors to retrieve neighborhood preference information for users who have created an account on the LiveBy Neighborhood Finder. Information can be retrieved for a single user, or for all users who created an account within a specific date range.

For example, neighborhood preference information for `ben.barber@liveby.co` can be accessed at:

```
https://liveby.co/v1/vendor/users/ben.barber%40liveby.co?access_token=1GcfIcreeoOLXcXnQl6B%2Fqriggt79LIyGzMb5tc1YLU%3D
```   
> Note that the email address portion must be encoded/escaped using [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or something similar (like [`rawurlencode`](http://us3.php.net/manual/ro/function.rawurlencode.php) in PHP).


### Example Request
```
https://liveby.co/v1/vendor/users?since=1480634634&upto=1480634664&brokerage=liveby&access_token=1GcfIcreeoOLXcXnQl6B%2Fqriggt79LIyGzMb5tc1YLU%3D
```

### Example Response
```
{
    "meta": {
        "status": 200,
        "message": "success"
    },
    "links": {
        "self": "https://localhost/v1/vendor/user?since=1480634634&upto=1480634664&brokerage=liveby&access_token=1GcfIcreeoOLXcXnQl6B%2Fqriggt79LIyGzMb5tc1YLU%3D"
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
                        "INTPTLAT": "41.25976992792788",
                        "INTPTLON": "-96.04126727327323",
                        "label": "Westside"
                    },
                    {
                        "INTPTLAT": "41.2357568112745",
                        "INTPTLON": "-96.00966760294118",
                        "label": "Aksarben"
                    },
                    {
                        "INTPTLAT": "40.761958765137635",
                        "INTPTLON": "-96.63362331009176",
                        "label": "Colonial Hills"
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
                        "INTPTLAT": "40.761958765137635",
                        "INTPTLON": "-96.63362331009176",
                        "label": "Colonial Hills"
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