# Neighborhood Profile Redirection

The LiveBy neighborhood finder provides automatic redirection to neighborhood profiles based on an address or lat/lon coordinate. This can be used to create links on property pages that direct homebuyers to neighborhood information for a property or listing.

Here's an example of a dynamic link to direct to the neighborhood profile for a lat/lon coordinate:

```
<a href="https://liveby.co/neighborhood?brokerage=woodsbros&lat=40.773201&lon=-96.644859" target="_blank">
  View Neighborhood Profile
</a>
```

### Redirection URL

The base URL for the neighborhood redirector is:

```
https://liveby.co/neighborhood
```

Additional query parameters are used to direct the user to the correct neighborhood profile based on the brokerage, address, or lat/lon.

### Required Parameters

#### brokerage

The `brokerage` parameter is required, and should be the the same as the last part of the neighborhood finder URL, like `woodsbros`.

Example:

```
https://liveby.co/neighborhood?brokerage=woodsbros
```

> Note: If only the `brokerage` parameter is provide, the user will be directed to the brokerage's neighborhood finder page powered by LiveBy.

### Optional Parameters

#### lat/lon

If the latitude and longitude coordinates for a location are known, they can be specified as the query parameters `lat`, and `lon`.

- `lat`: The latitude. Example, `lat=40.773201`
- `lon`: The longitude. Example, `lon=-96.644859`

Example:

```
https://liveby.co/neighborhood?brokerage=woodsbros&lat=40.773201&lon=-96.644859
```

#### address

If the latitude and longitude are not known, a complete address can be specified using the `address` parameter. The address parameter must be a url-encoded/escaped string which includes the address, street, city, state, and zip.

Example:

```
https://liveby.co/neighborhood?brokerage=woodsbros&address=1987%20Sewell%20St%2C%20Lincoln%2C%20NE%2068502
```

> Note that the address query parameter should be encoded/escaped using [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or something similar (like [`rawurlencode`](http://us3.php.net/manual/ro/function.rawurlencode.php) in PHP).

#### utm_source

The optional `utm_source` parameter identifies the referring source domain and is used for analytics purposes. It's usually a short string, like `woodsbros`.

Example:

```
https://liveby.co/neighborhood?brokerage=woodsbros&lat=40.773201&lon=-96.644859&utm_source=woodsbros
```

#### utm_medium

The optional `utm_medium` parameter identifies the location of the link on the referring page, and is used to track the success of the placement of a link in different locations or mediums. 

Some possible values for `utm_medium` might be `property_listing`, `banner`, or `sidebar`. While this parameter is optional, it allows LiveBy to provide analytics about the success or popularity of neighborhood profile links in varying locations.

Example:

```
https://liveby.co/neighborhood?brokerage=woodsbros&lat=40.773201&lon=-96.644859&utm_source=woodsbros&utm_medium=property_listing
```